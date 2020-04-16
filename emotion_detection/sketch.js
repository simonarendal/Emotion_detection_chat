var socket;

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
    
    //drawPoints();

    if (emotions) {
        // angry=0, sad=1, surprised=2, happy=3
        for (var i = 0;i < predictedEmotions.length;i++) {
            rect(i * 250+20, 120, 30, -predictedEmotions[i].value * 30);    
        }
    }
    
    text("ANGRY", 20, 140);
    text("SAD", 270, 140);
    text("SURPRISED", 520, 140);
    text("HAPPY", 770, 140);
    
}
/*
function drawPoints() {
    fill(255);
    for (var i=0; i<positions.length -3; i++) {
        ellipse(positions[i][0], positions[i][1], 2, 2);
    }
}

function newDrawing(data) {
    console.log('newDrawing executed');
    fill(255,0,100);
    ellipse(data.x, data.y, 20, 20);
  }

function mouseDragged() {

  console.log("Sending Data: " + mouseX + ',' + mouseY);

  var data = {
    x: mouseX,
    y: mouseY
  }
  socket.emit('mouse', data);

  fill(255,100,0);
  ellipse(mouseX, mouseY, 20, 20);
}

*/*/