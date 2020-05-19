var yValue1 = 0;
var yValue2 = 0;

 function setup(){
    createCanvas(windowWidth, windowHeight);
    background(0,0,0);
    //setInterval(sendFeedback, 500);
    }

  function draw() {
 
    background(0,0,0);
    noStroke();
    fill(0,0,0);
    textSize(32);
    fill(255,255,255);
    text('PARTICIPANT1: ', 30,30);
    text('PARTICIPANT2: ', 30,80);

    textSize(20);
    text('participant 1: ', 30, 100);
    rect(100,400,40,-yValue1);

    text('participant 2: ', 30, 120);
    rect(300,400,40,-yValue2);
}
