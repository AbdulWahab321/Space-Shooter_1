var missile,shooter,invader,edges,invader1,invader1GR,missile1,missile1Gr,BigInvader;
var PLAY=1;
var END=0;
var gameState=PLAY;
var biginvader;
var score=0;
function preload(){
shooterImg=loadImage("2.png")
inv=loadImage("3.png")
 space=loadImage("space.jpg") 
  miss=loadImage("missile22.png")
  miss1=loadImage("missile2.png")
  over=loadImage("over.png")
  song=loadSound("sonicastronomia.mp3")
  rocket=loadSound("launc.wav")
  overSnd=loadSound("over.wav")
  invaderBIG=loadImage("Big invader.png")
}
function setup(){
 createCanvas(1000,600 );
  gameState=PLAY
  edges=createEdgeSprites()

 shooter = createSprite(40,200,20,20)
 shooter.addImage(shooterImg); 
 shooter.scale=0.11

  
  missileGr=new Group();
  invaderGr=new Group();
  invader1GR=new Group();
  missile1Gr=new Group();
  
  
}
function draw(){
  background(space)
  edges=createEdgeSprites();
 shooter.debug=true


  spawnInvader()
  
  
  
  if(gameState===PLAY){
    shooter.y = World.mouseY;
    shooter.x = World.mouseX;
    sound();
    
     if(keyDown("space")) {
       rocket.play();
   spmiss();
 }
  }
  if(gameState===END){
    shooter.x=300;
    shooter.y=300;
    shooter.addImage(over);
    shooter.scale=1;
    invaderGr.setVelocityYEach(0);
    shooter.setCollider("rectangle",0,0,-5,-5);
    invaderGr.destroyEach();
    invader1GR.destroyEach();
    song.stop();
    
    reset()
  }
 
 if(missileGr.isTouching(invaderGr)){
   invaderGr.destroyEach();
   missileGr.destroyEach();
   rocket.stop();
   score=score+1
 }
  if(invaderGr.isTouching(shooter)){
    overSnd.play()
    gameState=END
  }
 
  drawSprites();
  fill("white")
  text("Score:"+score,530,20)
}
function spawnInvader(){
  if(frameCount%50===0){
    invader=createSprite(Math.round(random(10,590)),-50)
    invader.velocityY=18
    invader.addImage(inv) 
    invader.scale=0.1
    invader.lifetime=-1
    invaderGr.add(invader)




  
}}
function spmiss(){
   missile= createSprite(100,100,12,12) 
 missile.addImage(miss);
 missile.scale=0.1 
 missile.velocityY=-14; 
  missile.x=shooter.x
  missile.y=shooter.y
  missile.lifetime=-1
 missileGr.add(missile) 
}
function reset(){
  if(keyDown("space")){
  gameState=PLAY
  shooter.addImage(shooterImg)  
  score=0
  shooter.scale=0.11
  song.play();
  }
  
}
function sound(){
 if(frameCount-5===0){
  song.play();
 }
  
  
 

}
