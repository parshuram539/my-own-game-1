var score =0;
var fighterplane,asteroid, bullet, earth;

var fighterplaneImg,asteroidsImg, bulletImg, blastImg, earthImg;

var asteroidsGroup, bulletGroup ;


var life =3;
var score=0;
var gameState=1

function preload(){
  fighterplaneImg = loadImage("fighterplane.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet.png")
  asteroidsImg = loadImage("asteroids.png")
  earthImg= loadImage("earth.png")
}
function setup() {
  createCanvas(800, 800);

  earth= createSprite(50, width/2, 100,height);
  earth.addImage(earthImg)
  
  fighterplane= createSprite(100, height/2, 50,50);
  fighterplane.addImage(fighterplaneImg)
  fighterplane.scale=0.2
  
  bulletGroup = createGroup();   
  asteroidsGroup = createGroup();   
   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background("#BDA297");
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    fighterplane.y=mouseY  

    if (frameCount % 80 === 0) {
      drawasteroids();
    }


    if(keyDown("space")){
      shootBullet();
    }

    if(asteroidsGroup.collide(earth)){
      handleGameover(asteroidsGroup);
    }
    
    
    
  
    
    if(asteroidsGroup.collide(bulletGroup)){
      handleBubbleCollision(asteroidsGroup);
    }

    
    drawSprites();
  }
    
  
}

function drawasteroids(){
  asteroid = createSprite(800,random(20,780),40,40);
  asteroid.addImage(asteroidsImg);
  asteroid.scale = 0.1;
  asteroid.velocityX = -8;
  asteroid.lifetime = 400;
  asteroidsGroup.add(asteroid);
}


function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= fighterplane.y-20
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}

function handleBubbleCollision(asteroidsGroup){
    if (life > 0) {
       score=score+1;
    }

     blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) 

   
    
    blast.scale=0.3
    blast.life=20
    bulletGroup.destroyEach()
    asteroidsGroup.destroyEach()
}

function handleGameover(asteroidsGroup){
  
    life=life-1;
    asteroidsGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
    text("GAME OVER",0,0,50,50);
      
    }
  
}