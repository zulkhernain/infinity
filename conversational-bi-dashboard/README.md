# Conversational BI Dashboard

A modern conversational business intelligence dashboard that combines natural language processing with data visualization to provide intuitive data analysis experiences.

## Project Structure

```
conversational-bi-dashboard/
├── backend/          # FastAPI backend with LLM integration
├── frontend/         # React/Next.js frontend with interactive charts
└── docker-compose.yml
```

## Features

- 🤖 **AI-Powered Analysis**: Uses Google Gemini API for natural language understanding
- 📊 **Dynamic Visualizations**: Automatic chart type recommendations and rendering
- 📤 **CSV Upload**: Easy data import with validation
- 💬 **Conversational Interface**: Chat-based query interface
- 🎨 **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- 🐳 **Docker Support**: Ready for containerized deployment

## Tech Stack

### Backend
- **FastAPI**: High-performance Python web framework
- **Pandas**: Data manipulation and analysis
- **Google Generalize AI**: LLM integration
- **SQLAlchemy**: Database ORM

### Frontend
- **React 18**: UI framework
- **Next.js 14**: React framework with SSR
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Chart.js**: Data visualization
- **Axios**: HTTP client

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- Docker & Docker Compose (optional)

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment:
   ```bash
   cp .env.example .env
   # Edit .env with your Gemini API key
   ```

5. Run the server:
   ```bash
   python run.py
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

### Docker Setup

1. Build and run with Docker Compose:
   ```bash
   docker-compose up --build
   ```

2. Access:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000](http://localhost:8000)
   - API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

## API Endpoints

- `POST /query` - Process natural language query
- `POST /upload` - Upload CSV file
- `POST /chart` - Generate chart configuration
- `GET /data/summary` - Get data summary statistics
- `GET /health` - Health check

## Environment Variables

### Backend (.env)
```
GEMINI_API_KEY=your_api_key_here
DATABASE_URL=sqlite:///./test.db
DEBUG=True
SERVER_HOST=0.0.0.0
SERVER_PORT=8000
```

## Development

### Backend
- API documentation available at `http://localhost:8000/docs`
- Use `python -m pytest tests/` to run tests

### Frontend
- Run `npm run type-check` for TypeScript validation
- Run `npm run lint` for code linting

## Key Components

### Backend Services
- **LLM Service**: Handles Gemini API integration
- **Query Service**: Executes SQL queries and data transformations
- **Chart Service**: Recommends and generates chart configurations

### Frontend Components
- **Dashboard**: Main layout component
- **ChatInterface**: Conversational query interface
- **ChartRenderer**: Dynamic chart rendering
- **FileUpload**: CSV file upload handler

## Contributing

1. Create feature branches from `main`
2. Follow existing code style and patterns
3. Add tests for new features
4. Submit pull requests with clear descriptions

## License

MIT License - Feel free to use this project for personal and commercial purposes.

## Support

For issues and questions, please create an issue in the repository.
