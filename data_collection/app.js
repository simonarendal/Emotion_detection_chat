//////////////////////MQTT/////////////////////////////////////

/*
	AUTOMATIC IDENTIFICATION MQTT CODE

	This code automatically attributes unique IDs to the different devices that
	connect to the webpage.

	It takes a while to get the unique IDs, but since it's automatic, it could save you some
	trouble of having to setup the devices manually.

	This is especially useful if you want to have more than two devices that have
	different interfaces, e.g. an asymmetrical multiplayer game.

	In practice, this code does the following:
	1. 		Connects to MQTT
	2. 		Asks the other connected devices(if any exist), whether they are using the current numeric ID, and waits 5000 milliseconds for an answer
	2a. 	If it is in use, it increase the numeric ID by one, and asks again
	2b. 	If it is not in use, or the 5000 milliseconds timer runs out,
				it updates its visuals and sends out a vibration message to every connected client
	3. 		If a vibration message is received, the device will vibrate (if it is supported, and if the screen has already been tapped)

 */

// We generate a random unique clientId when we start
// MQTT sends messages to everyone, including ourselves, so this is a way to make sure we recognize our own messages

var localHappyCounter1 = 0;
var localHappyCounter2 = 0;

var numbOfParticipants = 0;
var averageHappyCounters;

var no1 = false;
var no2 = false;


var clientOptions = {
    clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
  };
  
  
  // Uncomment one of the three following lines to choose your broker
  // var MQTTBrokerUrl = 'ws://iot.eclipse.org:80/ws';
  var MQTTBrokerUrl = "wss://test.mosquitto.org:8081";
  // var MQTTBrokerUrl = 'ws://broker.hivemq.com:8000';
  
  // We connect to it in the beginning
  // Be aware that this is not secure because it's public
  
  var client = mqtt.connect(MQTTBrokerUrl, clientOptions);
  
  // Topics can be thought of like "chat rooms", only those listening to the correct topic get the message
  // Make sure that this is very unique, so you only get your own messages
  // I.e. don't name it 'test', but instead 'JesperHyldahlFoghTest'
  //
  var Topic = "LesiEmotionChat"; // CHANGE THIS TO SOMETHING UNIQUE TO YOUR PROJECT
  var connectTopic = Topic + "-connect";
  var happyTopic = Topic + "-happy";
  var promptTopic = Topic + "-prompt";
  
  
  // We use a timer in order to only show the interface after we are fairly certain we have a unique ID
  // When we connect we want to do something
  client.on("connect", function (connack) {
    console.log("connected");
  
    client.subscribe(connectTopic, function (err) {
        // If we get an error show it on the console so we can see what went wrong
        if (err) {
          console.log("connection error");
        }
      });
    
      client.subscribe(happyTopic, function (err) {
        // If we get an error show it on the console so we can see what went wrong
        if (err) {
          console.log("connection error");
        }
    });

    client.subscribe(promptTopic, function (err) {
      // If we get an error show it on the console so we can see what went wrong
      if (err) {
        console.log("connection error");
      }
    });
});

// When we get any kind of message, we want to do something
client.on("message", function (topic, payload) {
    
    // The payload comes in as a Buffer(i.e. incomprehensible bytes), so we need to convert it first
    // This happens by using JSON.parse() after converting the Buffer to a string
    var convertedPayload = JSON.parse(payload.toString());
  
    // If we got a payload on the connection topic, do this
    if (topic === connectTopic) {
      // If we got a payload from someone else than us, and they have the same ID as us
      if (convertedPayload.clientId !== clientOptions.clientId) {
        // We get this message if someone has already claimed this ID
        if (convertedPayload.message === "HELLO") {
            if(convertedPayload.id === 1){
                console.log("first participant joined")
                numbOfParticipants = 1;
            }
            if (convertedPayload.id === 2){
                console.log("second participant joined")
                numbOfParticipants = 2;
                listener();
            }
        }
      }
    }
  
    if (topic === happyTopic) {
      if (convertedPayload.message === "LOCALHAPPYCOUNTER") {
        //console.log('these are the id : ' + convertedPayload.id);
        if(convertedPayload.id === 1){
          no1 = true;
          localHappyCounter1 = convertedPayload.localHappyCounter;
              
        }
        if (convertedPayload.id === 2){
          no2 = true;
          localHappyCounter2 = convertedPayload.localHappyCounter;
        }
      }
    }
  });
  


//this function will return a float. 
//arguments needed is value of mouseX, and the two ranges' max and min

function myMap(var1, min1, max1, min2, max2 )
{
  
  var range1 = (max1-min1); //defines range of range1
  var range2 = (max2-min2); // defines range of range2
  var convertNum = (var1/range1); //dividing current value of mouseX with range1. 
  //procentage calculation. How much is one procent..

  //multiplying the result from above to scale the value to new range
  var var2 = (convertNum * range2); 
  // Procent regning: ganger det med 100 for at få det i procent. Her ganes med nye range for at skalere den til denne range

  //return var2 
  return var2;
}




function sendPrompt () {
    //averageBackground();

    var promptPayload = {
        clientId : clientOptions.clientId,
        message : 'PROMPT',
        HC1: int(myMap(localHappyCounter1, 0, 1, 0, 1000)),
        HC2: int(myMap(localHappyCounter2, 0, 1, 0, 1000))
    };

    client.publish(promptTopic, JSON.stringify(promptPayload));
    no1 = false;
    no2 = false;
}    

/*
function averageBackground (){
   averageHappyCounters = (localHappyCounter1 + localHappyCounter2) / 2;
   backgroundOpacity = round(myMap(averageHappyCounters, 0, 1, 0, 225))+30;
  }
*/

  ///////////////////////////////////////////////////////////////
 /////////////////////TOKBOX////////////////////////////////////
///////////////////////////////////////////////////////////////

//import * as faceapi from '../green/face-api.min.js';

async function playVideo () {
  await faceapi.nets.tinyFaceDetector.loadFromUri('../green/models'), 
  await faceapi.nets.faceLandmark68Net.loadFromUri('../green/models'),
  await faceapi.nets.faceExpressionNet.loadFromUri('../green/models'),
  initializeSession();
} 

playVideo();


// replace these values with those generated in your TokBox Account
var apiKey = "46651242";
var sessionId =
  "2_MX40NjY1MTI0Mn5-MTU4NjE2NTg3NTI2MH5SaHR4amgvNlRJSHVyNzFWYXEweTh2eWN-fg";
var token =
  "T1==cGFydG5lcl9pZD00NjY1MTI0MiZzaWc9NWE3YmQxNTg4MTkxZGY1YTNjNmMxMDE3MWQyMTY1NGQ2ZmEzNDQ4YTpzZXNzaW9uX2lkPTJfTVg0ME5qWTFNVEkwTW41LU1UVTROakUyTlRnM05USTJNSDVTYUhSNGFtZ3ZObFJKU0hWeU56RldZWEV3ZVRoMmVXTi1mZyZjcmVhdGVfdGltZT0xNTg2MTY3MzM5Jm5vbmNlPTAuOTQ0MjQ1OTcxNTk0NTU3JnJvbGU9c3Vic2NyaWJlciZleHBpcmVfdGltZT0xNTg2MTcwOTM4JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

var videoSrc;
// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

// (optional) add server code here
// This connects to our heroku-app that serves the clients with sessions and tokens
var SERVER_BASE_URL = "https://emotion-detection-01.herokuapp.com";
fetch(SERVER_BASE_URL + "/session")
  .then(function (res) {
    return res.json();
  })
  .then(function (res) {
    apiKey = res.apiKey;
    sessionId = res.sessionId;
    token = res.token;
    //initializeSession();
  })
  .catch(handleError);

  /*
  async function playVideo () {
    await faceapi.nets.tinyFaceDetector.loadFromUri('../green/models'), 
    await faceapi.nets.faceLandmark68Net.loadFromUri('../green/models'),
    await faceapi.nets.faceExpressionNet.loadFromUri('../green/models'),
    listener();
  } 
  
  playVideo();
  */
// We initialize a session with our tokbox api key, and the session Id created by the heroku-app
function initializeSession() {



  var session = OT.initSession(apiKey, sessionId);

  // We want clients to be able to subscribe to (or view) each other's streams in the session.
  // Subscribe to a newly created stream
  session.on("streamCreated", function (event) {
    var subscriber = session.subscribe(event.stream, {insertDefaultUI: false});
    subscriber.on('videoElementCreated', function(event) {
    var videoElement = document.getElementById('videos').appendChild(event.element);
      console.log('this is element: ' + videoElement.srcObject);
    videoSrc = videoElement.srcObject;
    //var isActive = videoSrc.id;
    console.log('videoSrc1: ' + videoSrc);  
    });
  });


  /*
  // Create a publisher so the clients send/publish their webcam stream
  var publisher = OT.initPublisher(
    "publisher",
    {
      insertMode: "append",
      width: "100%",
      height: "100%",
    },
    handleError
  );
*/

  // Connect to the session
  session.connect(token, function (error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      //session.publish(publisher, handleError);
    }
  });


}

function listener() {
//ADD EVENTLISTENER ON VIDEO ELEMENT
console.log('inside listener');
videoSrc.addEventListener('playing', function() {
  console.log('EventListener added on video');

   //TRY TO DETECT FACES EVERY 100 MILLISECONDS
   setInterval(async () => {
     try{
     //OBS! CALLING DETECTALLFACES FUNCTION DOES NOT WORK ON ALL COMPUTERS!
     
     //const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
     const detections = await faceapi.detectAllFaces(video8, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()
     console.log('happy: ' + (detections[0].expressions.happy));
    }
    
    catch (err){
      console.log(err);
      //console.log("Something went wrong with face api!");
      readFace = false;
      }
    }, 200)
  })
}
