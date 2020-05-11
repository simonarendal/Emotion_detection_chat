//var random = new Random(); 
////var posX;
//var posY;
//var colR;
//var colG;
//var colB;
let fadeAmount = 2;

class Ellipse {

    constructor(w, h, posX) {
        this.posX = posX;
        this.posY = random(0, height);
        this.colR = red;
        this.colG = green;
        this.colB = blue;
        this.fade = 255;
        this.w = w;
        this.h = h;
        //this.size1 = size1;
        //this.size2 = size2;

    }

 
    createEllipse(red,green,blue) {
    
    fill(red,green,blue,this.fade);
    //fill(this.colR, this.colG, this.colB, this.fade);
    noStroke();
    //ellipse(this.posX, this.posY, this.size1, this.size2);
    ellipse(this.posX, this.posY, this.w, this.h);

  
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