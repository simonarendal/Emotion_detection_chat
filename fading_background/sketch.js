const video = document.getElementById('video');

var backgroundOpacity = 0;
var localHappyCounter = 0;
var happyTreshold = 0.2;
var timesRun = 0;
var chaseBackgroundOpacity = 0;
var chaseSpeed = 4;
var readFace = false;

//loading all the needed models
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'), 
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./models')
  ]).then(startVideo) //when models are loaded --> start video

function setup() {
    loadCamera();
    //loadTracker();
    loadCanvas(windowWidth,windowHeight);
}

function draw() {
    background(0,0,0);
    background(120,250,70, chaseBackgroundOpacity);  
    console.log ('backgroundOpacity = ' + (backgroundOpacity))
    chase();
    //fill(120,250,70,chaseBackgroundOpacity);
   // rect(500,0,200,200);     
    
   
  /////// DEBUG UI ///////////
  fill(255,255,255);

  textSize(32);
 
  text('face reading: ' + (readFace),100,100);

  console.log('this is happy: ' + happy);
  var happy = localHappyCounter/timesRun;
  var happyText =parseFloat(happy).toFixed(2); ;
  text('Happy: ' + happyText,100,150); 
  text('BO: ' + (backgroundOpacity),100,200); 
  text('Chase:' + (chaseBackgroundOpacity),100,250);

           
}

function chase(){
    if(chaseBackgroundOpacity < backgroundOpacity){
        chaseBackgroundOpacity += chaseSpeed;
    } 
    else if (chaseBackgroundOpacity > backgroundOpacity){
        chaseBackgroundOpacity -= 2*chaseSpeed;
    }
    console.log('chaseBackgroundOpacity = ' + (chaseBackgroundOpacity))

}


function startVideo() {
    navigator.getUserMedia(
      { video: {} },
      stream => video.srcObject = stream,
      err => console.error(err)
    )

  }
  
  video.addEventListener('play', () => {
   // const canvas = faceapi.createCanvasFromMedia(video)
    //document.body.append(canvas)
    //const displaySize = { width: video.width, height: video.height }
    //faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
      try{
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      localHappyCounter += detections[0].expressions.happy;
      timesRun ++;
      readFace = true;
    }
      //const resizedDetections = faceapi.resizeResults(detections, displaySize)
      //canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      //faceapi.draw.drawDetections(canvas, resizedDetections)
      //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
      //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    
 
      catch (err){
        //console.log(err);
      readFace = false;
      }

    //}
      //console.log('localHappyCounter = ' + (localHappyCounter))

    }, 100)
  })

