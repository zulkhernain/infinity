"""CSV processing utilities."""

import os
import pandas as pd
from typing import Optional, List


class CSVProcessor:
    """Utility class for CSV file processing."""
    
    @staticmethod
    def load_csv(file_path: str) -> Optional[pd.DataFrame]:
        """
        Load a CSV file.
        
        Args:
            file_path: Path to CSV file
            
        Returns:
            DataFrame or None if error
        """
        try:
            return pd.read_csv(file_path)
        except Exception as e:
            print(f"Error loading CSV: {str(e)}")
            return None
    
    @staticmethod
    def save_csv(df: pd.DataFrame, file_path: str) -> bool:
        """
        Save a DataFrame to CSV.
        
        Args:
            df: DataFrame to save
            file_path: Path to save file
            
        Returns:
            True if successful, False otherwise
        """
        try:
            df.to_csv(file_path, index=False)
            return True
        except Exception as e:
            print(f"Error saving CSV: {str(e)}")
            return False
    
    @staticmethod
    def get_csv_info(file_path: str) -> Optional[dict]:
        """
        Get information about a CSV file.
        
        Args:
            file_path: Path to CSV file
            
        Returns:
            Dictionary with CSV info or None if error
        """
        try:
            df = pd.read_csv(file_path)
            return {
                "rows": len(df),
                "columns": df.columns.tolist(),
                "dtypes": df.dtypes.astype(str).to_dict(),
                "shape": df.shape
            }
        except Exception as e:
            print(f"Error getting CSV info: {str(e)}")
            return None
    
    @staticmethod
    def validate_csv(file_path: str) -> tuple[bool, str]:
        """
        Validate a CSV file.
        
        Args:
            file_path: Path to CSV file
            
        Returns:
            Tuple of (is_valid, message)
        """
        if not os.path.exists(file_path):
            return False, "File does not exist"
        
        if not file_path.endswith(".csv"):
            return False, "File is not a CSV"
        
        try:
            df = pd.read_csv(file_path)
            if df.empty:
                return False, "CSV is empty"
            return True, "CSV is valid"
        except Exception as e:
            return False, f"Error reading CSV: {str(e)}"
