const video = document.getElementById('video');
var expression;
//loading all the needed models
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./fading_background/models'), 
    faceapi.nets.faceLandmark68Net.loadFromUri('./fading_background/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./fading_background/models')
  ]).then(startVideo) //when models are loaded --> start video

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
}

function draw() {
background(255,255,255);  
var expression1 = parseFloat(expression).toFixed(3);
textSize(20);
textAlign(CENTER,TOP);
fill(100, 255, 100);
text('Happy scale:' + (expression1), 0, 0, windowWidth);

fill(0, 0, 0);

text('Login med kodeordet green, når du har læst nedenstående', windowWidth/2,50)

textSize(14);
text('Husk at trykke "OK", når du bliver spurgt om du tillader, at vi gør brug af webcam og mikrofon', windowWidth/2,80) 
text('Appen bruger dit webcam til at prøve at se, hvordan jeres date går', windowWidth/2,105) 
text('Resultatet vil vi præsentere for dig, og sammenligne med din egen oplevelse i det opfølgende interview ', windowWidth/2,130)
text('Jeres samtale er fuldstændig privat, da vi hverken ser eller hører på jer, mens i er på date', windowWidth/2,155) 
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
      
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
   
    expression = (detections[0].expressions.happy);

    console.log(detections[0].expressions.happy);
 
   
    //}
      //console.log('localHappyCounter = ' + (localHappyCounter))

    }, 100)
  })

