"""Main application entry point for Conversational BI Dashboard."""

import os
import logging
import sys
from pathlib import Path
from dotenv import load_dotenv

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

from backend.api import create_api
from backend.database import Database


def initialize_app():
    """Initialize the application."""
    
    logger.info("Initializing Conversational BI Dashboard...")
    
    # Create API instance
    api = create_api()
    
    logger.info("✓ API initialized successfully")
    
    return api


def init_sample_data():
    """Initialize with sample data if database is empty."""
    
    db = Database()
    stats = db.get_stats()
    
    if stats.get('total_records', 0) == 0:
        logger.info("Database is empty. Loading sample data...")
        try:
            from sample_data import SampleDataGenerator
            SampleDataGenerator.load_sample_data(db, num_records=500)
            logger.info("✓ Sample data loaded successfully")
        except Exception as e:
            logger.warning(f"Could not load sample data: {e}")
    else:
        logger.info(f"✓ Database already contains {stats.get('total_records', 0)} records")


def main():
    """Main entry point."""
    
    print("""
    ╔════════════════════════════════════════════════════════╗
    ║   Conversational BI Dashboard                          ║
    ║   Business Intelligence meets Conversational AI        ║
    ╚════════════════════════════════════════════════════════╝
    """)
    
    try:
        # Initialize sample data
        init_sample_data()
        
        # Initialize API
        api = initialize_app()
        
        # Get configuration
        host = os.getenv('FLASK_HOST', '0.0.0.0')
        port = int(os.getenv('FLASK_PORT', 5000))
        debug = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
        
        logger.info(f"Starting server on {host}:{port}...")
        logger.info(f"Debug mode: {debug}")
        logger.info("\nAPI Endpoints Available:")
        logger.info("  GET    /api/health              - Health check")
        logger.info("  GET    /api/data                - Retrieve all data points")
        logger.info("  GET    /api/data/stats          - Get data statistics")
        logger.info("  GET    /api/data/by-category/<category> - Filter by category")
        logger.info("  GET    /api/data/by-region/<region>    - Filter by region")
        logger.info("  POST   /api/data                - Insert new data point")
        logger.info("  POST   /api/chat                - Send chat message")
        logger.info("  GET    /api/conversation/history - Get conversation history")
        logger.info("  POST   /api/conversation/clear  - Clear conversation")
        logger.info("  POST   /api/query               - Execute natural language query")
        logger.info("  POST   /api/visualize           - Generate visualization")
        logger.info("  GET    /api/insights            - Get AI-generated insights")
        logger.info("  POST   /api/suggestions         - Get follow-up suggestions")
        logger.info("")
        
        # Run the server
        api.run(host=host, port=port, debug=debug)
        
    except Exception as e:
        logger.error(f"Fatal error: {e}", exc_info=True)
        sys.exit(1)


if __name__ == "__main__":
    main()
