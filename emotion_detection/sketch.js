var happyCounter = 150;
var localHappyCounter = 0;
var happyTreshold = 0.2;
//let ellipses = [];
//let e;

function setup() {
    loadCamera();
    loadTracker();
    loadCanvas(windowWidth,windowHeight);
    videoInput.hide();

    //e = new Ellipse(random(0,width), random(0, 100), random(100,255), 0, random(100,255));
}

function draw() {

    //e.createEllipse();
    //getPositions();
    getEmotions();
    clear();
    if(happyCounter  > 0){happyCounter -=0.1;}
    console.log('happyCounter' + str(happyCounter));
    //fill(0,happyCounter,0);
    //rect(0,0,windowWidth,windowHeight);
    background(120,250,70, round(happyCounter))

    /*
    for(var i =0; i< ellipses.length; i++){
    ellipses[i].createEllipse();
    }
    */
    
    if (emotions) {
        // angry=0, sad=1, surprised=2, happy=3
        for (var i = 0;i < predictedEmotions.length;i++) {
            //rect(i * 250+20, 120, 30, -predictedEmotions[i].value * 30);    
            text('happyCounter=' + str(happyCounter),60, width/2);
                     

            if (predictedEmotions[3].value >= happyTreshold){
                localHappyCounter +=5;
                //console.log('localHappyCounter =' + str(localHappyCounter))
            }
            
            if (predictedEmotions[3].value >= 2*happyTreshold){
                localHappyCounter +=10;
                //console.log('localHappyCounter =' + str(localHappyCounter))
            }

                           
            }
        
            
        if (localHappyCounter >= 60) { 
                localHappyCounter = 0;
                
                //console.log('sending "HAPPY"')
                // We send/publish the payload to the happy topic
                publishFunc();
                
        }
        }
   
   }

   function publishFunc () {
    var HappyPayload = {
        clientId : clientOptions.clientId,
        message : 'HAPPY'                     
    };
    client.publish(happyTopic, JSON.stringify(HappyPayload));
    //console.log('message published')

}    

function drawEllipse() {
    //console.log('drawing ellipse')
    //e.createEllipse();
    fill(0,0,0);
    ellipse(random(0, width), 20, 20, 20);
}


