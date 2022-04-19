import 'package:flutter/material.dart';


class SliderModel{

  String imageAssetPath;
  String title;
  String desc;

  SliderModel({required this.imageAssetPath,required this.title,required this.desc});

  void setImageAssetPath(String getImageAssetPath){
    imageAssetPath = getImageAssetPath;
  }

  void setTitle(String getTitle){
    title = getTitle;
  }

  void setDesc(String getDesc){
    desc = getDesc;
  }

  String getImageAssetPath(){
    return imageAssetPath;
  }

  String getTitle(){
    return title;
  }

  String getDesc(){
    return desc;
  }

}


List<SliderModel> getSlides(){

  List<SliderModel> slides = <SliderModel>[];
  SliderModel sliderModel = new SliderModel(imageAssetPath: '', title: '', desc: '');

  //1
  sliderModel.setDesc("We all look for law Help sometimes but how can I get it ??");
  sliderModel.setTitle("Search");
  sliderModel.setImageAssetPath("assets/stressed.jpg");
  slides.add(sliderModel);

  sliderModel = new SliderModel(imageAssetPath: '', desc: '', title: '');

  //2
  sliderModel.setDesc("Our app will allow you to contact law professionals in real time and get all the help you need within a few clicks");
  sliderModel.setTitle("Avocatoo");
  sliderModel.setImageAssetPath("assets/solution.jpg");
  slides.add(sliderModel);

  sliderModel =  new SliderModel(imageAssetPath: '', desc: '', title: '');

  //3
  sliderModel.setDesc("Food delivery or pickup from local restaurants, Explore restaurants that deliver near you.");
  sliderModel.setTitle("Eat");
  sliderModel.setImageAssetPath("assets/solution.jpg");
  slides.add(sliderModel);

  sliderModel =  new SliderModel(imageAssetPath: '', desc: '', title: '');

  return slides;
}