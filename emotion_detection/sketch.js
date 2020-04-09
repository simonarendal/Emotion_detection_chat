//var socket;
var happyCounter = 0;
var happyTreshold = 0.2;
function setup() {
    loadCamera();
    loadTracker();
    loadCanvas(windowWidth,windowHeight);
    
    /*
    // From our 'webchat' sketch
    socket = io.connect('https://emotion-detection-01.herokuapp.com');
    socket.on('mouse', newDrawing);
    */
}
      
function draw() {

    getPositions();
    getEmotions();
    clear();
    
    videoInput.hide();

    noStroke();
    fill(0,150);
    //rect(0,0,width,height);

    
/*
    if (emotions) {
   

        // angry=0, sad=1, surprised=2, happy=3
        for (var i = 0;i < predictedEmotions.length;i++) {
            rect(i * 250+20, 120, 30, -predictedEmotions[i].value * 30);    
        
            if (predictedEmotions[3].value < happyTreshold){
                var notHappyPayload = {
                    clientId : clientOptions.clientId,
                    message : 'NOT_HAPPY'
                };
                // We send/publish the payload to the connection topic
                client.publish(Topic, JSON.stringify(notHappyPayload));

                // ANd writes in the log
                //console.log('sending "NOT_HAPPY"')
                
        
                // Restart the connection timer
                updateTimer();
            }
           

            if (predictedEmotions[3].value > happyTreshold){
                var HappyPayload = {
                    clientId : clientOptions.clientId,
                    message : 'HAPPY'
                };
                // We send/publish the payload to the connection topic
                client.publish(Topic, JSON.stringify(HappyPayload));

                // ANd writes in the log
                //console.log('sending "HAPPY"')
                
        
                // Restart the connection timer
                //updateTimer();
            }
            //console.log('pev =' + predictedEmotions[3].value);

        }
    }
  

    client.on('message', function (topic, payload) {
        var convertedPayload = JSON.parse(payload.toString());

        if(convertedPayload.message === 'HAPPY') {
            happyCounter ++; 
        }
        console.log('happyCounter: ' + str(happyCounter));

    })
  
    

    text("ANGRY", 20, 140);
    text("SAD", 270, 140);
    text("SURPRISED", 520, 140);
    text("HAPPY", 770, 140);
    
    */
}



