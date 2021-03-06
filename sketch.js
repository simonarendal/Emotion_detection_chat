const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
const video = document.getElementById('video');
var expression;
var readFace = false;

var roomName = 'green';
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./green/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./green/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./green/models')
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
var expression1 = parseFloat(expression).toFixed(3);
textSize(18);
textAlign(CENTER,TOP);
fill(100, 255, 100);
text('Happy scale:' + (expression1), 0, 0, windowWidth);

fill(0, 0, 0);

text('When the clock is 18.30 pm, please login with the password "green"', windowWidth/2,50)
text('At this point you will only see the other person, while sharing a mutual background!', windowWidth/2,75)

textSize(14);
text('Remember to press "OK", when you are ask if you allow the usage of webcam and microphone', windowWidth/2,105)
text('Please test if the lighting is good - app tells you if it "cannot read face"', windowWidth/2,130)
text('Please have a bit of patience, as the app can take some time to load', windowWidth/2,155)  
text('Ulf will stay on the platform after the date ends. Lif will receive facebook pm when her turn to be interviewed.', windowWidth/2,180)    
//text('Husk at trykke "OK", når du bliver spurgt om du tillader, at vi gør brug af webcam og mikrofon', windowWidth/2,80) 
//text('Appen bruger dit webcam til at prøve at se, hvordan jeres date går', windowWidth/2,105) 
//text('Resultatet vil vi præsentere for dig, og sammenligne med din egen oplevelse i det opfølgende interview ', windowWidth/2,130)
//text('Jeres samtale er fuldstændig privat, da vi hverken ser eller hører på jer, mens i er på date', windowWidth/2,155) 

if(readFace === false){
 fill(255,0,0);
 text('Cannot read face!',windowWidth/2,30);
  }

}


  video.addEventListener('play', () => {
   // const canvas = faceapi.createCanvasFromMedia(video)
    //document.body.append(canvas)
    //const displaySize = { width: video.width, height: video.height }
    //faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
    try{
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    expression = (detections[0].expressions.happy);
    console.log(detections[0].expressions.happy);
    readFace = true;
    }
   
    catch (err){
    console.log(err);
    console.log('something went wrong with face api');
    readFace = false;
    }
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
      alert("You are being redirected to your date now, have fun!");
      location.replace("https://leonorabryndum.dk/tokbox/" + roomName)  
  } else {
      // Otherwise, make the login error message show (change its oppacity)
      loginErrorMsg.style.opacity = 1;
  }
})
