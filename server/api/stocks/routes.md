<div align="center">

# 🚀 **Gro API Documentation**
### *Advanced Stock Analysis & Portfolio Management*

<img src="https://img.shields.io/badge/Status-Active-10B981?style=for-the-badge&logo=checkmarx&logoColor=white" />
<img src="https://img.shields.io/badge/Endpoints-80+-10B981?style=for-the-badge&logo=api&logoColor=white" />
<img src="https://img.shields.io/badge/ML_Powered-Yes-10B981?style=for-the-badge&logo=tensorflow&logoColor=white" />

---

</div>

## 📊 **Basic Stock Data**
> *Essential market information and historical data*

| Endpoint | Description |
|----------|-------------|
| 🏷️ **data** | Returns current stock price, daily volume, market cap, 52-week high/low, and basic company information |
| 💹 **quote** | Provides real-time or near real-time stock quote with bid/ask spreads, last trade price, and timestamp |
| 📈 **historical** | Retrieves historical price data (OHLCV) for specified time periods with adjustable intervals |
| ✂️ **splits** | Returns chronological list of stock splits with split ratios and effective dates |
| 💰 **dividends** | Provides dividend payment history including amounts, ex-dates, and payment dates |

---

## 🔍 **Fundamental Analysis**

### 📋 **Financial Health Metrics**

| Endpoint | Description |
|----------|-------------|
| 📊 **ratios** | Calculates and returns P/E ratio, PEG ratio, Price-to-Book, and Price-to-Sales ratios with industry comparisons |
| 💧 **liquidity** | Analyzes company's ability to meet short-term obligations through current ratio, quick ratio, and debt-to-equity metrics |
| 💎 **profitability** | Measures management effectiveness through Return on Equity, Return on Assets, and Return on Invested Capital |
| 💸 **cashflow** | Evaluates cash generation ability via free cash flow, operating cash flow margins, and cash conversion cycle |
| 📈 **growth** | Tracks revenue and earnings growth rates over 1, 3, and 5-year periods with growth consistency analysis |
| 🎯 **dividends-analysis** | Analyzes dividend sustainability through yield, payout ratio, dividend coverage, and payment consistency |

### ⭐ **Quality Indicators**

| Endpoint | Description |
|----------|-------------|
| 🏆 **piotroski** | Calculates Piotroski F-Score (0-9) measuring financial strength across profitability, leverage, and operating efficiency |
| ⚠️ **altman** | Computes Altman Z-Score to assess bankruptcy risk using weighted financial ratios |
| 🛡️ **coverage** | Evaluates company's ability to service debt through interest coverage and debt service coverage ratios |
| ⚡ **efficiency** | Measures asset utilization through inventory turnover, receivables turnover, and total asset turnover ratios |

### 💡 **Graham Analysis**

| Endpoint | Description |
|----------|-------------|
| 📝 **graham-score** | Applies Benjamin Graham's value investing criteria including P/E limits, debt levels, and earnings stability |
| 💰 **intrinsic-value** | Calculates intrinsic value using Graham's formula incorporating earnings growth and bond yields |

---

## 📊 **Technical Analysis**

### 📈 **Price Action**

| Endpoint | Description |
|----------|-------------|
| 〰️ **moving-averages** | Computes Simple and Exponential Moving Averages for 20, 50, and 200-day periods with crossover signals |
| 🎯 **support-resistance** | Identifies key price levels using pivot points, volume-weighted levels, and historical turning points |
| 📊 **trend** | Analyzes price trend direction, strength, and momentum using trendlines and rate of change indicators |
| 💪 **relative-strength** | Compares stock performance against sector indices and broader market benchmarks |

### 🔧 **Technical Indicators**

| Endpoint | Description |
|----------|-------------|
| 🌊 **oscillators** | Calculates RSI, MACD, and Stochastic oscillators with overbought/oversold signals and divergence analysis |
| 📏 **bollinger** | Generates Bollinger Bands with upper/lower bounds, bandwidth, and squeeze/expansion signals |
| 📊 **volume-analysis** | Analyzes volume patterns through On-Balance Volume, Accumulation/Distribution line, and volume price trend |
| 🌪️ **volatility** | Measures price volatility using Average True Range, historical volatility, and implied volatility from options |

---

## ⚠️ **Risk Assessment**

### 🎲 **Market Risk**

| Endpoint | Description |
|----------|-------------|
| β **beta** | Calculates systematic risk (beta) measuring stock's sensitivity to market movements over multiple time periods |
| α **alpha** | Measures risk-adjusted excess returns (alpha) compared to expected returns based on CAPM model |
| 📉 **drawdown** | Analyzes maximum peak-to-trough decline, drawdown duration, and recovery time statistics |
| 🎯 **var** | Computes Value at Risk using historical simulation, parametric, and Monte Carlo methods for different confidence levels |
| 🔗 **correlations** | Calculates correlation coefficients with market indices, sectors, and individual risk factors |

### 🏢 **Specific Risk**

| Endpoint | Description |
|----------|-------------|
| 🏭 **sector-risk** | Evaluates concentration risk within specific sectors and industry exposure analysis |
| 🌍 **geographic-risk** | Assesses revenue exposure to different geographic regions and associated country risks |
| 💱 **currency-risk** | Analyzes exposure to foreign exchange fluctuations and currency hedging effectiveness |
| 💧 **liquidity-risk** | Measures trading liquidity through average daily volume, bid-ask spreads, and market impact costs |

### 🦋 **Tail Risk**

| Endpoint | Description |
|----------|-------------|
| 🎯 **tail-risk** | Quantifies extreme downside risk using Expected Shortfall, tail ratios, and extreme value theory |
| 💥 **stress-test** | Simulates performance under various stress scenarios including market crashes and economic shocks |

---

## 🧮 **Advanced Calculations**

### 🎲 **Monte Carlo**

| Endpoint | Description |
|----------|-------------|
| 💼 **portfolio** | Runs Monte Carlo simulations for portfolio outcomes using historical returns, correlations, and user-defined parameters |
| 📈 **stock** | Simulates individual stock price paths using geometric Brownian motion with customizable volatility and drift |
| 📊 **results** | Retrieves completed simulation results including probability distributions and confidence intervals |

### ⚫ **Black-Scholes**

| Endpoint | Description |
|----------|-------------|
| 🎯 **black-scholes** | Calculates theoretical options prices using Black-Scholes model with inputs for strike, expiry, volatility, and interest rates |
| 🔤 **greeks** | Computes option Greeks (Delta, Gamma, Theta, Vega, Rho) measuring price sensitivities to various factors |
| 🌊 **implied-volatility** | Derives implied volatility from market option prices using iterative numerical methods |

### 💹 **Returns Analysis**

| Endpoint | Description |
|----------|-------------|
| 📊 **returns** | Analyzes historical return distributions including skewness, kurtosis, and return statistics across time periods |
| ⚖️ **risk-adjusted-returns** | Calculates Sharpe ratio, Sortino ratio, Calmar ratio, and other risk-adjusted performance metrics |

---

## 🧠 **Sentiment & Alternative Data**

### 💭 **Sentiment Analysis**

| Endpoint | Description |
|----------|-------------|
| 📰 **news** | Processes news articles through NLP to generate sentiment scores and identify key themes affecting stock |
| 📱 **social** | Analyzes social media mentions, sentiment trends, and discussion volume across platforms like Twitter and Reddit |
| 👔 **analyst** | Tracks analyst recommendation changes, revision trends, and consensus estimate movements |
| 🎯 **insider** | Monitors insider trading activity including buys, sells, and filing patterns by corporate insiders |

---

## 🤖 **ML & Predictive**

### 🧠 **Machine Learning Models**

| Endpoint | Description |
|----------|-------------|
| 💰 **earnings-prediction** | Uses machine learning to predict earnings surprises based on historical patterns and market indicators |
| 🚀 **momentum-forecast** | Forecasts short-term price momentum using technical indicators and market microstructure data |
| 🌊 **volatility-prediction** | Predicts future volatility using LSTM networks trained on historical price and volume patterns |
| 🎯 **market-regime** | Identifies current market regime (bull/bear/sideways) using machine learning classification on market indicators |
| 🔄 **sector-rotation** | Predicts optimal timing for sector rotation based on economic indicators and market cycles |

---

## 📊 **Comparative & Sector Analysis**

### 👥 **Peer Analysis**

| Endpoint | Description |
|----------|-------------|
| ⚖️ **comparison** | Compares financial metrics, valuation ratios, and performance against industry peer companies |
| 🏃 **performance** | Analyzes sector performance relative to broader market with momentum and mean reversion indicators |
| 📋 **kpis** | Provides industry-specific Key Performance Indicators relevant to business model and competitive dynamics |

### 🌍 **Macro Analysis**

| Endpoint | Description |
|----------|-------------|
| 📈 **interest-sensitivity** | Measures stock's sensitivity to interest rate changes through duration analysis and correlation studies |
| 🔄 **cycle-position** | Evaluates stock's position within economic cycles and sensitivity to GDP, inflation, and employment data |
| 🛡️ **inflation-hedge** | Assesses stock's effectiveness as inflation hedge through correlation with inflation metrics and real returns |

---

## 💼 **Portfolio Management**

### 🏗️ **Portfolio Construction**

| Endpoint | Description |
|----------|-------------|
| ✨ **create** | Creates optimized portfolio using mean-variance optimization, risk parity, or other allocation methodologies |
| 🎯 **optimize** | Optimizes existing portfolio weights to maximize Sharpe ratio or meet specific risk/return targets |
| 📊 **analysis** | Provides comprehensive portfolio analysis including risk decomposition, factor exposures, and performance attribution |
| ⚖️ **rebalance** | Generates rebalancing recommendations based on drift from target weights and transaction cost analysis |

### 📏 **Position Sizing**

| Endpoint | Description |
|----------|-------------|
| 🎯 **kelly** | Calculates optimal position sizes using Kelly Criterion based on expected returns and win/loss probabilities |
| ⚖️ **risk-parity** | Determines position sizes that equalize risk contribution across portfolio holdings |
| 🔗 **correlation-impact** | Analyzes how adding new positions affects overall portfolio correlation and diversification |

---

## 📅 **Calendar & Events**

### 📈 **Market Events**

| Endpoint | Description |
|----------|-------------|
| 💰 **earnings** | Provides upcoming earnings announcement dates, analyst estimates, and historical earnings surprise data |
| 💎 **dividends** | Lists future ex-dividend dates, payment dates, and estimated dividend amounts |
| 📊 **economic-events** | Returns schedule of economic data releases that typically impact market movements |
| 🌿 **seasonal** | Identifies seasonal patterns in stock performance including monthly, quarterly, and annual trends |

---

## 🔍 **Screening & Search**

### 🎯 **Stock Screening**

| Endpoint | Description |
|----------|-------------|
| 📊 **fundamental** | Screens stocks based on fundamental criteria like P/E ratios, growth rates, debt levels, and profitability metrics |
| 📈 **technical** | Filters stocks using technical criteria including moving average crossovers, RSI levels, and momentum indicators |
| 🛠️ **custom** | Allows custom screening combinations of fundamental, technical, and alternative data criteria with user-defined thresholds |

---

<div align="center">

### 🌱 **Built with Gro**
*Where your money grows smarter*

<img src="https://img.shields.io/badge/Made_with-❤️-10B981?style=for-the-badge" />

</div>