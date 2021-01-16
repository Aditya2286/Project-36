//Create variables here
var dog,dogImg,happyDog;
var database;
var foodS,foodStock;
var food=20;
var bg = "#575757";

var feed,addFood;
var fedTime,lastFed;
var foodObj;
var feedDog,addFoods;

function preload()
{
  //load images here
  dogImg= loadImage("images/dogImg1.png");
  happyDog= loadImage("images/dogImg2.png");
}

function setup() {
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  createCanvas(1000, 500);

  dog= createSprite(width/2,height/2);
  dog.addImage(dogImg);
  dog.scale=0.2;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createSprite("Add Food");
  //addFood.position(800,95);
  //addFood.mousePressed(addFoods);

}


function draw() {  
  background((bg));

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("LastFed : " + lastFed%12 + "PM" , 350,30);
  } else if(lastFed===0){
    text("LAST FED : 12 AM" ,350,30);
  } else {
    text("Last Fed : " + lastFed + "AM" , 350,30);
  }

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  drawSprites();
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}