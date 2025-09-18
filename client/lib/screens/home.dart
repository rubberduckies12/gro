import 'package:flutter/material.dart';
import 'package:velocity_x/velocity_x.dart';
import 'ai.dart';
import 'settings.dart'; // Add this import at the top

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

  void _showAddFundsDialog(BuildContext context) {
    String? selectedPortfolio;
    String amount = '';
    showDialog(
      context: context,
      builder: (context) {
        return Dialog(
          backgroundColor: kCardColor,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: StatefulBuilder(
              builder: (context, setState) => Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  "Add Money to Portfolio"
                      .text
                      .xl
                      .semiBold
                      .color(kHeadingColor)
                      .make(),
                  16.heightBox,
                  DropdownButtonFormField<String>(
                    decoration: const InputDecoration(
                      labelText: "Select Portfolio",
                      border: OutlineInputBorder(),
                    ),
                    value: selectedPortfolio,
                    items: activities
                        .map((a) => DropdownMenuItem(
                              value: a.title,
                              child: Text(a.title),
                            ))
                        .toList(),
                    onChanged: (val) => setState(() => selectedPortfolio = val),
                  ),
                  16.heightBox,
                  TextField(
                    decoration: const InputDecoration(
                      labelText: "Amount",
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
                      // Simulate Plaid flow and funding
                      Navigator.of(context).pop();
                      showDialog(
                        context: context,
                        builder: (context) => Dialog(
                          backgroundColor: kCardColor,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                          child: Padding(
                            padding: const EdgeInsets.all(20),
                            child: Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Icon(Icons.check_circle, color: kAccentColor, size: 48),
                                16.heightBox,
                                "Funds Added!"
                                    .text
                                    .xl
                                    .semiBold
                                    .color(kHeadingColor)
                                    .make(),
                                8.heightBox,
                                Text(
                                  "£$amount added to $selectedPortfolio.\n(Plaid flow simulated)",
                                  textAlign: TextAlign.center,
                                  style: TextStyle(color: kBodyTextColor),
                                ),
                                24.heightBox,
                                ElevatedButton(
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: kAccentColor,
                                    foregroundColor: Colors.white,
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(10),
                                    ),
                                  ),
                                  onPressed: () => Navigator.of(context).pop(),
                                  child: const Text("Close"),
                                ),
                              ],
                            ),
                          ),
                        ),
                      );
                    },
                    child: const Text("Continue"),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

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
        QuickActionsRow(
          onAddPressed: () => _showAddFundsDialog(context),
          onAIChatPressed: () {
            Navigator.of(context).push(
              MaterialPageRoute(
                builder: (context) => const AIChatScreen(),
              ),
            );
          },
          onSettingsPressed: () {
            Navigator.of(context).push(
              MaterialPageRoute(
                builder: (context) => const SettingsScreen(),
              ),
            );
          },
        ),
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
  final VoidCallback? onAddPressed;
  final VoidCallback? onAIChatPressed;
  final VoidCallback? onSettingsPressed;
  const QuickActionsRow({
    Key? key,
    this.onAddPressed,
    this.onAIChatPressed,
    this.onSettingsPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final actions = [
      {
        'icon': Icons.add,
        'onPressed': onAddPressed,
      },
      {
        'icon': Icons.auto_awesome,
        'onPressed': onAIChatPressed,
      },
      {
        'icon': Icons.settings,
        'onPressed': onSettingsPressed,
      },
    ];

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: actions
          .map(
            (action) => Expanded(
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  shape: const CircleBorder(),
                  backgroundColor: kAccentColor,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.all(18),
                  elevation: 0,
                ),
                onPressed: action['onPressed'] as VoidCallback?,
                child: Icon(action['icon'] as IconData, size: 28),
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
