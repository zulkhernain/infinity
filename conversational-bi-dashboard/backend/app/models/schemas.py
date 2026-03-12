"""Pydantic models and schemas for API requests/responses."""

from pydantic import BaseModel
from typing import List, Optional, Dict, Any


class QueryRequest(BaseModel):
    """Schema for user query requests."""
    query: str
    csv_path: Optional[str] = None
    context: Optional[Dict[str, Any]] = None


class QueryResponse(BaseModel):
    """Schema for query responses."""
    status: str
    message: str
    data: Optional[Dict[str, Any]] = None
    chart_type: Optional[str] = None


class ChartRequest(BaseModel):
    """Schema for chart generation requests."""
    data: Dict[str, Any]
    chart_type: str
    title: Optional[str] = None


class ChartResponse(BaseModel):
    """Schema for chart responses."""
    chart_html: str
    config: Dict[str, Any]
