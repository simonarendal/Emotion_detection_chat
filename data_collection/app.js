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
var happyCounter = 0;

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
  
  console.log('happyCounter = ' + (happyCounter));
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
            if(convertedPayload.id === 1){
                console.log("first participant joined")
            }
            else if (convertedPayload.id === 2){
                console.log("second participant joined")
            }
        }
      }
    }
  
    if (topic === happyTopic) {
      if (convertedPayload.message === "HAPPY") {
        if(convertedPayload.id === 1){
            localHappyCounter1 ++;
            happyCounter++;
            console.log('client 1 is smiling' + 'happyCounter = ' + (happyCounter) + 'localHappyCounter1 = '+(localHappyCounter1));
            
        }
        else if (convertedPayload.id === 2){
            localHappyCounter2 ++;
            happyCounter++;
            console.log('client 2 is smiling' + 'happyCounter = ' + (happyCounter) + 'localHappyCounter2 = '+(localHappyCounter2));
        }
       
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