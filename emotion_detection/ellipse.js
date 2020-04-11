//var random = new Random(); 
////var posX;
//var posY;
//var colR;
//var colG;
//var colB;

class Ellipse {

    constructor() {
        this.posX = random(0,width);
        this.posY = random(0, 100);
        this.colR = random(100,255);
        this.colG = 0;
        this.colB = random(100,255);
    }

 
    createEllipse() {
    //fill(0,0,0);
    //ellipse(600,100,50,50);
    
    fill(0, 0, 0);
    noStroke();
    ellipse(this.posX, this.posY, 25, 25);
  
  }
}
