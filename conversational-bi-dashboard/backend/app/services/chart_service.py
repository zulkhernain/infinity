"""Chart Service for chart type recommendation and generation."""

from typing import Dict, Any, List, Optional
import json


class ChartService:
    """Service for chart type recommendation and generation."""
    
    CHART_TYPES = {
        "line": "Line Chart",
        "bar": "Bar Chart",
        "pie": "Pie Chart",
        "scatter": "Scatter Plot",
        "area": "Area Chart",
        "histogram": "Histogram"
    }
    
    def __init__(self):
        """Initialize the chart service."""
        pass
    
    def recommend_chart_type(self, data: Dict[str, Any], query_context: Optional[str] = None) -> str:
        """
        Recommend a chart type based on data characteristics.
        
        Args:
            data: The data to visualize
            query_context: Optional context from the query
            
        Returns:
            Recommended chart type
        """
        # Basic recommendation logic
        if "trend" in str(query_context).lower():
            return "line"
        elif "comparison" in str(query_context).lower():
            return "bar"
        elif "distribution" in str(query_context).lower():
            return "histogram"
        else:
            return "bar"
    
    def generate_chart_config(self, chart_type: str, data: Dict[str, Any], 
                            title: Optional[str] = None) -> Dict[str, Any]:
        """
        Generate chart configuration for rendering.
        
        Args:
            chart_type: Type of chart to generate
            data: The data for the chart
            title: Optional chart title
            
        Returns:
            Chart configuration dictionary
        """
        config = {
            "type": chart_type,
            "title": title or "Chart",
            "data": data,
            "options": self._get_chart_options(chart_type)
        }
        return config
    
    def _get_chart_options(self, chart_type: str) -> Dict[str, Any]:
        """Get default options for a chart type."""
        options = {
            "responsive": True,
            "maintainAspectRatio": True,
            "plugins": {
                "legend": {
                    "position": "top"
                }
            }
        }
        return options
