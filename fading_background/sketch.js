var backgroundOpacity = 0;
var predictedHappy = 0;
var localHappyCounter = 0;
var happyTreshold = 0.3;

function setup() {
    loadCamera();
    loadTracker();
    loadCanvas(windowWidth,windowHeight);
    videoInput.hide();
}

function draw() {
    getEmotions();
    clear();
    background(120,250,70,backgroundOpacity);
    
    if (emotions) {
        // angry=0, sad=1, surprised=2, happy=3
        for (var i = 0;i < predictedEmotions.length;i++) {
            //console.log('predicting emotions');
            //rect(i * 250+20, 120, 30, -predictedEmotions[i].value * 30);    
             if (predictedEmotions[3].value > happyTreshold && localHappyCounter < 255) {
                 localHappyCounter ++; 
             }        
/*
             if (predictedEmotions[3].value > happyTreshold*2 && localHappyCounter < 255) {
                localHappyCounter =+ 2; 
            }  

            if (predictedEmotions[3].value > happyTreshold*3 && localHappyCounter < 255) {
                localHappyCounter =+ 3; 
            }  
*/            
            //predictedHappy = predictedEmotions[3].value;
            //console.log('predictedEmotions[3] = ' + (predictedEmotions[3].value) )
            }     
               
        }                 
           
}

