const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
const video = document.getElementById('video');
var expression;

var roomName = 'green';
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./fading_background/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./fading_background/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./fading_background/models')
]).then(startVideo)

function startVideo() {
if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}
}

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


/*
function startVideo() {
    navigator.getUserMedia(
      { video: {} },
      stream => video.srcObject = stream,
      err => console.error(err)
    )

  }
  */
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

// When the login button is clicked, the following code is executed
loginButton.addEventListener("click", (e) => {
  // Prevent the default submission of the form
  e.preventDefault();
  // Get the values input by the user in the form fields
  //const username = loginForm.username.value;
  const password = loginForm.password.value;

  if (password === roomName) {
      // If the credentials are valid, show an alert box and reload the page
      alert("I agree to the terms");
      location.replace("https://leonorabryndum.dk/tokbox/" + roomName)  
  } else {
      // Otherwise, make the login error message show (change its oppacity)
      loginErrorMsg.style.opacity = 1;
  }
})