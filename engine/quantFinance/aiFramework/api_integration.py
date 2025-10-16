"""
API Integration for Enhanced Quantitative Finance Engine
FastAPI endpoints for the AI-enhanced financial analysis

This module provides REST API endpoints for:
- Comprehensive stock analysis
- Pattern recognition
- Sentiment analysis
- Predictive modeling
- Risk assessment
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uvicorn
from datetime import datetime
import logging

# Import our ML wrapper
try:
    from .ml_wrapper import analyze_stock_with_ai
except ImportError:
    try:
        from ml_wrapper import analyze_stock_with_ai
    except ImportError:
        # Fallback function
        def analyze_stock_with_ai(*args, **kwargs):
            return {
                'error': 'ML wrapper not available',
                'traditional_metrics': {'error': 'Module not found'},
                'overall_assessment': {
                    'score': 0.5,
                    'confidence': 0.0,
                    'recommendation': 'HOLD - Analysis module unavailable'
                }
            }

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="Enhanced Quantitative Finance API",
    description="AI-Enhanced Financial Analysis with Pattern Recognition and Predictive Modeling",
    version="1.0.0"
)

# Pydantic models for API
class StockDataRequest(BaseModel):
    """Request model for stock analysis"""
    prices: List[float] = Field(..., description="List of closing prices", min_items=10)
    volumes: Optional[List[float]] = Field(None, description="List of trading volumes")
    highs: Optional[List[float]] = Field(None, description="List of high prices")
    lows: Optional[List[float]] = Field(None, description="List of low prices")
    market_data: Optional[Dict[str, Any]] = Field(None, description="Additional market data")
    risk_tolerance: str = Field("moderate", description="Risk tolerance: conservative, moderate, or aggressive")
    
    class Config:
        schema_extra = {
            "example": {
                "prices": [100, 102, 101, 105, 107, 106, 108, 110, 109, 112, 115, 113, 116, 118, 117],
                "volumes": [1000000, 1200000, 950000, 1100000, 1300000, 1050000, 1150000, 1250000, 1080000, 1180000, 1350000, 1120000, 1220000, 1280000, 1140000],
                "risk_tolerance": "moderate"
            }
        }

class AnalysisResponse(BaseModel):
    """Response model for analysis results"""
    traditional_metrics: Dict[str, Any]
    pattern_analysis: Dict[str, Any]
    sentiment_analysis: Dict[str, Any]
    predictive_analysis: Dict[str, Any]
    risk_assessment: Dict[str, Any]
    trading_signals: List[Dict[str, Any]]
    overall_assessment: Dict[str, Any]
    metadata: Dict[str, Any]

class QuickAnalysisRequest(BaseModel):
    """Simplified request for quick analysis"""
    prices: List[float] = Field(..., description="List of closing prices", min_items=5)
    
    class Config:
        schema_extra = {
            "example": {
                "prices": [100, 102, 104, 103, 106, 108, 107, 110, 112, 115]
            }
        }

# API Endpoints

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Enhanced Quantitative Finance API",
        "version": "1.0.0",
        "features": [
            "Traditional quantitative metrics",
            "AI-powered pattern recognition",
            "Market sentiment analysis",
            "Predictive modeling",
            "Risk assessment",
            "Trading signal generation"
        ],
        "endpoints": {
            "comprehensive_analysis": "/analyze/comprehensive",
            "quick_analysis": "/analyze/quick",
            "patterns_only": "/analyze/patterns",
            "sentiment_only": "/analyze/sentiment",
            "predictions_only": "/analyze/predictions"
        }
    }

@app.post("/analyze/comprehensive", response_model=AnalysisResponse)
async def comprehensive_analysis(request: StockDataRequest):
    """
    Comprehensive AI-enhanced stock analysis
    
    Performs complete analysis including:
    - Traditional quantitative metrics
    - Pattern recognition
    - Sentiment analysis
    - Predictive modeling
    - Risk assessment
    - Trading signals
    """
    try:
        logger.info(f"Performing comprehensive analysis on {len(request.prices)} data points")
        
        # Validate risk tolerance
        if request.risk_tolerance not in ['conservative', 'moderate', 'aggressive']:
            raise HTTPException(status_code=400, detail="Invalid risk tolerance. Must be 'conservative', 'moderate', or 'aggressive'")
        
        # Perform analysis
        result = analyze_stock_with_ai(
            prices=request.prices,
            volumes=request.volumes,
            highs=request.highs,
            lows=request.lows,
            market_data=request.market_data,
            risk_tolerance=request.risk_tolerance
        )
        
        logger.info("Analysis completed successfully")
        return result
        
    except Exception as e:
        logger.error(f"Error in comprehensive analysis: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.post("/analyze/quick")
async def quick_analysis(request: QuickAnalysisRequest):
    """
    Quick analysis with basic metrics and signals
    
    Provides essential analysis for rapid decision making
    """
    try:
        logger.info(f"Performing quick analysis on {len(request.prices)} data points")
        
        # Perform simplified analysis
        result = analyze_stock_with_ai(
            prices=request.prices,
            risk_tolerance='moderate'
        )
        
        # Extract key information for quick response
        quick_result = {
            "current_price": result['traditional_metrics'].get('current_price', 0),
            "price_change": result['traditional_metrics'].get('price_change', 0),
            "overall_score": result['overall_assessment']['score'],
            "confidence": result['overall_assessment']['confidence'],
            "recommendation": result['overall_assessment']['recommendation'],
            "top_signal": result['trading_signals'][0] if result['trading_signals'] else None,
            "risk_level": result['risk_assessment'].get('overall_risk_rating', 'unknown'),
            "analysis_timestamp": datetime.now().isoformat()
        }
        
        logger.info("Quick analysis completed")
        return quick_result
        
    except Exception as e:
        logger.error(f"Error in quick analysis: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Quick analysis failed: {str(e)}")

@app.post("/analyze/patterns")
async def pattern_analysis_only(request: StockDataRequest):
    """
    Pattern recognition analysis only
    
    Focuses specifically on technical pattern detection
    """
    try:
        logger.info("Performing pattern-only analysis")
        
        result = analyze_stock_with_ai(
            prices=request.prices,
            volumes=request.volumes,
            highs=request.highs,
            lows=request.lows
        )
        
        return {
            "patterns": result['pattern_analysis'],
            "metadata": {
                "analysis_type": "patterns_only",
                "timestamp": datetime.now().isoformat(),
                "data_points": len(request.prices)
            }
        }
        
    except Exception as e:
        logger.error(f"Error in pattern analysis: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Pattern analysis failed: {str(e)}")

@app.post("/analyze/sentiment")
async def sentiment_analysis_only(request: StockDataRequest):
    """
    Market sentiment analysis only
    
    Focuses on sentiment indicators and market psychology
    """
    try:
        logger.info("Performing sentiment-only analysis")
        
        result = analyze_stock_with_ai(
            prices=request.prices,
            volumes=request.volumes,
            market_data=request.market_data
        )
        
        return {
            "sentiment": result['sentiment_analysis'],
            "metadata": {
                "analysis_type": "sentiment_only",
                "timestamp": datetime.now().isoformat(),
                "data_points": len(request.prices)
            }
        }
        
    except Exception as e:
        logger.error(f"Error in sentiment analysis: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Sentiment analysis failed: {str(e)}")

@app.post("/analyze/predictions")
async def predictions_only(request: StockDataRequest):
    """
    Predictive modeling analysis only
    
    Focuses on ML-based predictions and forecasts
    """
    try:
        logger.info("Performing predictions-only analysis")
        
        result = analyze_stock_with_ai(
            prices=request.prices,
            market_data=request.market_data
        )
        
        return {
            "predictions": result['predictive_analysis'],
            "metadata": {
                "analysis_type": "predictions_only", 
                "timestamp": datetime.now().isoformat(),
                "data_points": len(request.prices)
            }
        }
        
    except Exception as e:
        logger.error(f"Error in predictions analysis: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Predictions analysis failed: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "Enhanced Quantitative Finance API"
    }

@app.get("/status")
async def service_status():
    """Detailed service status"""
    try:
        # Test basic functionality
        test_prices = [100, 101, 102, 101, 103]
        test_result = analyze_stock_with_ai(test_prices)
        
        return {
            "status": "operational",
            "timestamp": datetime.now().isoformat(),
            "components": {
                "ml_wrapper": "available" if 'error' not in test_result else "unavailable",
                "pattern_recognition": "available",
                "sentiment_analysis": "available", 
                "predictive_models": "available",
                "api_endpoints": "operational"
            },
            "version": "1.0.0"
        }
        
    except Exception as e:
        return {
            "status": "degraded",
            "timestamp": datetime.now().isoformat(),
            "error": str(e),
            "version": "1.0.0"
        }

# Error handlers
@app.exception_handler(ValueError)
async def value_error_handler(request, exc):
    return HTTPException(status_code=400, detail=str(exc))

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    logger.error(f"Unhandled exception: {str(exc)}")
    return HTTPException(status_code=500, detail="Internal server error")

# Development server
if __name__ == "__main__":
    uvicorn.run(
        "api_integration:app",
        host="0.0.0.0", 
        port=8000,
        reload=True,
        log_level="info"
    )