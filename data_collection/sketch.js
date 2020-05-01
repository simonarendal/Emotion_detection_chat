var yValue1 = 0;
var yValue2 = 0;
var yValueAverage = 0;

function setup(){
createCanvas(windowWidth, windowHeight);
background(0,0,0);
setInterval(sendPrompt,2000);
setInterval(startTimer,2000);
}

function draw() {
    background(0,0,0);
    var n1 = yValue1.toFixed(2);
    var n2 = yValue2.toFixed(2);

if (no1 === false) {
    stroke(255,0,0);
    strokeWeight(10);
    point(310, 20);
}

if (no2 === false) {
    stroke(255,0,0);
    strokeWeight(10);
    point(310, 70);
}

    noStroke();
    fill(0,0,0);
    textSize(32);
    fill(255,255,255);
    text('PARTICIPANT1: ', 30,30);
    text('PARTICIPANT2: ', 30,80);

    textSize(20);
    text('participant 1: ' + str(n1), 100, 450);
    rect(100,400,40,-yValue1);

    text('participant 2: ' + str(n2), 300, 450);
    rect(300,400,40,-yValue2);
}

function startTimer() {
//console.log('timer started');
    yValue1 = map(localHappyCounter1, 0,1,0,80);

    yValue2 = map(localHappyCounter2, 0,1,0,80);

    yValueAverage = map(averageHappyCounters, 0,1,0,80);
    
    console.log('localHappyCounter1: ' + (localHappyCounter1)+':' + ' localHappyCounter2: ' + (localHappyCounter2)+':' + ' averageHappyCounters: ' + (averageHappyCounters)+':' );

}


