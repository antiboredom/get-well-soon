// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com


// A reference to our box2d world
let world;
let a;
let boxes = [];

// A list we'll use to track fixed objects
//// A list for all of our rectangles


function setup() {
  createCanvas(640, 360);

  // Initialize box2d physics and create the world
  world = createWorld();
  world.SetGravity(0,0);

  // Add a bunch of fixed boundaries
 // boundaries.push(new Boundary(width / 4, height - 5, width / 2 - 50, 10));
  //boundaries.push(new Boundary(3 * width / 4, height - 50, width / 2 - 50, 10));

  let b = new Box(width / 2, 30);
  boxes.push(b);

  a = new Attractor(0,width/2,height/2);
}

function draw() {
  background(51);

  // We must always step through time!
  let timeStep = 1.0 / 30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);

  a.display()


  // Boxes fall from the top every so often
  if (random(1) < 0.2) {
    let b = new Box(width / 2, 30);
    boxes.push(b);
  }


  // Display all the boxes
  for (let i = boxes.length - 1; i >= 0; i--) {
    let force = a.attract(boxes[i]);
    boxes[i].display(); 
    boxes[i].applyForce(force);

  }
}