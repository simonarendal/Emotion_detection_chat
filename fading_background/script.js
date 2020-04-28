//import {subscriberTest, publisherTest} from './test';

//const video = document.getElementById('publisher').children[0];
//const video = subsriberTest;
//const video = 'subscriber'
//var happyTreshold = 0.5;
//var localHappyCounter = 0;

//loading all the needed models
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'), 
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then(startVideo) //when models are loaded --> start video

/*
function startVideo() {
  console.log('this is video-element: ' + video);
    navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream, //getting stuff from the webcam
    err => console.error(err)
  ) 
}
*/

function startVideo() {
//console.log('inside script_subscriber: ' + subscriberTest);
//console.log('inside script_publisher: ' + publisherTest);


console.log('starting video');
console.log('this is video:' + video);
//console.log('this is video:' + subsriberTest);
video.on('playing', function (event) { // when video starts playing
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  event.setInterval(async () => { // this async function runs every 100 miliseconds
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    //clear the canvas
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    //drawing all the detections
    //faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    //console.log(detections[0].expressions.happy)
    if(detections[0].expressions.happy > happyTreshold){
      console.log('happy');
      localHappyCounter ++;
    }
    console.log('localHappyCounter = ' + (localHappyCounter))
  }, 100)

})
}
