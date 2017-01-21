function PhysicsFramework(){
	this.frameworkName = "PhysicsFramework";
	
	function World(grav){
		this.grav = grav;
		var bodies = [];
		var removeq = [];
		this.addBody = function(body){
			if (bodies.indexOf(body) != -1){
				console.log("Body is already in world.");
				return;
			}
			bodies.push(body.build());
			//console.log(bodies.length);
		}
		this.removeBody = function(body){
			if (bodies.indexOf(body) == -1){
				console.log("Body is not in world");
				return;
			}
			//console.log("removed");
			removeq.push(body);
			//bodies.splice(bodies.indexOf(body),1);
		}
		this.update = function(delta){	
			bodies = bodies.filter(function(val){
				return removeq.indexOf(val) == -1;
			});
			removeq = [];
			for (var b in bodies){
				if (this.grav.len() > 0 && bodies[b].type == "K")
					bodies[b].addVel(this.grav.copy().mult(delta));
				bodies[b].update(delta);
			}
			for (var b in bodies)
				for (var o in bodies)
					if (bodies[b].pos.copy().sub(bodies[o].pos).len() < bodies[b].rad+bodies[o].rad && bodies[o] !== bodies[b]){
						bodies[b].collide(bodies[o]);bodies[o].collide(bodies[b]);}
					
			
			/*
						C = A.filter(function(val) {
 return B.indexOf(val) == -1;
});
						
			while (removeq.length > 0){
				bodies.splice(bodies.indexOf(removeq.shift()),1);
//				removeq.shift();
			}*/
			//for (var b in removeq){
			//	bodies.splice(bodies.indexOf(removeq[b]),1);
			//	removeq.splice(removeq.indexOf(removeq[b]),1);
			//}
				
		}
	}
	this.Body = function(owner){
		this.owner = owner;
		this.setRad = function(r){this.rad = r;return this;}
		this.setPos = function(p){this.pos = p;return this;}
		this.setVel = function(v){this.vel = v;return this;}
		this.setType= function(t){this.type= t;return this;}
		this.build = function(){
			this.rad = this.rad || 0;
			//console.log(Vec);
			this.pos = this.pos || new Vec();
			this.vel = this.vel || new Vec();
			this.maxvel = this.maxvel || 10;
			this.type= this.type|| "K";
			this.dist = 0;
			return this;
			//this.container.add(new (GFW("UIFramework")).Follow(this,this.pos));
		}
		this.addVel = function(v){
			this.vel.add(v||(new this.Vec()));
			return this;
		}
		this.setMaxVel = function(max){
			this.maxvel = max || -1;
			return this;
		}
		this.update = function(delta){
			if (this.type == "S")
				return;
			if (this.vel.len() > this.maxvel && this.maxvel != -1)
				this.vel.setLen(this.maxvel);
			this.pos.add(this.vel.copy().mult(delta));
			this.dist+=this.vel.copy().mult(delta).len();
		}
		this.collide = function(other){}
	}
	this.makeWorld = function(grav){
		if (exists(this.world)){
			console.log("World already exists. Call world.destroy() before making a new one");
			return;
		}
		this.world = new World(grav||(new this.Vec()));
		return this.world;
	}
	this.Vec = function(x,y){
		this.x = x || 0;
		this.y = y || 0;
		this.copy = function(){
			return new Vec(this.x,this.y);
		}
		this.add = function(vec){
			this.x+=vec.x;
			this.y+=vec.y;
			return this;
		}
		this.sub = function(vec){
			this.x-=vec.x;
			this.y-=vec.y;
			return this;
		}
		this.mult = function(scal){
			this.x*=scal;
			this.y*=scal;
			return this;
		}
		this.ang = function(){
			return Math.atan2(this.y,this.x);
		}
		this.rotate = function(a){
			a+=this.ang();
			this.rotateto(a);
			return this;
		}
		this.rotateto = function(a){
			var l = this.len();
			this.x = l*Math.cos(a);
			this.y = l*Math.sin(a);
			return this;
		}
		this.i = function(){
			return new Vec(this.x,0);
			//this.y = 0;
			//return this;
		}
		this.j = function(){
			return new Vec(0,this.y);
			//this.x = 0;
			//return this;
		}
		this.unit = function(){
			if (this.len() == 0){
				this.x = 0;
				this.y = 0;
				return;
			}
			var l = this.len();
			this.x/=l;
			this.y/=l;
			return this;
		}
		this.len = function(){
			return Math.sqrt(this.x*this.x+this.y*this.y);
		}
		this.setLen = function(len){
			this.unit();
			this.mult(len);
			return this;
		}
	}
	var Vec = this.Vec;
}