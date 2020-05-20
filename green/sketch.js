var readFace1 = true;
var readFace2 = true;
let circlesPublisher =  [];
let circlesSubscriber =  [];

var opacity1;
var opacity2;
var chaseBar1 = 0;
var chaseBar2 = 0;
var chaseBarCollective = 0;

var chaseSpeed = 6;

//background gradient
var c1, c2;
var dim;
let publisher;


function setup() {

  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0,0);
  background(255, 0, 200);
    
    for(let i = 0; i<200;i++){
      circlesSubscriber.push(new Ellipse());
    }

    for(let i = 0; i<150;i++){
      circlesPublisher.push(new Publisher());
    }
  
    
    //c2 = color(255, 158, 0);
    publisher = new Publisher();
}

function drawSubscriber(){
  fill(200,200,200);
  noStroke();
    ellipse((width/2), (height/2), 509,509);
    fill(0, 0, 0);
    ellipse((width/2), (height/2), 450,450);
  

    fill(255);
    textSize(16);
    text("Her er din date", this.x-10, this.y);
    fill(200,200,200,50);
    ellipse((width/2), (height/2), 529,529);

}

function setGradient(c1, c2) {
  // noprotect
  noFill();
  for (var opacity = 0; opacity < height; opacity++) {
    var inter = map(opacity, 0, height, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, opacity, width, opacity);
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  //background(0,0,0);
  drawSubscriber();
  //background(220,155,55,opacity);

  backgroundOpacity();
  //c1 = color(opacity, 158, 0);
  publisher.drawPublisher();
  console.log('opacity: ' + opacity1);
  c1 = color(opacity1-30, 0, opacity1);
  c2 = color(opacity1, opacity1/5, 0);
  setGradient(c1, c2);      
  chase();   
  textSize(18);
  if(numericId ===1){
   for(var i =0; i< circlesSubscriber.length; i++){
    circlesSubscriber[i].createCircle(i*(TWO_PI/circlesSubscriber.length),chaseBar2/(i+1));
   }

   for(var i =0; i< circlesPublisher.length; i++){
    circlesPublisher[i].createCircle(i*(TWO_PI/circlesPublisher.length),chaseBar1/(i+1));
    }
  }

  else if(numericId ===2){
    for(var i =0; i< circlesPublisher.length; i++){
     circlesPublisher[i].createCircle(i*(TWO_PI/circlesPublisher.length),chaseBar2/(i+1));
    }
 
    for(var i =0; i< circlesSubscriber.length; i++){
     circlesSubscriber[i].createCircle(i*(TWO_PI/circlesSubscriber.length),chaseBar1/(i+1));
     }
   }


 //When face cannot be detected/read text appear on screen    
  if(readFace1 === false && numericId ===1){
    fill(255,0,0);
    strokeWeight(1);
    stroke(0,0,0);
    textSize(25);
    text('Cannot read face!',50,55);
  }

  if(readFace2 === false && numericId === 2){
    fill(255,0,0);
    strokeWeight(1);
    stroke(0,0,0);
    textSize(25);
    text('Cannot read face!',(width/2)-100,55);
  }
  
  
  stroke(255,255,255);
  strokeWeight(0.5);
  fill(255,255,255);
 
  
  /////// DEBUG UI ///////////
  
  text('my ID: ' + (numericId),30,50);

  text('bar1: ' + (bar1),30,110);
  text('chaseBar1: ' + (chaseBar1),30,130);

  text('bar2: ' + (bar2),30,160);
  text('chaseBar2: '+  (chaseBar2) ,30,180);

  text('chaseBarCollective:  ' + (chaseBarCollective),30,210);
  
  text('face reading 1: ' + (readFace1),30,240);
  text('face reading 2: ' + (readFace2),30,260);


  

           
}
// Function to make the background change more smoothly

function chase(){
    if(chaseBar1 <= bar1+(3*chaseSpeed)){
        chaseBar1 += 3*chaseSpeed;
      } 
    else if (chaseBar1 >= bar1+(2*chaseSpeed)){
        chaseBar1 -= 2*chaseSpeed;
      } 
    
    if(chaseBar2 <= bar2+(3*chaseSpeed)){
      chaseBar2 += 3*chaseSpeed;
      } 
    else if (chaseBar2 >= bar2+(2*chaseSpeed)){
      chaseBar2 -= 2*chaseSpeed;
    }

    if (chaseBarCollective <= barCollective+(chaseSpeed*2)){
    chaseBarCollective += chaseSpeed*2;
      }
    else if (chaseBarCollective >= barCollective+chaseSpeed){
    chaseBarCollective -= chaseSpeed;
      }

}



function backgroundOpacity () {
  opacity1 = map(chaseBarCollective,0,1000,50,255);
}

