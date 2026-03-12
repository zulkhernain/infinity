"""LLM Service for Gemini API integration."""

import os
import google.generativeai as genai
from typing import Optional


class LLMService:
    """Service for interacting with Google Gemini API."""
    
    def __init__(self):
        """Initialize the LLM service with API key from environment."""
        self.api_key = os.getenv("GEMINI_API_KEY")
        if self.api_key:
            genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel("gemini-pro")
    
    def generate_response(self, prompt: str, context: Optional[str] = None) -> str:
        """
        Generate a response using Gemini API.
        
        Args:
            prompt: The user's query or prompt
            context: Optional context information
            
        Returns:
            Generated response text
        """
        full_prompt = f"{context}\n\n{prompt}" if context else prompt
        
        try:
            response = self.model.generate_content(full_prompt)
            return response.text
        except Exception as e:
            return f"Error generating response: {str(e)}"
    
    def analyze_data_structure(self, csv_content: str) -> str:
        """
        Analyze CSV structure and provide insights.
        
        Args:
            csv_content: The CSV file content
            
        Returns:
            Analysis of the data structure
        """
        prompt = f"Analyze this CSV data structure and provide column names and data types:\n{csv_content}"
        return self.generate_response(prompt)
