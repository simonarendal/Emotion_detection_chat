var localHappyCounter = 0;
var happyTreshold = 0.2;
var timesRun = 0;
var readFace = true;
let barRed = [];
let barBlue = [];
let circles =  [];


var chaseBar1 = 0;
var chaseBar2 = 0;
var chaseBarCollective = 0;

var chaseSpeed = 10;

//background gradient
var c1, c2;
var dim;


function setup() {

  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0,0);
  background(255, 0, 200);

    for(let i =0; i< 20; i++){
    barRed.push(new Bar());
    }

    for(let i =0; i< 20; i++){
    barBlue.push(new Bar());
    }
    
    for(let i = 0; i<100;i++){
      circles.push(new Ellipse());
    }
  
    c1 = color(255, 158, 0);
    c2 = color(255, 72, 0);
    
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255,255,255);
  setGradient(c1, c2);      
  chase();   
  textSize(18);
  
   for(var i =0; i< circles.length; i++){
   circles[i].createCircle(i*(TWO_PI/circles.length),chaseBarCollective/(i+1));
   }

   for(var i =0; i< barRed.length; i++){
    barRed[i].createBar(95, 15, 64, chaseBar1/(i+1),10,windowHeight-((i+1)*windowHeight/barRed.length)-(i*5));
    }
   

   for(var i =0; i< barBlue.length; i++){
    barBlue[i].createBar(154, 3, 30, chaseBar2/(i+1),windowWidth-70,windowHeight-((i+1)*windowHeight/barBlue.length)-(i*5));
    }

   

 //When face cannot be detected/read text appear on screen    
  if(readFace === false){
    fill(255,0,0);
    text('Cannot read face!',25,25);
  }
  
  
  /////// DEBUG UI ///////////
  
  fill(0,0,0);
  text('face reading: ' + (readFace),100,100);
 
  //console.log('this is happy: ' + happy);
  //var happy = localHappyCounter/timesRun;
  //var happyText =parseFloat(happy).toFixed(2); ;
  //text('Happy: ' + happyText,100,150); //detections er ikke defineret heroppe    ahh okay
  //text('BO: ' + (backgroundOpacity),100,200); 
  text('chaseBar1: ' + (chaseBar1),100,250);
  text('chaseBar2: '+  (chaseBar2) ,100,270);
  text('chaseBarCollective:  ' + (chaseBarCollective),100,290);
  text('bar1: ' + (bar1),100,340);
  text('bar2: ' + (bar2),100,360);
  text('my ID: ' + (numericId),100,400);
  text('timesRun: ' + (timesRun),100,420);

  

           
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