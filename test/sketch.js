const video = document.getElementById('video');
var expression = true;
var detectionsBoolean = false;
var readFace = false;
var detections;

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('../green/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('../green/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('../green/models')
]).then(startVideo)


function startVideo() {
if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong with video feed!");
    });
}
}



function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
}

function draw() {
background(255,255,255);  
textSize(18);
textAlign(CENTER,TOP);
fill(100, 255, 100);
fill(0, 0, 0);

//console.log(isNaN(expression));


background(255,255,255);  
textSize(18);
textAlign(CENTER,TOP);
fill(100, 255, 100);
var expression1 = parseFloat(expression).toFixed(3);

text((expression1), 0, 0, windowWidth);

if(detectionsBoolean === true) {
    text('Detections are read',windowWidth/2,30);
    }    

if(isNaN(expression1) === false) {
    text('Value is a number', windowWidth/2, 80);

}
if(detectionsBoolean === false) {
    fill(255,0,0);
    text('Cannot read Detections',windowWidth/2,30);
    }

if(isNaN(expression1) === true) {
    fill(255,0,0);
    text('Value is NOT a number', windowWidth/2, 80);
}

if(readFace === false){
    fill(255,0,0);
    text('Show your face properly!',windowWidth/2,120);
     }

fill(0);
text('This is detections: ' + (detections), windowWidth/2, 150 )


}


  video.addEventListener('play', () => {

    setInterval(async () => {
    try{
    detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    expression = (detections[0].expressions.happy);
    if(detections === undefined) {
        detectionsBoolean = false;
    }

    else if(detections === null) {
      detectionsBoolean = false;
    }

    else {
      detectionsBoolean = true;
      readFace = true;
    }
    }
   
    catch (err){
    console.log(err);
    //console.log('something went wrong with face api');
    readFace = false;

    }

    }, 100)
  })

