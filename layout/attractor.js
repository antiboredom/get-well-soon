// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular box


// Constructor
class Attractor {
  constructor(_r,_x, _y) {
    this.w = random(4, 16);
    this.h = random(4, 16);
    this.r = _r;
    this.x = _x;
    this.y = _y;

    // Define a body
    let bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_staticBody;
    bd.position = scaleToWorld(this.x, this.y);



    // Create the body
    this.body = world.CreateBody(bd);


    // Some additional stuff
   // this.body.SetLinearVelocity(new box2d.b2Vec2(random(-5, 5), random(2, 5)));
   // this.body.SetAngularVelocity(random(-5, 5));

    let cs = new box2d.b2CircleShape;
    cs.m_radius = scaleToWorld(this.r);
    this.body.CreateFixture2(cs,1);
  }

  // This function removes the particle from the box2d world
  killBody() {
    world.DestroyBody(this.body);
  }

  attract(b){
    let G = 100; // Strength of force
    // clone() makes us a copy
    let pos = this.body.GetWorldCenter();    
    let moverPos = b.body.GetWorldCenter();
    console.log(pos);
    console.log(moverPos);
    let force = createVector();
    

    // Vector pointing from mover to attractor
    force = p5.Vector.sub(pos,moverPos);
    console.log(force);
   // force=pos.sub(moverPos);
    let distance = force.length();
    // Keep force within bounds
    distance = constrain(distance,1,5);
    force.normalize();
    // Note the attractor's mass is 0 because it's fixed so can't use that
    let strength = (G * 1 * m.body.m_mass) / (distance * distance); // Calculate gravitional force magnitude
    force.mulLocal(strength);         // Get force vector --> magnitude * direction
    return force;


  }

  // Is the particle ready for deletion?
  done() {
    // Let's find the screen position of the particle
    let pos = scaleToPixels(this.body.GetPosition());
    // Is it off the bottom of the screen?
    if (pos.y > height + this.w * this.h) {
      this.killBody();
      return true;
    }
    return false;
  }

  // Drawing the box
  display() {
    // Get the body's position
    let pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    let a = this.body.GetAngleRadians();

    // Draw it!
    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    fill(127);
    stroke(200);
    strokeWeight(2);
    rect(0, 0, this.w, this.h);
    pop();
  }
}