var time = 25;
var yValue1 = 0;
var yValue2 = 0;
var yValueAverage = 0;


function setup(){
createCanvas(windowWidth, windowHeight);
background(0,0,0);
//frameRate(1);
setInterval(startTimer,2000);

}

function draw() {
    averageBackground();
    //difference(); 
    noStroke();
    fill(0,0,0);
    textSize(32);
    rect(265,0,50,40);
    fill(255,255,255);
    text('PARTICIPANTS: ' + str(numbOfParticipants), 30,30);
    startTimer();
    yAxis();
    xAxis();
    
}

function startTimer() {
    console.log('started timer');

    time +=3;
    strokeWeight(4);

    yValue1 = map(localHappyCounter1, 0,1,0,320);
    stroke(255,0,0);
    point(time,350 - yValue1);

    yValue2 = map(localHappyCounter2, 0,1,0,320);
    stroke(0,255,0);
    point(time,350 - yValue2);

    yValueAverage = map(averageHappyCounters, 0,1,0,320);
    stroke(0,0,255);
    point(time,350 - yValueAverage);
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
