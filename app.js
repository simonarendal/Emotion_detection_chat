/*
// HTTP Portion
var https = require('https');
// URL module
var url = require('url');
var path = require('path');

// Using the filesystem module
var fs = require('fs');


Here we import the node module 'http'
var https = require('https');
import { createServer } from 'https';
import { extname } from 'path';

// Using the filesystem module
import { readFile } from 'fs';



/////////////////////////////////////////////////////////////

//const port = process.env.PORT || 3000

//http.createServer get passed func handleRequest and starts listining on a port
var server = https.createServer(handleRequest);
//server.listen(port);

console.log('Server started on port 8080');


//this function will handle the requests - this is done by receiving a request argument 
//and acts on a response argument
//this function is passed as a callback function for the func createServer() 
This handleRequest() method will serve a p5 sketch including an index.html, sketch.js, and style.css.
function handleRequest(req, res) {
 
  // What did we request?
  var pathname = req.url;
  
  // If blank let's ask for index.html
  if (pathname == '/') {
    pathname = '/index.html';
  }
  
  // Ok what's our file extension
  var ext = extname(pathname);

  // Map extension to file type
  var typeExt = {
    '.html': 'text/html',
    '.js':   'text/javascript',
    '.css':  'text/css'
  };

  // What is it?  Default to plain text
  var contentType = typeExt[ext] || 'text/plain';

  // We're really living in JavaScript land now. The readFile() function takes two arguments. 
  //The first argument is the path of the file we want to read and the second is a function 
  //that will be triggered once the file has been read.
  readFile(__dirname + pathname,
    // Callback function for reading
    function (err, data) {
      // if there is an error
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + pathname);
      }
      // Otherwise, send the data, the contents of the file
      res.writeHead(200,{ 'Content-Type': contentType });

      //We'll send back 'data' for every HTTP request made to the server.
      res.end(data);
    }
  );
}


// WebSockets work with the HTTP server
//we listen for socket connections on this server 
var io = require('socket.io').listen(server);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',

  // We are given a websocket object in our function
  //This socket argument is a reference for the current client connected. 
  //That client can also be passed callback functions. Here a callback function when client uses mouse
  function (socket) {
  
    console.log("We have a new client: " + socket.id);
  
    
    // When this user emits, client side: socket.emit('otherevent',some data);
    socket.on('mouse',
      function(data) {
      
        // Send it to all other clients
        socket.broadcast.emit('mouse', data);
        
        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");

      }
    );

    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);


/////////////////////////////////////////////////////////////
*/

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

let ellipses = [];


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

// We use a timer in order to only show the interface after we are fairly certain we have a unique ID
var connectionTimer = null;

// When we connect we want to do something
client.on("connect", function (connack) {
  console.log("connected");

  // Messages are called payloads in MQTT
  // We create a payload with our unique ID and a textual message
  var payload = {
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
    if (convertedPayload.clientId !== clientOptions.clientId) {
      // We get this message if someone has already claimed this ID
      if (convertedPayload.message === "HELLO") {
        console.log("other client joined on connectTopic");

       
      }
    }
  }

  if (topic === happyTopic) {
    if (convertedPayload.message === "HAPPY") {
      //console.log('received "HAPPY"');
	  if (happyCounter <= 255){happyCounter ++};
	  //ellipses.push(new Ellipse());
	 //drawEllipse()
      //console.log("happyCounter: " + happyCounter);
    }
  }
});

// Sets a timer that updates the interface, if enough time has passed
// The alternative would be to update the interface every time we are checking out a new ID

function updateTimer() {
  // If we already set a timer, clear it
  if (connectionTimer !== null) clearTimeout(connectionTimer);
  // Update the interface, if we haven't received another ID_TAKEN message within 5000 milliseconds
  connectionTimer = setTimeout(updateConnectionStatus, 5000);
}

// Show the current connection status to the page
function updateConnectionStatus() {
  // Hide, show and update the appropriate
  //$('.connecting').hide();
  //$('.message-container h3 ').show();
  // By changing the attribute 'data-id' on the HTML body, we can change the styling. See the CSS file for more.
  //$('body').attr('data-id', numericId);
  //$('.id-elem').text(numericId);
}
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
