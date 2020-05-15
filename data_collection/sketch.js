
var yValue1 = 0;
var yValue2 = 0;



 function setup(){
    createCanvas(windowWidth, windowHeight);
    background(0,0,0);
    setInterval(sendFeedback,500);
    //setInterval(startTimer,500);
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
    text('participant 1: ');
    rect(100,400,40,-yValue1);

    text('participant 2: ');
    rect(300,400,40,-yValue2);
}

function startTimer() {
//console.log('timer started');
  //  yValue1 = map(localHappyCounter1, 0,1,0,100);

  //  yValue2 = map(localHappyCounter2, 0,1,0,100);

    //yValueAverage = map(averageHappyCounters, 0,1,0,80);
    
    //console.log('localHappyCounter1: ' + (localHappyCounter1) + ' : ' + ' localHappyCounter2: ' + (localHappyCounter2) );

}

