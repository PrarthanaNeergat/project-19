var monkey,monkeyImage;
var banana,bananaImage,bananaGroup ;
var obstacle,obstacleImage,obstacleGroup;
var ground,scene,sceneImage,scene2;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score= 0;

function preload(){
 monkeyImage =loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png",);
 bananaImage=loadImage("Banana.png");
 obstacleImage=loadImage("stone.png");
sceneImage=loadImage("jungle2.jpg");
}

function setup() {
  createCanvas(400, 400);

  ground=createSprite(200,380,400,10);

  scene=createSprite(500,200,400,400);
  scene.addImage("scene",sceneImage);

  monkey=createSprite(70,333,20,50);
  monkey.addAnimation("monkey",monkeyImage);
  monkey.scale=0.15;
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
}

function draw() {
  background(135,206,235);

  if(gameState===PLAY){
    if(keyDown("space") && monkey.y >= 320) {
      monkey.velocityY = -12;
      }
      monkey.velocityY = monkey.velocityY + 0.8;
      monkey.collide(ground);

    if(bananaGroup.isTouching(monkey)){
        bananaGroup.destroyEach();
        score=score+1;
        }

     if(obstacleGroup.isTouching(monkey)){
        gameState=END;
      }
     
     scene.velocityX=-(6 + 3*score/100);
  
if (scene.x <0){
    scene.x = 500
 }
}  else if(gameState===END){
  
  scene2=createSprite(200,200,400,400);
  scene2.shapeColor = "black";
  monkey.visible=false;
      }
     
Bananas();
Obstacles();
drawSprites();

 if(gameState===0){
  textSize(60);
  fill(255,20,147);
  text("Game Over",40,230);
 }
 textSize(30);
 fill(0,0,0);
 text("Score : "+ score,210,90);

}


function Obstacles() {
    if(frameCount % 100 === 0) {
    obstacle=createSprite(440,350,40,20);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale=0.15;
   obstacle.velocityX = -(6 + 3*score/100);
   obstacle.setCollider("circle",0,0,170);
   obstacle.lifetime = 100;
   obstacleGroup.add(obstacle);
   if(gameState===END){
    obstacleGroup.destroyEach();
  }
    }
} 


function Bananas() {
    if(frameCount % 50 === 0) {
  banana=createSprite(440,350,40,20);
  banana.addImage("banana",bananaImage);
  banana.scale=0.07;
banana.velocityX =-(6 + 3*score/100);
 banana.setCollider("circle",0,0,150);
banana.lifetime = 100;
bananaGroup.add(banana);
if(gameState===END){
  bananaGroup.destroyEach();
}
    }
} 