//Create variables here
var dog,dogImg;
var happyDogImg;
var foodS;
var foodStock;
var database;
var feed,addFood;
var lastFed;
var foodObj;

function preload()
{
  //load images here
  dogImg=loadImage("Dog.png");
  happyDogImg=loadImage("happydog.png");
}

function setup() {
  database= firebase.database();
  createCanvas(500, 500);

    dog = createSprite(250,300,150,150);
    dog.addImage(dogImg);
    dog.scale=0.150;

    fedTime=database.ref('FeedTime');
    fedTime.on("value",function(data){
      lastFed=data.val();
    })
   
    feed=createButton("Feed the Dog");
    feed.position(600,65);
    feed.mousePressed(feedDog);

    addFood=createButton("Add Food");
    addFood.position(700,65);
    addFood.mousePressed(addFoods);

    foodObj=new Food(250,250,width,height);
  
}


function draw() {  
  background(46,136,87);

  fill(255,255,254);
        textSize(15);
        if(lastFed>=12){
            text("Last Feed : "+lastFed%12+" PM", 100, 30);
        }else if(lastFed == 0){
            text("Last Feed : 12 AM",100,30);
        }else{
            text("Last Feed : "+lastFed%12+" AM", 100, 30);
        }

drawSprites();
foodObj.display();
}



function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
