import 'package:flutter/material.dart';
import 'screens/home.dart';

void main() {
	runApp(const LoopApp());
}

class LoopApp extends StatelessWidget {
	const LoopApp({Key? key}) : super(key: key);

	@override
	Widget build(BuildContext context) {
		return MaterialApp(
			debugShowCheckedModeBanner: false,
			theme: ThemeData(
				brightness: Brightness.dark,
				scaffoldBackgroundColor: kBackgroundColor,
				colorScheme: ColorScheme.dark(
					primary: kAccentColor,
					background: kBackgroundColor,
				),
				fontFamily: 'SF Pro',
			),
			home: const HomeScreen(),
		);
	}
}
