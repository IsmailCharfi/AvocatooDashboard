import 'package:flutter/material.dart';
import './login_screen.dart';
import './signup_screen.dart';
import './background.dart';
import '../widgets/rounded_button.dart';
import 'package:flutter_svg/svg.dart';

class Body extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    // This size provide us total height and width of our screen
    return Background(

      child: Container(
        margin: const EdgeInsets.only(top: 0),
        height: double.infinity,
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              
              SizedBox(height: size.height * 0.05),
              SvgPicture.asset(
                "assets/chat.svg",
                height: size.height * 0.45,
              ),
              SizedBox(height: size.height * 0.05),
              Container(
                margin: EdgeInsets.symmetric(vertical: 10),
                width: size.width * 0.8,
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(29),
                  child: ElevatedButton(
                    child: Text(
                      "Signup",
                      style: TextStyle(color: Colors.purple),
                    ),
                    onPressed: press(),
                    style: ElevatedButton.styleFrom(
                        onSurface: Colors.purple,
                        padding: EdgeInsets.symmetric(horizontal: 40, vertical: 20),
                        textStyle: TextStyle(
                            color: Colors.white, fontSize: 14, fontWeight: FontWeight.w500)),
                  ),
                ),
              ),
              Container(
                margin: EdgeInsets.symmetric(vertical: 10),
                width: size.width * 0.8,
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(29),
                  child: ElevatedButton(
                    child: Text(
                      "Login",
                      style: TextStyle(color: Colors.purple),
                    ),
                    onPressed: press(),
                    style: ElevatedButton.styleFrom(

                        onSurface: Colors.purple,
                        padding: EdgeInsets.symmetric(horizontal: 40, vertical: 20),
                        textStyle: TextStyle(
                            color: Colors.blue, fontSize: 14, fontWeight: FontWeight.w500)),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),

    );
  }

  press() {}
}