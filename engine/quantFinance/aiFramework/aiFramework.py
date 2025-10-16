"""
AI Framework for Quantitative Finance
Enhanced Pattern Recognition and ML Wrapper

This module provides ML-enhanced quantitative finance calculations with:
- Technical pattern recognition
- Sentiment analysis
- Regime detection
- Predictive modeling
- Risk assessment with AI
"""

# Import custom modules first to avoid dependency issues
try:
    from .pattern_recognition import analyze_stock_patterns, pattern_recognizer
    from .sentiment_analysis import analyze_market_sentiment, sentiment_analyzer
    from .predictive_models import predict_price_movement, predict_volatility, predict_market_regime, financial_predictor
except ImportError:
    # Fallback imports for standalone usage
    try:
        from pattern_recognition import analyze_stock_patterns, pattern_recognizer
        from sentiment_analysis import analyze_market_sentiment, sentiment_analyzer
        from predictive_models import predict_price_movement, predict_volatility, predict_market_regime, financial_predictor
    except ImportError:
        print("Warning: Could not import custom modules. Some features may not be available.")
        analyze_stock_patterns = None
        analyze_market_sentiment = None
        predict_price_movement = None

# Standard libraries
import numpy as np
import pandas as pd
import warnings
warnings.filterwarnings('ignore')

from typing import Dict, List, Tuple, Optional, Union
from dataclasses import dataclass
from datetime import datetime, timedelta
import logging
import math

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class PatternResult:
    """Results from pattern recognition analysis"""
    pattern_name: str
    confidence: float
    signal_strength: float
    predicted_direction: str
    risk_level: str
    features: Dict

@dataclass
class MLEnhancedMetrics:
    """ML-enhanced quantitative metrics"""
    traditional_metrics: Dict
    ml_predictions: Dict
    pattern_analysis: List[PatternResult]
    regime_detection: Dict
    risk_assessment: Dict

class QuantFinanceAI:
    """
    AI-Enhanced Quantitative Finance Engine
    Combines traditional quant methods with modern ML/AI techniques
    """
    
    def __init__(self):
        self.scaler = StandardScaler()
        self.pattern_models = {}
        self.regime_model = None
        self.lstm_model = None
        self.is_trained = False
        
        # Technical indicators cache
        self._indicators_cache = {}
        
        # Pattern recognition thresholds
        self.pattern_thresholds = {
            'head_shoulders': 0.85,
            'double_top': 0.80,
            'double_bottom': 0.80,
            'triangle': 0.75,
            'flag': 0.70,
            'wedge': 0.75,
            'support_resistance': 0.85
        }
        
        logger.info("QuantFinanceAI initialized successfully")
    
    def calculate_enhanced_returns(self, prices: List[float], volume: List[float] = None) -> Dict:
        """
        Calculate returns with ML enhancements
        """
        try:
            prices = np.array(prices)
            if len(prices) < 20:
                raise ValueError("Need at least 20 data points for ML analysis")
            
            # Traditional calculations
            returns = np.diff(np.log(prices))
            
            # ML enhancements
            df = pd.DataFrame({'price': prices})
            if volume is not None:
                df['volume'] = volume
            
            # Add technical indicators
            df = self._add_technical_indicators(df)
            
            # Pattern recognition
            patterns = self._detect_patterns(df)
            
            # Regime detection
            regime = self._detect_market_regime(returns)
            
            # ML-based return prediction
            predicted_returns = self._predict_returns(df)
            
            # Risk assessment with AI
            risk_metrics = self._assess_ml_risk(returns, df)
            
            return {
                'traditional_returns': {
                    'daily_returns': returns.tolist(),
                    'annualized_return': float((1 + np.mean(returns)) ** 252 - 1),
                    'volatility': float(np.std(returns) * np.sqrt(252)),
                    'sharpe_ratio': float(np.mean(returns) / np.std(returns) * np.sqrt(252))
                },
                'ml_enhanced': {
                    'predicted_returns': predicted_returns,
                    'pattern_signals': patterns,
                    'market_regime': regime,
                    'ml_risk_score': risk_metrics['ml_risk_score'],
                    'trend_strength': risk_metrics['trend_strength'],
                    'momentum_score': risk_metrics['momentum_score']
                }
            }
            
        except Exception as e:
            logger.error(f"Error in calculate_enhanced_returns: {str(e)}")
            return self._fallback_calculations(prices)
    
    def _add_technical_indicators(self, df: pd.DataFrame) -> pd.DataFrame:
        """Add comprehensive technical indicators"""
        try:
            # Price-based indicators
            df['sma_20'] = df['price'].rolling(20).mean()
            df['sma_50'] = df['price'].rolling(50).mean()
            df['ema_12'] = df['price'].ewm(span=12).mean()
            df['ema_26'] = df['price'].ewm(span=26).mean()
            
            # Bollinger Bands
            rolling_mean = df['price'].rolling(20).mean()
            rolling_std = df['price'].rolling(20).std()
            df['bb_upper'] = rolling_mean + (rolling_std * 2)
            df['bb_lower'] = rolling_mean - (rolling_std * 2)
            df['bb_position'] = (df['price'] - df['bb_lower']) / (df['bb_upper'] - df['bb_lower'])
            
            # RSI
            delta = df['price'].diff()
            gain = (delta.where(delta > 0, 0)).rolling(14).mean()
            loss = (-delta.where(delta < 0, 0)).rolling(14).mean()
            rs = gain / loss
            df['rsi'] = 100 - (100 / (1 + rs))
            
            # MACD
            df['macd'] = df['ema_12'] - df['ema_26']
            df['macd_signal'] = df['macd'].ewm(span=9).mean()
            df['macd_histogram'] = df['macd'] - df['macd_signal']
            
            # Stochastic
            low_14 = df['price'].rolling(14).min()
            high_14 = df['price'].rolling(14).max()
            df['stoch_k'] = 100 * (df['price'] - low_14) / (high_14 - low_14)
            df['stoch_d'] = df['stoch_k'].rolling(3).mean()
            
            # Williams %R
            df['williams_r'] = -100 * (high_14 - df['price']) / (high_14 - low_14)
            
            # Average True Range (ATR)
            high = df['price'].shift(1).combine(df['price'], max)
            low = df['price'].shift(1).combine(df['price'], min)
            tr1 = high - low
            tr2 = np.abs(high - df['price'].shift(1))
            tr3 = np.abs(low - df['price'].shift(1))
            true_range = pd.concat([tr1, tr2, tr3], axis=1).max(axis=1)
            df['atr'] = true_range.rolling(14).mean()
            
            return df.fillna(method='bfill').fillna(method='ffill')
            
        except Exception as e:
            logger.error(f"Error adding technical indicators: {str(e)}")
            return df
    
    def _detect_patterns(self, df: pd.DataFrame) -> List[PatternResult]:
        """Detect technical chart patterns using ML"""
        patterns = []
        
        try:
            if len(df) < 50:
                return patterns
            
            prices = df['price'].values
            
            # Head and Shoulders
            h_s_result = self._detect_head_shoulders(prices)
            if h_s_result['confidence'] > self.pattern_thresholds['head_shoulders']:
                patterns.append(PatternResult(
                    pattern_name="Head and Shoulders",
                    confidence=h_s_result['confidence'],
                    signal_strength=h_s_result['signal_strength'],
                    predicted_direction="bearish",
                    risk_level="medium",
                    features=h_s_result['features']
                ))
            
            # Double Top/Bottom
            double_patterns = self._detect_double_patterns(prices)
            for pattern in double_patterns:
                if pattern['confidence'] > self.pattern_thresholds['double_top']:
                    patterns.append(PatternResult(
                        pattern_name=pattern['name'],
                        confidence=pattern['confidence'],
                        signal_strength=pattern['signal_strength'],
                        predicted_direction=pattern['direction'],
                        risk_level="medium",
                        features=pattern['features']
                    ))
            
            # Triangle Patterns
            triangle_result = self._detect_triangles(prices)
            if triangle_result['confidence'] > self.pattern_thresholds['triangle']:
                patterns.append(PatternResult(
                    pattern_name="Triangle",
                    confidence=triangle_result['confidence'],
                    signal_strength=triangle_result['signal_strength'],
                    predicted_direction=triangle_result['direction'],
                    risk_level="low",
                    features=triangle_result['features']
                ))
            
            # Support and Resistance
            sr_levels = self._detect_support_resistance(prices)
            if sr_levels['confidence'] > self.pattern_thresholds['support_resistance']:
                patterns.append(PatternResult(
                    pattern_name="Support/Resistance",
                    confidence=sr_levels['confidence'],
                    signal_strength=sr_levels['signal_strength'],
                    predicted_direction=sr_levels['direction'],
                    risk_level="low",
                    features=sr_levels['features']
                ))
            
        except Exception as e:
            logger.error(f"Error in pattern detection: {str(e)}")
        
        return patterns
    
    def _detect_head_shoulders(self, prices: np.ndarray) -> Dict:
        """Detect Head and Shoulders pattern"""
        try:
            # Find peaks and troughs
            peaks, _ = find_peaks(prices, distance=10, prominence=np.std(prices)*0.5)
            troughs, _ = find_peaks(-prices, distance=10, prominence=np.std(prices)*0.5)
            
            if len(peaks) < 3 or len(troughs) < 2:
                return {'confidence': 0.0, 'signal_strength': 0.0, 'features': {}}
            
            # Get last 3 peaks and 2 troughs
            recent_peaks = peaks[-3:]
            recent_troughs = troughs[-2:]
            
            # Check head and shoulders criteria
            left_shoulder = prices[recent_peaks[0]]
            head = prices[recent_peaks[1]]
            right_shoulder = prices[recent_peaks[2]]
            
            # Head should be higher than both shoulders
            if head > left_shoulder and head > right_shoulder:
                # Shoulders should be approximately equal
                shoulder_ratio = min(left_shoulder, right_shoulder) / max(left_shoulder, right_shoulder)
                height_ratio = head / max(left_shoulder, right_shoulder)
                
                confidence = shoulder_ratio * min(height_ratio / 1.1, 1.0)
                signal_strength = confidence * 0.8
                
                return {
                    'confidence': float(confidence),
                    'signal_strength': float(signal_strength),
                    'features': {
                        'left_shoulder': float(left_shoulder),
                        'head': float(head),
                        'right_shoulder': float(right_shoulder),
                        'shoulder_ratio': float(shoulder_ratio),
                        'height_ratio': float(height_ratio)
                    }
                }
            
            return {'confidence': 0.0, 'signal_strength': 0.0, 'features': {}}
            
        except Exception as e:
            logger.error(f"Error in head and shoulders detection: {str(e)}")
            return {'confidence': 0.0, 'signal_strength': 0.0, 'features': {}}
    
    def _detect_double_patterns(self, prices: np.ndarray) -> List[Dict]:
        """Detect Double Top and Double Bottom patterns"""
        patterns = []
        
        try:
            # Find peaks and troughs
            peaks, _ = find_peaks(prices, distance=20, prominence=np.std(prices)*0.3)
            troughs, _ = find_peaks(-prices, distance=20, prominence=np.std(prices)*0.3)
            
            # Double Top
            if len(peaks) >= 2:
                peak1, peak2 = prices[peaks[-2]], prices[peaks[-1]]
                peak_ratio = min(peak1, peak2) / max(peak1, peak2)
                
                if peak_ratio > 0.95:  # Peaks are similar height
                    confidence = peak_ratio * 0.9
                    patterns.append({
                        'name': 'Double Top',
                        'confidence': float(confidence),
                        'signal_strength': float(confidence * 0.8),
                        'direction': 'bearish',
                        'features': {
                            'peak1': float(peak1),
                            'peak2': float(peak2),
                            'peak_ratio': float(peak_ratio)
                        }
                    })
            
            # Double Bottom
            if len(troughs) >= 2:
                trough1, trough2 = prices[troughs[-2]], prices[troughs[-1]]
                trough_ratio = min(trough1, trough2) / max(trough1, trough2)
                
                if trough_ratio > 0.95:  # Troughs are similar depth
                    confidence = trough_ratio * 0.9
                    patterns.append({
                        'name': 'Double Bottom',
                        'confidence': float(confidence),
                        'signal_strength': float(confidence * 0.8),
                        'direction': 'bullish',
                        'features': {
                            'trough1': float(trough1),
                            'trough2': float(trough2),
                            'trough_ratio': float(trough_ratio)
                        }
                    })
            
        except Exception as e:
            logger.error(f"Error in double pattern detection: {str(e)}")
        
        return patterns
    
    def _detect_triangles(self, prices: np.ndarray) -> Dict:
        """Detect Triangle patterns (Ascending, Descending, Symmetrical)"""
        try:
            if len(prices) < 30:
                return {'confidence': 0.0, 'signal_strength': 0.0, 'direction': 'neutral', 'features': {}}
            
            # Get recent price window
            recent_prices = prices[-30:]
            
            # Find highs and lows
            highs = argrelextrema(recent_prices, np.greater, order=3)[0]
            lows = argrelextrema(recent_prices, np.less, order=3)[0]
            
            if len(highs) < 2 or len(lows) < 2:
                return {'confidence': 0.0, 'signal_strength': 0.0, 'direction': 'neutral', 'features': {}}
            
            # Calculate trend lines
            high_prices = recent_prices[highs]
            low_prices = recent_prices[lows]
            
            # Linear regression for trend lines
            high_slope = np.polyfit(highs, high_prices, 1)[0]
            low_slope = np.polyfit(lows, low_prices, 1)[0]
            
            # Determine triangle type
            triangle_type = "symmetrical"
            direction = "neutral"
            
            if abs(high_slope) < 0.1 and low_slope > 0.1:  # Ascending
                triangle_type = "ascending"
                direction = "bullish"
            elif high_slope < -0.1 and abs(low_slope) < 0.1:  # Descending
                triangle_type = "descending"
                direction = "bearish"
            
            # Calculate confidence based on trend line quality
            confidence = min(0.9, 1.0 - abs(high_slope - low_slope) / 2.0)
            
            return {
                'confidence': float(confidence),
                'signal_strength': float(confidence * 0.7),
                'direction': direction,
                'features': {
                    'type': triangle_type,
                    'high_slope': float(high_slope),
                    'low_slope': float(low_slope),
                    'convergence': float(abs(high_slope - low_slope))
                }
            }
            
        except Exception as e:
            logger.error(f"Error in triangle detection: {str(e)}")
            return {'confidence': 0.0, 'signal_strength': 0.0, 'direction': 'neutral', 'features': {}}
    
    def _detect_support_resistance(self, prices: np.ndarray) -> Dict:
        """Detect Support and Resistance levels"""
        try:
            if len(prices) < 50:
                return {'confidence': 0.0, 'signal_strength': 0.0, 'direction': 'neutral', 'features': {}}
            
            # Find local maxima and minima
            maxima = argrelextrema(prices, np.greater, order=5)[0]
            minima = argrelextrema(prices, np.less, order=5)[0]
            
            # Cluster similar price levels
            resistance_levels = []
            support_levels = []
            
            if len(maxima) > 0:
                max_prices = prices[maxima]
                # Group similar resistance levels
                for price in max_prices:
                    tolerance = np.std(prices) * 0.02
                    similar_levels = max_prices[np.abs(max_prices - price) < tolerance]
                    if len(similar_levels) >= 2:
                        resistance_levels.append(np.mean(similar_levels))
            
            if len(minima) > 0:
                min_prices = prices[minima]
                # Group similar support levels
                for price in min_prices:
                    tolerance = np.std(prices) * 0.02
                    similar_levels = min_prices[np.abs(min_prices - price) < tolerance]
                    if len(similar_levels) >= 2:
                        support_levels.append(np.mean(similar_levels))
            
            # Remove duplicates
            resistance_levels = list(set([round(r, 2) for r in resistance_levels]))
            support_levels = list(set([round(s, 2) for s in support_levels]))
            
            current_price = prices[-1]
            
            # Determine signal based on proximity to levels
            direction = "neutral"
            signal_strength = 0.0
            confidence = 0.0
            
            if resistance_levels or support_levels:
                nearest_resistance = min(resistance_levels, key=lambda x: abs(x - current_price), default=None)
                nearest_support = min(support_levels, key=lambda x: abs(x - current_price), default=None)
                
                resistance_distance = abs(nearest_resistance - current_price) / current_price if nearest_resistance else float('inf')
                support_distance = abs(nearest_support - current_price) / current_price if nearest_support else float('inf')
                
                if resistance_distance < 0.02:  # Within 2% of resistance
                    direction = "bearish"
                    signal_strength = 1.0 - resistance_distance / 0.02
                    confidence = 0.8
                elif support_distance < 0.02:  # Within 2% of support
                    direction = "bullish"
                    signal_strength = 1.0 - support_distance / 0.02
                    confidence = 0.8
                else:
                    confidence = min(len(resistance_levels) + len(support_levels), 5) / 5.0
            
            return {
                'confidence': float(confidence),
                'signal_strength': float(signal_strength),
                'direction': direction,
                'features': {
                    'resistance_levels': resistance_levels,
                    'support_levels': support_levels,
                    'current_price': float(current_price),
                    'nearest_resistance': float(nearest_resistance) if nearest_resistance else None,
                    'nearest_support': float(nearest_support) if nearest_support else None
                }
            }
            
        except Exception as e:
            logger.error(f"Error in support/resistance detection: {str(e)}")
            return {'confidence': 0.0, 'signal_strength': 0.0, 'direction': 'neutral', 'features': {}}
    
    def _detect_market_regime(self, returns: np.ndarray) -> Dict:
        """Detect market regime using ML clustering"""
        try:
            if len(returns) < 50:
                return {'regime': 'insufficient_data', 'confidence': 0.0, 'characteristics': {}}
            
            # Feature engineering for regime detection
            window_size = 20
            features = []
            
            for i in range(window_size, len(returns)):
                window_returns = returns[i-window_size:i]
                
                feature_vector = [
                    np.mean(window_returns),  # Mean return
                    np.std(window_returns),   # Volatility
                    np.min(window_returns),   # Minimum return
                    np.max(window_returns),   # Maximum return
                    len(window_returns[window_returns > 0]) / len(window_returns),  # Positive return ratio
                    np.sum(np.abs(np.diff(window_returns))) / len(window_returns)   # Trend consistency
                ]
                features.append(feature_vector)
            
            if len(features) < 10:
                return {'regime': 'insufficient_data', 'confidence': 0.0, 'characteristics': {}}
            
            features = np.array(features)
            
            # Normalize features
            scaler = StandardScaler()
            features_scaled = scaler.fit_transform(features)
            
            # K-means clustering for regime identification
            n_clusters = 3  # Bull, Bear, Sideways
            kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
            regime_labels = kmeans.fit_predict(features_scaled)
            
            # Get current regime
            current_regime_label = regime_labels[-1]
            current_features = features[-1]
            
            # Interpret regime based on characteristics
            regime_names = ['bearish', 'sideways', 'bullish']
            
            # Sort clusters by mean return to assign regime names
            cluster_means = []
            for i in range(n_clusters):
                cluster_features = features[regime_labels == i]
                if len(cluster_features) > 0:
                    cluster_means.append((i, np.mean(cluster_features[:, 0])))  # Mean return
            
            cluster_means.sort(key=lambda x: x[1])  # Sort by mean return
            regime_mapping = {cluster_means[i][0]: regime_names[i] for i in range(len(cluster_means))}
            
            current_regime = regime_mapping.get(current_regime_label, 'unknown')
            
            # Calculate confidence based on cluster separation
            distances_to_centroids = np.linalg.norm(features_scaled - kmeans.cluster_centers_[current_regime_label], axis=1)
            current_distance = distances_to_centroids[-1]
            confidence = max(0, 1 - current_distance / np.max(distances_to_centroids))
            
            return {
                'regime': current_regime,
                'confidence': float(confidence),
                'characteristics': {
                    'mean_return': float(current_features[0]),
                    'volatility': float(current_features[1]),
                    'min_return': float(current_features[2]),
                    'max_return': float(current_features[3]),
                    'positive_ratio': float(current_features[4]),
                    'trend_consistency': float(current_features[5])
                },
                'regime_distribution': {
                    regime_mapping.get(i, f'cluster_{i}'): float(np.sum(regime_labels == i) / len(regime_labels))
                    for i in range(n_clusters)
                }
            }
            
        except Exception as e:
            logger.error(f"Error in regime detection: {str(e)}")
            return {'regime': 'unknown', 'confidence': 0.0, 'characteristics': {}}
    
    def _predict_returns(self, df: pd.DataFrame) -> Dict:
        """Predict future returns using ML models"""
        try:
            if len(df) < 50:
                return {'prediction': 0.0, 'confidence': 0.0, 'method': 'insufficient_data'}
            
            # Prepare features
            feature_columns = ['sma_20', 'sma_50', 'rsi', 'macd', 'bb_position', 'stoch_k', 'williams_r']
            available_features = [col for col in feature_columns if col in df.columns and not df[col].isna().all()]
            
            if len(available_features) < 3:
                return {'prediction': 0.0, 'confidence': 0.0, 'method': 'insufficient_features'}
            
            # Prepare training data
            features = df[available_features].dropna()
            if len(features) < 20:
                return {'prediction': 0.0, 'confidence': 0.0, 'method': 'insufficient_clean_data'}
            
            # Create target (next period return)
            prices = df['price'].values
            returns = np.diff(np.log(prices))
            
            # Align features with returns
            if len(features) > len(returns):
                features = features.iloc[:len(returns)]
            elif len(features) < len(returns):
                returns = returns[:len(features)]
            
            if len(features) != len(returns):
                return {'prediction': 0.0, 'confidence': 0.0, 'method': 'alignment_error'}
            
            # Split data for training
            split_point = int(len(features) * 0.8)
            X_train = features.iloc[:split_point]
            y_train = returns[:split_point]
            X_test = features.iloc[split_point:]
            y_test = returns[split_point:]
            
            if len(X_train) < 10 or len(X_test) < 3:
                # Use simple momentum prediction
                recent_returns = returns[-5:]
                prediction = np.mean(recent_returns)
                confidence = max(0, 1 - np.std(recent_returns) / (abs(np.mean(recent_returns)) + 1e-8))
                
                return {
                    'prediction': float(prediction),
                    'confidence': float(confidence * 0.5),  # Lower confidence for simple method
                    'method': 'momentum_fallback'
                }
            
            # Scale features
            scaler = StandardScaler()
            X_train_scaled = scaler.fit_transform(X_train)
            X_test_scaled = scaler.transform(X_test)
            
            # Train Random Forest model
            rf_model = RandomForestClassifier(n_estimators=50, random_state=42, max_depth=5)
            
            # Convert to classification problem (up/down/sideways)
            y_train_class = np.where(y_train > 0.01, 1, np.where(y_train < -0.01, -1, 0))
            y_test_class = np.where(y_test > 0.01, 1, np.where(y_test < -0.01, -1, 0))
            
            rf_model.fit(X_train_scaled, y_train_class)
            
            # Make prediction
            current_features = features.iloc[-1:].values
            current_features_scaled = scaler.transform(current_features)
            
            prediction_class = rf_model.predict(current_features_scaled)[0]
            prediction_proba = rf_model.predict_proba(current_features_scaled)[0]
            
            # Convert class prediction to return prediction
            class_to_return = {-1: -0.02, 0: 0.0, 1: 0.02}
            predicted_return = class_to_return.get(prediction_class, 0.0)
            
            # Calculate confidence
            confidence = np.max(prediction_proba)
            
            # Validate on test set
            test_predictions = rf_model.predict(X_test_scaled)
            test_accuracy = np.mean(test_predictions == y_test_class) if len(y_test_class) > 0 else 0.5
            
            # Adjust confidence based on test accuracy
            confidence = confidence * test_accuracy
            
            return {
                'prediction': float(predicted_return),
                'confidence': float(confidence),
                'method': 'random_forest',
                'class_prediction': int(prediction_class),
                'class_probabilities': prediction_proba.tolist(),
                'test_accuracy': float(test_accuracy)
            }
            
        except Exception as e:
            logger.error(f"Error in return prediction: {str(e)}")
            # Fallback to simple momentum
            try:
                prices = df['price'].values
                if len(prices) >= 5:
                    recent_returns = np.diff(np.log(prices[-6:]))
                    prediction = np.mean(recent_returns)
                    confidence = 0.3  # Low confidence for fallback
                    
                    return {
                        'prediction': float(prediction),
                        'confidence': float(confidence),
                        'method': 'momentum_fallback_error'
                    }
            except:
                pass
            
            return {'prediction': 0.0, 'confidence': 0.0, 'method': 'error'}
    
    def _assess_ml_risk(self, returns: np.ndarray, df: pd.DataFrame) -> Dict:
        """Assess risk using ML techniques"""
        try:
            risk_metrics = {}
            
            # Traditional risk metrics
            volatility = np.std(returns) * np.sqrt(252)
            var_95 = np.percentile(returns, 5)
            
            # ML-enhanced risk assessment
            if len(returns) >= 30:
                # Trend strength using linear regression
                x = np.arange(len(returns))
                trend_coef = np.polyfit(x, returns, 1)[0]
                trend_strength = abs(trend_coef) / (np.std(returns) + 1e-8)
                
                # Momentum score
                short_ma = np.mean(returns[-5:]) if len(returns) >= 5 else 0
                long_ma = np.mean(returns[-20:]) if len(returns) >= 20 else short_ma
                momentum_score = (short_ma - long_ma) / (volatility + 1e-8)
                
                # Risk clustering
                if len(returns) >= 50:
                    risk_features = []
                    window = 10
                    for i in range(window, len(returns)):
                        window_returns = returns[i-window:i]
                        risk_features.append([
                            np.std(window_returns),
                            np.min(window_returns),
                            len(window_returns[window_returns < np.percentile(window_returns, 10)]) / len(window_returns)
                        ])
                    
                    if len(risk_features) >= 10:
                        risk_features = np.array(risk_features)
                        kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
                        risk_labels = kmeans.fit_predict(risk_features)
                        current_risk_cluster = risk_labels[-1]
                        
                        # Map clusters to risk levels
                        cluster_volatilities = []
                        for i in range(3):
                            cluster_features = risk_features[risk_labels == i]
                            if len(cluster_features) > 0:
                                cluster_volatilities.append((i, np.mean(cluster_features[:, 0])))
                        
                        cluster_volatilities.sort(key=lambda x: x[1])
                        risk_mapping = {cluster_volatilities[i][0]: ['low', 'medium', 'high'][i] for i in range(len(cluster_volatilities))}
                        current_risk_level = risk_mapping.get(current_risk_cluster, 'medium')
                        
                        risk_metrics['ml_risk_level'] = current_risk_level
                    else:
                        risk_metrics['ml_risk_level'] = 'medium'
                else:
                    risk_metrics['ml_risk_level'] = 'medium'
                
                risk_metrics['trend_strength'] = float(trend_strength)
                risk_metrics['momentum_score'] = float(momentum_score)
                
                # Combined ML risk score
                volatility_score = min(volatility / 0.3, 1.0)  # Normalize to 0-1
                var_score = abs(var_95) / 0.05  # Normalize VaR
                trend_score = min(trend_strength, 1.0)
                
                ml_risk_score = (volatility_score * 0.4 + var_score * 0.3 + (1 - trend_score) * 0.3)
                risk_metrics['ml_risk_score'] = float(min(ml_risk_score, 1.0))
                
            else:
                # Insufficient data for ML analysis
                risk_metrics['ml_risk_score'] = float(min(volatility / 0.2, 1.0))
                risk_metrics['trend_strength'] = 0.0
                risk_metrics['momentum_score'] = 0.0
                risk_metrics['ml_risk_level'] = 'medium'
            
            return risk_metrics
            
        except Exception as e:
            logger.error(f"Error in ML risk assessment: {str(e)}")
            return {
                'ml_risk_score': 0.5,
                'trend_strength': 0.0,
                'momentum_score': 0.0,
                'ml_risk_level': 'medium'
            }
    
    def _fallback_calculations(self, prices: List[float]) -> Dict:
        """Fallback to basic calculations if ML fails"""
        try:
            prices = np.array(prices)
            returns = np.diff(np.log(prices))
            
            return {
                'traditional_returns': {
                    'daily_returns': returns.tolist(),
                    'annualized_return': float((1 + np.mean(returns)) ** 252 - 1),
                    'volatility': float(np.std(returns) * np.sqrt(252)),
                    'sharpe_ratio': float(np.mean(returns) / np.std(returns) * np.sqrt(252)) if np.std(returns) > 0 else 0.0
                },
                'ml_enhanced': {
                    'predicted_returns': {'prediction': 0.0, 'confidence': 0.0, 'method': 'fallback'},
                    'pattern_signals': [],
                    'market_regime': {'regime': 'unknown', 'confidence': 0.0},
                    'ml_risk_score': 0.5,
                    'trend_strength': 0.0,
                    'momentum_score': 0.0
                }
            }
        except Exception as e:
            logger.error(f"Error in fallback calculations: {str(e)}")
            return {
                'traditional_returns': {'error': str(e)},
                'ml_enhanced': {'error': str(e)}
            }
    
    def train_models(self, historical_data: pd.DataFrame) -> bool:
        """Train ML models on historical data"""
        try:
            logger.info("Training ML models on historical data...")
            
            if len(historical_data) < 100:
                logger.warning("Insufficient data for model training")
                return False
            
            # Prepare features
            df = self._add_technical_indicators(historical_data)
            
            # Train pattern recognition models
            self._train_pattern_models(df)
            
            # Train LSTM for time series prediction
            self._train_lstm_model(df)
            
            self.is_trained = True
            logger.info("ML models trained successfully")
            return True
            
        except Exception as e:
            logger.error(f"Error training models: {str(e)}")
            return False
    
    def _train_pattern_models(self, df: pd.DataFrame):
        """Train pattern recognition models"""
        # Implementation for training pattern models
        # This would involve creating labeled training data for patterns
        pass
    
    def _train_lstm_model(self, df: pd.DataFrame):
        """Train LSTM model for time series prediction"""
        try:
            if len(df) < 60:
                return
            
            # Prepare sequence data
            prices = df['price'].values
            scaler = MinMaxScaler()
            scaled_prices = scaler.fit_transform(prices.reshape(-1, 1))
            
            # Create sequences
            sequence_length = 30
            X, y = [], []
            
            for i in range(sequence_length, len(scaled_prices)):
                X.append(scaled_prices[i-sequence_length:i, 0])
                y.append(scaled_prices[i, 0])
            
            X = np.array(X)
            y = np.array(y)
            
            if len(X) < 20:
                return
            
            # Reshape for LSTM
            X = X.reshape((X.shape[0], X.shape[1], 1))
            
            # Build LSTM model
            model = Sequential([
                LSTM(50, return_sequences=True, input_shape=(sequence_length, 1)),
                Dropout(0.2),
                LSTM(50, return_sequences=False),
                Dropout(0.2),
                Dense(25),
                Dense(1)
            ])
            
            model.compile(optimizer=Adam(learning_rate=0.001), loss='mse')
            
            # Train model
            model.fit(X, y, batch_size=32, epochs=10, verbose=0)
            
            self.lstm_model = model
            
        except Exception as e:
            logger.error(f"Error training LSTM model: {str(e)}")

# Global instance
quant_ai = QuantFinanceAI()

def get_enhanced_metrics(prices: List[float], volume: List[float] = None) -> MLEnhancedMetrics:
    """
    Main interface function for getting ML-enhanced quantitative metrics
    """
    try:
        enhanced_results = quant_ai.calculate_enhanced_returns(prices, volume)
        
        # Convert to structured format
        pattern_results = []
        if 'pattern_signals' in enhanced_results.get('ml_enhanced', {}):
            pattern_results = enhanced_results['ml_enhanced']['pattern_signals']
        
        return MLEnhancedMetrics(
            traditional_metrics=enhanced_results.get('traditional_returns', {}),
            ml_predictions=enhanced_results.get('ml_enhanced', {}).get('predicted_returns', {}),
            pattern_analysis=pattern_results,
            regime_detection=enhanced_results.get('ml_enhanced', {}).get('market_regime', {}),
            risk_assessment=enhanced_results.get('ml_enhanced', {})
        )
        
    except Exception as e:
        logger.error(f"Error in get_enhanced_metrics: {str(e)}")
        # Return basic fallback
        returns = np.diff(np.log(np.array(prices))) if len(prices) > 1 else [0]
        return MLEnhancedMetrics(
            traditional_metrics={
                'daily_returns': returns.tolist(),
                'annualized_return': float((1 + np.mean(returns)) ** 252 - 1) if len(returns) > 0 else 0.0,
                'volatility': float(np.std(returns) * np.sqrt(252)) if len(returns) > 0 else 0.0,
                'sharpe_ratio': 0.0
            },
            ml_predictions={'prediction': 0.0, 'confidence': 0.0, 'method': 'error'},
            pattern_analysis=[],
            regime_detection={'regime': 'unknown', 'confidence': 0.0},
            risk_assessment={'ml_risk_score': 0.5}
        )
