
let xRegister = new Register(20)
let yRegister = new Register(160)
let zRegister = new Register(300)

let state = 1;

function setup() {
  createCanvas(windowWidth,windowHeight);
  var key = "0010101000110000101011001001100110001001100101111011010001110000"
  xRegister.add(key.slice(0,19).split(''));
  yRegister.add(key.slice(19,41).split(''));
  zRegister.add(key.slice(41,64).split(''));


}

function draw() {
  //resizeCanvas(windowWidth, windowHeight);
  xRegister.display();
  yRegister.display();
  zRegister.display();
}

function keyPressed() {
  //Right Arrow
  if(keyCode === 39){
    step();
  }
}
function step() {
  console.log("Step");
  if (state == 1) {

  }
}

function Register(y) {
  this.register = [];
  this.size = 30;
  this.y = y;

  this.add = function(bits) {
    for(bit in bits) {
      this.register.push(bits[bit]);
    }
  }

  this.display = function() {
    for (var i = 0; i < this.register.length; i++) {
      rect(i*this.size, y, this.size, this.size);
      textSize(25);
      text(this.register[i],9 + i*this.size, y, this.size,this.size)
      if(i == 16){
        rect(i*this.size, y+60, this.size,this.size);
      }
    }
  }
}
