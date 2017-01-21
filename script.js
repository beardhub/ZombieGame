(function(){var s = document.createElement("script");s.setAttribute("src","template.js");document.head.appendChild(s);})()
function start(){
	console.log(U.container.get("stats"));
	(function(){var s=localStorage.getItem("highscores");if(s==null)localStorage.setItem("highscores",JSON.stringify(s={spd:3.5,sht:0,hit:0,tme:0}));else s=JSON.parse(s);
	U.container.add(s,"stats");U.add({spd:3.5,sht:0,hit:0,tme:0},"stats")})()
	U.add(new (function(){this.x=this.y=0;this.dpad=new K.dpad("wasd",5);U.add(this.dpad);this.rl=1;U.add(this.cd=new Utils.Timer(1/5).setLoop(true).start());
	U.camera.setGrid(true);U.add(new UI.Follow(U.camera,this));this.hp=this.mhp=50;this.ul=-1;var bul=new UI.DBox();U.add(bul,"bullets");
	this.update=function(delta){this.x+=this.dpad.dx;this.y+=this.dpad.dy;if(this.hp<=0){U.container.get("stats")["container"]=undefined;localStorage.setItem("highscores",
	JSON.stringify(U.container.get("stats")));U.empty();start()};U.get("stats").tme+=delta;var s=U.container.get("stats")||U.get("stats"),s2=U.get("stats");
	if(s.sht<s2.sht)s.sht=s2.sht;if(s.hit<s2.hit)s.hit=s2.hit;if(s.tme<s2.tme)s.tme=s2.tme;U.container.add(s,"stats");if(Ms.isdown())
	if(this.cd.consume())U.add(new (function(x,y){this.x=x;this.y=y;this.dist=0;this.rng=500;this.pierce=0;this.init=function(){this.a=Ms.rela(this)};U.get("stats").sht++;
		this.update=function(){this.x+=10*Math.cos(this.a);this.y+=10*Math.sin(this.a);this.dist+=10;if(this.dist>this.rng||this.pierce<0)this.container.remove(this)}
		this.render=function(g){g.fillStyle="cyan";g.fillRect(this.x-10,this.y-10,20,20)}})(this.x+30*Math.cos(Ms.rela(this)),this.y+30*Math.sin(Ms.rela(this))),"bullets.")}
	this.render=function(g){g.fillStyle="blue";g.fillRect(this.x-25,this.y-25,50,50);g.translate(this.x,this.y);
	g.fillStyle="dodgerblue";if(this.hp>0)g.fillRect(-25,20,this.hp/this.mhp*50,5);g.rotate(Ms.rela(this));g.fillRect(0,-5,40,10)}})(),"player");
	U.add(new Utils.Timer(1/4).setLoop(true).start().setAuto(true,function(){U.add(new (function(){var p=U.get("player");
	this.pos=new Physics.Vec(400,0).rotateto(Math.random()*Math.PI*2).add(new Physics.Vec(p.x,p.y));U.add(new UI.Follow(this,this.pos));
	this.render=function(g){g.fillStyle="red";g.fillRect(this.x-20,this.y-20,40,40)};this.speed=(U.get("stats").spd+=0.003);
	this.update=function(delta){var p=U.get("player");this.pos.add(new Physics.Vec(p.x,p.y).sub(this.pos).setLen(this.speed));this.speed+=delta/2;
		for(var b in U.get("bullets").getq()){var bul=(U.get("bullets").getq())[b];if(new Physics.Vec(bul.x,bul.y).sub(this.pos).len()<25&&bul.pierce>=0){
		bul.pierce--;U.get("stats").hit++;U.remove(this);return;}}if(new Physics.Vec(p.x,p.y).sub(this.pos).len()<25){p.hp-=10;U.remove(this)}}})())}));
	U.add(new (function(){U.add(new UI.Follow(this,U.get("player"),-500,-500));this.rl=2;this.render=function(g){var c=U.get("stats"),h=U.container.get("stats");
	g.translate(this.x,this.y);g.font="30px Arial";g.fillStyle="white";g.fillText("current    highscore",110,30);g.fillText("shots        "+(c.sht),10,70);
	g.fillText("hits           "+c.hit,10,110);g.fillText("time          "+Math.round(c.tme),10,150);
	g.fillText(h.sht,280,70);g.fillText(h.hit,280,110);g.fillText(Math.round(h.tme),280,150)}})());
}