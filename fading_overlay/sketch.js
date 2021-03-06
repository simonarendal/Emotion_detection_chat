var happyCounter = 50;
var localHappyCounter = 0;
var happyTreshold = 0.2;
var videos;
var opacity;

function setup() {
    loadCamera();
    loadTracker();
    loadCanvas(windowWidth,windowHeight);
    videoInput.hide();
videos= select('#overlays');
}


function changeBackground() {
    videos.style('opacity', opacity);
}

function draw() {
    
    opacity = map(happyCounter,0,100,0,0.3);
        

    changeBackground();
 
    getEmotions();
    clear();
    if(happyCounter  > 0){happyCounter -=0.1;}
    console.log('happyCounter' + str(happyCounter));
  
    
    if (emotions) {
        // angry=0, sad=1, surprised=2, happy=3
        for (var i = 0;i < predictedEmotions.length;i++) {
            //rect(i * 250+20, 120, 30, -predictedEmotions[i].value * 30);    
            //text('happyCounter=' + str(happyCounter),60, width/2);
                     

            if (predictedEmotions[3].value >= happyTreshold){
                localHappyCounter +=5;
                //console.log('localHappyCounter =' + str(localHappyCounter))
            }
            
            if (predictedEmotions[3].value >= 2*happyTreshold){
                localHappyCounter +=10;
                //console.log('localHappyCounter =' + str(localHappyCounter))
            }

                           
            }
        
            
        if (localHappyCounter >= 40) { 
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
