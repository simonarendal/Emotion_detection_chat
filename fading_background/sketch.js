var backgroundOpacity = 0;
var predictedHappy = 0;

function setup() {
    loadCamera();
    loadTracker();
    loadCanvas(windowWidth,windowHeight);
    videoInput.hide();
}

function draw() {
    getEmotions();
    clear();
    background(120,250,70, map(backgroundOpacity,0,1,0,255));
    
    if (emotions) {
        // angry=0, sad=1, surprised=2, happy=3
        for (var i = 0;i < predictedEmotions.length;i++) {
            //rect(i * 250+20, 120, 30, -predictedEmotions[i].value * 30);    
                     
            predictedHappy = predictedEmotions[3].value;
            //console.log('predictedEmotions[3] = ' + (predictedEmotions[3].value) )
            }     
               
        }                 
           
}

