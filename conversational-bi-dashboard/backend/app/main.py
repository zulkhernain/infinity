"""FastAPI main application."""

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import shutil
from typing import Optional

from app.models.schemas import QueryRequest, QueryResponse, ChartRequest, ChartResponse
from app.services.llm_service import LLMService
from app.services.query_service import QueryService
from app.services.chart_service import ChartService
from app.utils.database import DatabaseManager
from app.utils.csv_utils import CSVProcessor

# Initialize FastAPI app
app = FastAPI(
    title="Conversational BI Dashboard API",
    description="API for conversational business intelligence dashboard",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
llm_service = LLMService()
query_service = QueryService()
chart_service = ChartService()
db_manager = DatabaseManager()

# Upload directory
UPLOAD_DIR = "app/data/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Welcome to Conversational BI Dashboard API",
        "version": "1.0.0"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


@app.post("/query")
async def process_query(request: QueryRequest) -> QueryResponse:
    """
    Process a natural language query.
    
    Args:
        request: Query request with user prompt
        
    Returns:
        Query response with results and recommended chart
    """
    try:
        # Generate response using LLM
        llm_response = llm_service.generate_response(
            request.query,
            context=request.context.get("context") if request.context else None
        )
        
        # Get data if CSV path provided
        data = None
        if request.csv_path and os.path.exists(request.csv_path):
            query_service.load_csv(request.csv_path)
            data = query_service.get_data_summary()
        
        # Recommend chart type
        chart_type = chart_service.recommend_chart_type(
            data or {},
            request.query
        )
        
        return QueryResponse(
            status="success",
            message="Query processed successfully",
            data={"llm_response": llm_response, "data": data},
            chart_type=chart_type
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    """
    Upload a CSV file.
    
    Args:
        file: CSV file to upload
        
    Returns:
        File info and upload status
    """
    try:
        if not file.filename.endswith(".csv"):
            raise HTTPException(status_code=400, detail="Only CSV files are allowed")
        
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Validate and get info
        is_valid, message = CSVProcessor.validate_csv(file_path)
        if not is_valid:
            os.remove(file_path)
            raise HTTPException(status_code=400, detail=message)
        
        csv_info = CSVProcessor.get_csv_info(file_path)
        
        return {
            "status": "success",
            "message": "File uploaded successfully",
            "file_path": file_path,
            "info": csv_info
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/chart")
async def generate_chart(request: ChartRequest) -> ChartResponse:
    """
    Generate a chart configuration.
    
    Args:
        request: Chart generation request
        
    Returns:
        Chart configuration response
    """
    try:
        config = chart_service.generate_chart_config(
            request.chart_type,
            request.data,
            request.title
        )
        
        return ChartResponse(
            chart_html="<div>Chart placeholder</div>",
            config=config
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/data/summary")
async def get_data_summary(csv_path: Optional[str] = None):
    """
    Get summary of loaded data.
    
    Args:
        csv_path: Optional path to CSV file
        
    Returns:
        Data summary
    """
    try:
        if csv_path:
            query_service.load_csv(csv_path)
        
        summary = query_service.get_data_summary()
        return {"status": "success", "data": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
