var happyCounter = 0;
var localHappyCounter = 0;
var happyTreshold = 0.3;
//let ellipses = [];
let e;
let timer = 0;


function setup() {
    loadCamera();
    loadTracker();
    loadCanvas(windowWidth,windowHeight);

}

function draw() {
    background(0,0,200);
    //e.createEllipse();
    //getPositions();
    getEmotions();
    clear();
    
    videoInput.hide();

    for(var i =0; i< ellipses.length; i++){
    ellipses[i].createEllipse();
    }


    noStroke();
    fill(0,150);
    //rect(0,0,width,height);

    if (emotions) {
        // angry=0, sad=1, surprised=2, happy=3
        for (var i = 0;i < predictedEmotions.length;i++) {
            rect(i * 250+20, 120, 30, -predictedEmotions[i].value * 30);    
            text('happyCounter=' + str(happyCounter),60, width/2);
                     

            if (predictedEmotions[3].value >= happyTreshold){
                localHappyCounter ++;
                console.log('localHappyCounter =' + str(localHappyCounter))
            }
        
                // Restart the connection timer
                //updateTimer();
            }
        
            
        if (localHappyCounter >= 100) { 
                localHappyCounter = 0;
                
                //console.log('sending "HAPPY"')
                // We send/publish the payload to the happy topic
                publishFunc();
                
        }
        }

 
    text("HAPPY", 770, 140);
    


    
   }

   function publishFunc () {
    var HappyPayload = {
        clientId : clientOptions.clientId,
        message : 'HAPPY'                     
    };
    client.publish(happyTopic, JSON.stringify(HappyPayload));
    console.log('message published')

}    

function drawEllipse() {
    console.log('drawing ellipse')
    //e.createEllipse();
    fill(0,0,0);
    ellipse(random(0, width), 20, 20, 20);
}


