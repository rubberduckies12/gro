import 'package:flutter/material.dart';
import 'package:velocity_x/velocity_x.dart';
import 'package:fl_chart/fl_chart.dart';
import 'home.dart'; // For colors

// Move this outside the class!
const List<Portfolio> portfolios = [
  Portfolio(
    name: 'Retirement Fund',
    description: 'Long-term savings for retirement',
    growth: [10000, 10500, 11000, 12000, 12500, 13000, 13500],
  ),
  Portfolio(
    name: 'High Risk',
    description: 'Crypto & Growth Stocks',
    growth: [5000, 6000, 4000, 7000, 6500, 8000, 7500],
  ),
  Portfolio(
    name: 'Low Risk',
    description: 'Bonds & Index Funds',
    growth: [3000, 3100, 3200, 3300, 3400, 3500, 3600],
  ),
];

class PortfolioScreen extends StatelessWidget {
  const PortfolioScreen({Key? key}) : super(key: key);

  List<double> get overallGrowth {
    final length = portfolios[0].growth.length;
    return List.generate(length, (i) =>
      portfolios.map((p) => p.growth[i]).reduce((a, b) => a + b)
    );
  }

  double get overallStart => overallGrowth.first;
  double get overallEnd => overallGrowth.last;
  double get overallChange => overallEnd - overallStart;
  double get overallPercent => overallStart == 0 ? 0 : (overallChange / overallStart) * 100;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kBackgroundColor,
      appBar: AppBar(
        backgroundColor: kBackgroundColor,
        elevation: 0,
        centerTitle: true,
        title: "Gro"
            .text
            .xl2
            .semiBold
            .color(kHeadingColor)
            .letterSpacing(1.2)
            .make(),
      ),
      body: VStack([
        // Remove welcome message, just show "My Portfolios"
        "My Portfolios"
            .text
            .xl
            .semiBold
            .color(kHeadingColor)
            .make()
            .box
            .width(400)
            .make()
            .centered(),
        16.heightBox,
        VStack([
          "Overall Portfolio Growth".text.lg.semiBold.color(kHeadingColor).make(),
          8.heightBox,
          PortfolioLineChart(
            data: overallGrowth,
            showNumbers: true,
            startValue: overallStart,
            endValue: overallEnd,
            percentChange: overallPercent,
          ),
        ])
            .box
            .color(kCardColor)
            .roundedLg
            .p24
            .width(400)
            .make()
            .centered(),
        24.heightBox,
        ...portfolios.map((p) => PortfolioCard(portfolio: p)).toList(),
      ])
          .scrollVertical()
          .p20(),
    );
  }
}

class Portfolio {
  final String name;
  final String description;
  final List<double> growth;

  const Portfolio({
    required this.name,
    required this.description,
    required this.growth,
  });
}

class PortfolioLineChart extends StatelessWidget {
  final List<double> data;
  final bool showNumbers;
  final double? startValue;
  final double? endValue;
  final double? percentChange;

  const PortfolioLineChart({
    Key? key,
    required this.data,
    this.showNumbers = false,
    this.startValue,
    this.endValue,
    this.percentChange,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Color lineColor;
    if (data.last > data.first) {
      lineColor = kPositiveColor;
    } else if (data.last < data.first) {
      lineColor = kNegativeColor;
    } else {
      lineColor = Colors.black;
    }

    return VStack([
      if (showNumbers && startValue != null && endValue != null && percentChange != null)
        HStack([
          "Start: £${startValue!.toStringAsFixed(2)}"
              .text
              .color(kBodyTextColor)
              .make(),
          Spacer(),
          "End: £${endValue!.toStringAsFixed(2)}"
              .text
              .color(kBodyTextColor)
              .make(),
          Spacer(),
          "${percentChange! >= 0 ? '+' : ''}${percentChange!.toStringAsFixed(2)}%"
              .text
              .color(percentChange! > 0
                  ? kPositiveColor
                  : percentChange! < 0
                      ? kNegativeColor
                      : Colors.black)
              .bold
              .make(),
        ]),
      SizedBox(
        height: 180,
        child: LineChart(
          LineChartData(
            gridData: FlGridData(show: false),
            titlesData: FlTitlesData(show: false),
            borderData: FlBorderData(show: false),
            lineTouchData: LineTouchData(
              touchTooltipData: LineTouchTooltipData(
                tooltipBgColor: Colors.white,
                getTooltipItems: (touchedSpots) => touchedSpots.map((spot) {
                  return LineTooltipItem(
                    '£${spot.y.toStringAsFixed(2)}',
                    TextStyle(
                      color: lineColor,
                      fontWeight: FontWeight.bold,
                    ),
                  );
                }).toList(),
              ),
              handleBuiltInTouches: true,
            ),
            lineBarsData: [
              LineChartBarData(
                spots: [
                  for (int i = 0; i < data.length; i++)
                    FlSpot(i.toDouble(), data[i]),
                ],
                isCurved: true,
                color: lineColor,
                barWidth: 4,
                dotData: FlDotData(show: false),
                belowBarData: BarAreaData(show: false),
              ),
            ],
          ),
        ),
      ),
    ]);
  }
}

// PortfolioCard matches the style of ActivityListTile in home.dart
class PortfolioCard extends StatelessWidget {
  final Portfolio portfolio;
  const PortfolioCard({Key? key, required this.portfolio}) : super(key: key);

  void _showSellDialog(BuildContext context) {
    String amount = '';
    showDialog(
      context: context,
      builder: (context) => Dialog(
        backgroundColor: kCardColor,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: StatefulBuilder(
            builder: (context, setState) => Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                "Sell from ${portfolio.name}"
                    .text
                    .xl
                    .semiBold
                    .color(kHeadingColor)
                    .make(),
                16.heightBox,
                TextField(
                  decoration: const InputDecoration(
                    labelText: "Amount to Sell",
                    prefixText: "£",
                    border: OutlineInputBorder(),
                  ),
                  keyboardType: TextInputType.numberWithOptions(decimal: true),
                  onChanged: (val) => amount = val,
                ),
                24.heightBox,
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: kAccentColor,
                    foregroundColor: Colors.white,
                    minimumSize: const Size.fromHeight(44),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                  onPressed: () {
                    Navigator.of(context).pop();
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text("£$amount sold from ${portfolio.name} (demo)."),
                      ),
                    );
                  },
                  child: const Text("Confirm Sell"),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final start = portfolio.growth.first;
    final end = portfolio.growth.last;
    final change = end - start;
    final percent = start == 0 ? 0 : (change / start) * 100;
    Color percentColor = percent > 0
        ? kPositiveColor
        : percent < 0
            ? kNegativeColor
            : Colors.black;

    return GestureDetector(
      onTap: () {
        showDialog(
          context: context,
          builder: (context) => Dialog(
            backgroundColor: kCardColor,
            insetPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20),
            ),
            child: LayoutBuilder(
              builder: (context, constraints) => SingleChildScrollView(
                child: Container(
                  constraints: const BoxConstraints(
                    maxWidth: 350,
                  ),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      // Header
                      Container(
                        decoration: BoxDecoration(
                          color: kAccentColor.withOpacity(0.08),
                          borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
                        ),
                        padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
                        child: Row(
                          children: [
                            CircleAvatar(
                              backgroundColor: kCardColor,
                              radius: 24,
                              child: Icon(
                                percent > 0
                                    ? Icons.trending_up
                                    : percent < 0
                                        ? Icons.trending_down
                                        : Icons.trending_flat,
                                color: percentColor,
                                size: 28,
                              ),
                            ),
                            const SizedBox(width: 16),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  portfolio.name.text.xl.semiBold.color(kHeadingColor).make(),
                                  portfolio.description.text.color(kBodyTextColor).make(),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 12),
                      // Chart
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        child: PortfolioLineChart(
                          data: portfolio.growth,
                          showNumbers: true,
                          startValue: start,
                          endValue: end,
                          percentChange: percent.toDouble(),
                        ),
                      ),
                      const SizedBox(height: 16),
                      // Stats
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        child: Row(
                          children: [
                            "Start: £${start.toStringAsFixed(2)}"
                                .text
                                .color(kBodyTextColor)
                                .make(),
                            const Spacer(),
                            "End: £${end.toStringAsFixed(2)}"
                                .text
                                .color(kBodyTextColor)
                                .make(),
                            const Spacer(),
                            "${percent >= 0 ? '+' : ''}${percent.toStringAsFixed(2)}%"
                                .text
                                .color(percentColor)
                                .bold
                                .make(),
                          ],
                        ),
                      ),
                      const SizedBox(height: 24),
                      // Sell button
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        child: ElevatedButton.icon(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.redAccent,
                            foregroundColor: Colors.white,
                            minimumSize: const Size.fromHeight(44),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10),
                            ),
                          ),
                          icon: const Icon(Icons.sell),
                          label: const Text("Sell"),
                          onPressed: () => _showSellDialog(context),
                        ),
                      ),
                      const SizedBox(height: 12),
                      // Close button
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        child: ElevatedButton.icon(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: kAccentColor,
                            foregroundColor: Colors.white,
                            minimumSize: const Size.fromHeight(44),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10),
                            ),
                          ),
                          icon: const Icon(Icons.close),
                          label: const Text("Close"),
                          onPressed: () => Navigator.of(context).pop(),
                        ),
                      ),
                      const SizedBox(height: 16),
                    ],
                  ),
                ),
              ),
            ),
          ),
        );
      },
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: kCardColor,
          child: Icon(
            percent > 0
                ? Icons.trending_up
                : percent < 0
                    ? Icons.trending_down
                    : Icons.trending_flat,
            color: percent > 0
                ? kPositiveColor
                : percent < 0
                    ? kNegativeColor
                    : Colors.black,
          ),
        ),
        title: portfolio.name.text.color(kHeadingColor).semiBold.size(16).make(),
        subtitle: portfolio.description.text.color(kBodyTextColor).size(14).make(),
        trailing: ('${percent >= 0 ? '+' : ''}${percent.toStringAsFixed(2)}%')
            .text
            .color(percentColor)
            .bold
            .size(16)
            .make(),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(14),
        ),
        tileColor: kCardColor,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      ).box.padding(const EdgeInsets.all(6)).make(),
    );
  }
}