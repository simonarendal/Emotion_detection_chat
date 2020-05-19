class Publisher {

    constructor() {
        this.r = 105;
        this.w = 200; 
        this.h = 200;
        this.x = 250;
        this.y = 400;
    }


    drawPublisher(){
        fill(255, 100, 0);
        noStroke();
        ellipse(this.x, this.y, this.w, this.h);
        fill(255);
        textSize(16);
        text("Her er jeg", this.x-10, this.y);
    }

    createCircle(step,show){
        //move 0,0 to the center of the screen
        //translate(width/2, height/2);
        let opacity; 
        if(show >= 1000/circlesPublisher.length){
          opacity = 255;
        }
        else opacity = 0;
        
        //convert polar coordinates to cartesian coordinates
        var x = this.x + this.r * sin(step);
        var y = this.y + this.r * cos(step);
        
        //draw ellipse at every x,y point
        noStroke();
        fill(255, 40,0,opacity); 
        ellipse(x, y, 15, 15);
          
          }
 
  }
