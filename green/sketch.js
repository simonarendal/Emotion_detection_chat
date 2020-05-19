var readFace1 = true;
var readFace2 = true;
let circlesPublisher =  [];
let circlesSubscriber =  [];

var opacity;
var chaseBar1 = 0;
var chaseBar2 = 0;
var chaseBarCollective = 0;

var chaseSpeed = 10;

//background gradient
var c1, c2;
var dim;
let publisher;


function setup() {

  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0,0);
  background(255, 0, 200);
    
    for(let i = 0; i<100;i++){
      circlesSubscriber.push(new Ellipse());
    }

    for(let i = 0; i<100;i++){
      circlesPublisher.push(new Publisher());
    }
  
    c1 = color(255, 158, 0);
    c2 = color(255, 72, 0);
    publisher = new Publisher();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  //background(0,0,0);
  
  //background(220,155,55,opacity);

  backgroundOpacity();

  publisher.drawPublisher();
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
 
    for(var i =0; i< circlesPublisher.length; i++){
     circlesSubscriber[i].createCircle(i*(TWO_PI/circlesSubscriber.length),chaseBar1/(i+1));
     }
   }


 //When face cannot be detected/read text appear on screen    
  if(readFace1 === false && numericId ===1){
    fill(255,0,0);
    text('Cannot read face!',50,25);
  }

  if(readFace2 === false && numericId === 2){
    fill(255,0,0);
    text('Cannot read face!',50,25);
  }
  
  
  /////// DEBUG UI ///////////
  stroke(255,255,255);
strokeWeight(0.5);
  fill(255,255,255);
 

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

    if (chaseBarCollective <= (bar1+bar2)/2+(chaseSpeed/2)){
    chaseBarCollective += chaseSpeed/2;
      }
    else if (chaseBarCollective >= (bar1+bar2)/2+(chaseSpeed/8)){
    chaseBarCollective -= chaseSpeed/8;
      }

}



function backgroundOpacity () {
  opacity = map(chaseBarCollective,0,1000,0,255);
  
}

function setGradient(c1, c2) {
  // noprotect
  noFill();
  for (var y = 0; y < height; y++) {
    var inter = map(y, 0, height, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}