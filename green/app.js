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

let ellipsesBlue = [];
let ellipsesRed = [];
let newEllipse;

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


// Since clientIds are random, we also keep a numerical ID which is easier to work with
var numericId = 1;
var ellipse1 = 0;
var ellipse2 = 0;

// When we connect we want to do something
client.on("connect", function (connack) {
  console.log("connected");

  // Messages are called payloads in MQTT
  // We create a payload with our unique ID and a textual message
  var payload = {
    id : numericId,
    clientId: clientOptions.clientId,
    message: "HELLO",
  };
  // We send/publish the message to the topic
  client.publish(connectTopic, JSON.stringify(payload));

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
  //console.log("received message");

  // The payload comes in as a Buffer(i.e. incomprehensible bytes), so we need to convert it first
  // This happens by using JSON.parse() after converting the Buffer to a string
  var convertedPayload = JSON.parse(payload.toString());

  // If we got a payload on the connection topic, do this
  if (topic === connectTopic) {

		// If we got a payload from someone else than us, and they have the same ID as us
    if(convertedPayload.clientId !== clientOptions.clientId && convertedPayload.id === numericId) {
			// We get this message if someone has already claimed this ID
			if(convertedPayload.message === 'ID_TAKEN') {
        // We switch to the other ID
        if(convertedPayload.id === 1){
          numericId = 2;
        }
        if(convertedPayload.id === 2){
          numericId = 1;
        }
        

        // We say hello again with our new ID
				var helloPayload = {
					id : numericId,
					clientId : clientOptions.clientId,
					message : 'HELLO'
        };
        
        console.log('MY ID: ' + helloPayload.id);
				// We send/publish the payload to the connection topic
				client.publish(connectTopic, JSON.stringify(helloPayload));


      }
        
 			  // We get this message if someone new comes along, or someone has gotten a new ID
      else if(convertedPayload.message === 'HELLO') {
          // Let everyone know that this ID is taken
          var changePayload = {
            id : numericId,
            clientId : clientOptions.clientId,
            message : 'ID_TAKEN'
          };
          // We send/publish the payload to the connection topic
          client.publish(connectTopic, JSON.stringify(changePayload));
        }
   
    }
  }
 

  if (topic === promptTopic) {
    if (convertedPayload.message === "PROMPT") {
      ellipse1 = convertedPayload.HC1;
      ellipse2 = convertedPayload.HC2;
      ellipsesRed.push(new Ellipse(ellipse1,ellipse1, random(0,width/2)));

      ellipsesBlue.push(new Ellipse(ellipse2,ellipse2, random(width/2,width)));
    
     
      
    //  console.log(convertedPayload.HC1);
    //  console.log(convertedPayload.HC2);
      publishLocalHappyCounter();
     
    }
  }


});


  ///////////////////////////////////////////////////////////////
 /////////////////////TOKBOX////////////////////////////////////
///////////////////////////////////////////////////////////////

// replace these values with those generated in your TokBox Account
var apiKey = "46651242";
var sessionId =
  "2_MX40NjY1MTI0Mn5-MTU4NjE2NTg3NTI2MH5SaHR4amgvNlRJSHVyNzFWYXEweTh2eWN-fg";
var token =
  "T1==cGFydG5lcl9pZD00NjY1MTI0MiZzaWc9NWE3YmQxNTg4MTkxZGY1YTNjNmMxMDE3MWQyMTY1NGQ2ZmEzNDQ4YTpzZXNzaW9uX2lkPTJfTVg0ME5qWTFNVEkwTW41LU1UVTROakUyTlRnM05USTJNSDVTYUhSNGFtZ3ZObFJKU0hWeU56RldZWEV3ZVRoMmVXTi1mZyZjcmVhdGVfdGltZT0xNTg2MTY3MzM5Jm5vbmNlPTAuOTQ0MjQ1OTcxNTk0NTU3JnJvbGU9c3Vic2NyaWJlciZleHBpcmVfdGltZT0xNTg2MTcwOTM4JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

  
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
    initializeSession();
  })
  .catch(handleError);

/*
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'), 
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./models')
  ]).then(initializeSession()) //when models are loaded --> start video
  
*/
// We initialize a session with our tokbox api key, and the session Id created by the heroku-app
function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // We want clients to be able to subscribe to (or view) each other's streams in the session.
  // Subscribe to a newly created stream
  session.on("streamCreated", function (event) {
    session.subscribe(
      event.stream,
      "subscriber",
      {
        insertMode: "append",
        width: "100%",
        height: "100%",
      },
      handleError
    );
  });

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

  // Connect to the session
  session.connect(token, function (error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}


///////////////////////////////////////////////////////////////////////

function publishLocalHappyCounter(){
//console.log('this is localHappyCounter: ' + localHappyCounter);
//console.log('this is timesrun: ' + timesRun);

  var publishedLocalHappyCounter = localHappyCounter/timesRun;
  var HappyPayload = {
    id : numericId,
    clientId : clientOptions.clientId,
    message : 'LOCALHAPPYCOUNTER',
    localHappyCounter : publishedLocalHappyCounter                      
};
client.publish(happyTopic, JSON.stringify(HappyPayload));
//console.log('localHappyCounter published: ' + (publishedLocalHappyCounter) + 'timesRun = ' + (timesRun));
localHappyCounter = 0; 
timesRun = 0;

}   

