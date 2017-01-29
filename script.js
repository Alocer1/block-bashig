var canvas = document.getElementById("can");
var ctx = canvas.getContext("2d");
var height = 800;
var width = 800;
canvas.width = width;
canvas.height = height;


var bulletOnScreen = {}


var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };


window.onload = function(){
	animate(step)
};


var render = function(){
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,width,height)
	hero.render("black"); 
  villain.render("green");

	for(var bullet in bulletOnScreen){
		bulletOnScreen[bullet].render();
	}
	
};

var update = function(){
	hero.update();

	for(var bullet in bulletOnScreen){
    if (bulletOnScreen[bullet].active == true) { 
		bulletOnScreen[bullet].move();
    } else {
      
    }
	}


};

var step = function(){
	update();
	render();
	animate(step);
}



var Cube = function(x,y){
	this.x = x;
	this.y = y;
	this.width = 50;
	this.height = 50;
	this.speed = 10;
  this.health = 100;
	this.direction = 'down';
}


Cube.prototype.render = function(colour){

// if(this.health <= 0){
 if(false){
  console.log("gameOver")
} else {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = colour;
    ctx.fill();
  }
}


Cube.prototype.move = function(x,y){ // edge dection 
	this.x += x;
	this.y += y;

		if(this.x > (width - this.width)){ //dection right 
			this.x = (width - this.width);
		}
		if(this.x < 0){  //dection left 
			this.x = 0;  
		}

		if(this.y < 0) {  //dection top 
			this.y = 0;
		}


 if(
	 	(this.x + this.width  >= villain.x  && this.x  <= (villain.x + villain.width )) 
	 	&& 
	 	(this.y + this.height >= villain.y && this.y  <= (villain.y + villain.height ))
	 ){

			if (this.direction == "down"){
				this.y -= 50;
			}

			else if ( this.direction == "right"){
				this.x -= 50;
			}

			else if (this.direction == "up"){
				this.y += 50;
			}

			else if (this.direction == "left"){
				this.x += 50;
			}



		}
		

		if(this.y > (height - this.height)){ //dection bottom
			this.y = (height - this.height);
		} 
}

var i = 0;

Cube.prototype.update = function(){
  for(var key in keysDown){
		var result = String(key);

		if (key == "39") {
			this.direction = "right";
			this.move(this.speed,0)
		}
		if (key == "37") {
			this.direction = "left";
			this.move(-this.speed,0)

		}
		if (key == "38") {
			this.direction = "up";
			this.move(0,-this.speed)
		}
		if (key == "40") {
			this.direction = "down";
			this.move(0,this.speed)
		}
		if( key == "32") {
			i++
			bulletOnScreen[i] = new Bullet(this.x, this.y, this.direction);
		}
	}
}


Bullet = function(x,y, direction){

	this.x = x; 
  this.y = y;
	this.width = 10;
	this.height = 10;
	this.x_speed = 0;
	this.y_speed = 0;
  this.damage = 20;
  this.active = true;
	
	switch(direction) {
    case 'left':
        this.x_speed = -2;
        this.x -= 15;
        this.y += 15;
        break;
    case 'right':
        this.x_speed = 2;
        this.x += 50;
        this.y += 15;
        break;
    case 'up':
       this.y_speed = -2;
        this.y -= 15;
        this.x += 15;
        break;
    case 'down':
        this.y_speed = 2;
         this.x += 15;
         this.y += 50;
        break;
    default:
        this.y_speed = 0
        this.x_speed = 0;
}


}

Bullet.prototype.render = function(){
	ctx.beginPath();
	ctx.rect(this.x, this.y, this.width, this.height);
	ctx.fillStyle = "red";
	ctx.fill();
}



Bullet.prototype.move = function(){
	this.x += this.x_speed;
	this.y += this.y_speed;

  this.detection();
}

Bullet.prototype.detection = function(){
  //  if((this.x + this.width  >= villain.x  && (this.x + this.width - this.width) <= (villain.x + villain.width )) && (this.y + this.height >= villain.y && this.y  <= (villain.y + villain.height ))){
  if((this.x + this.width  >= villain.x  && this.x <= (villain.x + villain.width )) && (this.y + this.height >= villain.y && this.y  <= (villain.y + villain.height ))){
  
    this.active = false;
    hero.health -= this.damage;
  }

}



var hero = new Cube(300,300);
var villain = new Cube(400,400);

var keysDown = {}

window.addEventListener("keydown", function(event){
	keysDown[event.keyCode] = true;

})

window.addEventListener("keyup", function(event){
	delete keysDown[event.keyCode];
})
