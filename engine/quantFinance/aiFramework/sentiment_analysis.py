"""
Market Sentiment Analysis Module
Advanced sentiment detection and market psychology analysis

This module provides sentiment analysis capabilities including:
- Market sentiment indicators
- Fear & Greed analysis
- Volume sentiment
- Price action sentiment
- Social sentiment integration
"""

import numpy as np
import pandas as pd
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass
import math

@dataclass
class SentimentSignal:
    """Sentiment analysis result"""
    sentiment_score: float  # -1 (bearish) to +1 (bullish)
    confidence: float
    strength: str  # 'weak', 'moderate', 'strong'
    components: Dict
    signals: List[str]

class MarketSentimentAnalyzer:
    """Advanced market sentiment analysis system"""
    
    def __init__(self):
        self.sentiment_weights = {
            'price_momentum': 0.25,
            'volume_analysis': 0.20,
            'volatility_regime': 0.20,
            'technical_indicators': 0.15,
            'market_structure': 0.10,
            'breadth_indicators': 0.10
        }
        
    def analyze_sentiment(self, prices: List[float], volumes: List[float] = None, 
                         market_data: Dict = None) -> SentimentSignal:
        """
        Comprehensive sentiment analysis
        """
        try:
            prices = np.array(prices)
            if volumes is not None:
                volumes = np.array(volumes)
            
            if len(prices) < 20:
                return self._create_neutral_sentiment("Insufficient data")
            
            # Calculate individual sentiment components
            price_sentiment = self._analyze_price_momentum(prices)
            volume_sentiment = self._analyze_volume_sentiment(prices, volumes) if volumes is not None else 0.0
            volatility_sentiment = self._analyze_volatility_regime(prices)
            technical_sentiment = self._analyze_technical_indicators(prices)
            structure_sentiment = self._analyze_market_structure(prices)
            breadth_sentiment = self._analyze_market_breadth(market_data) if market_data else 0.0
            
            # Weighted sentiment calculation
            components = {
                'price_momentum': price_sentiment,
                'volume_analysis': volume_sentiment,
                'volatility_regime': volatility_sentiment,
                'technical_indicators': technical_sentiment,
                'market_structure': structure_sentiment,
                'breadth_indicators': breadth_sentiment
            }
            
            # Calculate weighted sentiment score
            sentiment_score = 0.0
            total_weight = 0.0
            
            for component, value in components.items():
                if value is not None and not math.isnan(value):
                    weight = self.sentiment_weights.get(component, 0.0)
                    sentiment_score += value * weight
                    total_weight += weight
            
            if total_weight > 0:
                sentiment_score = sentiment_score / total_weight
            
            # Normalize to [-1, 1] range
            sentiment_score = max(-1.0, min(1.0, sentiment_score))
            
            # Determine strength and confidence
            strength = self._determine_strength(abs(sentiment_score))
            confidence = self._calculate_confidence(components)
            signals = self._generate_signals(sentiment_score, components)
            
            return SentimentSignal(
                sentiment_score=sentiment_score,
                confidence=confidence,
                strength=strength,
                components=components,
                signals=signals
            )
            
        except Exception as e:
            print(f"Error in sentiment analysis: {e}")
            return self._create_neutral_sentiment("Analysis error")
    
    def _analyze_price_momentum(self, prices: np.ndarray) -> float:
        """Analyze price momentum sentiment"""
        try:
            if len(prices) < 20:
                return 0.0
            
            # Multiple timeframe momentum
            short_momentum = self._calculate_momentum(prices, 5)
            medium_momentum = self._calculate_momentum(prices, 10)
            long_momentum = self._calculate_momentum(prices, 20)
            
            # Rate of change analysis
            roc_5 = (prices[-1] - prices[-6]) / prices[-6] if len(prices) > 5 else 0
            roc_10 = (prices[-1] - prices[-11]) / prices[-11] if len(prices) > 10 else 0
            
            # Acceleration (second derivative)
            returns = np.diff(prices) / prices[:-1]
            if len(returns) >= 5:
                recent_returns = returns[-5:]
                acceleration = np.mean(np.diff(recent_returns))
            else:
                acceleration = 0
            
            # Trend consistency
            up_days = np.sum(np.diff(prices[-20:]) > 0) if len(prices) >= 20 else 0
            trend_consistency = (up_days - 10) / 10 if len(prices) >= 20 else 0
            
            # Combine momentum signals
            momentum_score = (
                short_momentum * 0.4 +
                medium_momentum * 0.3 +
                long_momentum * 0.2 +
                np.tanh(acceleration * 100) * 0.1
            )
            
            # Apply trend consistency
            momentum_score *= (1 + trend_consistency * 0.2)
            
            return float(np.tanh(momentum_score * 10))  # Normalize to [-1, 1]
            
        except Exception as e:
            print(f"Error in price momentum analysis: {e}")
            return 0.0
    
    def _analyze_volume_sentiment(self, prices: np.ndarray, volumes: np.ndarray) -> float:
        """Analyze volume-based sentiment"""
        try:
            if volumes is None or len(volumes) < 10:
                return 0.0
            
            # Volume-weighted price analysis
            vwap = np.sum(prices * volumes) / np.sum(volumes)
            current_price = prices[-1]
            vwap_signal = (current_price - vwap) / vwap
            
            # On-Balance Volume (OBV)
            obv = self._calculate_obv(prices, volumes)
            obv_trend = self._calculate_momentum(obv, 10) if len(obv) >= 10 else 0
            
            # Volume trend
            volume_ma = np.mean(volumes[-20:]) if len(volumes) >= 20 else np.mean(volumes)
            recent_volume = np.mean(volumes[-5:]) if len(volumes) >= 5 else volumes[-1]
            volume_trend = (recent_volume - volume_ma) / volume_ma
            
            # Up/Down volume ratio
            price_changes = np.diff(prices[-20:]) if len(prices) >= 20 else np.diff(prices)
            up_volume = np.sum(volumes[-len(price_changes):][price_changes > 0])
            down_volume = np.sum(volumes[-len(price_changes):][price_changes < 0])
            
            if up_volume + down_volume > 0:
                volume_ratio = (up_volume - down_volume) / (up_volume + down_volume)
            else:
                volume_ratio = 0
            
            # Combine volume signals
            volume_sentiment = (
                np.tanh(vwap_signal * 5) * 0.3 +
                np.tanh(obv_trend * 5) * 0.3 +
                np.tanh(volume_trend * 2) * 0.2 +
                volume_ratio * 0.2
            )
            
            return float(volume_sentiment)
            
        except Exception as e:
            print(f"Error in volume sentiment analysis: {e}")
            return 0.0
    
    def _analyze_volatility_regime(self, prices: np.ndarray) -> float:
        """Analyze volatility regime sentiment"""
        try:
            if len(prices) < 20:
                return 0.0
            
            # Calculate returns
            returns = np.diff(prices) / prices[:-1]
            
            # Current volatility vs historical
            current_vol = np.std(returns[-10:]) * np.sqrt(252) if len(returns) >= 10 else 0
            historical_vol = np.std(returns[-50:]) * np.sqrt(252) if len(returns) >= 50 else current_vol
            
            vol_ratio = current_vol / historical_vol if historical_vol > 0 else 1
            
            # GARCH-like volatility clustering
            volatility_clustering = self._analyze_volatility_clustering(returns)
            
            # Volatility skew (downside vs upside volatility)
            positive_returns = returns[returns > 0]
            negative_returns = returns[returns < 0]
            
            if len(positive_returns) > 0 and len(negative_returns) > 0:
                upside_vol = np.std(positive_returns)
                downside_vol = np.std(negative_returns)
                vol_skew = (downside_vol - upside_vol) / (downside_vol + upside_vol)
            else:
                vol_skew = 0
            
            # Low volatility is generally bullish, high volatility bearish
            vol_sentiment = -np.tanh((vol_ratio - 1) * 2)  # Invert: low vol = positive sentiment
            
            # Adjust for volatility clustering and skew
            vol_sentiment += volatility_clustering * 0.2
            vol_sentiment -= vol_skew * 0.3  # Negative skew (high downside vol) is bearish
            
            return float(vol_sentiment)
            
        except Exception as e:
            print(f"Error in volatility regime analysis: {e}")
            return 0.0
    
    def _analyze_technical_indicators(self, prices: np.ndarray) -> float:
        """Analyze technical indicator sentiment"""
        try:
            if len(prices) < 20:
                return 0.0
            
            signals = []
            
            # Moving Average signals
            ma_signals = self._analyze_moving_averages(prices)
            signals.append(ma_signals)
            
            # RSI
            rsi = self._calculate_rsi(prices)
            if rsi is not None:
                if rsi < 30:
                    rsi_signal = 0.5  # Oversold - bullish
                elif rsi > 70:
                    rsi_signal = -0.5  # Overbought - bearish
                else:
                    rsi_signal = (50 - rsi) / 50  # Normalize around 50
                signals.append(rsi_signal)
            
            # MACD
            macd_signal = self._analyze_macd(prices)
            if macd_signal is not None:
                signals.append(macd_signal)
            
            # Bollinger Bands
            bb_signal = self._analyze_bollinger_bands(prices)
            if bb_signal is not None:
                signals.append(bb_signal)
            
            # Stochastic
            stoch_signal = self._analyze_stochastic(prices)
            if stoch_signal is not None:
                signals.append(stoch_signal)
            
            # Average all signals
            if signals:
                technical_sentiment = np.mean([s for s in signals if s is not None])
                return float(technical_sentiment)
            
            return 0.0
            
        except Exception as e:
            print(f"Error in technical indicators analysis: {e}")
            return 0.0
    
    def _analyze_market_structure(self, prices: np.ndarray) -> float:
        """Analyze market structure sentiment"""
        try:
            if len(prices) < 30:
                return 0.0
            
            # Higher highs, higher lows analysis
            structure_signal = self._analyze_price_structure(prices)
            
            # Support/Resistance analysis
            sr_signal = self._analyze_support_resistance_sentiment(prices)
            
            # Trend strength
            trend_signal = self._calculate_trend_strength(prices)
            
            # Combine structure signals
            structure_sentiment = (
                structure_signal * 0.4 +
                sr_signal * 0.3 +
                trend_signal * 0.3
            )
            
            return float(structure_sentiment)
            
        except Exception as e:
            print(f"Error in market structure analysis: {e}")
            return 0.0
    
    def _analyze_market_breadth(self, market_data: Dict) -> float:
        """Analyze market breadth sentiment"""
        try:
            if not market_data:
                return 0.0
            
            breadth_signals = []
            
            # Advance/Decline ratio
            if 'advances' in market_data and 'declines' in market_data:
                advances = market_data['advances']
                declines = market_data['declines']
                if advances + declines > 0:
                    ad_ratio = (advances - declines) / (advances + declines)
                    breadth_signals.append(ad_ratio)
            
            # New highs/New lows
            if 'new_highs' in market_data and 'new_lows' in market_data:
                new_highs = market_data['new_highs']
                new_lows = market_data['new_lows']
                if new_highs + new_lows > 0:
                    hl_ratio = (new_highs - new_lows) / (new_highs + new_lows)
                    breadth_signals.append(hl_ratio)
            
            # Sector rotation (if available)
            if 'sector_performance' in market_data:
                sector_perf = market_data['sector_performance']
                if isinstance(sector_perf, list) and len(sector_perf) > 0:
                    positive_sectors = sum(1 for s in sector_perf if s > 0)
                    sector_breadth = (positive_sectors / len(sector_perf) - 0.5) * 2
                    breadth_signals.append(sector_breadth)
            
            if breadth_signals:
                return float(np.mean(breadth_signals))
            
            return 0.0
            
        except Exception as e:
            print(f"Error in market breadth analysis: {e}")
            return 0.0
    
    # Helper methods for calculations
    def _calculate_momentum(self, data: np.ndarray, period: int) -> float:
        """Calculate momentum over specified period"""
        if len(data) < period + 1:
            return 0.0
        
        current = data[-1]
        past = data[-period-1]
        return (current - past) / past if past != 0 else 0.0
    
    def _calculate_obv(self, prices: np.ndarray, volumes: np.ndarray) -> np.ndarray:
        """Calculate On-Balance Volume"""
        obv = np.zeros_like(prices)
        obv[0] = volumes[0]
        
        for i in range(1, len(prices)):
            if prices[i] > prices[i-1]:
                obv[i] = obv[i-1] + volumes[i]
            elif prices[i] < prices[i-1]:
                obv[i] = obv[i-1] - volumes[i]
            else:
                obv[i] = obv[i-1]
        
        return obv
    
    def _analyze_volatility_clustering(self, returns: np.ndarray) -> float:
        """Analyze volatility clustering patterns"""
        if len(returns) < 20:
            return 0.0
        
        # Calculate squared returns
        squared_returns = returns ** 2
        
        # Look for persistence in volatility
        recent_vol = np.mean(squared_returns[-5:])
        historical_vol = np.mean(squared_returns[-20:-5])
        
        if historical_vol > 0:
            vol_persistence = (recent_vol - historical_vol) / historical_vol
            return -np.tanh(vol_persistence)  # High persistence is bearish
        
        return 0.0
    
    def _analyze_moving_averages(self, prices: np.ndarray) -> float:
        """Analyze moving average signals"""
        if len(prices) < 50:
            return 0.0
        
        # Calculate moving averages
        sma_20 = np.mean(prices[-20:])
        sma_50 = np.mean(prices[-50:]) if len(prices) >= 50 else sma_20
        
        current_price = prices[-1]
        
        # Price relative to moving averages
        ma_signals = []
        
        # Price vs SMA 20
        ma_signals.append((current_price - sma_20) / sma_20)
        
        # Price vs SMA 50
        if len(prices) >= 50:
            ma_signals.append((current_price - sma_50) / sma_50)
        
        # SMA 20 vs SMA 50
        if len(prices) >= 50:
            ma_signals.append((sma_20 - sma_50) / sma_50)
        
        # Normalize and average
        normalized_signals = [np.tanh(signal * 10) for signal in ma_signals]
        return np.mean(normalized_signals)
    
    def _calculate_rsi(self, prices: np.ndarray, period: int = 14) -> Optional[float]:
        """Calculate RSI"""
        if len(prices) < period + 1:
            return None
        
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
    
    def _analyze_macd(self, prices: np.ndarray) -> Optional[float]:
        """Analyze MACD signal"""
        if len(prices) < 26:
            return None
        
        # Calculate EMAs
        ema_12 = self._calculate_ema(prices, 12)
        ema_26 = self._calculate_ema(prices, 26)
        
        if ema_12 is None or ema_26 is None:
            return None
        
        macd = ema_12 - ema_26
        
        # Simple signal: positive MACD is bullish
        return np.tanh(macd / ema_26 * 10) if ema_26 != 0 else 0.0
    
    def _calculate_ema(self, prices: np.ndarray, period: int) -> Optional[float]:
        """Calculate Exponential Moving Average"""
        if len(prices) < period:
            return None
        
        alpha = 2.0 / (period + 1)
        ema = prices[0]
        
        for price in prices[1:]:
            ema = alpha * price + (1 - alpha) * ema
        
        return float(ema)
    
    def _analyze_bollinger_bands(self, prices: np.ndarray, period: int = 20) -> Optional[float]:
        """Analyze Bollinger Bands signal"""
        if len(prices) < period:
            return None
        
        sma = np.mean(prices[-period:])
        std = np.std(prices[-period:])
        
        upper_band = sma + 2 * std
        lower_band = sma - 2 * std
        
        current_price = prices[-1]
        
        # Position within bands
        if upper_band != lower_band:
            bb_position = (current_price - lower_band) / (upper_band - lower_band)
            # Convert to sentiment: 0.5 = neutral, 0 = oversold (bullish), 1 = overbought (bearish)
            return (0.5 - bb_position) * 2
        
        return 0.0
    
    def _analyze_stochastic(self, prices: np.ndarray, period: int = 14) -> Optional[float]:
        """Analyze Stochastic oscillator"""
        if len(prices) < period:
            return None
        
        recent_prices = prices[-period:]
        highest_high = np.max(recent_prices)
        lowest_low = np.min(recent_prices)
        current_price = prices[-1]
        
        if highest_high != lowest_low:
            k_percent = (current_price - lowest_low) / (highest_high - lowest_low) * 100
            
            # Convert to sentiment
            if k_percent < 20:
                return 0.5  # Oversold - bullish
            elif k_percent > 80:
                return -0.5  # Overbought - bearish
            else:
                return (50 - k_percent) / 50  # Normalize around 50
        
        return 0.0
    
    def _analyze_price_structure(self, prices: np.ndarray) -> float:
        """Analyze price structure (higher highs, higher lows, etc.)"""
        if len(prices) < 10:
            return 0.0
        
        # Find local peaks and troughs
        try:
            from scipy.signal import argrelextrema
            
            peaks = argrelextrema(prices, np.greater, order=3)[0]
            troughs = argrelextrema(prices, np.less, order=3)[0]
            
            structure_score = 0.0
            
            # Analyze recent peaks
            if len(peaks) >= 2:
                recent_peaks = peaks[-2:]
                if prices[recent_peaks[-1]] > prices[recent_peaks[-2]]:
                    structure_score += 0.5  # Higher high
                else:
                    structure_score -= 0.5  # Lower high
            
            # Analyze recent troughs
            if len(troughs) >= 2:
                recent_troughs = troughs[-2:]
                if prices[recent_troughs[-1]] > prices[recent_troughs[-2]]:
                    structure_score += 0.5  # Higher low
                else:
                    structure_score -= 0.5  # Lower low
            
            return structure_score
            
        except ImportError:
            # Fallback: simple trend analysis
            recent_trend = self._calculate_momentum(prices, 10)
            return np.tanh(recent_trend * 5)
    
    def _analyze_support_resistance_sentiment(self, prices: np.ndarray) -> float:
        """Analyze sentiment based on support/resistance levels"""
        if len(prices) < 20:
            return 0.0
        
        current_price = prices[-1]
        
        # Find recent highs and lows
        recent_high = np.max(prices[-20:])
        recent_low = np.min(prices[-20:])
        
        # Position within range
        if recent_high != recent_low:
            range_position = (current_price - recent_low) / (recent_high - recent_low)
            
            # Higher in range is more bullish
            return (range_position - 0.5) * 2
        
        return 0.0
    
    def _calculate_trend_strength(self, prices: np.ndarray) -> float:
        """Calculate trend strength"""
        if len(prices) < 20:
            return 0.0
        
        # Linear regression slope
        x = np.arange(len(prices))
        
        try:
            slope = np.polyfit(x, prices, 1)[0]
            # Normalize slope
            avg_price = np.mean(prices)
            normalized_slope = slope / avg_price * len(prices)
            
            return np.tanh(normalized_slope * 2)
            
        except:
            return 0.0
    
    def _determine_strength(self, abs_score: float) -> str:
        """Determine signal strength from absolute score"""
        if abs_score < 0.3:
            return "weak"
        elif abs_score < 0.6:
            return "moderate"
        else:
            return "strong"
    
    def _calculate_confidence(self, components: Dict) -> float:
        """Calculate confidence based on component agreement"""
        valid_components = [v for v in components.values() if v is not None and not math.isnan(v)]
        
        if len(valid_components) < 2:
            return 0.3  # Low confidence with few signals
        
        # Measure agreement between components
        mean_signal = np.mean(valid_components)
        std_signal = np.std(valid_components)
        
        # High agreement = high confidence
        agreement = 1 - min(std_signal / (abs(mean_signal) + 0.1), 1.0)
        
        # Scale confidence based on number of components
        component_factor = min(len(valid_components) / 5, 1.0)
        
        confidence = agreement * component_factor * 0.8 + 0.2  # Min confidence of 0.2
        
        return float(confidence)
    
    def _generate_signals(self, sentiment_score: float, components: Dict) -> List[str]:
        """Generate actionable signals based on sentiment"""
        signals = []
        
        # Overall sentiment signal
        if sentiment_score > 0.6:
            signals.append("Strong bullish sentiment - Consider long positions")
        elif sentiment_score > 0.3:
            signals.append("Moderate bullish sentiment - Cautiously optimistic")
        elif sentiment_score < -0.6:
            signals.append("Strong bearish sentiment - Consider short positions or defensive stance")
        elif sentiment_score < -0.3:
            signals.append("Moderate bearish sentiment - Reduce risk exposure")
        else:
            signals.append("Neutral sentiment - Wait for clearer signals")
        
        # Component-specific signals
        if components.get('volume_analysis', 0) > 0.5:
            signals.append("Strong volume support behind price action")
        elif components.get('volume_analysis', 0) < -0.5:
            signals.append("Volume divergence suggests caution")
        
        if components.get('volatility_regime', 0) < -0.5:
            signals.append("High volatility regime - Expect increased risk")
        
        if components.get('technical_indicators', 0) > 0.5:
            signals.append("Technical indicators align bullishly")
        elif components.get('technical_indicators', 0) < -0.5:
            signals.append("Technical indicators show bearish alignment")
        
        return signals
    
    def _create_neutral_sentiment(self, reason: str) -> SentimentSignal:
        """Create neutral sentiment result"""
        return SentimentSignal(
            sentiment_score=0.0,
            confidence=0.0,
            strength="weak",
            components={},
            signals=[f"Neutral sentiment: {reason}"]
        )

# Global sentiment analyzer
sentiment_analyzer = MarketSentimentAnalyzer()

def analyze_market_sentiment(prices: List[float], volumes: List[float] = None, 
                           market_data: Dict = None) -> Dict:
    """
    Main interface for market sentiment analysis
    """
    sentiment = sentiment_analyzer.analyze_sentiment(prices, volumes, market_data)
    
    return {
        'sentiment_score': sentiment.sentiment_score,
        'confidence': sentiment.confidence,
        'strength': sentiment.strength,
        'interpretation': 'bullish' if sentiment.sentiment_score > 0.1 else 'bearish' if sentiment.sentiment_score < -0.1 else 'neutral',
        'components': sentiment.components,
        'signals': sentiment.signals,
        'summary': {
            'overall_sentiment': sentiment.sentiment_score,
            'confidence_level': sentiment.confidence,
            'signal_strength': sentiment.strength,
            'key_drivers': [k for k, v in sentiment.components.items() if abs(v) > 0.3],
            'recommendation': sentiment.signals[0] if sentiment.signals else "No clear signal"
        }
    }