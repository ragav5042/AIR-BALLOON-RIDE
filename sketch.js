var Ball, database;
var position;
function preload(){
  bg =loadImage("cityImage.png");
  balloonImage1=loadAnimation("hotairballoon1.png");
  balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
  "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
  "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
 }

function setup(){
  createCanvas(500,500);
database=firebase.database()
  console.log(database);
  

  Ball = createSprite(77,360,10,10);
  Ball.addAnimation("hotAirBalloon",balloonImage1)
  Ball.scale=0.5
  //Ball.shapeColor = "red";
var bpos=database.ref("Ball/Position")
bpos.on("value",readPosition,showError)
}

function draw(){
  background(bg);
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
      Ball.addAnimation("hotAirBalloon",balloonImage2)
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
 database.ref("Ball/Position").set({"x":position.x+x,"y":position.y+y})
}

function readPosition(data){
 position=data.val()
 Ball.x=position.x
 Ball.y=position.y
}

function showError(){
  console.log("Erroe in writing to the database")
}
