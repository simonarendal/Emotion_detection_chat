class Ellipse {

    constructor() {
        this.r = 240;
        
        //this.step  = step; //in radians equivalent of 360/6 in degrees
        

        //this.size1 = size1;
        //this.size2 = size2;

    }

    

  createCircle(step,show){
  //move 0,0 to the center of the screen
  //translate(width/2, height/2);
  let opacity; 
  if(show >= 1000/circlesSubscriber.length){
    opacity = 255;
  }
  else opacity = 0;
  
  //convert polar coordinates to cartesian coordinates
  var x = windowWidth/2 + this.r * sin(step);
  var y = windowHeight/2 + this.r * cos(step);
  
  //draw ellipse at every x,y point
  noStroke();
  fill(255, 40,0,opacity); 
  ellipse(x, y, 30, 30);
    
    }
 
  }
