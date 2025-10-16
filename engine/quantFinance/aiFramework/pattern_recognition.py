"""
Technical Pattern Recognition Module
Advanced pattern detection for stock market analysis

This module provides sophisticated pattern recognition capabilities including:
- Classic chart patterns (Head & Shoulders, Double Tops/Bottoms, Triangles)
- Support and Resistance detection
- Candlestick patterns
- Wave analysis
- Trend identification
"""

import numpy as np
import pandas as pd
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass
import math
from scipy.signal import find_peaks, argrelextrema
from scipy.stats import linregress

@dataclass
class PatternSignal:
    """Signal from pattern recognition"""
    pattern_type: str
    confidence: float
    signal_strength: float
    direction: str  # 'bullish', 'bearish', 'neutral'
    entry_point: float
    target_price: float
    stop_loss: float
    timeframe: int
    features: Dict

class TechnicalPatternRecognizer:
    """Advanced technical pattern recognition system"""
    
    def __init__(self):
        self.min_pattern_length = 10
        self.confidence_threshold = 0.7
        
        # Pattern parameters
        self.head_shoulders_tolerance = 0.05  # 5% tolerance for shoulders
        self.double_pattern_tolerance = 0.03  # 3% tolerance for double tops/bottoms
        self.triangle_convergence_threshold = 0.8
        
    def analyze_patterns(self, prices: List[float], highs: List[float] = None, 
                        lows: List[float] = None, volumes: List[float] = None) -> List[PatternSignal]:
        """
        Comprehensive pattern analysis
        """
        if len(prices) < self.min_pattern_length:
            return []
        
        patterns = []
        
        # Use prices for highs/lows if not provided
        if highs is None:
            highs = prices
        if lows is None:
            lows = prices
        
        # Convert to numpy arrays
        prices = np.array(prices)
        highs = np.array(highs)
        lows = np.array(lows)
        
        # Detect various patterns
        patterns.extend(self._detect_head_and_shoulders(prices, highs, lows))
        patterns.extend(self._detect_inverse_head_and_shoulders(prices, highs, lows))
        patterns.extend(self._detect_double_top(prices, highs))
        patterns.extend(self._detect_double_bottom(prices, lows))
        patterns.extend(self._detect_triangles(prices, highs, lows))
        patterns.extend(self._detect_flags_and_pennants(prices, volumes))
        patterns.extend(self._detect_cup_and_handle(prices))
        patterns.extend(self._detect_wedges(prices, highs, lows))
        
        # Filter by confidence
        filtered_patterns = [p for p in patterns if p.confidence >= self.confidence_threshold]
        
        # Sort by confidence
        filtered_patterns.sort(key=lambda x: x.confidence, reverse=True)
        
        return filtered_patterns
    
    def _detect_head_and_shoulders(self, prices: np.ndarray, highs: np.ndarray, lows: np.ndarray) -> List[PatternSignal]:
        """Detect Head and Shoulders pattern"""
        patterns = []
        
        try:
            # Find peaks (potential shoulders and head)
            peaks, properties = find_peaks(highs, distance=5, prominence=np.std(highs) * 0.3)
            
            if len(peaks) < 3:
                return patterns
            
            # Check each possible head and shoulders combination
            for i in range(len(peaks) - 2):
                left_shoulder_idx = peaks[i]
                head_idx = peaks[i + 1]
                right_shoulder_idx = peaks[i + 2]
                
                left_shoulder = highs[left_shoulder_idx]
                head = highs[head_idx]
                right_shoulder = highs[right_shoulder_idx]
                
                # Head should be higher than both shoulders
                if head <= max(left_shoulder, right_shoulder):
                    continue
                
                # Shoulders should be approximately equal
                shoulder_ratio = min(left_shoulder, right_shoulder) / max(left_shoulder, right_shoulder)
                if shoulder_ratio < (1 - self.head_shoulders_tolerance):
                    continue
                
                # Find neckline (troughs between shoulders and head)
                left_trough_start = max(0, left_shoulder_idx - 10)
                left_trough_end = min(len(lows), head_idx + 10)
                left_trough_idx = np.argmin(lows[left_trough_start:left_trough_end]) + left_trough_start
                
                right_trough_start = max(0, head_idx - 10)
                right_trough_end = min(len(lows), right_shoulder_idx + 10)
                right_trough_idx = np.argmin(lows[right_trough_start:right_trough_end]) + right_trough_start
                
                left_trough = lows[left_trough_idx]
                right_trough = lows[right_trough_idx]
                neckline = (left_trough + right_trough) / 2
                
                # Calculate pattern quality
                head_prominence = (head - max(left_shoulder, right_shoulder)) / head
                neckline_quality = 1 - abs(left_trough - right_trough) / max(left_trough, right_trough)
                
                confidence = (shoulder_ratio + head_prominence + neckline_quality) / 3
                
                if confidence >= self.confidence_threshold:
                    # Calculate targets
                    pattern_height = head - neckline
                    target_price = neckline - pattern_height
                    stop_loss = head * 1.02  # 2% above head
                    
                    patterns.append(PatternSignal(
                        pattern_type="Head and Shoulders",
                        confidence=confidence,
                        signal_strength=confidence * 0.9,
                        direction="bearish",
                        entry_point=neckline,
                        target_price=target_price,
                        stop_loss=stop_loss,
                        timeframe=right_shoulder_idx - left_shoulder_idx,
                        features={
                            'left_shoulder': float(left_shoulder),
                            'head': float(head),
                            'right_shoulder': float(right_shoulder),
                            'neckline': float(neckline),
                            'pattern_height': float(pattern_height),
                            'shoulder_ratio': float(shoulder_ratio)
                        }
                    ))
        
        except Exception as e:
            print(f"Error in head and shoulders detection: {e}")
        
        return patterns
    
    def _detect_inverse_head_and_shoulders(self, prices: np.ndarray, highs: np.ndarray, lows: np.ndarray) -> List[PatternSignal]:
        """Detect Inverse Head and Shoulders pattern"""
        patterns = []
        
        try:
            # Find troughs (potential shoulders and head)
            troughs, _ = find_peaks(-lows, distance=5, prominence=np.std(lows) * 0.3)
            
            if len(troughs) < 3:
                return patterns
            
            for i in range(len(troughs) - 2):
                left_shoulder_idx = troughs[i]
                head_idx = troughs[i + 1]
                right_shoulder_idx = troughs[i + 2]
                
                left_shoulder = lows[left_shoulder_idx]
                head = lows[head_idx]
                right_shoulder = lows[right_shoulder_idx]
                
                # Head should be lower than both shoulders
                if head >= min(left_shoulder, right_shoulder):
                    continue
                
                # Shoulders should be approximately equal
                shoulder_ratio = min(left_shoulder, right_shoulder) / max(left_shoulder, right_shoulder)
                if shoulder_ratio < (1 - self.head_shoulders_tolerance):
                    continue
                
                # Find neckline (peaks between shoulders and head)
                left_peak_start = max(0, left_shoulder_idx - 10)
                left_peak_end = min(len(highs), head_idx + 10)
                left_peak_idx = np.argmax(highs[left_peak_start:left_peak_end]) + left_peak_start
                
                right_peak_start = max(0, head_idx - 10)
                right_peak_end = min(len(highs), right_shoulder_idx + 10)
                right_peak_idx = np.argmax(highs[right_peak_start:right_peak_end]) + right_peak_start
                
                left_peak = highs[left_peak_idx]
                right_peak = highs[right_peak_idx]
                neckline = (left_peak + right_peak) / 2
                
                # Calculate pattern quality
                head_depth = (min(left_shoulder, right_shoulder) - head) / min(left_shoulder, right_shoulder)
                neckline_quality = 1 - abs(left_peak - right_peak) / max(left_peak, right_peak)
                
                confidence = (shoulder_ratio + head_depth + neckline_quality) / 3
                
                if confidence >= self.confidence_threshold:
                    # Calculate targets
                    pattern_height = neckline - head
                    target_price = neckline + pattern_height
                    stop_loss = head * 0.98  # 2% below head
                    
                    patterns.append(PatternSignal(
                        pattern_type="Inverse Head and Shoulders",
                        confidence=confidence,
                        signal_strength=confidence * 0.9,
                        direction="bullish",
                        entry_point=neckline,
                        target_price=target_price,
                        stop_loss=stop_loss,
                        timeframe=right_shoulder_idx - left_shoulder_idx,
                        features={
                            'left_shoulder': float(left_shoulder),
                            'head': float(head),
                            'right_shoulder': float(right_shoulder),
                            'neckline': float(neckline),
                            'pattern_height': float(pattern_height),
                            'shoulder_ratio': float(shoulder_ratio)
                        }
                    ))
        
        except Exception as e:
            print(f"Error in inverse head and shoulders detection: {e}")
        
        return patterns
    
    def _detect_double_top(self, prices: np.ndarray, highs: np.ndarray) -> List[PatternSignal]:
        """Detect Double Top pattern"""
        patterns = []
        
        try:
            peaks, _ = find_peaks(highs, distance=10, prominence=np.std(highs) * 0.2)
            
            if len(peaks) < 2:
                return patterns
            
            for i in range(len(peaks) - 1):
                peak1_idx = peaks[i]
                peak2_idx = peaks[i + 1]
                
                peak1 = highs[peak1_idx]
                peak2 = highs[peak2_idx]
                
                # Peaks should be approximately equal
                peak_ratio = min(peak1, peak2) / max(peak1, peak2)
                if peak_ratio < (1 - self.double_pattern_tolerance):
                    continue
                
                # Find trough between peaks
                trough_start = peak1_idx
                trough_end = peak2_idx
                trough_idx = np.argmin(lows[trough_start:trough_end + 1]) + trough_start
                trough_level = lows[trough_idx]
                
                # Trough should be significantly below peaks
                trough_depth = (min(peak1, peak2) - trough_level) / min(peak1, peak2)
                if trough_depth < 0.05:  # At least 5% correction
                    continue
                
                confidence = (peak_ratio + trough_depth) / 2
                
                if confidence >= self.confidence_threshold:
                    pattern_height = min(peak1, peak2) - trough_level
                    target_price = trough_level - pattern_height
                    stop_loss = max(peak1, peak2) * 1.02
                    
                    patterns.append(PatternSignal(
                        pattern_type="Double Top",
                        confidence=confidence,
                        signal_strength=confidence * 0.85,
                        direction="bearish",
                        entry_point=trough_level,
                        target_price=target_price,
                        stop_loss=stop_loss,
                        timeframe=peak2_idx - peak1_idx,
                        features={
                            'peak1': float(peak1),
                            'peak2': float(peak2),
                            'trough': float(trough_level),
                            'peak_ratio': float(peak_ratio),
                            'trough_depth': float(trough_depth)
                        }
                    ))
        
        except Exception as e:
            print(f"Error in double top detection: {e}")
        
        return patterns
    
    def _detect_double_bottom(self, prices: np.ndarray, lows: np.ndarray) -> List[PatternSignal]:
        """Detect Double Bottom pattern"""
        patterns = []
        
        try:
            troughs, _ = find_peaks(-lows, distance=10, prominence=np.std(lows) * 0.2)
            
            if len(troughs) < 2:
                return patterns
            
            for i in range(len(troughs) - 1):
                trough1_idx = troughs[i]
                trough2_idx = troughs[i + 1]
                
                trough1 = lows[trough1_idx]
                trough2 = lows[trough2_idx]
                
                # Troughs should be approximately equal
                trough_ratio = min(trough1, trough2) / max(trough1, trough2)
                if trough_ratio < (1 - self.double_pattern_tolerance):
                    continue
                
                # Find peak between troughs
                peak_start = trough1_idx
                peak_end = trough2_idx
                peak_idx = np.argmax(highs[peak_start:peak_end + 1]) + peak_start
                peak_level = highs[peak_idx]
                
                # Peak should be significantly above troughs
                peak_height = (peak_level - max(trough1, trough2)) / max(trough1, trough2)
                if peak_height < 0.05:  # At least 5% rally
                    continue
                
                confidence = (trough_ratio + peak_height) / 2
                
                if confidence >= self.confidence_threshold:
                    pattern_height = peak_level - max(trough1, trough2)
                    target_price = peak_level + pattern_height
                    stop_loss = min(trough1, trough2) * 0.98
                    
                    patterns.append(PatternSignal(
                        pattern_type="Double Bottom",
                        confidence=confidence,
                        signal_strength=confidence * 0.85,
                        direction="bullish",
                        entry_point=peak_level,
                        target_price=target_price,
                        stop_loss=stop_loss,
                        timeframe=trough2_idx - trough1_idx,
                        features={
                            'trough1': float(trough1),
                            'trough2': float(trough2),
                            'peak': float(peak_level),
                            'trough_ratio': float(trough_ratio),
                            'peak_height': float(peak_height)
                        }
                    ))
        
        except Exception as e:
            print(f"Error in double bottom detection: {e}")
        
        return patterns
    
    def _detect_triangles(self, prices: np.ndarray, highs: np.ndarray, lows: np.ndarray) -> List[PatternSignal]:
        """Detect Triangle patterns (Ascending, Descending, Symmetrical)"""
        patterns = []
        
        try:
            if len(prices) < 30:
                return patterns
            
            # Use recent data for triangle detection
            lookback = min(50, len(prices))
            recent_highs = highs[-lookback:]
            recent_lows = lows[-lookback:]
            recent_prices = prices[-lookback:]
            
            # Find highs and lows
            high_peaks, _ = find_peaks(recent_highs, distance=3)
            low_troughs, _ = find_peaks(-recent_lows, distance=3)
            
            if len(high_peaks) < 3 or len(low_troughs) < 3:
                return patterns
            
            # Get recent peaks and troughs
            recent_high_peaks = high_peaks[-4:] if len(high_peaks) >= 4 else high_peaks
            recent_low_troughs = low_troughs[-4:] if len(low_troughs) >= 4 else low_troughs
            
            # Calculate trend lines
            high_values = recent_highs[recent_high_peaks]
            low_values = recent_lows[recent_low_troughs]
            
            # Linear regression for trend lines
            if len(recent_high_peaks) >= 2:
                high_slope, high_intercept, high_r, _, _ = linregress(recent_high_peaks, high_values)
            else:
                high_slope, high_r = 0, 0
            
            if len(recent_low_troughs) >= 2:
                low_slope, low_intercept, low_r, _, _ = linregress(recent_low_troughs, low_values)
            else:
                low_slope, low_r = 0, 0
            
            # Determine triangle type and quality
            high_trend_quality = abs(high_r) if not math.isnan(high_r) else 0
            low_trend_quality = abs(low_r) if not math.isnan(low_r) else 0
            
            convergence = abs(high_slope - low_slope)
            
            # Triangle classification
            triangle_type = "symmetrical"
            direction = "neutral"
            
            if abs(high_slope) < 0.1 and low_slope > 0.1:  # Ascending triangle
                triangle_type = "ascending"
                direction = "bullish"
            elif high_slope < -0.1 and abs(low_slope) < 0.1:  # Descending triangle
                triangle_type = "descending"
                direction = "bearish"
            elif high_slope < -0.1 and low_slope > 0.1:  # Symmetrical triangle
                triangle_type = "symmetrical"
                direction = "neutral"
            
            # Calculate confidence
            trend_quality = (high_trend_quality + low_trend_quality) / 2
            convergence_quality = min(convergence / 2.0, 1.0)
            confidence = trend_quality * convergence_quality
            
            if confidence >= self.confidence_threshold and len(recent_high_peaks) >= 2 and len(recent_low_troughs) >= 2:
                # Calculate breakout levels and targets
                current_high = recent_highs[-1]
                current_low = recent_lows[-1]
                
                if triangle_type == "ascending":
                    resistance_level = np.mean(high_values[-2:])
                    entry_point = resistance_level
                    target_price = resistance_level + (resistance_level - np.mean(low_values[-2:]))
                    stop_loss = np.mean(low_values[-2:])
                elif triangle_type == "descending":
                    support_level = np.mean(low_values[-2:])
                    entry_point = support_level
                    target_price = support_level - (np.mean(high_values[-2:]) - support_level)
                    stop_loss = np.mean(high_values[-2:])
                else:  # Symmetrical
                    entry_point = (current_high + current_low) / 2
                    pattern_height = np.mean(high_values) - np.mean(low_values)
                    target_price = entry_point + pattern_height if recent_prices[-1] > entry_point else entry_point - pattern_height
                    stop_loss = entry_point - pattern_height if recent_prices[-1] > entry_point else entry_point + pattern_height
                
                patterns.append(PatternSignal(
                    pattern_type=f"{triangle_type.title()} Triangle",
                    confidence=confidence,
                    signal_strength=confidence * 0.75,
                    direction=direction,
                    entry_point=entry_point,
                    target_price=target_price,
                    stop_loss=stop_loss,
                    timeframe=len(recent_prices),
                    features={
                        'triangle_type': triangle_type,
                        'high_slope': float(high_slope),
                        'low_slope': float(low_slope),
                        'convergence': float(convergence),
                        'high_trend_quality': float(high_trend_quality),
                        'low_trend_quality': float(low_trend_quality)
                    }
                ))
        
        except Exception as e:
            print(f"Error in triangle detection: {e}")
        
        return patterns
    
    def _detect_flags_and_pennants(self, prices: np.ndarray, volumes: Optional[np.ndarray] = None) -> List[PatternSignal]:
        """Detect Flag and Pennant patterns"""
        patterns = []
        
        try:
            if len(prices) < 20:
                return patterns
            
            # Look for strong moves followed by consolidation
            returns = np.diff(prices) / prices[:-1]
            
            # Find strong moves (flagpoles)
            strong_move_threshold = 2 * np.std(returns)
            
            for i in range(10, len(returns) - 10):
                # Check for strong move
                recent_move = np.sum(returns[i-5:i])
                
                if abs(recent_move) > strong_move_threshold:
                    # Check for consolidation after strong move
                    consolidation_period = returns[i:i+10]
                    consolidation_volatility = np.std(consolidation_period)
                    
                    if consolidation_volatility < np.std(returns) * 0.5:
                        # This looks like a flag/pennant
                        direction = "bullish" if recent_move > 0 else "bearish"
                        
                        # Calculate pattern metrics
                        flagpole_length = abs(recent_move)
                        consolidation_strength = 1 - (consolidation_volatility / np.std(returns))
                        
                        confidence = min(flagpole_length / strong_move_threshold, 1.0) * consolidation_strength
                        
                        if confidence >= self.confidence_threshold:
                            entry_point = prices[i + 10]
                            target_move = flagpole_length * prices[i]
                            
                            if direction == "bullish":
                                target_price = entry_point + target_move
                                stop_loss = prices[i] * 0.95
                            else:
                                target_price = entry_point - target_move
                                stop_loss = prices[i] * 1.05
                            
                            patterns.append(PatternSignal(
                                pattern_type="Flag/Pennant",
                                confidence=confidence,
                                signal_strength=confidence * 0.8,
                                direction=direction,
                                entry_point=entry_point,
                                target_price=target_price,
                                stop_loss=stop_loss,
                                timeframe=15,
                                features={
                                    'flagpole_length': float(flagpole_length),
                                    'consolidation_volatility': float(consolidation_volatility),
                                    'recent_move': float(recent_move)
                                }
                            ))
        
        except Exception as e:
            print(f"Error in flag/pennant detection: {e}")
        
        return patterns
    
    def _detect_cup_and_handle(self, prices: np.ndarray) -> List[PatternSignal]:
        """Detect Cup and Handle pattern"""
        patterns = []
        
        try:
            if len(prices) < 50:
                return patterns
            
            # Look for cup pattern (U-shaped)
            lookback = min(100, len(prices))
            recent_prices = prices[-lookback:]
            
            # Find potential cup start and end
            for cup_length in range(30, len(recent_prices) - 10):
                cup_prices = recent_prices[:cup_length]
                
                # Cup should start and end at similar levels
                start_level = cup_prices[0]
                end_level = cup_prices[-1]
                level_similarity = min(start_level, end_level) / max(start_level, end_level)
                
                if level_similarity < 0.95:
                    continue
                
                # Find the bottom of the cup
                bottom_idx = np.argmin(cup_prices)
                bottom_level = cup_prices[bottom_idx]
                
                # Cup depth should be significant
                cup_depth = (start_level - bottom_level) / start_level
                if cup_depth < 0.15:  # At least 15% correction
                    continue
                
                # Check for handle formation after cup
                handle_start = cup_length
                handle_end = min(handle_start + 15, len(recent_prices))
                
                if handle_end <= handle_start:
                    continue
                
                handle_prices = recent_prices[handle_start:handle_end]
                handle_high = np.max(handle_prices)
                handle_low = np.min(handle_prices)
                
                # Handle should be smaller correction than cup
                handle_depth = (handle_high - handle_low) / handle_high
                if handle_depth > cup_depth * 0.5:  # Handle should be less than half cup depth
                    continue
                
                # Calculate confidence
                cup_symmetry = 1 - abs(bottom_idx - cup_length / 2) / (cup_length / 2)
                confidence = (level_similarity + cup_symmetry + (1 - handle_depth / cup_depth)) / 3
                
                if confidence >= self.confidence_threshold:
                    entry_point = handle_high
                    cup_height = start_level - bottom_level
                    target_price = entry_point + cup_height
                    stop_loss = handle_low * 0.95
                    
                    patterns.append(PatternSignal(
                        pattern_type="Cup and Handle",
                        confidence=confidence,
                        signal_strength=confidence * 0.85,
                        direction="bullish",
                        entry_point=entry_point,
                        target_price=target_price,
                        stop_loss=stop_loss,
                        timeframe=cup_length + len(handle_prices),
                        features={
                            'cup_depth': float(cup_depth),
                            'handle_depth': float(handle_depth),
                            'cup_symmetry': float(cup_symmetry),
                            'start_level': float(start_level),
                            'bottom_level': float(bottom_level)
                        }
                    ))
                    break  # Found a pattern, move on
        
        except Exception as e:
            print(f"Error in cup and handle detection: {e}")
        
        return patterns
    
    def _detect_wedges(self, prices: np.ndarray, highs: np.ndarray, lows: np.ndarray) -> List[PatternSignal]:
        """Detect Rising and Falling Wedge patterns"""
        patterns = []
        
        try:
            if len(prices) < 25:
                return patterns
            
            lookback = min(50, len(prices))
            recent_highs = highs[-lookback:]
            recent_lows = lows[-lookback:]
            recent_prices = prices[-lookback:]
            
            # Find peaks and troughs
            peaks, _ = find_peaks(recent_highs, distance=3)
            troughs, _ = find_peaks(-recent_lows, distance=3)
            
            if len(peaks) < 3 or len(troughs) < 3:
                return patterns
            
            # Get recent peaks and troughs
            recent_peaks = peaks[-4:] if len(peaks) >= 4 else peaks
            recent_troughs = troughs[-4:] if len(troughs) >= 4 else troughs
            
            # Calculate trend lines
            peak_values = recent_highs[recent_peaks]
            trough_values = recent_lows[recent_troughs]
            
            # Linear regression
            if len(recent_peaks) >= 2:
                peak_slope, _, peak_r, _, _ = linregress(recent_peaks, peak_values)
            else:
                return patterns
            
            if len(recent_troughs) >= 2:
                trough_slope, _, trough_r, _, _ = linregress(recent_troughs, trough_values)
            else:
                return patterns
            
            # Wedge identification
            # Rising wedge: both slopes positive, converging upward
            # Falling wedge: both slopes negative, converging downward
            
            wedge_type = None
            direction = "neutral"
            
            if peak_slope > 0 and trough_slope > 0 and peak_slope < trough_slope:
                wedge_type = "rising"
                direction = "bearish"  # Rising wedges are typically bearish
            elif peak_slope < 0 and trough_slope < 0 and peak_slope > trough_slope:
                wedge_type = "falling"
                direction = "bullish"  # Falling wedges are typically bullish
            
            if wedge_type:
                # Calculate quality metrics
                trend_quality = (abs(peak_r) + abs(trough_r)) / 2
                convergence = abs(peak_slope - trough_slope)
                
                confidence = trend_quality * min(convergence / 1.0, 1.0)
                
                if confidence >= self.confidence_threshold:
                    # Calculate targets
                    current_price = recent_prices[-1]
                    
                    if wedge_type == "rising":
                        # Expect breakdown
                        support_level = np.mean(trough_values[-2:])
                        entry_point = support_level
                        target_price = support_level - (np.mean(peak_values) - support_level)
                        stop_loss = np.mean(peak_values[-2:])
                    else:  # falling wedge
                        # Expect breakout
                        resistance_level = np.mean(peak_values[-2:])
                        entry_point = resistance_level
                        target_price = resistance_level + (resistance_level - np.mean(trough_values))
                        stop_loss = np.mean(trough_values[-2:])
                    
                    patterns.append(PatternSignal(
                        pattern_type=f"{wedge_type.title()} Wedge",
                        confidence=confidence,
                        signal_strength=confidence * 0.75,
                        direction=direction,
                        entry_point=entry_point,
                        target_price=target_price,
                        stop_loss=stop_loss,
                        timeframe=len(recent_prices),
                        features={
                            'wedge_type': wedge_type,
                            'peak_slope': float(peak_slope),
                            'trough_slope': float(trough_slope),
                            'convergence': float(convergence),
                            'trend_quality': float(trend_quality)
                        }
                    ))
        
        except Exception as e:
            print(f"Error in wedge detection: {e}")
        
        return patterns
    
    def detect_support_resistance(self, prices: List[float], strength_threshold: float = 2) -> Dict:
        """
        Detect support and resistance levels
        """
        prices = np.array(prices)
        
        # Find local maxima and minima
        maxima_idx = argrelextrema(prices, np.greater, order=5)[0]
        minima_idx = argrelextrema(prices, np.less, order=5)[0]
        
        resistance_levels = []
        support_levels = []
        
        # Group similar levels
        tolerance = np.std(prices) * 0.02  # 2% tolerance
        
        # Process resistance levels
        if len(maxima_idx) > 0:
            maxima_prices = prices[maxima_idx]
            
            for price in maxima_prices:
                # Find other maxima within tolerance
                similar_levels = maxima_prices[np.abs(maxima_prices - price) <= tolerance]
                
                if len(similar_levels) >= strength_threshold:
                    level_strength = len(similar_levels)
                    avg_level = np.mean(similar_levels)
                    
                    # Check if this level already exists
                    exists = any(abs(existing['level'] - avg_level) <= tolerance for existing in resistance_levels)
                    
                    if not exists:
                        resistance_levels.append({
                            'level': float(avg_level),
                            'strength': int(level_strength),
                            'touches': similar_levels.tolist()
                        })
        
        # Process support levels
        if len(minima_idx) > 0:
            minima_prices = prices[minima_idx]
            
            for price in minima_prices:
                # Find other minima within tolerance
                similar_levels = minima_prices[np.abs(minima_prices - price) <= tolerance]
                
                if len(similar_levels) >= strength_threshold:
                    level_strength = len(similar_levels)
                    avg_level = np.mean(similar_levels)
                    
                    # Check if this level already exists
                    exists = any(abs(existing['level'] - avg_level) <= tolerance for existing in support_levels)
                    
                    if not exists:
                        support_levels.append({
                            'level': float(avg_level),
                            'strength': int(level_strength),
                            'touches': similar_levels.tolist()
                        })
        
        # Sort by strength
        resistance_levels.sort(key=lambda x: x['strength'], reverse=True)
        support_levels.sort(key=lambda x: x['strength'], reverse=True)
        
        return {
            'resistance_levels': resistance_levels,
            'support_levels': support_levels,
            'current_price': float(prices[-1])
        }

# Global pattern recognizer instance
pattern_recognizer = TechnicalPatternRecognizer()

def analyze_stock_patterns(prices: List[float], highs: List[float] = None, 
                          lows: List[float] = None, volumes: List[float] = None) -> Dict:
    """
    Main interface for stock pattern analysis
    """
    patterns = pattern_recognizer.analyze_patterns(prices, highs, lows, volumes)
    support_resistance = pattern_recognizer.detect_support_resistance(prices)
    
    return {
        'patterns': [
            {
                'type': p.pattern_type,
                'confidence': p.confidence,
                'signal_strength': p.signal_strength,
                'direction': p.direction,
                'entry_point': p.entry_point,
                'target_price': p.target_price,
                'stop_loss': p.stop_loss,
                'timeframe': p.timeframe,
                'features': p.features
            } for p in patterns
        ],
        'support_resistance': support_resistance,
        'summary': {
            'total_patterns': len(patterns),
            'bullish_patterns': len([p for p in patterns if p.direction == 'bullish']),
            'bearish_patterns': len([p for p in patterns if p.direction == 'bearish']),
            'avg_confidence': np.mean([p.confidence for p in patterns]) if patterns else 0,
            'strongest_signal': max(patterns, key=lambda x: x.signal_strength).pattern_type if patterns else None
        }
    }