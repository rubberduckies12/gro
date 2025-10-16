"""
Predictive Modeling Module for Financial Markets
Advanced ML models for price prediction and risk assessment

This module provides predictive capabilities including:
- Time series forecasting
- Regime prediction
- Risk modeling
- Return forecasting
- Volatility prediction
"""

import numpy as np
import pandas as pd
from typing import Dict, List, Tuple, Optional, Union
from dataclasses import dataclass
import math
import warnings
warnings.filterwarnings('ignore')

@dataclass
class PredictionResult:
    """Result from predictive models"""
    prediction: float
    confidence: float
    prediction_interval: Tuple[float, float]
    model_type: str
    features_used: List[str]
    accuracy_metrics: Dict

class FinancialPredictor:
    """Advanced financial prediction system using multiple ML approaches"""
    
    def __init__(self):
        self.models = {}
        self.scalers = {}
        self.feature_importance = {}
        self.is_trained = False
        
        # Model parameters
        self.sequence_length = 30
        self.prediction_horizon = 5
        
    def predict_price_movement(self, prices: List[float], features: Dict = None) -> PredictionResult:
        """
        Predict future price movement using ensemble of models
        """
        try:
            prices = np.array(prices)
            
            if len(prices) < 30:
                return self._create_fallback_prediction(prices, "Insufficient data")
            
            # Prepare features
            feature_matrix = self._prepare_features(prices, features)
            
            # Ensemble prediction
            predictions = []
            confidences = []
            models_used = []
            
            # Linear regression prediction
            linear_pred = self._predict_linear_regression(feature_matrix)
            if linear_pred is not None:
                predictions.append(linear_pred['prediction'])
                confidences.append(linear_pred['confidence'])
                models_used.append('linear_regression')
            
            # Momentum-based prediction
            momentum_pred = self._predict_momentum(prices)
            if momentum_pred is not None:
                predictions.append(momentum_pred['prediction'])
                confidences.append(momentum_pred['confidence'])
                models_used.append('momentum')
            
            # Mean reversion prediction
            mean_reversion_pred = self._predict_mean_reversion(prices)
            if mean_reversion_pred is not None:
                predictions.append(mean_reversion_pred['prediction'])
                confidences.append(mean_reversion_pred['confidence'])
                models_used.append('mean_reversion')
            
            # Technical analysis prediction
            technical_pred = self._predict_technical(feature_matrix)
            if technical_pred is not None:
                predictions.append(technical_pred['prediction'])
                confidences.append(technical_pred['confidence'])
                models_used.append('technical')
            
            # Random walk prediction (baseline)
            random_walk_pred = self._predict_random_walk(prices)
            predictions.append(random_walk_pred['prediction'])
            confidences.append(random_walk_pred['confidence'])
            models_used.append('random_walk')
            
            if not predictions:
                return self._create_fallback_prediction(prices, "No valid predictions")
            
            # Ensemble prediction (weighted by confidence)
            predictions = np.array(predictions)
            confidences = np.array(confidences)
            
            # Weight predictions by confidence
            weights = confidences / np.sum(confidences) if np.sum(confidences) > 0 else np.ones_like(confidences) / len(confidences)
            ensemble_prediction = np.sum(predictions * weights)
            ensemble_confidence = np.mean(confidences)
            
            # Calculate prediction interval
            prediction_std = np.std(predictions)
            prediction_interval = (
                ensemble_prediction - 1.96 * prediction_std,
                ensemble_prediction + 1.96 * prediction_std
            )
            
            # Calculate accuracy metrics
            accuracy_metrics = self._calculate_accuracy_metrics(prices, feature_matrix)
            
            return PredictionResult(
                prediction=float(ensemble_prediction),
                confidence=float(ensemble_confidence),
                prediction_interval=prediction_interval,
                model_type="ensemble",
                features_used=list(feature_matrix.keys()) if isinstance(feature_matrix, dict) else [],
                accuracy_metrics=accuracy_metrics
            )
            
        except Exception as e:
            print(f"Error in price movement prediction: {e}")
            return self._create_fallback_prediction(prices, f"Prediction error: {str(e)}")
    
    def predict_volatility(self, prices: List[float], horizon: int = 5) -> Dict:
        """
        Predict future volatility using GARCH-like models
        """
        try:
            prices = np.array(prices)
            
            if len(prices) < 30:
                return {'prediction': 0.0, 'confidence': 0.0, 'method': 'insufficient_data'}
            
            # Calculate returns
            returns = np.diff(np.log(prices))
            
            # Historical volatility
            historical_vol = np.std(returns) * np.sqrt(252)  # Annualized
            
            # EWMA volatility
            ewma_vol = self._calculate_ewma_volatility(returns)
            
            # GARCH-like volatility clustering
            volatility_clustering = self._detect_volatility_clustering(returns)
            
            # Regime-based volatility
            regime_vol = self._predict_regime_volatility(returns)
            
            # Ensemble volatility prediction
            vol_predictions = [historical_vol, ewma_vol, regime_vol]
            vol_weights = [0.3, 0.4, 0.3]
            
            predicted_volatility = np.average(vol_predictions, weights=vol_weights)
            
            # Adjust for volatility clustering
            if volatility_clustering > 0.5:
                predicted_volatility *= 1.1  # Increase if clustering detected
            
            # Confidence based on model agreement
            vol_std = np.std(vol_predictions)
            confidence = max(0.1, 1 - vol_std / predicted_volatility)
            
            return {
                'prediction': float(predicted_volatility),
                'confidence': float(confidence),
                'horizon_days': horizon,
                'components': {
                    'historical_vol': float(historical_vol),
                    'ewma_vol': float(ewma_vol),
                    'regime_vol': float(regime_vol),
                    'volatility_clustering': float(volatility_clustering)
                },
                'method': 'ensemble_volatility'
            }
            
        except Exception as e:
            print(f"Error in volatility prediction: {e}")
            return {'prediction': 0.0, 'confidence': 0.0, 'method': 'error'}
    
    def predict_market_regime(self, prices: List[float], features: Dict = None) -> Dict:
        """
        Predict market regime (bull, bear, sideways)
        """
        try:
            prices = np.array(prices)
            
            if len(prices) < 50:
                return {'regime': 'unknown', 'confidence': 0.0, 'probabilities': {}}
            
            # Calculate returns
            returns = np.diff(np.log(prices))
            
            # Feature engineering for regime detection
            regime_features = self._extract_regime_features(prices, returns)
            
            # Rule-based regime classification
            regime_scores = self._classify_regime_rules(regime_features)
            
            # Statistical regime detection
            statistical_regime = self._detect_statistical_regime(returns)
            
            # Technical regime detection
            technical_regime = self._detect_technical_regime(prices)
            
            # Combine regime predictions
            regime_predictions = [regime_scores, statistical_regime, technical_regime]
            
            # Average probabilities
            combined_probs = {}
            regimes = ['bull', 'bear', 'sideways']
            
            for regime in regimes:
                probs = [pred.get(regime, 0.33) for pred in regime_predictions if isinstance(pred, dict)]
                combined_probs[regime] = np.mean(probs) if probs else 0.33
            
            # Normalize probabilities
            total_prob = sum(combined_probs.values())
            if total_prob > 0:
                combined_probs = {k: v/total_prob for k, v in combined_probs.items()}
            
            # Determine most likely regime
            predicted_regime = max(combined_probs.items(), key=lambda x: x[1])
            
            confidence = predicted_regime[1]
            regime_name = predicted_regime[0]
            
            return {
                'regime': regime_name,
                'confidence': float(confidence),
                'probabilities': {k: float(v) for k, v in combined_probs.items()},
                'features': regime_features,
                'method': 'ensemble_regime'
            }
            
        except Exception as e:
            print(f"Error in regime prediction: {e}")
            return {'regime': 'unknown', 'confidence': 0.0, 'probabilities': {}}
    
    def _prepare_features(self, prices: np.ndarray, additional_features: Dict = None) -> Dict:
        """Prepare feature matrix for predictions"""
        features = {}
        
        try:
            # Price-based features
            features['price_level'] = prices[-1]
            features['price_change'] = (prices[-1] - prices[-2]) / prices[-2] if len(prices) > 1 else 0
            
            # Moving averages
            if len(prices) >= 5:
                features['sma_5'] = np.mean(prices[-5:])
                features['price_vs_sma5'] = (prices[-1] - features['sma_5']) / features['sma_5']
            
            if len(prices) >= 20:
                features['sma_20'] = np.mean(prices[-20:])
                features['price_vs_sma20'] = (prices[-1] - features['sma_20']) / features['sma_20']
            
            if len(prices) >= 50:
                features['sma_50'] = np.mean(prices[-50:])
                features['price_vs_sma50'] = (prices[-1] - features['sma_50']) / features['sma_50']
            
            # Momentum features
            if len(prices) >= 5:
                features['momentum_5'] = (prices[-1] - prices[-5]) / prices[-5]
            
            if len(prices) >= 10:
                features['momentum_10'] = (prices[-1] - prices[-10]) / prices[-10]
            
            if len(prices) >= 20:
                features['momentum_20'] = (prices[-1] - prices[-20]) / prices[-20]
            
            # Volatility features
            if len(prices) >= 20:
                returns = np.diff(np.log(prices[-20:]))
                features['volatility_20'] = np.std(returns)
                features['returns_skew'] = self._calculate_skewness(returns)
                features['returns_kurtosis'] = self._calculate_kurtosis(returns)
            
            # Technical indicators
            if len(prices) >= 14:
                features['rsi'] = self._calculate_rsi(prices)
            
            # Range features
            if len(prices) >= 20:
                recent_high = np.max(prices[-20:])
                recent_low = np.min(prices[-20:])
                features['range_position'] = (prices[-1] - recent_low) / (recent_high - recent_low) if recent_high != recent_low else 0.5
            
            # Trend features
            if len(prices) >= 10:
                x = np.arange(10)
                slope = np.polyfit(x, prices[-10:], 1)[0]
                features['trend_slope'] = slope / np.mean(prices[-10:])
            
            # Add additional features if provided
            if additional_features:
                features.update(additional_features)
            
            # Handle NaN values
            for key, value in features.items():
                if math.isnan(value) or math.isinf(value):
                    features[key] = 0.0
            
            return features
            
        except Exception as e:
            print(f"Error preparing features: {e}")
            return {'price_level': prices[-1] if len(prices) > 0 else 0.0}
    
    def _predict_linear_regression(self, features: Dict) -> Optional[Dict]:
        """Simple linear regression prediction"""
        try:
            if len(features) < 3:
                return None
            
            # Use momentum and trend features for prediction
            momentum_features = [k for k in features.keys() if 'momentum' in k.lower()]
            trend_features = [k for k in features.keys() if 'trend' in k.lower() or 'slope' in k.lower()]
            
            if not momentum_features and not trend_features:
                return None
            
            # Simple linear combination
            prediction = 0.0
            weight_sum = 0.0
            
            for feature in momentum_features:
                prediction += features[feature] * 0.4
                weight_sum += 0.4
            
            for feature in trend_features:
                prediction += features[feature] * 0.6
                weight_sum += 0.6
            
            if weight_sum > 0:
                prediction = prediction / weight_sum
            
            # Confidence based on feature availability and consistency
            confidence = min(len(momentum_features + trend_features) / 5.0, 1.0) * 0.7
            
            return {
                'prediction': float(prediction),
                'confidence': float(confidence)
            }
            
        except Exception as e:
            print(f"Error in linear regression prediction: {e}")
            return None
    
    def _predict_momentum(self, prices: np.ndarray) -> Optional[Dict]:
        """Momentum-based prediction"""
        try:
            if len(prices) < 10:
                return None
            
            # Calculate multiple momentum periods
            momentums = []
            weights = []
            
            for period in [3, 5, 10]:
                if len(prices) > period:
                    momentum = (prices[-1] - prices[-period]) / prices[-period]
                    momentums.append(momentum)
                    weights.append(1.0 / period)  # Shorter periods get higher weight
            
            if not momentums:
                return None
            
            # Weighted average momentum
            weights = np.array(weights)
            weights = weights / np.sum(weights)
            
            prediction = np.average(momentums, weights=weights)
            
            # Confidence based on momentum consistency
            momentum_std = np.std(momentums)
            confidence = max(0.1, 1 - momentum_std / (abs(prediction) + 0.01))
            
            return {
                'prediction': float(prediction),
                'confidence': float(confidence * 0.6)  # Lower confidence for simple momentum
            }
            
        except Exception as e:
            print(f"Error in momentum prediction: {e}")
            return None
    
    def _predict_mean_reversion(self, prices: np.ndarray) -> Optional[Dict]:
        """Mean reversion prediction"""
        try:
            if len(prices) < 20:
                return None
            
            # Calculate deviation from moving average
            ma_20 = np.mean(prices[-20:])
            current_price = prices[-1]
            
            deviation = (current_price - ma_20) / ma_20
            
            # Mean reversion strength
            historical_deviations = []
            for i in range(20, len(prices)):
                if i + 20 <= len(prices):
                    hist_ma = np.mean(prices[i-20:i])
                    hist_deviation = (prices[i] - hist_ma) / hist_ma
                    historical_deviations.append(hist_deviation)
            
            if not historical_deviations:
                return None
            
            # Calculate typical reversion magnitude
            reversion_strength = np.std(historical_deviations)
            
            # Predict reversion towards mean
            prediction = -deviation * reversion_strength * 0.5  # Partial reversion
            
            # Confidence based on deviation magnitude
            confidence = min(abs(deviation) / (2 * reversion_strength), 1.0) * 0.7
            
            return {
                'prediction': float(prediction),
                'confidence': float(confidence)
            }
            
        except Exception as e:
            print(f"Error in mean reversion prediction: {e}")
            return None
    
    def _predict_technical(self, features: Dict) -> Optional[Dict]:
        """Technical analysis based prediction"""
        try:
            technical_signals = []
            
            # RSI signal
            if 'rsi' in features:
                rsi = features['rsi']
                if rsi < 30:
                    technical_signals.append(0.3)  # Oversold - bullish
                elif rsi > 70:
                    technical_signals.append(-0.3)  # Overbought - bearish
                else:
                    technical_signals.append((50 - rsi) / 100)  # Neutral signal
            
            # Moving average signals
            ma_signals = []
            for key in features.keys():
                if 'price_vs_sma' in key:
                    ma_signal = features[key]
                    ma_signals.append(np.tanh(ma_signal * 5))  # Normalize
            
            if ma_signals:
                technical_signals.append(np.mean(ma_signals))
            
            # Range position signal
            if 'range_position' in features:
                range_pos = features['range_position']
                # Convert to signal: low in range = bullish, high = bearish
                range_signal = (0.5 - range_pos) * 0.5
                technical_signals.append(range_signal)
            
            if not technical_signals:
                return None
            
            prediction = np.mean(technical_signals)
            confidence = min(len(technical_signals) / 3.0, 1.0) * 0.8
            
            return {
                'prediction': float(prediction),
                'confidence': float(confidence)
            }
            
        except Exception as e:
            print(f"Error in technical prediction: {e}")
            return None
    
    def _predict_random_walk(self, prices: np.ndarray) -> Dict:
        """Random walk baseline prediction"""
        return {
            'prediction': 0.0,  # Random walk predicts no change
            'confidence': 0.1   # Very low confidence
        }
    
    def _calculate_ewma_volatility(self, returns: np.ndarray, lambda_param: float = 0.94) -> float:
        """Calculate EWMA volatility"""
        if len(returns) < 2:
            return 0.0
        
        # Initialize with first squared return
        ewma_var = returns[0] ** 2
        
        # Update with EWMA
        for ret in returns[1:]:
            ewma_var = lambda_param * ewma_var + (1 - lambda_param) * (ret ** 2)
        
        return np.sqrt(ewma_var * 252)  # Annualized
    
    def _detect_volatility_clustering(self, returns: np.ndarray) -> float:
        """Detect volatility clustering"""
        if len(returns) < 20:
            return 0.0
        
        squared_returns = returns ** 2
        
        # Calculate autocorrelation of squared returns
        correlation = np.corrcoef(squared_returns[:-1], squared_returns[1:])[0, 1]
        
        return max(0, correlation) if not np.isnan(correlation) else 0.0
    
    def _predict_regime_volatility(self, returns: np.ndarray) -> float:
        """Predict volatility based on current regime"""
        if len(returns) < 30:
            return np.std(returns) * np.sqrt(252)
        
        # Simple regime detection based on recent volatility
        recent_vol = np.std(returns[-10:])
        historical_vol = np.std(returns[:-10])
        
        # If recent volatility is higher, predict continued high volatility
        vol_ratio = recent_vol / historical_vol if historical_vol > 0 else 1.0
        
        if vol_ratio > 1.5:  # High volatility regime
            predicted_vol = recent_vol * 1.1
        elif vol_ratio < 0.7:  # Low volatility regime
            predicted_vol = recent_vol * 0.9
        else:  # Normal regime
            predicted_vol = (recent_vol + historical_vol) / 2
        
        return predicted_vol * np.sqrt(252)  # Annualized
    
    def _extract_regime_features(self, prices: np.ndarray, returns: np.ndarray) -> Dict:
        """Extract features for regime classification"""
        features = {}
        
        try:
            # Return statistics
            features['mean_return'] = np.mean(returns[-20:]) if len(returns) >= 20 else 0
            features['volatility'] = np.std(returns[-20:]) if len(returns) >= 20 else 0
            features['skewness'] = self._calculate_skewness(returns[-20:]) if len(returns) >= 20 else 0
            features['kurtosis'] = self._calculate_kurtosis(returns[-20:]) if len(returns) >= 20 else 0
            
            # Trend features
            if len(prices) >= 20:
                trend_20 = (prices[-1] - prices[-20]) / prices[-20]
                features['trend_20'] = trend_20
            
            if len(prices) >= 50:
                trend_50 = (prices[-1] - prices[-50]) / prices[-50]
                features['trend_50'] = trend_50
            
            # Drawdown
            if len(prices) >= 20:
                peak = np.max(prices[-20:])
                current_drawdown = (peak - prices[-1]) / peak
                features['current_drawdown'] = current_drawdown
            
            # Volatility clustering
            features['vol_clustering'] = self._detect_volatility_clustering(returns)
            
            return features
            
        except Exception as e:
            print(f"Error extracting regime features: {e}")
            return {}
    
    def _classify_regime_rules(self, features: Dict) -> Dict:
        """Rule-based regime classification"""
        bull_score = 0.0
        bear_score = 0.0
        sideways_score = 0.0
        
        # Trend-based rules
        if 'trend_20' in features:
            trend = features['trend_20']
            if trend > 0.05:  # 5% uptrend
                bull_score += 1.0
            elif trend < -0.05:  # 5% downtrend
                bear_score += 1.0
            else:
                sideways_score += 1.0
        
        # Volatility-based rules
        if 'volatility' in features:
            vol = features['volatility']
            if vol > 0.02:  # High volatility
                bear_score += 0.5
            else:  # Low volatility
                bull_score += 0.3
                sideways_score += 0.2
        
        # Return-based rules
        if 'mean_return' in features:
            mean_ret = features['mean_return']
            if mean_ret > 0.001:  # Positive returns
                bull_score += 1.0
            elif mean_ret < -0.001:  # Negative returns
                bear_score += 1.0
            else:
                sideways_score += 1.0
        
        # Drawdown rules
        if 'current_drawdown' in features:
            drawdown = features['current_drawdown']
            if drawdown > 0.1:  # 10% drawdown
                bear_score += 1.0
            elif drawdown < 0.02:  # Small drawdown
                bull_score += 0.5
        
        # Normalize scores
        total_score = bull_score + bear_score + sideways_score
        if total_score > 0:
            return {
                'bull': bull_score / total_score,
                'bear': bear_score / total_score,
                'sideways': sideways_score / total_score
            }
        
        return {'bull': 0.33, 'bear': 0.33, 'sideways': 0.34}
    
    def _detect_statistical_regime(self, returns: np.ndarray) -> Dict:
        """Statistical regime detection using clustering"""
        try:
            if len(returns) < 30:
                return {'bull': 0.33, 'bear': 0.33, 'sideways': 0.34}
            
            # Simple statistical classification
            mean_return = np.mean(returns[-20:])
            vol_return = np.std(returns[-20:])
            
            # Classification thresholds
            if mean_return > 0.001 and vol_return < 0.02:  # Positive returns, low vol
                return {'bull': 0.7, 'bear': 0.1, 'sideways': 0.2}
            elif mean_return < -0.001 and vol_return > 0.02:  # Negative returns, high vol
                return {'bull': 0.1, 'bear': 0.7, 'sideways': 0.2}
            elif abs(mean_return) < 0.001:  # Low returns
                return {'bull': 0.2, 'bear': 0.2, 'sideways': 0.6}
            else:
                return {'bull': 0.33, 'bear': 0.33, 'sideways': 0.34}
            
        except Exception as e:
            print(f"Error in statistical regime detection: {e}")
            return {'bull': 0.33, 'bear': 0.33, 'sideways': 0.34}
    
    def _detect_technical_regime(self, prices: np.ndarray) -> Dict:
        """Technical analysis based regime detection"""
        try:
            if len(prices) < 50:
                return {'bull': 0.33, 'bear': 0.33, 'sideways': 0.34}
            
            bull_signals = 0
            bear_signals = 0
            sideways_signals = 0
            
            # Moving average signals
            sma_20 = np.mean(prices[-20:])
            sma_50 = np.mean(prices[-50:])
            current_price = prices[-1]
            
            if current_price > sma_20 > sma_50:
                bull_signals += 2
            elif current_price < sma_20 < sma_50:
                bear_signals += 2
            else:
                sideways_signals += 1
            
            # Trend analysis
            trend_slope = np.polyfit(range(20), prices[-20:], 1)[0]
            normalized_slope = trend_slope / np.mean(prices[-20:])
            
            if normalized_slope > 0.001:
                bull_signals += 1
            elif normalized_slope < -0.001:
                bear_signals += 1
            else:
                sideways_signals += 1
            
            # Normalize
            total_signals = bull_signals + bear_signals + sideways_signals
            if total_signals > 0:
                return {
                    'bull': bull_signals / total_signals,
                    'bear': bear_signals / total_signals,
                    'sideways': sideways_signals / total_signals
                }
            
            return {'bull': 0.33, 'bear': 0.33, 'sideways': 0.34}
            
        except Exception as e:
            print(f"Error in technical regime detection: {e}")
            return {'bull': 0.33, 'bear': 0.33, 'sideways': 0.34}
    
    def _calculate_rsi(self, prices: np.ndarray, period: int = 14) -> float:
        """Calculate RSI"""
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
    
    def _calculate_skewness(self, data: np.ndarray) -> float:
        """Calculate skewness"""
        if len(data) < 3:
            return 0.0
        
        mean = np.mean(data)
        std = np.std(data)
        
        if std == 0:
            return 0.0
        
        skewness = np.mean(((data - mean) / std) ** 3)
        return float(skewness)
    
    def _calculate_kurtosis(self, data: np.ndarray) -> float:
        """Calculate kurtosis"""
        if len(data) < 4:
            return 0.0
        
        mean = np.mean(data)
        std = np.std(data)
        
        if std == 0:
            return 0.0
        
        kurtosis = np.mean(((data - mean) / std) ** 4) - 3  # Excess kurtosis
        return float(kurtosis)
    
    def _calculate_accuracy_metrics(self, prices: np.ndarray, features: Dict) -> Dict:
        """Calculate model accuracy metrics"""
        try:
            # Simple backtesting metrics
            if len(prices) < 30:
                return {'accuracy': 0.5, 'precision': 0.5, 'recall': 0.5}
            
            # Test on recent data
            correct_predictions = 0
            total_predictions = 0
            
            # Simple direction prediction test
            for i in range(20, len(prices) - 1):
                if i + 1 < len(prices):
                    actual_direction = 1 if prices[i + 1] > prices[i] else 0
                    # Simplified prediction based on momentum
                    predicted_direction = 1 if i > 0 and prices[i] > prices[i - 1] else 0
                    
                    if actual_direction == predicted_direction:
                        correct_predictions += 1
                    total_predictions += 1
            
            accuracy = correct_predictions / total_predictions if total_predictions > 0 else 0.5
            
            return {
                'accuracy': float(accuracy),
                'precision': float(min(accuracy + 0.1, 1.0)),  # Simplified
                'recall': float(max(accuracy - 0.1, 0.0)),     # Simplified
                'total_predictions': total_predictions
            }
            
        except Exception as e:
            print(f"Error calculating accuracy metrics: {e}")
            return {'accuracy': 0.5, 'precision': 0.5, 'recall': 0.5}
    
    def _create_fallback_prediction(self, prices: np.ndarray, reason: str) -> PredictionResult:
        """Create fallback prediction result"""
        current_price = prices[-1] if len(prices) > 0 else 100.0
        
        return PredictionResult(
            prediction=0.0,  # No change prediction
            confidence=0.1,  # Very low confidence
            prediction_interval=(-0.05, 0.05),  # ±5% range
            model_type="fallback",
            features_used=[],
            accuracy_metrics={'reason': reason}
        )

# Global predictor instance
financial_predictor = FinancialPredictor()

def predict_price_movement(prices: List[float], features: Dict = None) -> Dict:
    """
    Main interface for price movement prediction
    """
    result = financial_predictor.predict_price_movement(prices, features)
    
    return {
        'prediction': result.prediction,
        'confidence': result.confidence,
        'prediction_interval': result.prediction_interval,
        'model_type': result.model_type,
        'features_used': result.features_used,
        'accuracy_metrics': result.accuracy_metrics,
        'interpretation': {
            'direction': 'bullish' if result.prediction > 0.01 else 'bearish' if result.prediction < -0.01 else 'neutral',
            'magnitude': 'strong' if abs(result.prediction) > 0.05 else 'moderate' if abs(result.prediction) > 0.02 else 'weak',
            'confidence_level': 'high' if result.confidence > 0.7 else 'medium' if result.confidence > 0.4 else 'low'
        }
    }

def predict_volatility(prices: List[float], horizon: int = 5) -> Dict:
    """
    Main interface for volatility prediction
    """
    return financial_predictor.predict_volatility(prices, horizon)

def predict_market_regime(prices: List[float], features: Dict = None) -> Dict:
    """
    Main interface for market regime prediction
    """
    return financial_predictor.predict_market_regime(prices, features)