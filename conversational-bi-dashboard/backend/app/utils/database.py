"""Database utility functions and connections."""

import os
from typing import Optional
import sqlite3


class DatabaseManager:
    """Manager for database connections and operations."""
    
    def __init__(self, db_path: Optional[str] = None):
        """
        Initialize database manager.
        
        Args:
            db_path: Path to database file, defaults to in-memory SQLite
        """
        self.db_path = db_path or ":memory:"
        self.connection = None
    
    def connect(self) -> bool:
        """
        Establish database connection.
        
        Returns:
            True if successful, False otherwise
        """
        try:
            self.connection = sqlite3.connect(self.db_path)
            return True
        except Exception as e:
            print(f"Database connection error: {str(e)}")
            return False
    
    def disconnect(self):
        """Close database connection."""
        if self.connection:
            self.connection.close()
    
    def execute_query(self, query: str) -> Optional[list]:
        """
        Execute a SQL query.
        
        Args:
            query: SQL query to execute
            
        Returns:
            Query results or None if error
        """
        try:
            cursor = self.connection.cursor()
            cursor.execute(query)
            return cursor.fetchall()
        except Exception as e:
            print(f"Query execution error: {str(e)}")
            return None
    
    def create_table(self, table_name: str, schema: str) -> bool:
        """
        Create a new table.
        
        Args:
            table_name: Name of the table
            schema: Table schema definition
            
        Returns:
            True if successful, False otherwise
        """
        try:
            cursor = self.connection.cursor()
            cursor.execute(f"CREATE TABLE IF NOT EXISTS {table_name} ({schema})")
            self.connection.commit()
            return True
        except Exception as e:
            print(f"Table creation error: {str(e)}")
            return False
