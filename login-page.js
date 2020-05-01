const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

const video = document.getElementById('video');


var canvas = document.getElementById("myCanvas");



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
  video.addEventListener('play', () => {
    //const canvas = faceapi.createCanvasFromMedia(video)
    //document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    //faceapi.matchDimensions(canvas, displaySize)
    //canvas.translate(video.width, 0);
    //canvas.scale(-1, 1);
      // ctx is the plotting canvas' context
  // w is the width of the canvas
  //ctx.translate(w, 0);
  //  ctx.scale(-1, 1);
  

    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      //const resizedDetections = faceapi.resizeResults(detections, displaySize)
      var ctx = canvas.getContext("2d");
      ctx.font = "30px Arial";
      
      ctx.fillText("Hello World " + (detections[0].expressions.happy),10,50);
      //canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      //faceapi.draw.drawDetections(canvas, resizedDetections)
      //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
      //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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