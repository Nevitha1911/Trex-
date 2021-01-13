p5.disableFriendlyErrors = true;
var trex, trex_running, trex_collided, cloud, cloudimg;
var ground, invisibleGround, groundImage;
var ob,ob1,ob2,ob3,ob4,ob5,ob6;
var r;
var score=0;
var cloudGroup;
var obstaclesGroup;
var PLAY = 1;
var END = 0;
var state = PLAY;
var gameover,restart,gameoverimg,restartimg;
var checkpoint,jump,die;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png");
  
  cloudimg = loadImage("cloud.png");
  
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  
  gameoverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
  
  checkpoint = loadSound("checkPoint.mp3");
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
}

function setup() {
createCanvas(600, 200);

//create a trex sprite
 trex = createSprite(50,160,20,50);
 trex.addAnimation("running", trex_running);
 trex.addAnimation("collided",trex_collided);
 trex.scale = 0.5;
 trex.setCollider("rectangle",0,0,80,trex.height);
  
//create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(300,190,600,5);
  invisibleGround.visible = false;
  
  gameover = createSprite(300,50,10,10);
  gameover.addImage("gameover",gameoverimg);
  gameover.scale = 0.7;
  
  restart = createSprite(300,90,10,10);
  restart.addImage("restart",restartimg);
  restart.scale = 0.7;
  
  cloudGroup = new Group();
  obstaclesGroup = new Group();
  
  
}

function draw() {
background("grey");

  if(state === PLAY){
    gameover.visible = false;
    restart.visible = false;
    score = score+Math.round(frameCount/60); 
    ground.velocityX = -(4+2*score/2000);
    if (keyDown("space")&& trex.y>=100) {
    trex.velocityY = -10;
    jump.play();
  }
    
  if(score>0 && score%500===0){
    checkpoint.play();
  }
    
  trex.velocityY = trex.velocityY + 0.8;
  drawClouds();
  
  drawObstacles();
  if(obstaclesGroup.isTouching(trex)){
    die.play();
    state = END;
  }
  }else if(state===END){
    ground.velocityX = 0;
    gameover.visible = true;
    restart.visible = true;
    cloudGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    trex.velocityY = 0;
    cloudGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    trex.changeAnimation("collided",trex_collided);
    if(mousePressedOver(restart)){
      reset();
    }
  }
  

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  trex.collide(invisibleGround);
  drawSprites();
  fill("white");
  text("score=" +score,500,50);
  
}

function reset(){
  score = 0;
  state = PLAY;
  obstaclesGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  trex.y = 190;
  
}

function drawClouds(){
  if(frameCount%70===0){
  cloud = createSprite(600,Math.round(random(15 , 30)),10,10);
  cloud.addImage("cloud",cloudimg);
  cloud.scale = 0.5;
  cloud.velocityX = -(3+2*score/2000);
  trex.depth = cloud.depth;
  trex.depth = trex.depth+1;
  cloud.lifetime = 200;
  cloudGroup.add(cloud);
}
}
function drawObstacles(){
 if(frameCount%120===0){
  ob = createSprite(600,170,10,10);
  ob.velocityX = -(3+2*score/2000);
  r = Math.round(random(1,6));
   switch (r){
      case 1: ob.addImage("obsatcle",ob1);
      break; 
      case 2: ob.addImage("obsatcle",ob2);
      break; 
      case 3: ob.addImage("obsatcle",ob3);
      break; 
      case 4: ob.addImage("obsatcle",ob4);
      break; 
      case 5: ob.addImage("obsatcle",ob5);
      break;
      case 6: ob.addImage("obsatcle",ob6);
      break; 
   }
   ob.scale = 0.5;
   ob.lifetime = 200;
   obstaclesGroup.add(ob);
 }
  
}