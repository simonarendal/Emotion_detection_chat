//const video = document.getElementById('video');
const video1 = document.getElementsByClassName('OT_video-element');
const video2 = document.getElementsByTagName("video")[0];
const video3 = document.getElementsByTagName("video").item(0);
const video4 = document.getElementsByTagName("video")[1];
const video5 = document.getElementsByTagName("video").item(1);
const video6 = document.getElementById('subscriber').childNodes.length;
const video7 = document.getElementsByTagName('OT_video-element');
const video8 = document.querySelector('#subscriber > video > video.ot_video-element');

const video9 = document.getElementsByClassName("OT_video-element");

 

const test = document.getElementsByClassName('test');
//var detections;
//var backgroundOpacity = 30;
var localHappyCounter = 0;
var happyTreshold = 0.2;
var timesRun = 0;
//var chaseBackgroundOpacity = 0;
//var chaseSpeed = 4;
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

//LOADING ALL THE NEEDED MODELS FROM MODEL FOLDER INSIDE GREEN FOLDER
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'), 
    //faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./models')
  ]).then(startVideo) //when models are loaded --> start video

function setup() {
    loadCamera();
    loadCanvas(windowWidth,windowHeight);
    
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

function draw() {/*
  console.log('video: ' + video);

  console.log('video1: ' + video1);
  console.log('video2: ' + video2);
  console.log('video3: ' + video3);
  console.log('video6: ' + video6);
  //console.log('video7: ' + video7);

*/
 // console.log('video8: ' + video8);
  // console.log('video9: ' + video9);

  
  setGradient(c1, c2);  
  //background(252, 191, 73);
    
    //background(120,250,70, chaseBackgroundOpacity);  
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


//STARTING VIDEO FEED
function startVideo() {
if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      // Log the error if we can't get access to the webcam
      console.log("Something went wrong with video feed!");
      
    });
}
}
  
//ADD EVENTLISTENER ON VIDEO ELEMENT
  video8.addEventListener('playing', function() {
   // console.log('EventListener added on video');

    //TRY TO DETECT FACES EVERY 100 MILLISECONDS
    setInterval(async () => {
      try{
      //OBS! CALLING DETECTALLFACES FUNCTION DOES NOT WORK ON ALL COMPUTERS!
      
      //const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      const detections = await faceapi.detectAllFaces(video8, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()
      
      
      if(detections[0].expressions.happy === null){
        console.log('detections was null');
        localHappyCounter += 0.2;
      }
      else {
        localHappyCounter += detections[0].expressions.happy;
        //console.log('LOCALHAPPYCOUNTER: ' + localHappyCounter);
      }
      //console.log(detections[0].expressions);
      timesRun ++;
      readFace = true;
    }

      catch (err){
      console.log(err);
      //console.log("Something went wrong with face api!");
      readFace = false;
      }

    }, 200)
  })

