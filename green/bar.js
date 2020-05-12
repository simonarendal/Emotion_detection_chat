//var random = new Random(); 
////var posX;
//var posY;
//var colR;
//var colG;
//var colB;
let fadeAmount = 2;

class Bar {

    constructor() {

        this.fade = 255;

    }

 
    createBar(red,green,blue,show, posX, posY) {
   let opacity; 
    if(show >= 1000/barRed.length){
      opacity = 255;
    }
    else opacity = 0;

    fill(red,green,blue,opacity);
    //fill(this.colR, this.colG, this.colB, this.fade);
    stroke(255,255,255);
    strokeWeight(6);
    

      //ellipse(this.posX, this.posY, this.size1, this.size2);
    rect(posX, posY, windowWidth/2, windowHeight/20, 10, 10, 10, 10);

  
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
