import 'package:flutter/material.dart';
import 'package:velocity_x/velocity_x.dart';

const kBackgroundColor = Color(0xFFF5F5F5); // Light gray
const kCardColor = Colors.white; // Card white
const kAccentColor = Color(0xFF2ECC40); // Emerald green
const kHeadingColor = Colors.black; // <-- Changed to black
const kBodyTextColor = Colors.black87; // <-- Changed to dark gray
const kPositiveColor = Color(0xFF2ECC40); // Emerald green
const kNegativeColor = Color(0xFFD32F2F); // Red

class HomeScreen extends StatelessWidget {
  final double balance;
  final List<ActivityItem> activities;

  const HomeScreen({
    Key? key,
    this.balance = 12500.75,
    this.activities = const [
      ActivityItem(
        icon: Icons.trending_up,
        title: 'Retirement Fund',
        subtitle: 'Long-term savings',
        amount: 15000.00,
      ),
      ActivityItem(
        icon: Icons.trending_down,
        title: 'High Risk',
        subtitle: 'Crypto & Growth Stocks',
        amount: -800.00,
      ),
      ActivityItem(
        icon: Icons.trending_up,
        title: 'Low Risk',
        subtitle: 'Bonds & Index Funds',
        amount: 1200.00,
      ),
    ],
  }) : super(key: key);

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
        // Add welcome message at the top
        "Welcome, User"
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
        PortfolioBalanceCard(balance: balance)
            .box
            .width(400)
            .make()
            .centered(),
        24.heightBox,
        QuickActionsRow(),
        32.heightBox,
        "My Portfolios"
            .text
            .lg
            .semiBold
            .color(kHeadingColor)
            .make(),
        12.heightBox,
        ...activities.map((a) => ActivityListTile(item: a)).toList(),
      ])
          .scrollVertical()
          .p20(),
    );
  }
}

class PortfolioBalanceCard extends StatelessWidget {
  final double balance;
  const PortfolioBalanceCard({Key? key, required this.balance}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return VStack([
      "£${balance.toStringAsFixed(2)}"
          .text
          .xl4
          .bold
          .color(kHeadingColor)
          .letterSpacing(1.1)
          .make(),
      8.heightBox,
      "Total Balance"
          .text
          .color(kBodyTextColor)
          .size(16)
          .make(),
    ])
        .box
        .color(kCardColor)
        .roundedLg
        .shadowLg
        .p24
        .make();
  }
}

class QuickActionsRow extends StatelessWidget {
  const QuickActionsRow({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // List of icons for actions
    final actions = [
      Icons.add,
      Icons.pie_chart,
      Icons.settings,
    ];

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: actions
          .map(
            (icon) => Expanded(
              child: Center(
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    shape: const CircleBorder(),
                    backgroundColor: kAccentColor,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.all(18),
                    elevation: 0,
                  ),
                  onPressed: () {},
                  child: Icon(icon, size: 28),
                ),
              ),
            ),
          )
          .toList(),
    );
  }
}

class _QuickActionButton extends StatelessWidget {
  final String label;
  final IconData icon;
  final VoidCallback onPressed;
  const _QuickActionButton({
    required this.label,
    required this.icon,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 6.0),
        child: ElevatedButton.icon(
          style: ElevatedButton.styleFrom(
            backgroundColor: kAccentColor,
            foregroundColor: Colors.white,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
            padding: const EdgeInsets.symmetric(vertical: 16),
            elevation: 0,
          ),
          icon: Icon(icon, size: 20),
          label: label.text.semiBold.white.size(15).make(),
          onPressed: onPressed,
        ),
      ),
    );
  }
}

class ActivityItem {
  final IconData icon;
  final String title;
  final String subtitle;
  final double amount;

  const ActivityItem({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.amount,
  });
}

class ActivityListTile extends StatelessWidget {
  final ActivityItem item;
  const ActivityListTile({Key? key, required this.item}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final bool isUp = item.icon == Icons.trending_up;
    final Color iconColor = isUp ? kPositiveColor : kNegativeColor;

    return ListTile(
      leading: CircleAvatar(
        backgroundColor: kCardColor,
        child: Icon(item.icon, color: iconColor),
      ),
      title: item.title.text.color(kHeadingColor).semiBold.size(16).make(),
      subtitle: item.subtitle.text.color(kBodyTextColor).size(14).make(),
      trailing: ('${item.amount >= 0 ? '+' : '-'}£${item.amount.abs().toStringAsFixed(2)}')
          .text
          .color(item.amount >= 0 ? kPositiveColor : kNegativeColor)
          .bold
          .size(16)
          .make(),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(14),
      ),
      tileColor: kCardColor,
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
    ).box.padding(EdgeInsets.all(6)).make();
  }
}
