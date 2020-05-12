const video = document.getElementById('video');
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

var chaseBar1 = 0;
var chaseBar2 = 0;

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
    
  
    c1 = color(255, 158, 0);
    c2 = color(255, 72, 0);
    
}

function draw() {
  
  
  setGradient(c1, c2);  
  //background(252, 191, 73);
    
    //background(120,250,70, chaseBackgroundOpacity);  
    chase();   
   textSize(18);
   
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
  /*
  fill(0,0,0);
  text('face reading: ' + (readFace),100,100);
 
  //console.log('this is happy: ' + happy);
  //var happy = localHappyCounter/timesRun;
  //var happyText =parseFloat(happy).toFixed(2); ;
  //text('Happy: ' + happyText,100,150); //detections er ikke defineret heroppe    ahh okay
  //text('BO: ' + (backgroundOpacity),100,200); 
  text('chaseBar1: ' + (chaseBar1) + '  chaseBar2: '+  (chaseBar2),100,250);
  text('Bar1: ' + (bar1) + '  Bar2: '+  (bar2),100,300);
  */

           
}
// Function to make the background change more smoothly

function chase(){
    if(chaseBar1 <= bar1+200+(3*chaseSpeed)){
        chaseBar1 += 3*chaseSpeed;
    } 
    if (chaseBar1 >= bar1+(2*chaseSpeed)){
        chaseBar1 -= 2*chaseSpeed;
    }
    

    if(chaseBar2 <= bar2+200+(3*chaseSpeed)){
      chaseBar2 += 3*chaseSpeed;
  } 
  if (chaseBar2 >= bar2+(2*chaseSpeed)){
      chaseBar2 -= 2*chaseSpeed;
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
  video.addEventListener('play', () => {
    console.log('EventListener added on video');

    //TRY TO DETECT FACES EVERY 100 MILLISECONDS
    setInterval(async () => {
      try{
      //OBS! CALLING DETECTALLFACES FUNCTION DOES NOT WORK ON ALL COMPUTERS!
      
      //const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()
      localHappyCounter += detections[0].expressions.happy;
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

