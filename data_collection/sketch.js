//const video = document.querySelector('#subscriber > video > ot_video-element');
//const video = document.querySelectorAll('subscriber')[0];

//const video1 = document.querySelector("#subscriber > video:nth-child(2)");
const video1 = document.getElementsByTagName("video").item(0);
//const video6 = document.getElementsByTagName('videos')[0];


async function loadingModels() { 
    console.log('loading models');
    //const net = new faceapi.tinyFaceDetector()
    //await net.loadFromUri('./models')
    //await faceapi.nets.tinyFaceDetector.loadFromUri('/models'), 
    //faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    //await faceapi.nets.faceExpressionNet.loadFromUri('/models')
    //net.load(await faceapi.fetchNetWeights('/models/face_expression_model.weights'))
   startVideo();
}

var yValue1 = 0;
var yValue2 = 0;

/*
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'), 
    //faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
   faceapi.nets.faceExpressionNet.loadFromUri('./models')
  ]).then(startVideo) //when models are loaded --> start video
*/

 function setup(){
    console.log(faceapi.nets)
     //loadingModels();
    //faceapi.nets.tinyFaceDetector.loadFromUri('./models'), 
        //faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    //faceapi.nets.faceExpressionNet.loadFromUri('./models')
    createCanvas(windowWidth, windowHeight);
    background(0,0,0);
    setInterval(sendPrompt,500);
    setInterval(startTimer,500);
    //setInterval(expressionDetection, 200);
    startVideo();
    }

    
  function startVideo () {
  console.log('element inside startVideo: ' + videoElement)
    //ADD EVENTLISTENER ON VIDEO ELEMENT
    
      videoElement.srcObject.addEventListener('playing', function() {
        console.log('EventListener added on video');
    
        //TRY TO DETECT FACES EVERY 100 MILLISECONDS
        setInterval(async () => {
          try{
          //OBS! CALLING DETECTALLFACES FUNCTION DOES NOT WORK ON ALL COMPUTERS!
          
          //const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
          //const detections = await faceapi.detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()
          
          console.log('INSIDE EXPRESSIONDETECTION');
          console.log('videoElement: ' + videoElement.srcObject);
          const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 320 });
          //const detections = await faceapi.tinyFaceDetector(videoElement, options);
          const detections = await faceapi.detectAllFaces(videoElement.srcObject, options).withFaceExpressions();
          console.log('expressions: ' + (detections[0].expressions.happy));

          
          if(detections[0].expressions.happy === null){
            //console.log('detections was null');
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
          //console.log(err);
          //console.log("Something went wrong with face api!");
          readFace = false;
          }
    
        }, 200)
      })
    
    }



function draw() {
    //console.log('video1: ' + (video1));
//console.log('videos 6:  ' + (video6));

    background(0,0,0);
    var n1 = yValue1.toFixed(2);
    var n2 = yValue2.toFixed(2);

if (no1 === false) {
    stroke(255,0,0);
    strokeWeight(10);
    point(310, 20);
}

if (no2 === false) {
    stroke(255,0,0);
    strokeWeight(10);
    point(310, 70);
}

    noStroke();
    fill(0,0,0);
    textSize(32);
    fill(255,255,255);
    text('PARTICIPANT1: ', 30,30);
    text('PARTICIPANT2: ', 30,80);

    textSize(20);
    text('participant 1: ' + str(n1), 100, 450);
    rect(100,400,40,-yValue1);

    text('participant 2: ' + str(n2), 300, 450);
    rect(300,400,40,-yValue2);
}

function startTimer() {
//console.log('timer started');
  //  yValue1 = map(localHappyCounter1, 0,1,0,100);

  //  yValue2 = map(localHappyCounter2, 0,1,0,100);

    //yValueAverage = map(averageHappyCounters, 0,1,0,80);
    
    //console.log('localHappyCounter1: ' + (localHappyCounter1) + ' : ' + ' localHappyCounter2: ' + (localHappyCounter2) );

}

/*
async function expressionDetection(){
    console.log('INSIDE EXPRESSIONDETECTION');
    console.log('videoElement: ' + videoElement);
    const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 320 });
    await faceapi.tinyFaceDetector(videoElement, options);
    //const detections = await faceapi.detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()
    console.log('expressions: ' + (detections[0].expressions.happy));
}
*/