// Here we import the node module 'http'
//var http = require('http');
import { createServer } from 'https';
import { extname } from 'path';

// Using the filesystem module
import { readFile } from 'fs';


// replace these values with those generated in your TokBox Account
var apiKey = "46651242";
var sessionId = "2_MX40NjY1MTI0Mn5-MTU4NjE2NTg3NTI2MH5SaHR4amgvNlRJSHVyNzFWYXEweTh2eWN-fg";
var token = "T1==cGFydG5lcl9pZD00NjY1MTI0MiZzaWc9NWE3YmQxNTg4MTkxZGY1YTNjNmMxMDE3MWQyMTY1NGQ2ZmEzNDQ4YTpzZXNzaW9uX2lkPTJfTVg0ME5qWTFNVEkwTW41LU1UVTROakUyTlRnM05USTJNSDVTYUhSNGFtZ3ZObFJKU0hWeU56RldZWEV3ZVRoMmVXTi1mZyZjcmVhdGVfdGltZT0xNTg2MTY3MzM5Jm5vbmNlPTAuOTQ0MjQ1OTcxNTk0NTU3JnJvbGU9c3Vic2NyaWJlciZleHBpcmVfdGltZT0xNTg2MTcwOTM4JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

/////////////////////////////////////////////////////////////



const port = process.env.PORT || 3000

//http.createServer get passed func handleRequest and starts listining on a port
var server = createServer(handleRequest);
server.listen(port);

console.log('Server started on port 8080');


//this function will handle the requests - this is done by receiving a request argument 
//and acts on a response argument
//this function is passed as a callback function for the func createServer() 
/*This handleRequest() method will serve a p5 sketch including an index.html, sketch.js, and style.css.*/
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

// Handling all of our errors here by alerting them
function handleError(error) {
    if (error) {
      alert(error.message);
    }
  }


// (optional) add server code here
// This connects to our heroku-app that serves the clients with sessions and tokens
var SERVER_BASE_URL = 'https://emotion-detection-01.herokuapp.com';
fetch(SERVER_BASE_URL + '/session').then(function(res) {
  return res.json()
}).then(function(res) {
  apiKey = res.apiKey;
  sessionId = res.sessionId;
  token = res.token;
  initializeSession();
}).catch(handleError);

// We initialize a session with our tokbox api key, and the session Id created by the heroku-app
function initializeSession() {
    var session = OT.initSession(apiKey, sessionId);
    
    // We want clients to be able to subscribe to (or view) each other's streams in the session.
    // Subscribe to a newly created stream
    session.on('streamCreated', function(event) {
        session.subscribe(event.stream, 'subscriber', {
          insertMode: 'append',
          width: '100%',
          height: '100%'
        }, handleError);
      });
      
  
    // Create a publisher so the clients send/publish their webcam stream
    var publisher = OT.initPublisher('publisher', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  
    // Connect to the session 
    session.connect(token, function(error) {
      // If the connection is successful, publish to the session
      if (error) {
        handleError(error);
      } else {
        session.publish(publisher, handleError);
      }
    });
  }
  