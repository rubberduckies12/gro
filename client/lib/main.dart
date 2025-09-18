import 'package:flutter/material.dart';
import 'screens/home.dart';
import 'screens/portfolio.dart';
import 'widgets/navigation_bar.dart';

void main() {
  runApp(const GroApp());
}

class GroApp extends StatelessWidget {
  const GroApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.light,
        scaffoldBackgroundColor: const Color(0xFFF5F5F5),
        fontFamily: 'SF Pro',
      ),
      home: const MainScaffold(),
    );
  }
}

class MainScaffold extends StatefulWidget {
  const MainScaffold({Key? key}) : super(key: key);

  @override
  State<MainScaffold> createState() => _MainScaffoldState();
}

class _MainScaffoldState extends State<MainScaffold> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const HomeScreen(),         // Index 0: Home icon
    const PortfolioScreen(),    // Index 1: Pie chart icon
    Center(child: Text('Invest', style: TextStyle(fontSize: 24))), // Index 2: Chart bar icon
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_currentIndex],
      bottomNavigationBar: GroNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
      ),
    );
  }
}
