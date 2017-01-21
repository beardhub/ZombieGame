function UIFramework(){
	this.frameworkName = "UIFramework";
	this.Follow = function(f, t, offx, offy, scale){
		this.follower = f;
		this.target = t;
		this.scale = scale || 1;
		this.x = 0;
		this.y = 0;
		if (typeof offx == "number" && typeof offy == "number"){
			this.x = offx;
			this.y = offy;}
		this.following = true;
	}
	this.Follow.prototype.init = function(){
		if (!exists(this.target.x))
			this.target.x = 0;
		if (!exists(this.target.y))
			this.target.y = 0;
		this.update();
		//this.follower.x = this.target.x + this.x;
		//this.follower.y = this.target.y + this.y;
		}
	this.Follow.prototype.update = function(){
		if (!this.following)		return;
		var tx = this.target.x,
			ty = this.target.y;
        if (!exists(this.follower)||!exists(this.target))
            this.container.remove(this);
		if (typeof tx == "function") tx = tx();
		if (typeof ty == "function") ty = ty();
		this.follower.x = this.scale * (tx + this.x);
		this.follower.y = this.scale * (ty + this.y);
	}
	this.DBox = function(x,y,w,h){
		this.x = x || 0;
		this.y = y || 0;
		this.w = w || 0;
		this.h = h || 0;
		//var border = new dynimage(Assets.i("boxborder")),
		//	corner = new dynimage(Assets.i("boxcorner"));
		//this.borders = true;
		this.cropped = this.w>0&&this.h>0;
		this.transparent = false;
		//this.edges = false;
		this.color = "clear";
		var systems = {};
		var q = [];
		var rrng = {min:0,max:0};
		var urng = {min:0,max:0};
		this.getq = function(){return q;};
		this.camera = new Camera(this.w/2,this.h/2,this.w,this.h);
		this.camera.container = this;
		this.invisible = false;
		this.frozen = false;
		this.hidden = false;
		this.empty = function(){
			systems = {};
			q = [];
			rrng = {min:0,max:0};
		}
		function Camera(cx, cy, width, height){
			var scale = 1;
			this.x = cx;
			this.y = cy;
			this.grid = -1;
			if (typeof width == "number" && typeof height == "number"){
				this.w = width;
				this.h = height;}
			this.reset = function(){
				this.x = this.container.w/2;
				this.y = this.container.h/2;
				this.w = this.container.w;
				this.h = this.container.h;
			}
			this.centerZero = function(){
				this.x = 0;
				this.y = 0;
			}
			this.setGrid = function(on, dx, dy, color, width){
				if (!on){this.grid = -1;return;}
				this.grid = new Grid(this,dx,dy,color,width);
			}
			function Grid(cam, dx, dy, color, width){
				this.cam = cam;
				this.dx = dx || 100;
				this.dy = dy || 100;
				this.color = color || "white";
				this.width = width || 1;
				this.render = function(g){
					g.strokeStyle = this.color;
					g.lineWidth = this.width;
					var u, d, l, r;
					u = this.cam.y-this.cam.h/2/this.cam.getzoom();
					d = this.cam.y+this.cam.h/2/this.cam.getzoom();
					l = this.cam.x-this.cam.w/2/this.cam.getzoom();
					r = this.cam.x+this.cam.w/2/this.cam.getzoom();
					for (var i = l-l%this.dx-this.dx; i <= r+this.dx; i+=this.dx)
						for (var j = u-u%this.dy-this.dy; j <= d+this.dy; j+=this.dy)
						g.strokeRect(i,j,this.dx,this.dy);
				}
			}
			//this.relx = function(){
			//	return (this.x-this.w/2)*scale;}
			//this.rely = function(){
			//	return this.y-this.h/2;}
			this.relx = function(x){
				return (x*scale - this.x*scale + this.w/2);//*scale;
			}
			this.rely = function(y){
				return (y*scale - this.y*scale + this.h/2)//*scale;
			}
			this.getzoom = function(){
				return scale;}
			this.zoom = function(scl){
				scale*=scl;}
			this.zoomto = function(scl){
				scale = scl;}
			this.step = function(g){
				g.translate(-this.x*scale,-this.y*scale);
				g.translate(this.w/2,this.h/2);
				g.scale(scale,scale);
				if (this.grid!=-1)
					this.grid.render(g);
				//g.translate(-(this.x*scale-this.w/2), -(this.y*scale-this.h/2));
				//console.log(scale);
				//g.scale(scale, scale);
				}
			this.unstep = function(g){
				g.scale(1/scale,1/scale);
				g.translate(-this.w/2,-this.h/2);
				g.translate(this.x*scale,this.y*scale);
				//g.scale(1/scale, 1/scale);
				//g.translate((this.x*scale-this.w/2), (this.y*scale-this.h/2));
			}
		}
		this.mouseevent = function(type){
			//console.log(type);
			if (this.hidden || this.frozen)	return;
			for (var j = rrng.max; j >= rrng.min; j--)
				for (var i = q.length-1; i >= 0; i--)
					if (q[i].rl==j)
						if (typeof q[i]["mouse"+type] !== "undefined")
							if (q[i]["mouse"+type]())
								return true;
			return //this.mouseonbox()&&
			!this.transparent;}
		this.keyevent = function(type, c){
			if (this.hidden || this.frozen)	return;
			for (var j = rrng.max; j >= rrng.min; j--)
				for (var i = 0; i < q.length; i++)
					if (q[i].rl==j)
						if (typeof q[i]["key"+type] !== "undefined")
							if (q[i]["key"+type](c))
								return;}
		this.add = function(system, name){
			if (typeof name !== "string"){
				//console.log("Adding anonymous system: ");
				//console.log(system);
				q.push(system);
				system.container = this;
				system.systemname = name;
				if (typeof system.init == "function")	system.init();	return;}var sub = "";
			if (name.indexOf(".")!==-1){
				sub = name.substring(name.indexOf("."));
				name = name.substring(0,name.indexOf("."));
				if (typeof systems[name] !== "object"){	console.log("Parent system not found: "+name);	return;}}
			if (sub == ""){
				systems[name] = system;
				q.push(system);
				system.container = this;
				system.systemname = name;
				if (typeof system.init == "function")	system.init();}
			else systems[name].add(system, sub.substring(1));}
		this.remove = function(sorn){//system or name
			switch(typeof sorn){
				case "undefined":	console.log("Invalid removal.");	return;
				case "string": //name 
					sorn = this.get(sorn);
					if (typeof sorn.ondelete == "function")		sorn.ondelete();
					q.splice(q.indexOf(sorn),1);
					delete sorn;	return;		default: //system
					if (typeof sorn.ondelete == "function")		sorn.ondelete();
					q.splice(q.indexOf(sorn),1);	return;}}
		this.get = function(name){
			if (typeof name !== "string"){	console.log("Not a valid name: "+name);	return;}	var sub = "";
			if (name.indexOf(".")!==-1){sub = name.substring(name.indexOf(".")+1);name = name.substring(0,name.indexOf("."));}
			if (typeof systems[name] !== "object"){	console.log("System not found: "+name);		return;}
			if (sub == "") return systems[name];
			else return systems[name].get(sub);}
		this.has = function(name){
			return exists(systems[name]);}
		this.update = function(delta){
			if (this.frozen || this.hidden)	return;
			for (var i = 0; i < q.length; i++){
				q[i].ul = q[i].ul || 0;
				if (q[i].ul<urng.min)urng.min=q[i].ul;
				if (q[i].ul>urng.max)urng.max=q[i].ul;}
			for (var j = urng.min; j <= urng.max; j++)
				for (var i = 0; i < q.length; i++)
					if (!q[i].frozen && exists(q[i].update) && q[i].ul==j)
						q[i].update(delta);}
		this.render = function(g){
			if (this.invisible || this.hidden)	return;
			renderBefore.call(this,g);
			this.camera.step(g);
			for (var i = 0; i < q.length; i++){
				q[i].rl = q[i].rl || 0;
				if (q[i].rl<rrng.min)rrng.min=q[i].rl;
				if (q[i].rl>rrng.max)rrng.max=q[i].rl;}
			for (var j = rrng.max; j >=rrng.min; j--)
				for (var i = 0; i < q.length; i++)
					if (q[i].rl==j && q[i].fullscreen){
						temprender(g,q[i]);
						for (var j2 = j; j2 <= rrng.max; j2++)
							for (var i = 0; i < q.length; i++)
								if (q[i].rl==j)
									temprender(g,q[i]);
						return;}
			for (var j = rrng.min; j <= rrng.max; j++)
				for (var i = 0; i < q.length; i++)
					if (q[i].rl==j)
						temprender(g,q[i]);
			this.camera.unstep(g);
			renderAfter.call(this,g);
		}
		function renderBefore(g){
			g.save()
			g.translate(this.x,this.y);
			if (!this.transparent&&this.color!=="clear"){
				g.fillStyle = this.color;
				g.fillRect(0,0,this.w,this.h);}
			if (!this.cropped) return;
			g.beginPath();
			g.rect(0,0,this.w,this.h);
			g.clip();
			g.closePath();
		}
		function renderAfter(g){
			g.restore();
		}
		/*function renderprep(g){
			g.save()
			g.translate(this.x,this.y);
			if (!this.transparent&&this.color!=="clear"){
				g.fillStyle = this.color;
				g.fillRect(0,0,this.w,this.h);}
			g.save();
			if (!this.cropped) return;
			g.beginPath();
			g.rect(0,0,this.w,this.h);
			g.clip();
			g.closePath();}
		function renderborders(g){
			g.restore();
			if (!this.borders){g.restore(); return;}
			border.rotateto(0);
			border.setwidth(this.w);
			idraw(g,border,this.w/2,0);
			idraw(g,border,this.w/2,this.h);
			border.rotateto(Math.PI/2);
			border.setwidth(this.h);
			idraw(g,border,0,this.h/2);
			idraw(g,border,this.w,this.h/2);
			idraw(g, corner, 0, 0);
			idraw(g, corner, 0, this.h);
			idraw(g, corner, this.w, 0);
			idraw(g, corner, this.w, this.h);
			if (!this.edges){g.restore(); return;}
			idraw(g, corner, 0, this.h/2);
			idraw(g, corner, this.w/2, 0);
			idraw(g, corner, this.w, this.h/2);
			idraw(g, corner, this.w/2, this.h);
			g.restore();}*/
		function temprender(g, renderobj){
			if (existsAndIs(renderobj.invisible, true) || existsAndIs(renderobj.hidden, true))	return;
			g.save();
			if (exists(renderobj.render))
				renderobj.render(g);
			g.restore();}
	}
	this.DBox.prototype.getbounds = function(){
	var u, d, l, r;
	u = this.camera.y-this.camera.h/2/this.camera.getzoom();
	d = this.camera.y+this.camera.h/2/this.camera.getzoom();
	l = this.camera.x-this.camera.w/2/this.camera.getzoom();
	r = this.camera.x+this.camera.w/2/this.camera.getzoom();
	return {	u:u,	d:d,	l:l,	r:r};}
	this.DBox.prototype.inbounds = function(x,y){
		var b = this.getbounds();
		return x <= b.r && x >= b.l && y <= b.d && y >= b.u;
	}
	this.DBox.prototype.getarea = function(){
		var b = this.getbounds();
		return Math.abs((b.u-b.d)*(b.l-b.r));}
	//this.DBox.prototype.mouseonbox = function(){return mouse.relx(this)>0&&mouse.relx(this)<this.w&&mouse.rely(this)>0&&mouse.rely(this)<this.h;}
	this.DBox.prototype.screenx = function(xx){
		var x = (this.x + this.camera.relx(xx));///this.camera.getzoom();
		if (typeof this.container !== "undefined")
			if (typeof this.container.screenx !== "undefined")
				return this.container.screenx(x);
			else return x;
		else return x;}
	//this.DBox.prototype.screenx = function(x){
	//	x*camer.zoom+w/2
	//}
	this.DBox.prototype.screeny = function(yy){
		var y = (this.y + this.camera.rely(yy));//*this.camera.getzoom();
		if (typeof this.container !== "undefined")
			if (typeof this.container.screeny !== "undefined")
				return this.container.screeny(y);
			else return y;
		else return y;}
	this.DBox.prototype.mousedown = (function(){	return this.mouseevent.apply(this,["down"]);});
	this.DBox.prototype.mousedown = (function(){	return this.mouseevent.apply(this,["down"]);});
	this.DBox.prototype.mouseup = function(){		return this.mouseevent.apply(this,["up"]);}
	this.DBox.prototype.mouseclick = function(){	return this.mouseevent.apply(this,["click"]);}
	this.DBox.prototype.mouserclick = function(){	return this.mouseevent.apply(this,["rclick"]);}
	this.DBox.prototype.keydown = function(c){		this.keyevent("down",c);}
	this.DBox.prototype.keyup = function(c){		this.keyevent("up",c);}
	this.DBox.prototype.keypress = function(c){		this.keyevent("press",c);}
}