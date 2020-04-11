//var random = new Random(); 
////var posX;
//var posY;
//var colR;
//var colG;
//var colB;
let fadeAmount = 1;

class Ellipse {

    constructor() {
        this.posX = random(0,width);
        this.posY = random(0, height);
        this.colR = random(100,255);
        this.colG = 0;
        this.colB = 0;
        this.fade = 255;
    }

 
    createEllipse() {
    //fill(0,0,0);
    //ellipse(600,100,50,50);
    
    fill(this.colR, this.colG, this.colB, this.fade);
    noStroke();
    ellipse(this.posX, this.posY, 50, 50);
   
  
    if (this.fade<=11+fadeAmount) this.fade=0; 
 
    //if (this.fade>255) fadeAmount=-10; 
   
    this.fade -= fadeAmount; 
    //print(fadeAmount)
    
  }

    remove(array, element) {
    const index = array.indexOf(element);
  
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
