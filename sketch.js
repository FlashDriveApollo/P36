
var standingDog, happyDog, database, foodS, foodStock;
var dog;

function preload()
{

  standingDog = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")

  
}

function setup() {
	createCanvas(500, 500);
  

  dog = createSprite(250,250,10,10)
  dog.addImage(standingDog)

  dog.scale = 0.5


  database = firebase.database()

  foodStock = database.ref('Food')

  writeStock(5)
 

  foodStock.on("value",readStock)
  

}


function draw() {  
  background(46,139,87)

  textSize(15)
  fill("black")
  stroke("blue")


  if(foodS>=1 && keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happyDog);
    foodS= foodS - 1
  }

  drawSprites();
  
  if(foodS>1)
  {
  text("Press the up arrow to feed the dog! You have " +foodS+ " treats left!",15,485)
  }
  else
  {
    text("Sorry! No more treats.",15,485)
  }
  

}


function readStock(data)
{
  foodS = data.val();

}


function writeStock(x)
{
  database.ref('/').update({
    Food:x
  })
}


