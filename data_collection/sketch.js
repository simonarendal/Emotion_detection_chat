var time = 25;

function setup(){
createCanvas(windowWidth, windowHeight);
background(0,0,0);
//frameRate(1);
setInterval(startTimer,3000);
yAxis();
xAxis();
}

function draw() {
    
    noStroke();
    fill(0,0,0);
    textSize(32);
    rect(265,0,50,40);
    fill(255,255,255);
    text('PARTICIPANTS: ' + str(numbOfParticipants), 30,30);
    noStroke();
    fill(0,0,0);
    //startTimer();
    
    //delayTime(1000);
}

function startTimer() {
    console.log('started timer');

    time +=3;
    strokeWeight(4);
    stroke(255,0,0);
    point(time,350 - localHappyCounter1/10);
    stroke(0,255,0);
    point(time,350 - localHappyCounter2/10);
    stroke(0,0,255);
    //point(time,350 - happyCounter/10);
};

function yAxis() {
    strokeWeight(2);
    stroke(200,50);
    line(windowWidth-25, 350, windowWidth-25, 30);
}

function xAxis() {
    strokeWeight(2);
    stroke(200,50);
    line(25, 350, windowWidth-27, 350);
}
