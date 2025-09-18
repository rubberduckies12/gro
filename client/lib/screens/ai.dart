import 'package:flutter/material.dart';
import 'package:velocity_x/velocity_x.dart';

class AIChatScreen extends StatefulWidget {
  const AIChatScreen({Key? key}) : super(key: key);

  @override
  State<AIChatScreen> createState() => _AIChatScreenState();
}

class _AIChatScreenState extends State<AIChatScreen> {
  final TextEditingController _controller = TextEditingController();
  final List<_ChatMessage> _messages = [
    _ChatMessage(
      text: "Hi! I'm your AI stock assistant. Ask me anything about the US market.",
      isBot: true,
    ),
  ];

  void _sendMessage() {
    final text = _controller.text.trim();
    if (text.isEmpty) return;
    setState(() {
      _messages.add(_ChatMessage(text: text, isBot: false));
      _messages.add(_ChatMessage(
        text: "This is a demo response about US stocks. (AI reply placeholder)",
        isBot: true,
      ));
      _controller.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F5F5),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: Row(
          children: [
            const Icon(Icons.auto_awesome, color: Color(0xFF2ECC40)),
            8.widthBox,
            "AI Stock Chat"
                .text
                .xl2
                .semiBold
                .color(Colors.black)
                .make(),
          ],
        ),
        centerTitle: false,
      ),
      body: SafeArea(
        child: VStack([
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 12),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[index];
                return Align(
                  alignment: msg.isBot
                      ? Alignment.centerLeft
                      : Alignment.centerRight,
                  child: Container(
                    margin: const EdgeInsets.symmetric(vertical: 6),
                    padding: const EdgeInsets.symmetric(
                        vertical: 12, horizontal: 16),
                    decoration: BoxDecoration(
                      color: msg.isBot
                          ? Colors.white
                          : const Color(0xFF2ECC40).withOpacity(0.1),
                      borderRadius: BorderRadius.circular(14),
                      border: msg.isBot
                          ? Border.all(color: Colors.grey.shade300)
                          : null,
                    ),
                    child: msg.text.text
                        .color(msg.isBot ? Colors.black87 : Color(0xFF2ECC40))
                        .make(),
                  ),
                );
              },
            ),
          ),
          Divider(height: 1),
          Container(
            color: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: const InputDecoration(
                      hintText: "Ask about a stock or the US market...",
                      border: InputBorder.none,
                    ),
                    onSubmitted: (_) => _sendMessage(),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.send, color: Color(0xFF2ECC40)),
                  onPressed: _sendMessage,
                ),
              ],
            ),
          ),
        ]),
      ),
    );
  }
}

class _ChatMessage {
  final String text;
  final bool isBot;
  _ChatMessage({required this.text, required this.isBot});
}