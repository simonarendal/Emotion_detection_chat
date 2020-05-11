
const video = document.getElementById('video');

//var backgroundOpacity = 30;
var localHappyCounter = 0;
var happyTreshold = 0.2;
var timesRun = 0;
//var chaseBackgroundOpacity = 0;
//var chaseSpeed = 4;
var readFace = true;

//LOADING ALL THE NEEDED MODELS FROM MODEL FOLDER INSIDE GREEN FOLDER
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'), 
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./models')
  ]).then(startVideo) //when models are loaded --> start video

function setup() {
    loadCamera();
    loadCanvas(windowWidth,windowHeight);
}

function draw() {
    background(255);
    //background(120,250,70, chaseBackgroundOpacity);  
    //chase();   
   textSize(18);
   for(var i =0; i< ellipsesRed.length; i++){
    ellipsesRed[i].createEllipse(6, 214, 160);
    }
   
  for(var i =0; i< ellipsesBlue.length; i++){
    ellipsesBlue[i].createEllipse(218, 126, 62);
    }


   

 //When face cannot be detected/read text appear on screen    
  if(readFace === false){
    fill(255,0,0);
    text('Cannot read face!',25,25);
  }
  
  /*
  /////// DEBUG UI ///////////
  fill(255,255,255);
  text('face reading: ' + (readFace),100,100);
 
  console.log('this is happy: ' + happy);
  var happy = localHappyCounter/timesRun;
  var happyText =parseFloat(happy).toFixed(2); ;
  text('Happy: ' + happyText,100,150); //detections er ikke defineret heroppe    ahh okay
  text('BO: ' + (backgroundOpacity),100,200); 
  text('Chase:' + (chaseBackgroundOpacity),100,250);
*/
           
}
// Function to make the background change more smoothly
/*
function chase(){
    if(chaseBackgroundOpacity < backgroundOpacity){
        chaseBackgroundOpacity += chaseSpeed;
    } 
    else if (chaseBackgroundOpacity > backgroundOpacity){
        chaseBackgroundOpacity -= 2*chaseSpeed;
    }

}
*/

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
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
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

    }, 100)
  })

