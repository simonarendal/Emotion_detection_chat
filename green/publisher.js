class Publisher {

    constructor() {
        this.r = 30;
        this.w = 50; 
        this.h = 50;
        this.x = 150;
        this.y = 350;

    }


    drawPublisher(){

        fill(255, 100, 0);
        ellipse(this.x, this.y, this.w, this.h);
        textSize(6);
        text("Her er jeg", this.x, this.y);
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
        var x = (this.x + (this.w/2)) + this.r * sin(step);
        var y = (this.y + (this.h/2)) + this.r * cos(step);
        
        //draw ellipse at every x,y point
        noStroke();
        fill(255, 40,0,opacity); 
        ellipse(x, y, 30, 30);
          
          }
 
  }
