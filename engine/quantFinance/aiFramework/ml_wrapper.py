"""
Enhanced Quantitative Finance ML Wrapper
Comprehensive integration of all AI/ML components

This is the main interface that combines:
- Traditional quantitative finance calculations
- Advanced pattern recognition
- Market sentiment analysis
- Predictive modeling
- Risk assessment with AI
"""

import numpy as np
import pandas as pd
import math
import warnings
from typing import Dict, List, Tuple, Optional, Union
from dataclasses import dataclass
from datetime import datetime, timedelta
import logging

warnings.filterwarnings('ignore')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Try to import our custom modules
try:
    from .pattern_recognition import analyze_stock_patterns
    from .sentiment_analysis import analyze_market_sentiment
    from .predictive_models import predict_price_movement, predict_volatility, predict_market_regime
except ImportError:
    # Fallback for standalone usage
    try:
        from pattern_recognition import analyze_stock_patterns
        from sentiment_analysis import analyze_market_sentiment
        from predictive_models import predict_price_movement, predict_volatility, predict_market_regime
    except ImportError:
        logger.warning("Custom modules not available. Using fallback implementations.")
        analyze_stock_patterns = None
        analyze_market_sentiment = None
        predict_price_movement = None
        predict_volatility = None
        predict_market_regime = None

@dataclass
class EnhancedAnalysisResult:
    """Comprehensive analysis result"""
    traditional_metrics: Dict
    pattern_analysis: Dict
    sentiment_analysis: Dict
    predictive_analysis: Dict
    risk_assessment: Dict
    trading_signals: List[Dict]
    overall_score: float
    confidence: float
    recommendation: str

class EnhancedQuantFinanceEngine:
    """
    Enhanced Quantitative Finance Engine with AI/ML capabilities
    
    This engine combines traditional quantitative finance with modern AI/ML techniques
    to provide comprehensive market analysis and trading signals.
    """
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.analysis_cache = {}
        
        # Risk tolerance settings
        self.risk_levels = {
            'conservative': {'max_risk': 0.15, 'min_confidence': 0.7},
            'moderate': {'max_risk': 0.25, 'min_confidence': 0.6},
            'aggressive': {'max_risk': 0.40, 'min_confidence': 0.5}
        }
        
        self.logger.info("Enhanced QuantFinance Engine initialized")
    
    def comprehensive_analysis(self, 
                             prices: List[float], 
                             volumes: List[float] = None,
                             highs: List[float] = None,
                             lows: List[float] = None,
                             market_data: Dict = None,
                             risk_tolerance: str = 'moderate') -> EnhancedAnalysisResult:
        """
        Perform comprehensive analysis combining all AI/ML components
        
        Args:
            prices: List of closing prices
            volumes: List of trading volumes (optional)
            highs: List of high prices (optional)
            lows: List of low prices (optional)
            market_data: Additional market data (optional)
            risk_tolerance: 'conservative', 'moderate', or 'aggressive'
        
        Returns:
            EnhancedAnalysisResult with all analysis components
        """
        try:
            if len(prices) < 10:
                return self._create_insufficient_data_result("Need at least 10 data points")
            
            # 1. Traditional Quantitative Metrics
            traditional_metrics = self._calculate_traditional_metrics(prices, volumes)
            
            # 2. Pattern Recognition Analysis
            pattern_analysis = self._perform_pattern_analysis(prices, highs, lows, volumes)
            
            # 3. Sentiment Analysis
            sentiment_analysis = self._perform_sentiment_analysis(prices, volumes, market_data)
            
            # 4. Predictive Analysis
            predictive_analysis = self._perform_predictive_analysis(prices, market_data)
            
            # 5. Enhanced Risk Assessment
            risk_assessment = self._perform_enhanced_risk_assessment(
                prices, volumes, traditional_metrics, sentiment_analysis, risk_tolerance
            )
            
            # 6. Generate Trading Signals
            trading_signals = self._generate_trading_signals(
                traditional_metrics, pattern_analysis, sentiment_analysis, 
                predictive_analysis, risk_assessment, risk_tolerance
            )
            
            # 7. Calculate Overall Score and Recommendation
            overall_score, confidence, recommendation = self._calculate_overall_assessment(
                traditional_metrics, pattern_analysis, sentiment_analysis,
                predictive_analysis, risk_assessment, trading_signals
            )
            
            return EnhancedAnalysisResult(
                traditional_metrics=traditional_metrics,
                pattern_analysis=pattern_analysis,
                sentiment_analysis=sentiment_analysis,
                predictive_analysis=predictive_analysis,
                risk_assessment=risk_assessment,
                trading_signals=trading_signals,
                overall_score=overall_score,
                confidence=confidence,
                recommendation=recommendation
            )
            
        except Exception as e:
            self.logger.error(f"Error in comprehensive analysis: {str(e)}")
            return self._create_error_result(str(e))
    
    def _calculate_traditional_metrics(self, prices: List[float], volumes: List[float] = None) -> Dict:
        """Calculate traditional quantitative finance metrics"""
        try:
            prices = np.array(prices)
            
            # Basic return calculations
            returns = np.diff(np.log(prices))
            
            # Core metrics
            metrics = {
                'current_price': float(prices[-1]),
                'price_change': float((prices[-1] - prices[-2]) / prices[-2]) if len(prices) > 1 else 0.0,
                'daily_returns': returns.tolist(),
                'annualized_return': float((1 + np.mean(returns)) ** 252 - 1),
                'volatility': float(np.std(returns) * np.sqrt(252)),
                'sharpe_ratio': float(np.mean(returns) / np.std(returns) * np.sqrt(252)) if np.std(returns) > 0 else 0.0,
                'max_drawdown': self._calculate_max_drawdown(prices),
                'var_95': float(np.percentile(returns, 5)),
                'cvar_95': float(np.mean(returns[returns <= np.percentile(returns, 5)])) if len(returns) > 0 else 0.0
            }
            
            # Technical indicators
            if len(prices) >= 20:
                metrics['sma_20'] = float(np.mean(prices[-20:]))
                metrics['price_vs_sma20'] = float((prices[-1] - metrics['sma_20']) / metrics['sma_20'])
            
            if len(prices) >= 50:
                metrics['sma_50'] = float(np.mean(prices[-50:]))
                metrics['price_vs_sma50'] = float((prices[-1] - metrics['sma_50']) / metrics['sma_50'])
            
            # RSI
            if len(prices) >= 14:
                metrics['rsi'] = self._calculate_rsi(prices)
            
            # Volume metrics
            if volumes is not None and len(volumes) >= 10:
                volumes = np.array(volumes)
                metrics['avg_volume'] = float(np.mean(volumes))
                metrics['volume_trend'] = float((volumes[-1] - np.mean(volumes[-10:])) / np.mean(volumes[-10:]))
            
            return metrics
            
        except Exception as e:
            self.logger.error(f"Error calculating traditional metrics: {str(e)}")
            return {'error': str(e)}
    
    def _perform_pattern_analysis(self, prices: List[float], highs: List[float] = None, 
                                 lows: List[float] = None, volumes: List[float] = None) -> Dict:
        """Perform technical pattern analysis"""
        try:
            if analyze_stock_patterns is not None:
                return analyze_stock_patterns(prices, highs, lows, volumes)
            else:
                # Fallback pattern analysis
                return self._fallback_pattern_analysis(prices)
        except Exception as e:
            self.logger.error(f"Error in pattern analysis: {str(e)}")
            return {'patterns': [], 'support_resistance': {}, 'summary': {'error': str(e)}}
    
    def _perform_sentiment_analysis(self, prices: List[float], volumes: List[float] = None, 
                                   market_data: Dict = None) -> Dict:
        """Perform market sentiment analysis"""
        try:
            if analyze_market_sentiment is not None:
                return analyze_market_sentiment(prices, volumes, market_data)
            else:
                # Fallback sentiment analysis
                return self._fallback_sentiment_analysis(prices)
        except Exception as e:
            self.logger.error(f"Error in sentiment analysis: {str(e)}")
            return {'sentiment_score': 0.0, 'confidence': 0.0, 'interpretation': 'neutral'}
    
    def _perform_predictive_analysis(self, prices: List[float], market_data: Dict = None) -> Dict:
        """Perform predictive modeling analysis"""
        try:
            results = {}
            
            if predict_price_movement is not None:
                results['price_prediction'] = predict_price_movement(prices)
            else:
                results['price_prediction'] = self._fallback_price_prediction(prices)
            
            if predict_volatility is not None:
                results['volatility_prediction'] = predict_volatility(prices)
            else:
                results['volatility_prediction'] = self._fallback_volatility_prediction(prices)
            
            if predict_market_regime is not None:
                results['regime_prediction'] = predict_market_regime(prices)
            else:
                results['regime_prediction'] = self._fallback_regime_prediction(prices)
            
            return results
            
        except Exception as e:
            self.logger.error(f"Error in predictive analysis: {str(e)}")
            return {'error': str(e)}
    
    def _perform_enhanced_risk_assessment(self, prices: List[float], volumes: List[float] = None,
                                        traditional_metrics: Dict = None, sentiment_analysis: Dict = None,
                                        risk_tolerance: str = 'moderate') -> Dict:
        """Perform enhanced risk assessment"""
        try:
            prices = np.array(prices)
            returns = np.diff(np.log(prices))
            
            risk_metrics = {
                'portfolio_risk_score': 0.5,  # Default neutral
                'market_risk_level': 'medium',
                'liquidity_risk': 'low',
                'volatility_risk': 'medium',
                'tail_risk': 'low',
                'overall_risk_rating': 'medium'
            }
            
            # Calculate volatility risk
            if len(returns) >= 20:
                current_vol = np.std(returns[-20:]) * np.sqrt(252)
                historical_vol = np.std(returns) * np.sqrt(252)
                
                vol_ratio = current_vol / historical_vol if historical_vol > 0 else 1.0
                
                if vol_ratio > 1.5:
                    risk_metrics['volatility_risk'] = 'high'
                    risk_metrics['portfolio_risk_score'] += 0.2
                elif vol_ratio < 0.7:
                    risk_metrics['volatility_risk'] = 'low'
                    risk_metrics['portfolio_risk_score'] -= 0.1
            
            # Incorporate sentiment risk
            if sentiment_analysis and 'sentiment_score' in sentiment_analysis:
                sentiment_score = sentiment_analysis['sentiment_score']
                if sentiment_score < -0.5:
                    risk_metrics['market_risk_level'] = 'high'
                    risk_metrics['portfolio_risk_score'] += 0.2
                elif sentiment_score > 0.5:
                    risk_metrics['market_risk_level'] = 'low'
                    risk_metrics['portfolio_risk_score'] -= 0.1
            
            # Tail risk assessment
            if len(returns) >= 50:
                var_95 = np.percentile(returns, 5)
                if var_95 < -0.05:  # More than 5% daily loss potential
                    risk_metrics['tail_risk'] = 'high'
                    risk_metrics['portfolio_risk_score'] += 0.15
                elif var_95 > -0.02:  # Less than 2% daily loss potential
                    risk_metrics['tail_risk'] = 'low'
                    risk_metrics['portfolio_risk_score'] -= 0.05
            
            # Adjust for risk tolerance
            tolerance_settings = self.risk_levels.get(risk_tolerance, self.risk_levels['moderate'])
            risk_metrics['max_acceptable_risk'] = tolerance_settings['max_risk']
            risk_metrics['min_confidence_required'] = tolerance_settings['min_confidence']
            
            # Overall risk rating
            portfolio_risk = max(0, min(1, risk_metrics['portfolio_risk_score']))
            
            if portfolio_risk > 0.7:
                risk_metrics['overall_risk_rating'] = 'high'
            elif portfolio_risk < 0.3:
                risk_metrics['overall_risk_rating'] = 'low'
            else:
                risk_metrics['overall_risk_rating'] = 'medium'
            
            risk_metrics['portfolio_risk_score'] = float(portfolio_risk)
            
            return risk_metrics
            
        except Exception as e:
            self.logger.error(f"Error in risk assessment: {str(e)}")
            return {'error': str(e)}
    
    def _generate_trading_signals(self, traditional_metrics: Dict, pattern_analysis: Dict,
                                sentiment_analysis: Dict, predictive_analysis: Dict,
                                risk_assessment: Dict, risk_tolerance: str) -> List[Dict]:
        """Generate actionable trading signals"""
        signals = []
        
        try:
            current_price = traditional_metrics.get('current_price', 0)
            if current_price == 0:
                return signals
            
            # Signal from traditional metrics
            if 'sharpe_ratio' in traditional_metrics and traditional_metrics['sharpe_ratio'] > 1.0:
                signals.append({
                    'type': 'BUY',
                    'source': 'traditional_metrics',
                    'reason': f"Strong Sharpe ratio: {traditional_metrics['sharpe_ratio']:.2f}",
                    'confidence': 0.7,
                    'target_price': current_price * 1.05,
                    'stop_loss': current_price * 0.95
                })
            
            # Signal from patterns
            if pattern_analysis.get('patterns'):
                for pattern in pattern_analysis['patterns']:
                    if pattern.get('confidence', 0) > 0.7:
                        signal_type = 'BUY' if pattern.get('direction') == 'bullish' else 'SELL'
                        signals.append({
                            'type': signal_type,
                            'source': 'pattern_recognition',
                            'reason': f"{pattern.get('type', 'Unknown')} pattern detected",
                            'confidence': pattern.get('confidence', 0.5),
                            'target_price': pattern.get('target_price', current_price),
                            'stop_loss': pattern.get('stop_loss', current_price)
                        })
            
            # Signal from sentiment
            if sentiment_analysis.get('sentiment_score') is not None:
                sentiment_score = sentiment_analysis['sentiment_score']
                sentiment_confidence = sentiment_analysis.get('confidence', 0.5)
                
                if sentiment_score > 0.6 and sentiment_confidence > 0.6:
                    signals.append({
                        'type': 'BUY',
                        'source': 'sentiment_analysis',
                        'reason': f"Strong bullish sentiment: {sentiment_score:.2f}",
                        'confidence': sentiment_confidence,
                        'target_price': current_price * (1 + sentiment_score * 0.1),
                        'stop_loss': current_price * 0.97
                    })
                elif sentiment_score < -0.6 and sentiment_confidence > 0.6:
                    signals.append({
                        'type': 'SELL',
                        'source': 'sentiment_analysis',
                        'reason': f"Strong bearish sentiment: {sentiment_score:.2f}",
                        'confidence': sentiment_confidence,
                        'target_price': current_price * (1 + sentiment_score * 0.1),
                        'stop_loss': current_price * 1.03
                    })
            
            # Signal from predictions
            if predictive_analysis.get('price_prediction'):
                price_pred = predictive_analysis['price_prediction']
                if price_pred.get('prediction') and price_pred.get('confidence', 0) > 0.6:
                    prediction = price_pred['prediction']
                    confidence = price_pred['confidence']
                    
                    if prediction > 0.03:  # Predicted 3%+ gain
                        signals.append({
                            'type': 'BUY',
                            'source': 'ml_prediction',
                            'reason': f"ML predicts {prediction*100:.1f}% gain",
                            'confidence': confidence,
                            'target_price': current_price * (1 + prediction),
                            'stop_loss': current_price * 0.95
                        })
                    elif prediction < -0.03:  # Predicted 3%+ loss
                        signals.append({
                            'type': 'SELL',
                            'source': 'ml_prediction',
                            'reason': f"ML predicts {abs(prediction)*100:.1f}% decline",
                            'confidence': confidence,
                            'target_price': current_price * (1 + prediction),
                            'stop_loss': current_price * 1.05
                        })
            
            # Filter signals by risk tolerance
            tolerance_settings = self.risk_levels.get(risk_tolerance, self.risk_levels['moderate'])
            min_confidence = tolerance_settings['min_confidence']
            
            filtered_signals = [s for s in signals if s.get('confidence', 0) >= min_confidence]
            
            # Sort by confidence
            filtered_signals.sort(key=lambda x: x.get('confidence', 0), reverse=True)
            
            return filtered_signals[:5]  # Return top 5 signals
            
        except Exception as e:
            self.logger.error(f"Error generating trading signals: {str(e)}")
            return []
    
    def _calculate_overall_assessment(self, traditional_metrics: Dict, pattern_analysis: Dict,
                                    sentiment_analysis: Dict, predictive_analysis: Dict,
                                    risk_assessment: Dict, trading_signals: List[Dict]) -> Tuple[float, float, str]:
        """Calculate overall assessment score, confidence, and recommendation"""
        try:
            scores = []
            confidences = []
            
            # Traditional metrics score
            if 'sharpe_ratio' in traditional_metrics:
                sharpe = traditional_metrics['sharpe_ratio']
                trad_score = min(max((sharpe + 1) / 3, 0), 1)  # Normalize Sharpe ratio
                scores.append(trad_score)
                confidences.append(0.8)
            
            # Pattern analysis score
            if pattern_analysis.get('summary', {}).get('avg_confidence'):
                pattern_confidence = pattern_analysis['summary']['avg_confidence']
                bullish_patterns = pattern_analysis['summary'].get('bullish_patterns', 0)
                bearish_patterns = pattern_analysis['summary'].get('bearish_patterns', 0)
                
                if bullish_patterns > bearish_patterns:
                    pattern_score = 0.5 + pattern_confidence * 0.5
                elif bearish_patterns > bullish_patterns:
                    pattern_score = 0.5 - pattern_confidence * 0.5
                else:
                    pattern_score = 0.5
                
                scores.append(pattern_score)
                confidences.append(pattern_confidence)
            
            # Sentiment score
            if sentiment_analysis.get('sentiment_score') is not None:
                sentiment_score = sentiment_analysis['sentiment_score']
                sentiment_confidence = sentiment_analysis.get('confidence', 0.5)
                
                # Normalize sentiment score to 0-1
                normalized_sentiment = (sentiment_score + 1) / 2
                scores.append(normalized_sentiment)
                confidences.append(sentiment_confidence)
            
            # Predictive analysis score
            if predictive_analysis.get('price_prediction', {}).get('prediction') is not None:
                price_pred = predictive_analysis['price_prediction']['prediction']
                pred_confidence = predictive_analysis['price_prediction'].get('confidence', 0.5)
                
                # Normalize prediction to 0-1 (assuming predictions are in [-0.2, 0.2] range)
                normalized_pred = min(max((price_pred + 0.2) / 0.4, 0), 1)
                scores.append(normalized_pred)
                confidences.append(pred_confidence)
            
            # Calculate weighted average
            if scores and confidences:
                weights = np.array(confidences)
                weights = weights / np.sum(weights)
                overall_score = np.average(scores, weights=weights)
                overall_confidence = np.mean(confidences)
            else:
                overall_score = 0.5
                overall_confidence = 0.3
            
            # Generate recommendation
            risk_level = risk_assessment.get('overall_risk_rating', 'medium')
            signal_consensus = self._analyze_signal_consensus(trading_signals)
            
            if overall_score > 0.7 and overall_confidence > 0.6 and risk_level != 'high':
                recommendation = "STRONG BUY - High confidence bullish signals with acceptable risk"
            elif overall_score > 0.6 and overall_confidence > 0.5:
                recommendation = "BUY - Positive signals indicate upward potential"
            elif overall_score < 0.3 and overall_confidence > 0.6:
                recommendation = "SELL - Strong bearish signals detected"
            elif overall_score < 0.4 and overall_confidence > 0.5:
                recommendation = "WEAK SELL - Negative indicators suggest caution"
            elif risk_level == 'high':
                recommendation = "HOLD - High risk environment, wait for better conditions"
            else:
                recommendation = "HOLD - Mixed signals, monitor for clearer direction"
            
            return float(overall_score), float(overall_confidence), recommendation
            
        except Exception as e:
            self.logger.error(f"Error calculating overall assessment: {str(e)}")
            return 0.5, 0.3, "HOLD - Assessment error, proceed with caution"
    
    # Helper methods
    def _calculate_max_drawdown(self, prices: np.ndarray) -> float:
        """Calculate maximum drawdown"""
        try:
            cumulative_returns = np.cumprod(1 + np.diff(prices) / prices[:-1])
            running_max = np.maximum.accumulate(cumulative_returns)
            drawdown = (cumulative_returns - running_max) / running_max
            return float(np.min(drawdown))
        except Exception:
            return 0.0
    
    def _calculate_rsi(self, prices: np.ndarray, period: int = 14) -> float:
        """Calculate RSI"""
        try:
            if len(prices) < period + 1:
                return 50.0
            
            deltas = np.diff(prices)
            gains = np.where(deltas > 0, deltas, 0)
            losses = np.where(deltas < 0, -deltas, 0)
            
            avg_gain = np.mean(gains[-period:])
            avg_loss = np.mean(losses[-period:])
            
            if avg_loss == 0:
                return 100.0
            
            rs = avg_gain / avg_loss
            rsi = 100 - (100 / (1 + rs))
            
            return float(rsi)
        except Exception:
            return 50.0
    
    def _analyze_signal_consensus(self, trading_signals: List[Dict]) -> Dict:
        """Analyze consensus among trading signals"""
        if not trading_signals:
            return {'consensus': 'none', 'strength': 0.0}
        
        buy_signals = len([s for s in trading_signals if s.get('type') == 'BUY'])
        sell_signals = len([s for s in trading_signals if s.get('type') == 'SELL'])
        
        total_signals = len(trading_signals)
        
        if buy_signals > sell_signals * 2:
            return {'consensus': 'bullish', 'strength': buy_signals / total_signals}
        elif sell_signals > buy_signals * 2:
            return {'consensus': 'bearish', 'strength': sell_signals / total_signals}
        else:
            return {'consensus': 'mixed', 'strength': 0.5}
    
    # Fallback methods when ML modules are not available
    def _fallback_pattern_analysis(self, prices: List[float]) -> Dict:
        """Fallback pattern analysis"""
        try:
            prices = np.array(prices)
            
            # Simple trend analysis
            if len(prices) >= 20:
                recent_trend = (prices[-1] - prices[-20]) / prices[-20]
                if recent_trend > 0.05:
                    pattern_direction = 'bullish'
                    confidence = min(recent_trend * 10, 0.8)
                elif recent_trend < -0.05:
                    pattern_direction = 'bearish'
                    confidence = min(abs(recent_trend) * 10, 0.8)
                else:
                    pattern_direction = 'neutral'
                    confidence = 0.3
                
                return {
                    'patterns': [{
                        'type': 'Trend Analysis',
                        'direction': pattern_direction,
                        'confidence': confidence,
                        'target_price': prices[-1] * (1 + recent_trend * 0.5),
                        'stop_loss': prices[-1] * (1 - abs(recent_trend) * 0.3)
                    }],
                    'support_resistance': {},
                    'summary': {
                        'total_patterns': 1,
                        'bullish_patterns': 1 if pattern_direction == 'bullish' else 0,
                        'bearish_patterns': 1 if pattern_direction == 'bearish' else 0,
                        'avg_confidence': confidence
                    }
                }
            
            return {'patterns': [], 'support_resistance': {}, 'summary': {'total_patterns': 0}}
            
        except Exception as e:
            return {'patterns': [], 'support_resistance': {}, 'summary': {'error': str(e)}}
    
    def _fallback_sentiment_analysis(self, prices: List[float]) -> Dict:
        """Fallback sentiment analysis"""
        try:
            prices = np.array(prices)
            
            if len(prices) >= 10:
                # Simple momentum-based sentiment
                short_momentum = (prices[-1] - prices[-5]) / prices[-5] if len(prices) >= 5 else 0
                long_momentum = (prices[-1] - prices[-10]) / prices[-10]
                
                sentiment_score = (short_momentum * 0.6 + long_momentum * 0.4)
                sentiment_score = max(-1, min(1, sentiment_score * 10))  # Normalize
                
                confidence = min(abs(sentiment_score) + 0.3, 0.8)
                
                if sentiment_score > 0.1:
                    interpretation = 'bullish'
                elif sentiment_score < -0.1:
                    interpretation = 'bearish'
                else:
                    interpretation = 'neutral'
                
                return {
                    'sentiment_score': float(sentiment_score),
                    'confidence': float(confidence),
                    'interpretation': interpretation,
                    'summary': {
                        'overall_sentiment': sentiment_score,
                        'confidence_level': confidence,
                        'recommendation': f"Fallback sentiment: {interpretation}"
                    }
                }
            
            return {
                'sentiment_score': 0.0,
                'confidence': 0.3,
                'interpretation': 'neutral',
                'summary': {'recommendation': 'Insufficient data for sentiment analysis'}
            }
            
        except Exception as e:
            return {
                'sentiment_score': 0.0,
                'confidence': 0.0,
                'interpretation': 'neutral',
                'summary': {'error': str(e)}
            }
    
    def _fallback_price_prediction(self, prices: List[float]) -> Dict:
        """Fallback price prediction"""
        try:
            prices = np.array(prices)
            
            if len(prices) >= 5:
                # Simple momentum extrapolation
                recent_change = (prices[-1] - prices[-5]) / prices[-5]
                prediction = recent_change * 0.5  # Assume 50% continuation
                
                confidence = min(abs(recent_change) * 5 + 0.2, 0.7)
                
                return {
                    'prediction': float(prediction),
                    'confidence': float(confidence),
                    'method': 'momentum_extrapolation'
                }
            
            return {'prediction': 0.0, 'confidence': 0.1, 'method': 'insufficient_data'}
            
        except Exception as e:
            return {'prediction': 0.0, 'confidence': 0.0, 'method': 'error'}
    
    def _fallback_volatility_prediction(self, prices: List[float]) -> Dict:
        """Fallback volatility prediction"""
        try:
            prices = np.array(prices)
            
            if len(prices) >= 20:
                returns = np.diff(np.log(prices))
                current_vol = np.std(returns) * np.sqrt(252)
                
                return {
                    'prediction': float(current_vol),
                    'confidence': 0.6,
                    'method': 'historical_volatility'
                }
            
            return {'prediction': 0.2, 'confidence': 0.1, 'method': 'default'}
            
        except Exception as e:
            return {'prediction': 0.2, 'confidence': 0.0, 'method': 'error'}
    
    def _fallback_regime_prediction(self, prices: List[float]) -> Dict:
        """Fallback regime prediction"""
        try:
            prices = np.array(prices)
            
            if len(prices) >= 50:
                long_trend = (prices[-1] - prices[-50]) / prices[-50]
                volatility = np.std(np.diff(prices[-20:]) / prices[-20:-1])
                
                if long_trend > 0.1 and volatility < 0.02:
                    regime = 'bull'
                    confidence = 0.7
                elif long_trend < -0.1 and volatility > 0.03:
                    regime = 'bear'
                    confidence = 0.7
                else:
                    regime = 'sideways'
                    confidence = 0.5
                
                return {
                    'regime': regime,
                    'confidence': confidence,
                    'method': 'trend_volatility_analysis'
                }
            
            return {'regime': 'unknown', 'confidence': 0.0, 'method': 'insufficient_data'}
            
        except Exception as e:
            return {'regime': 'unknown', 'confidence': 0.0, 'method': 'error'}
    
    def _create_insufficient_data_result(self, reason: str) -> EnhancedAnalysisResult:
        """Create result for insufficient data"""
        return EnhancedAnalysisResult(
            traditional_metrics={'error': reason},
            pattern_analysis={'patterns': [], 'summary': {}},
            sentiment_analysis={'sentiment_score': 0.0, 'confidence': 0.0},
            predictive_analysis={'error': reason},
            risk_assessment={'overall_risk_rating': 'unknown'},
            trading_signals=[],
            overall_score=0.5,
            confidence=0.0,
            recommendation=f"HOLD - {reason}"
        )
    
    def _create_error_result(self, error_msg: str) -> EnhancedAnalysisResult:
        """Create result for errors"""
        return EnhancedAnalysisResult(
            traditional_metrics={'error': error_msg},
            pattern_analysis={'error': error_msg},
            sentiment_analysis={'error': error_msg},
            predictive_analysis={'error': error_msg},
            risk_assessment={'error': error_msg},
            trading_signals=[],
            overall_score=0.5,
            confidence=0.0,
            recommendation=f"HOLD - Analysis error: {error_msg}"
        )

# Global enhanced engine instance
enhanced_engine = EnhancedQuantFinanceEngine()

def analyze_stock_with_ai(prices: List[float], 
                         volumes: List[float] = None,
                         highs: List[float] = None,
                         lows: List[float] = None,
                         market_data: Dict = None,
                         risk_tolerance: str = 'moderate') -> Dict:
    """
    Main interface for comprehensive AI-enhanced stock analysis
    
    Args:
        prices: List of closing prices
        volumes: List of trading volumes (optional)
        highs: List of high prices (optional)  
        lows: List of low prices (optional)
        market_data: Additional market data (optional)
        risk_tolerance: 'conservative', 'moderate', or 'aggressive'
    
    Returns:
        Comprehensive analysis results as dictionary
    """
    result = enhanced_engine.comprehensive_analysis(
        prices, volumes, highs, lows, market_data, risk_tolerance
    )
    
    # Convert to dictionary for API responses
    return {
        'traditional_metrics': result.traditional_metrics,
        'pattern_analysis': result.pattern_analysis,
        'sentiment_analysis': result.sentiment_analysis,
        'predictive_analysis': result.predictive_analysis,
        'risk_assessment': result.risk_assessment,
        'trading_signals': result.trading_signals,
        'overall_assessment': {
            'score': result.overall_score,
            'confidence': result.confidence,
            'recommendation': result.recommendation
        },
        'metadata': {
            'analysis_timestamp': datetime.now().isoformat(),
            'data_points': len(prices),
            'risk_tolerance': risk_tolerance,
            'engine_version': '1.0.0'
        }
    }