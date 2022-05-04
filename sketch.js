const slices = 14;
const numShapes = 700;
let swap1;
let swap2;
var shape, mask, img;

let pup;
let house;
let count=0;

function setup() {
    createCanvas(400,400);
    //colorMode();
    noStroke();
    //angleMode(DEGREES);
    // any additional setup code goes here

    shape = calcStuff(width,height,slices);
    mask = createMask(shape.a,shape.o);
    console.log(shape);
  
}
function preload(){
pup=loadImage("pup.png");
house=loadImage("house.png");
redd=loadImage('redd.png');
bblue=loadImage('bblue.png');
// cherries=loadImage('cherries.png');
  // images[6]=loadImage('apple.png');
  // images[7]=loadImage('peach.png');
  // images[8]=loadImage('watermelon.png');
  // images[9]=loadImage('tiny strawberrys.png');
  
}

function draw() {
    // your "draw loop" code goes here
    background(255);

   if(count==0){
    drawShapes();
   }else if(count==1){
     drawShapes2();
   }else if(count==2){
     drawShapes3();
   }
    // try removing this line to see what happens
    mirror();
}

function drawShapes() {
    // draw lots of random moving shapes on the canvas
    for(var i=0; i < numShapes; i++) {

        fill(sin(i)*255,sin((i+frameCount)/50)*255,100);
        image(pup,sin(frameCount/100+i*0.4)*width,
                cos(i*0.23)*height,
                80+cos(frameCount/40+400-i)*50,
                80+cos(frameCount/30+i)*50);

        fill(200,sin(i)*255,sin((i+frameCount)/50)*255);
        image(bblue,cos(frameCount/300+i*0.4)*width,
                sin(i*0.23)*height,
                80+cos(frameCount/40+400-i)*50,
                80+tan(frameCount/430+i)*50);
    }
}
function drawShapes2() {
    // draw lots of random moving shapes on the canvas
    for(var i=0; i < numShapes; i++) {

        fill(sin(i)*255,sin((i+frameCount)/50)*255,100);
        image(redd,sin(frameCount/100+i*0.4)*width,
                cos(i*0.23)*height,
                80+cos(frameCount/40+400-i)*50,
                80+cos(frameCount/30+i)*50);

        fill(200,sin(i)*255,sin((i+frameCount)/50)*255);
        image(pup,cos(frameCount/300+i*0.4)*width,
                sin(i*0.23)*height,
                80+cos(frameCount/40+400-i)*50,
                80+tan(frameCount/430+i)*50);
    }
}
function drawShapes3() {
    // draw lots of random moving shapes on the canvas
    for(var i=0; i < numShapes; i++) {

        fill(sin(i)*255,sin((i+frameCount)/50)*255,100);
        image(house,sin(frameCount/100+i*0.4)*width,
                cos(i*0.23)*height,
                80+cos(frameCount/40+400-i)*50,
                80+cos(frameCount/30+i)*50);

        fill(200,sin(i)*255,sin((i+frameCount)/50)*255);
        image(bblue,cos(frameCount/300+i*0.4)*width,
                sin(i*0.23)*height,
                80+cos(frameCount/40+400-i)*50,
                80+tan(frameCount/430+i)*50);
    }
}

function mirror() {
    // copy a section of the canvas
    img = get(0,0,shape.a,shape.o);
    // cut it into a triangular shape
    img.mask(mask);

    push();
    // move origin to centre
    translate(width/2,height/2);
    // turn the whole sketch over time
    rotate(radians(frameCount/3));

    for(var i=0; i<slices; i++) {
      if(i%2==0) {
        push();
        scale(1,-1); // mirror
        image(img,0,0); // draw slice
        pop();
      } else {
        rotate(radians(360/slices)*2); // rotate
        image(img,0,0); // draw slice
      }
    }
    pop();
}

function calcStuff(width, height, s) {
  // because pythagorean theorem
  // h = sqrt(a^2 + b^2)
  // a = sqrt(h^2 - b^2)
  // b = sqrt(h^2 - a^2)
  let a = sqrt(sq(width/2)+sq(height/2));
  let theta = radians(360 / s);
  let o = tan(theta) * a;
  let h = a / cos(theta);

  return {a: round(a), o: round(o), h: round(h)};
}




function createMask(w,h) {
    // create triangular mask so that the parts of the 
    // kaleidoscope don't draw over one another

    mask = createImage(w,h);
    mask.loadPixels();
    for (i = 0; i < mask.width; i++) {
        for (j = 0; j < mask.height; j++) {
            if(i >= map(j,0,h,0,w)-1) // -1 removes some breaks
                mask.set(i, j, color(255));
        }
    }
    mask.updatePixels();
    return mask;
}
function mousePressed(){
  count=count+1;
  if(count>2){
    count=0;
  }
}