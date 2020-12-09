PLAY = 1;
END = 0;
gameState = PLAY;
var score;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,ground
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300);
  
  monkey = createSprite(40,260,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  
  Ground = createSprite(300,295,600,10);
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
  
  monkey.setCollider("circle",0,0,240);
  monkey.debug = true;

  score = 0
}


function draw() {
  background("white");
  
  if(gameState === PLAY){
    
    monkey.visible = true
    
     score = score + Math.round(getFrameRate()/60);
    
    text("SURVIVAL TIME="+score,200,50)
    
  monkey.collide(Ground);
    if(Ground.x < 0){
      Ground.x = Ground.width/2;
    }
    
    if(keyDown("space") && monkey.y>= 140){
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8
    
    
    
    
    spawnObstacles();
    spawnFood();
    destroyBanana();
    
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
      }
    }
     else if(gameState === END){
       
       score = 0;
       
       textSize(20);
       textFont("CooperBlack")
       text("GAMEOVER press R to restart",250,200);
       
       if(keyDown("R")){
         
      reset();
    }
       
       
       monkey.visible = false
       FoodGroup.destroyEach();
       obstacleGroup.destroyEach();
       
       Ground.velocityX = 0;
       monkey.velocityY = 0
       
       obstacleGroup.setLifetimeEach(-1);
       FoodGroup.setLifetimeEach(-1);
       
       obstacleGroup.setVelocityXEach(0);
       FoodGroup.setVelocityXEach(0);

     }
  
  
  drawSprites();
  
}

function reset(){
  gameState = PLAY;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
 
  
}

function spawnObstacles(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(600,260,20,20);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
    }
}

function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600,150,40,10);
    banana.y = Math.round(random(120,200));
    banana.velocityX = -3;
    banana.addImage(bananaImage);
    banana.scale = 0.09;
    banana.lifetime = 200;
    FoodGroup.add(banana);
  }
}

function destroyBanana(){
  
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
    }
}









