function Shot(position, angle){
	this.pos = createVector(position.x + random(-7, 7), position.y + random(-7, 7));
	this.speed = p5.Vector.fromAngle(angle);
	this.speed.mult(3);
	this.size = 10
	this.r = random(150, 255);
	this.g = random(80);
	this.b = random(10);
	this.a = 200;
	this.damage = 2;
	
	this.show = function(){
		push();
		noStroke();
		this.col = color(this.r, this.g, this.b, this.a)
		fill(this.col);
		ellipse(this.pos.x, this.pos.y, this.size, this.size);
		pop();
	}
	
	this.update = function(){
		this.pos.add(this.speed);
		this.size++;
		this.a-=5;
	}
	
}