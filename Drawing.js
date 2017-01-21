function DrawingFramework(){
	this.frameworkName = "DrawingFramework";
	this.Sprite = function(img){
		this.img = img;
		this.x = 0;
		this.y = 0;
		this.scalex = 1;
		this.scaley = 1;
		this.originx = 0;
		this.originy = 0;
		this.rotation = 0;
		this.setOriginCenter = function(){
			this.originx = this.img.width/2;
			this.originy = this.img.height/2;
			//console.log(this.originx+ " "+this.img.width);
		}
		this.rotate = function(a){
			this.rotation+=a;
		}
		this.rotateto = function(a){
			this.rotation = a;
		}
		this.render = function(g){
			g.save();
			g.translate(this.x,this.y);//+this.originx,this.y+this.originy);
			g.rotate(this.rotation);
			g.translate(-this.originx,-this.originy);
			g.scale(this.scalex,this.scaley);
			g.drawImage(this.img,0,0,this.img.width,this.img.height);
			g.restore();
		}
	}
	this.Img = function(img){
		this.img = img;
		this.getDims = function(){
			return {w:img.width,h:img.height};
		}
		this.render = function(g){
			g.drawImage(this.img,0,0,this.img.width,this.img.height)
		}
	}
	this.SpriteBox = function(contents){
		this.contents = contents;
		this.x = 0;
		this.y = 0;
		this.scalex = 1;
		this.scaley = 1;
		this.originx = 0;
		this.originy = 0;
		this.rotation = 0;
		this.color = "black";
		this.setColor = function(c){
			this.color = c;
		}
		this.setPosition = function(x,y){
			this.x = x;
			this.y = y;
			return this;
		}
		this.move = function(dx,dy){
			this.x+=dx;
			this.y+=dy;
			return this;
		}
		this.setScales = function(x,y){
			this.scalex = x;
			this.scaley = y;
			return this;
		}
		this.scale = function(x,y){
			this.scalex*=x;
			this.scaley*=y;
			return this;
		}
		this.setOrigin = function(x,y){
			this.originx = x;
			this.originy = y;
			return this;
		}
		this.moveOrigin = function(x,y){
			this.originx+=x;
			this.originy+=y;
			return this;
		}
		this.setOriginCenter = function(){
			this.originx = this.contents.getDims.w/2;
			this.originy = this.contents.getDims.h/2;
			return this;
			//console.log(this.originx+ " "+this.img.width);
		}
		this.rotate = function(a){
			this.rotation+=a;
			return this;
		}
		this.rotateto = function(a){
			this.rotation = a;
			return this;
		}
		this.render = function(g){
			g.save();
			g.fillStyle = this.color;
			g.translate(this.x,this.y);//+this.originx,this.y+this.originy);
			g.rotate(this.rotation);
			g.translate(-this.originx,-this.originy);
			g.scale(this.scalex,this.scaley);
			this.contents.render(g);
			//g.drawImage(this.img,0,0,this.img.width,this.img.height);
			g.restore();
		}
	}
}
/*
images
text
shapes

*/