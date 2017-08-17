function Player(){
	this.hp = 100;
	this.pos = createVector(width/2, height/2);
	
	this.show = function(){
		stroke(0)
		fill(255)
		ellipse(this.pos.x, this.pos.y, 20, 20);
	}
	
	this.update = function(){
		if (keyIsDown(65)){
			this.pos.x-=5;
		}
		if (keyIsDown(68)){
			this.pos.x+=5;
		}
		if (keyIsDown(87)){
			this.pos.y-=5;
		}
		if (keyIsDown(83)){
			this.pos.y+=5;
		}
		if (mouseIsPressed){
			a = this.angle(this.pos.x, this.pos.y, mouseX, mouseY)-PI;
			shots.push(new Shot(this.pos, a));
		}
	}
	
	this.offScreen = function(){
		if(this.pos.x>width)
			this.pos.x=0;
		if(this.pos.x<0)
			this.pos.x=width;
		if(this.pos.y>height)
			this.pos.y=0;
		if(this.pos.y<0)
			this.pos.y=height;
	}
	
	this.angle = function(x1, y1, x2, y2){
		var dx = x1 - x2;
		var dy = y1 - y2;
		return Math.atan2(dy, dx);
	}
}