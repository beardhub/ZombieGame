(function(){var s = document.createElement("script");s.setAttribute("src","template.js");document.head.appendChild(s);})()
function start(){
	U.add(new (function(){this.x=this.y=0;this.dpad=new K.dpad("wasd",5);U.add(this.dpad);this.rl=1;U.add(this.cd=new Utils.Timer(1/5).setLoop(true).start());
	U.camera.setGrid(true);U.add(new UI.Follow(U.camera,this));this.hp=this.mhp=50;this.ul=-1;var bul=new UI.DBox();U.add(bul,"bullets");
	this.keydown=function(k){if(k.name=="space")console.log(U.get("bullets"))};U.add({val:3.6},"basespeed");
	this.update=function(){this.x+=this.dpad.dx;this.y+=this.dpad.dy;if(this.hp<=0){U.empty();start()};if(Ms.isdown())if(this.cd.consume())
	U.add(new (function(x,y){this.x=x;this.y=y;this.dist=0;this.rng=500;this.pierce=0;this.init=function(){this.a=Ms.rela(this)};
		this.update=function(){this.x+=10*Math.cos(this.a);this.y+=10*Math.sin(this.a);this.dist+=10;if(this.dist>this.rng||this.pierce<0)this.container.remove(this)}
		this.render=function(g){g.fillStyle="cyan";g.fillRect(this.x-10,this.y-10,20,20)}})(this.x+30*Math.cos(Ms.rela(this)),this.y+30*Math.sin(Ms.rela(this))),"bullets.")}
	this.render=function(g){g.fillStyle="blue";g.fillRect(this.x-25,this.y-25,50,50);g.translate(this.x,this.y);
	g.fillStyle="dodgerblue";if(this.hp>0)g.fillRect(-25,20,this.hp/this.mhp*50,5);g.rotate(Ms.rela(this));g.fillRect(0,-5,40,10)}})(),"player");
	U.add(new Utils.Timer(1/4).setLoop(true).start().setAuto(true,function(){U.add(new (function(){var p=U.get("player");
	this.pos=new Physics.Vec(400,0).rotateto(Math.random()*Math.PI*2).add(new Physics.Vec(p.x,p.y));U.add(new UI.Follow(this,this.pos));
	this.render=function(g){g.fillStyle="red";g.fillRect(this.x-20,this.y-20,40,40)};this.speed=(U.get("basespeed").val+=0.001);
	this.update=function(delta){var p=U.get("player");this.pos.add(new Physics.Vec(p.x,p.y).sub(this.pos).setLen(this.speed));this.speed+=delta/2;
		for(var b in U.get("bullets").getq()){var bul=(U.get("bullets").getq())[b];if(new Physics.Vec(bul.x,bul.y).sub(this.pos).len()<25&&bul.pierce>=0){
		bul.pierce--;U.remove(this);return;}}if(new Physics.Vec(p.x,p.y).sub(this.pos).len()<25){p.hp-=10;U.remove(this)}}})())}));
}