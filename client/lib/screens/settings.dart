import 'package:flutter/material.dart';
import 'package:velocity_x/velocity_x.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({Key? key}) : super(key: key);

  void _showEmergencySellDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: "Emergency Sell".text.semiBold.make(),
        content: "Are you sure you want to sell your entire portfolio? This action cannot be undone."
            .text
            .make(),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: "Cancel".text.make(),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
            onPressed: () {
              Navigator.of(context).pop();
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text("Portfolio emergency sell initiated (demo).")),
              );
            },
            child: "Sell All".text.white.make(),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F5F5),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: "Settings".text.xl2.semiBold.color(Colors.black).make(),
        centerTitle: true,
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          // Account Settings
          "Account Settings".text.lg.semiBold.make(),
          12.heightBox,
          ListTile(
            leading: const Icon(Icons.email),
            title: "Change Email".text.make(),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {},
          ),
          ListTile(
            leading: const Icon(Icons.lock),
            title: "Reset Password".text.make(),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {},
          ),
          ListTile(
            leading: const Icon(Icons.person),
            title: "Change Name".text.make(),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {},
          ),
          ListTile(
            leading: const Icon(Icons.credit_card),
            title: "Payment Plan".text.make(),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {},
          ),
          12.heightBox,
          ListTile(
            leading: const Icon(Icons.delete_forever, color: Colors.red),
            title: "Delete Account".text.red600.make(),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {
              showDialog(
                context: context,
                builder: (context) => AlertDialog(
                  title: "Delete Account".text.red600.semiBold.make(),
                  content: "Are you sure you want to delete your account? This action cannot be undone."
                      .text
                      .make(),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.of(context).pop(),
                      child: "Cancel".text.make(),
                    ),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
                      onPressed: () {
                        Navigator.of(context).pop();
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text("Account deleted (demo).")),
                        );
                      },
                      child: "Delete".text.white.make(),
                    ),
                  ],
                ),
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.logout, color: Colors.grey),
            title: "Log Out".text.make(),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text("Logged out (demo).")),
              );
            },
          ),
          24.heightBox,

          // Portfolio Settings
          "Portfolio Settings".text.lg.semiBold.make(),
          12.heightBox,
          ListTile(
            leading: const Icon(Icons.warning, color: Colors.red),
            title: "Emergency Sell Entire Portfolio".text.red600.make(),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () => _showEmergencySellDialog(context),
          ),
          24.heightBox,

          // Notifications
          "Notifications".text.lg.semiBold.make(),
          12.heightBox,
          SwitchListTile(
            title: "Push Notifications".text.make(),
            value: true,
            onChanged: (val) {},
          ),
          SwitchListTile(
            title: "Email Notifications".text.make(),
            value: false,
            onChanged: (val) {},
          ),
          SwitchListTile(
            title: "Portfolio Alerts".text.make(),
            value: true,
            onChanged: (val) {},
          ),
        ],
      ),
    );
  }
}