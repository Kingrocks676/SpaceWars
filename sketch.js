var bg,bgImg;
var spaceShip,SpaceShipImg;
var startbtn,startbtnImg;

//gamestates
var START = 0; 
var SPACESHIPCHOICE = 1;
var PLAY = 2;
var END = 3;
var gamestate = START;


//logo les goooooo
var logo,logoImg;

//choices
var choice1,c1Img,choice2,c2Img,choice3,c3Img;
var c1btn,c2btn,c3btn;
var millenium_falcon,reapers,falcon_9;
var choose,chooseImg;

//obstacles variables
var o1,o2,o3,o4,o5;
var obstacle;
var obstacles;
var obstacleGroup

//coins
var coin,coinAnimation,coinGroup;
var coins = 0;
//score variables
var score = 0;
var highscore = 0;
var box;


var m=0,r=1,f=3,n=4;

var choice = n;

//upgrade
var upgrade_button;
var c1u2,c1u3,c1u4;
var c2u2,c2u3,c2u4;
var c3u2,c3u3,c3u4;
var upgrade_level = 1;
var speed_lvl = 0;


//bullet
var bullet,bulletImg;
var bulletGroup;

var coinCheck;


var obstaclename;

//sounds
var shootSound;
var coinSound;
var blastSound;
var rocketSound;

function preload()
{
  bgImg = loadImage("assets/space_bg.png");
  startbtnImg = loadImage('assets/start_btn.png');

  //sounds
  shootSound = loadSound('assets/shoot.mp3');
  shootSound.looping = false;

  coinSound = loadSound('assets/coin.wav');
  coinSound.looping = false;

  blastSound = loadSound('assets/blast.mp3');
  blastSound.looping = false;
  blastSound.setVolume(2);

  rocketSound = loadSound('assets/rocket.mp3');
  rocketSound.setVolume(0.2);

  //load space ship image
  c1Img = loadImage('assets/space_ship_c1.jpg');
  c2Img = loadImage('assets/space_ship_c2.jpg');
  c3Img = loadImage('assets/space_ship_c3.png');

  chooseImg = loadImage('assets/choose.png');
  logoImg = loadImage('assets/logo.png');

  //obstacles image loading lol
  o1 = loadImage('assets/o1.png');
  o2 = loadImage('assets/o2.png');
  o3 = loadImage('assets/o3.png');
  o4 = loadImage('assets/o4.png');
  o5 = loadImage('assets/o5.png');

  //coins
coinAnimation = loadAnimation('assets/coin1.png','assets/coin2.png','assets/coin3.png','assets/coin4.png','assets/coin5.png');                 

//load upgrades
c1u2 = loadImage('assets/c1u2.jpg');
c1u3 = loadImage('assets/c1u3.png');
c1u4 = loadImage('assets/c1u4.png');
c1u5 = loadImage('assets/c1u5.png');

c2u2 = loadImage('assets/c2u2.png');
c2u3 = loadImage('assets/c2u3.png');
c2u4 = loadImage('assets/c2u4.png');
c2u5 = loadImage('assets/c2u5.png');

c3u2 = loadImage('assets/c3u2.png');
c3u3 = loadImage('assets/c3u3.png');
c3u4 = loadImage('assets/c3u4.png');
c3u5 = loadImage('assets/c3u5.png');

//bullets
bulletImg = loadImage('assets/bullet.png');

}

function setup()
{
  createCanvas(windowWidth, windowHeight);

  obstacleGroup = createGroup();
  coinGroup = createGroup();
  bulletGroup = createGroup();

  //background creation
  bg = createSprite(790,50);
  bg.addImage(bgImg);
  bg.scale = 1.2;

  upgrade_button = createButton('Upgrade');
  upgrade_button.position(10,250);

  logo = createSprite(750,150);
  logo.addImage(logoImg);
  logo.scale = 2;
  logo.visible = true;
  //start button
  startbtn = createSprite(750,550);
  startbtn.addImage(startbtnImg);
  startbtn.scale = 0.16;
  startbtn.visible = false;

  //character space ship creation
  spaceShip = createSprite(750,550,50,50);
  spaceShip.visible = false;

      //space ship choice 1 creation
      choice1 = createSprite(400,350);
      choice1.addImage(c1Img);
      choice1.visible = false;
    
      //space ship choice 2 creation
      choice2 = createSprite(750,350);
      choice2.addImage(c2Img);
    choice2.visible = false;
    
      //space ship choice 3 creation
      choice3 = createSprite(1100,350);
      choice3.addImage(c3Img);
    choice3.visible = false;

    choose = createSprite(750,150);
    choose.addImage(chooseImg);
    choose.scale = 0.2;
    choose.visible = false;




    //bg velocity at start
    bg.velocityY = 2;
    
}

function draw()
{
  background("black");
  //text for score and other crap
  textSize(20);
  fill('white');
  text("Score: " +score, 10,100);
  text("Coins: " +coins, 10,150);
  textSize(15);
  text("Speed = "+bg.velocityY,10,200);
  textSize(12);
  text("Click to upgrade",10,300);
  text("4 upgrade lvls",10,315);
  text("upgrade cost is",5,330); 
  text("300 coins",5,345);
  text("Upgrade = better",5,360);

  if (frameCount % 10 === 0)
  {
    rocketSound.play();
  }

  if (frameCount % 10 === 0 && gamestate === PLAY) 
  {
    score += 1;
  }

  if (spaceShip.isTouching(coinGroup) && gamestate === PLAY)
  {
    coins += 50
    coinSound.play();
    coin.destroy();
    bg.velocityY -= 0.50;
  }

  console.log(bg.velocityY);
  
  //ifs and buts lol

  if (frameCount % 20 === 0 && gamestate === PLAY && bg.velocityY < 25)
  {
    bg.velocityY += 0.25;
  }

  if (bg.y >= 1100)
  {
    bg.y = 50;
  }

  if (gamestate === START)
  {
    startbtn.visible = true;
  }

  if (mousePressedOver(startbtn) && gamestate === START)
  {
    gamestate = SPACESHIPCHOICE;
    logo.visible = false;
    console.log("Choose a space ship");
  }

  //spaceship choice thing
  if (gamestate != START && gamestate != PLAY && gamestate != END)
  {
    startbtn.visible = false;
    startbtn.x = 2000;
    choice1.visible = true;
    choice2.visible = true;
    choice3.visible = true;
    choose.visible = true;
  }


  if (mousePressedOver(choice1) && gamestate === SPACESHIPCHOICE)
  {
    spaceShip.addImage(c1Img);
    spaceShip.visible = true;
    console.log("Millenium Falcon");
    gamestate = PLAY;
    choice = m;
  }

  if (mousePressedOver(choice2) && gamestate === SPACESHIPCHOICE)
  {
    spaceShip.addImage(c2Img);
    spaceShip.visible = true;
    console.log("reapers");
    gamestate = PLAY;
    choice = r;
  }

  if (mousePressedOver(choice3) && gamestate === SPACESHIPCHOICE)
  {
    spaceShip.addImage(c3Img);
    spaceShip.visible = true;
    console.log("FALCON 9");
    gamestate = PLAY;
    choice = f;
  }

  if (choice === m || choice === r)
  {
    spaceShip.setCollider('rectangle',0,0,130,150)
  }

  if (choice === f)
  {
    spaceShip.setCollider('rectangle',0,0,100,150)
  }
  if (gamestate === PLAY)
  {
    logo.visible = false;
    choice1.visible = false;
    choice2.visible = false;
    choice3.visible = false;
    choose.visible = false;

  }
  if (frameCount % 95 === 0 && gamestate === PLAY)
  {
    spawn_enemies();
  }

  if (frameCount % 150 === 0 && gamestate === PLAY)
  {
    spawn_coins();
  }

  if (spaceShip.x < 100)
  {
    spaceShip.x = 110;
  }
  if (spaceShip.x > 1490)
  {
    spaceShip.x = 1480;
  }



  if (spaceShip.isTouching(obstacleGroup))
  {
    bg.velocityY = 0;
    obstacle.velocityY = 0;
    coin.velocityY = 0;
    spaceShip.destroy();
    blastSound.play();
    gamestate === END;
    gameOver();
  }

  

  upgrade_button.mouseClicked(upgrade);

  if (gamestate === PLAY)
  {
    if (speed_lvl === 0)
    {
      if (keyDown(LEFT_ARROW))
      {
        spaceShip.x -= 15;
      }
  
      if (keyDown(RIGHT_ARROW))
      {
        spaceShip.x += 15;
      }
    }

    if (speed_lvl === 1)
    {
      if (keyDown(LEFT_ARROW))
      {
        spaceShip.x -= 20;
      }
  
      if (keyDown(RIGHT_ARROW))
      {
        spaceShip.x += 20;
      }
    }

    if (speed_lvl === 2)
    {
      if (keyDown(LEFT_ARROW))
      {
        spaceShip.x -= 25;
      }
  
      if (keyDown(RIGHT_ARROW))
      {
        spaceShip.x += 25;
      }
    }

    if (speed_lvl === 3)
    {
      if (keyDown(LEFT_ARROW))
      {
        spaceShip.x -= 30;
      }
  
      if (keyDown(RIGHT_ARROW))
      {
        spaceShip.x += 30;
      }
    }

    if (speed_lvl === 4)
    {
      if (keyDown(LEFT_ARROW))
      {
        spaceShip.x -= 40;
      }
  
      if (keyDown(RIGHT_ARROW))
      {
        spaceShip.x += 40;
      }
    }
  }

  if (keyWentUp(32) && gamestate === PLAY)
  {
    shoot();
    shootSound.play();
  }

  if (bulletGroup.isTouching(obstacleGroup))
  {
    blastSound.play();
    destroy();
  }

  coinCheck = coins;
  drawSprites();
}

function destroy()
{
  console.log('pew pew pew');
    bullet.destroy();
    bullet2.destroy();
    coins += 20;
    score += 20;
    obstacle.destroy();
    
    if (choice === r && speed_lvl === 4)
    {
      bullet3.destroy();
      bullet4.destroy();
    }
}

function spawn_enemies()
{
      console.log("summoned_spaceship");
      obstacle = createSprite(Math.round(random(150,1490)),0);
      obstacle.velocityY = bg.velocityY+1;
      var i = Math.round(random(1,5));

      switch (i)
        {
        case 1:
           obstacle.addImage(o1);
           obstacle.setCollider("rectangle",0,0,100,100);
           obstaclename = 1;
          break
        case 2:
            obstacle.addImage(o2);
            obstaclename = 2;
            break;
        case 3:
            obstacle.addImage(o3);
            obstaclename = 3;
            break;
        case 4:
            obstacle.addImage(o4);
            obstacle.setCollider('circle');
            obstaclename = 4;
            break;
        case 5:
            obstacle.addImage(o5);
            obstacle.setCollider('circle');
            obstaclename = 5;
            break;
        default:
            break;
  }
  obstacle.scale = 1;
  obstacle.lifetime = 300;
  obstacleGroup.add(obstacle);
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      icon: "succes",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

function spawn_coins()
{
  console.log('coins baby');
  coin = createSprite(Math.round(random(150,1490)),0);
  coin.addAnimation('cooins',coinAnimation);
  coin.velocityY = bg.velocityY+1;
  coin.scale = 1;
  coin.lifetime = 300;
  coinGroup.add(coin);
}



function upgrade()
{
  if (choice === m)
  {
    if ((coinCheck -= 300) >= 0)
    {
      if (upgrade_level === 1)
      {
        spaceShip.addImage(c1u2);
        coins -= 300;
        upgrade_level = 2;
        bg.velocityY -= 3;
        speed_lvl = 1;
      }
      else if(upgrade_level === 2)
      {
        spaceShip.addImage(c1u3);
        coins -= 300;
        upgrade_level = 3;
        bg.velocityY -= 4;
        speed_lvl = 2;
      }
      else if(upgrade_level === 3)
      {
        spaceShip.addImage(c1u4);
        coins -= 300;
        upgrade_level = 4;
        bg.velocityY -= 4;
        speed_lvl = 3;
      }
      else if(upgrade_level === 4)
      {
        spaceShip.addImage(c1u5);
        coins -= 300;
        bg.velocityY -= 6;
        upgrade_level = 0;
        speed_lvl = 4;
      }
      else if(upgrade_level === 0)
      {
        console.log("Max upgrade");
      }
    }
  }

  if (choice === r)
  {
    if ((coinCheck -= 300) >= 0)
    {
      if (upgrade_level === 1)
      {
        spaceShip.addImage(c2u2);
        coins -= 300;
        upgrade_level = 2;
        bg.velocityY -= 3;
        speed_lvl = 1;
      }
      else if(upgrade_level === 2)
      {
        spaceShip.addImage(c2u3);
        coins -= 300;
        upgrade_level = 3;
        bg.velocityY -= 4;
        speed_lvl =2;
      }
      else if(upgrade_level === 3)
      {
        spaceShip.addImage(c2u4);
        coins -= 300;
        upgrade_level = 4;
        bg.velocityY -= 5;
        speed_lvl = 3;
      }
      else if(upgrade_level === 4)
      {
        spaceShip.addImage(c2u5);
        coins -= 300;
        bg.velocityY -= 6;
        upgrade_level = 0;
        speed_lvl = 4;
      }
      else if(upgrade_level === 0)
      {
        console.log("Max upgrade");
      }
    }
  }
  if (choice === f)
  {
    if ((coinCheck -= 300) >= 0)
    {
      if (upgrade_level === 1)
      {
        spaceShip.addImage(c3u2);
        coins -= 300;
        upgrade_level = 2;
        spaceShip.setCollider('rectangle', 0, 0,100,150 );
        bg.velocityY -= 3;
        speed_lvl = 1;
      }
      else if(upgrade_level === 2)
      {
        spaceShip.addImage(c3u3);
        coins -= 300;
        upgrade_level = 3;
        spaceShip.setCollider('rectangle', 0, 0,120,180 );
        bg.velocityY -= 4;
        speed_lvl = 2;
      }
      else if(upgrade_level === 3)
      {
        spaceShip.addImage(c3u4);
        coins -= 300;
        upgrade_level = 4;
        spaceShip.setCollider('rectangle', 0, 0,180,300 );
        bg.velocityY -= 5;
        speed_lvl = 3;
      }
      else if(upgrade_level === 4)
      {
        spaceShip.addImage(c3u5);
        coins -= 300;
        bg.velocityY -= 6;
        spaceShip.setCollider('rectangle', 0, 0,180,300 );
        upgrade_level = 0;
        speed_lvl = 4;
      }
      else if(upgrade_level === 0)
      {
        console.log("Max upgrade");
      }
    }
  }
}

function reset()
{
  gamestate = SPACESHIPCHOICE;
}

function shoot()
{
  if (choice === m)
  {
    if (upgrade_level === 1)
    {
      bullet = createSprite((spaceShip.x-10),(spaceShip.y-85));
      bullet2 = createSprite((spaceShip.x+35),(spaceShip.y-85));
      
      bullet.addImage(bulletImg);
      bullet.velocityY = -10;
      bullet2.addImage(bulletImg);
      bullet2.velocityY = -10;
      
      console.log("bullets baby");

      bullet.lifetime = 50;
      bullet2.lifetime = 50;
      
      bulletGroup.add(bullet);
      bulletGroup.add(bullet2);
    }

    if (upgrade_level === 2)
    {
      bullet = createSprite((spaceShip.x-10),(spaceShip.y-85));
      bullet2 = createSprite((spaceShip.x+35),(spaceShip.y-85));
      
      bullet.addImage(bulletImg);
      bullet.velocityY = -10;
      bullet2.addImage(bulletImg);
      bullet2.velocityY = -10;
      
      console.log("bullets baby");

      bullet.lifetime = 50;
      bullet2.lifetime = 50;
      
      bulletGroup.add(bullet);
      bulletGroup.add(bullet2);
    }

    if (upgrade_level === 3)
    {
      bullet = createSprite((spaceShip.x-10),(spaceShip.y-85));
      bullet2 = createSprite((spaceShip.x+35),(spaceShip.y-85));
      
      bullet.addImage(bulletImg);
      bullet.velocityY = -10;
      bullet2.addImage(bulletImg);
      bullet2.velocityY = -10;
      
      console.log("bullets baby");

      bullet.lifetime = 50;
      bullet2.lifetime = 50;
      
      bulletGroup.add(bullet);
      bulletGroup.add(bullet2);
    }

    if (upgrade_level === 3)
    {
      bullet = createSprite((spaceShip.x-10),(spaceShip.y-85));
      bullet2 = createSprite((spaceShip.x+35),(spaceShip.y-85));
      
      bullet.addImage(bulletImg);
      bullet.velocityY = -10;
      bullet2.addImage(bulletImg);
      bullet2.velocityY = -10;
      
      console.log("bullets baby");

      bullet.lifetime = 50;
      bullet2.lifetime = 50;
      
      bulletGroup.add(bullet);
      bulletGroup.add(bullet2);
    }

    if (upgrade_level === 4)
    {
      bullet = createSprite((spaceShip.x-10),(spaceShip.y-85));
      bullet2 = createSprite((spaceShip.x+35),(spaceShip.y-85));
      
      bullet.addImage(bulletImg);
      bullet.velocityY = -10;
      bullet2.addImage(bulletImg);
      bullet2.velocityY = -10;
      
      console.log("bullets baby");

      bullet.lifetime = 50;
      bullet2.lifetime = 50;
      
      bulletGroup.add(bullet);
      bulletGroup.add(bullet2);
    }

    if (speed_lvl === 4)
    {
      bullet = createSprite((spaceShip.x-10),(spaceShip.y-85));
      bullet2 = createSprite((spaceShip.x+35),(spaceShip.y-85));
      
      bullet.addImage(bulletImg);
      bullet.velocityY = -10;
      bullet2.addImage(bulletImg);
      bullet2.velocityY = -10;
      
      console.log("bullets baby");

      bullet.lifetime = 50;
      bullet2.lifetime = 50;
      
      bulletGroup.add(bullet);
      bulletGroup.add(bullet2);
    }
  }

  if (choice === r)
  {
    if (upgrade_level === 1)
    {
      bullet = createSprite((spaceShip.x-30),(spaceShip.y-50));
      bullet2 = createSprite((spaceShip.x+50),(spaceShip.y-50));
      
      bullet.addImage(bulletImg);
      bullet.velocityY = -10;
      bullet2.addImage(bulletImg);
      bullet2.velocityY = -10;
      
      console.log("bullets baby");

      bullet.lifetime = 50;
      bullet2.lifetime = 50;
      
      bulletGroup.add(bullet);
      bulletGroup.add(bullet2);
    }

    if (upgrade_level === 2)
    {
      bullet = createSprite((spaceShip.x-30),(spaceShip.y-80));
      bullet2 = createSprite((spaceShip.x+50),(spaceShip.y-80));
      
      bullet.addImage(bulletImg);
      bullet.velocityY = -10;
      bullet2.addImage(bulletImg);
      bullet2.velocityY = -10;
      
      console.log("bullets baby");

      bullet.lifetime = 50;
      bullet2.lifetime = 50;
      
      bulletGroup.add(bullet);
      bulletGroup.add(bullet2);
    }

    if (upgrade_level === 3)
    {
      bullet = createSprite((spaceShip.x-30),(spaceShip.y-80));
      bullet2 = createSprite((spaceShip.x+50),(spaceShip.y-80));
      
      bullet.addImage(bulletImg);
      bullet.velocityY = -10;
      bullet2.addImage(bulletImg);
      bullet2.velocityY = -10;
      
      console.log("bullets baby");

      bullet.lifetime = 50;
      bullet2.lifetime = 50;
      
      bulletGroup.add(bullet);
      bulletGroup.add(bullet2);
    }

    if (upgrade_level === 4)
    {
      bullet = createSprite((spaceShip.x-50),(spaceShip.y-85));
      bullet2 = createSprite((spaceShip.x+70),(spaceShip.y-85));
      
      bullet.addImage(bulletImg);
      bullet.velocityY = -10;
      bullet2.addImage(bulletImg);
      bullet2.velocityY = -10;
      
      console.log("bullets baby");

      bullet.lifetime = 50;
      bullet2.lifetime = 50;
      
      bulletGroup.add(bullet);
      bulletGroup.add(bullet2);
    }

    if (speed_lvl === 4)
    {
      bullet = createSprite((spaceShip.x-40),(spaceShip.y-100));
      bullet2 = createSprite((spaceShip.x+60),(spaceShip.y-100));
      
      bullet.addImage(bulletImg);
      bullet.velocityY = -10;
      bullet2.addImage(bulletImg);
      bullet2.velocityY = -10;
      

      bullet.lifetime = 50;
      bullet2.lifetime = 50;
      
      bulletGroup.add(bullet);
      bulletGroup.add(bullet2);

      bullet3 = createSprite((spaceShip.x-10),(spaceShip.y-115));
      bullet4 = createSprite((spaceShip.x+35),(spaceShip.y-115));
      
      bullet3.addImage(bulletImg);
      bullet3.velocityY = -10;
      bullet4.addImage(bulletImg);
      bullet4.velocityY = -10;

      bullet3.lifetime = 50;
      bullet4.lifetime = 50;
      
      bulletGroup.add(bullet3);
      bulletGroup.add(bullet4);
    }
  }

  if (choice === f)
  {
    if (upgrade_level === 1)
    {
      bullet = createSprite((spaceShip.x-30),(spaceShip.y-50));
      bullet2 = createSprite((spaceShip.x+50),(spaceShip.y-50));
      
      bullet.addImage(bulletImg);
      bullet.velocityY = -10;
      bullet2.addImage(bulletImg);
      bullet2.velocityY = -10;
      
      console.log("bullets baby");

      bullet.lifetime = 50;
      bullet2.lifetime = 50;
      
      bulletGroup.add(bullet);
      bulletGroup.add(bullet2);
    }

    if (upgrade_level === 2)
    {
      bullet = createSprite((spaceShip.x-30),(spaceShip.y-40));
      bullet2 = createSprite((spaceShip.x+50),(spaceShip.y-40));
      
      bullet.addImage(bulletImg);
      bullet.velocityY = -10;
      bullet2.addImage(bulletImg);
      bullet2.velocityY = -10;
      
      console.log("bullets baby");

      bullet.lifetime = 50;
      bullet2.lifetime = 50;
      
      bulletGroup.add(bullet);
      bulletGroup.add(bullet2);
    }

    if (upgrade_level === 3)
    {
      bullet = createSprite((spaceShip.x-60),(spaceShip.y-40));
      bullet2 = createSprite((spaceShip.x+90),(spaceShip.y-40));
      
      bullet.addImage(bulletImg);
      bullet.velocityY = -10;
      bullet2.addImage(bulletImg);
      bullet2.velocityY = -10;
      
      console.log("bullets baby");

      bullet.lifetime = 50;
      bullet2.lifetime = 50;
      
      bulletGroup.add(bullet);
      bulletGroup.add(bullet2);
    }

    if (upgrade_level === 4)
    {
      bullet = createSprite((spaceShip.x-50),(spaceShip.y-70));
      bullet2 = createSprite((spaceShip.x+70),(spaceShip.y-70));
      
      bullet.addImage(bulletImg);
      bullet.velocityY = -10;
      bullet2.addImage(bulletImg);
      bullet2.velocityY = -10;
      
      console.log("bullets baby");

      bullet.lifetime = 50;
      bullet2.lifetime = 50;
      
      bulletGroup.add(bullet);
      bulletGroup.add(bullet2);
    }

    if (speed_lvl === 4)
    {
      bullet = createSprite((spaceShip.x-60),(spaceShip.y-80));
      bullet2 = createSprite((spaceShip.x+80),(spaceShip.y-80));
      
      bullet.addImage(bulletImg);
      bullet.velocityY = -10;
      bullet2.addImage(bulletImg);
      bullet2.velocityY = -10;
      

      bullet.lifetime = 50;
      bullet2.lifetime = 50;
      
      bulletGroup.add(bullet);
      bulletGroup.add(bullet2);
    }
  }
}