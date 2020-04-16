var happyCounter = 50;
var localHappyCounter = 0;
var happyTreshold = 0.2;

var happyCounterDecay = -0.2;
var increase = 5;
var publishTreshold = 40;

function setup() {
    loadCamera();
    loadTracker();
    loadCanvas(windowWidth,windowHeight);
    videoInput.hide();
}




function draw() {
    getEmotions();
    clear();
    if(happyCounter  >= 0){happyCounter += happyCounterDecay;}
    console.log('happyCounter' + str(happyCounter));
    background(120,250,70, round(happyCounter))

    
    if (emotions) {
        // angry=0, sad=1, surprised=2, happy=3
        for (var i = 0;i < predictedEmotions.length;i++) {
            //rect(i * 250+20, 120, 30, -predictedEmotions[i].value * 30);    
            //text('happyCounter=' + str(happyCounter),60, width/2);
                     

            if (predictedEmotions[3].value >= happyTreshold){
                localHappyCounter +=increase;
                //console.log('localHappyCounter =' + str(localHappyCounter))
            }
            
            if (predictedEmotions[3].value >= 2*happyTreshold){
                localHappyCounter +=increase*4;
                //console.log('localHappyCounter =' + str(localHappyCounter))
            }

                           
            }
        
            
        if (localHappyCounter >= publishTreshold) { 
                localHappyCounter = 0;
                
                //console.log('sending "HAPPY"')
                // We send/publish the payload to the happy topic
                publishFunc();
                
        }
        }
   
   }

   function publishFunc () {
    var HappyPayload = {
        id : numericId,
        clientId : clientOptions.clientId,
        message : 'HAPPY'                     
    };
    client.publish(happyTopic, JSON.stringify(HappyPayload));
    //console.log('message published')

}    
