var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivaltime;
var ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
  
  
}



function setup() {
  createCanvas(600,300);
  
  var m ='hello'
  console.log(m)
  
  monkey= createSprite(50,250,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  ground =createSprite(10,280,100000000,5);
  ground.x = ground.width /2;
  
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
    monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false
 
  score=0; 
}


function draw() {
  background("lightblue")
  
    
  if(gameState === PLAY){

    text("Score: "+ score, 500,50);
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
        
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the Food
    spawnFood();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
      
     
        gameState = END;
   
      
    }
  }
   else if (gameState === END) {

     
     //change the trex animation

    
     
     
      ground.velocityX = 0;
      monkey.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
   }
  
  monkey.collide(ground);
  
  

 drawSprites(); 
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,250,10,40);
   obstacle.velocityX = -(6 + score/100);
   

   
    //generate random obstacles
    var rand = Math.round(random(1,6));
 }
 }


function spawnFood() {

  if (frameCount % 60 === 0) {
    var food = createSprite(600,120,40,10);
    food.y = Math.round(random(80,120));
 food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -3;
    
     //assign lifetime to the variable
  food.lifetime = 200;
    
    //adjust the depth
    food.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    

  }
}