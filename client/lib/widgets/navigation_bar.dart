import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class GroNavigationBar extends StatelessWidget {
  final int currentIndex;
  final ValueChanged<int> onTap;

  const GroNavigationBar({
    Key? key,
    required this.currentIndex,
    required this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CupertinoTabBar(
      backgroundColor: Colors.white,
      activeColor: const Color(0xFF2ECC40),
      inactiveColor: Colors.grey,
      items: const [
        BottomNavigationBarItem(
          icon: Icon(CupertinoIcons.home),
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.pie_chart), // <-- Portfolio
        ),
        BottomNavigationBarItem(
          icon: Icon(CupertinoIcons.chart_bar),
        ),
      ],
      currentIndex: currentIndex,
      onTap: onTap,
      border: Border(
        top: BorderSide(
          color: Colors.grey.shade300,
          width: 0.5,
        ),
      ),
    );
  }
}