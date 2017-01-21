function MouseFramework(){
	this.frameworkName = "MouseFramework";
	//this.deltadown = 0;
	//this.deltaup = 0;
	//this.update = function(){	}
	var mouse = new (function(){
		this.x = 0;
		this.y = 0;
		this.down = false;	
		this.upos = function(e, canvas){
			var rect = this.canvas.getBoundingClientRect();
			this.x = e.clientX - rect.left;
			this.y = e.clientY - rect.top;
		}
	})();
	this.x = function(){	return mouse.x;	}
	this.y = function(){	return mouse.y;	}
	this.isdown = function(){	return mouse.down;	}
	this.relx = function(t){if (!exists(t.container)) return this.x()-t.x;return this.x() - (t.container.screenx(t.x));}// + t.x)/t.container.camera.getzoom();}
	this.rely = function(t){if (!exists(t.container)) return this.y()-t.y;return this.y() - (t.container.screeny(t.y));}// + t.y)/t.container.camera.getzoom();}
	this.reld = function(t){return Math.sqrt(this.relx(t)*this.relx(t)+this.rely(t)*this.rely(t));}
	this.rela = function(t){return Math.atan2(this.rely(t),this.relx(t))}
	this.setcanvas = function(canvas){
		mouse.canvas = canvas;
	}
	this.setupListeners = function(listenerobj){
		//var that = this;
		var validfuncs = {
			down:function(){},
			up:function(){},
			click:function(){},
			rclick:function(){},
			//moved:function(){}
			}
			
		for (var p in validfuncs){
			this[p] = function(){}
			for (var l in listenerobj)
				if (p==l) this[p] = listenerobj[l];
		}
		
		var that = this;
		/*
		//console.log(mouse);
		var down = function(e){
			e.preventDefault();
			mouse.upos(e);
			console.log("down");
			that.down();
		}
		down.bind(this,mouse);*/
		document.addEventListener("click",(function(mouse,e){			e.preventDefault();	mouse.upos(e);	that.click();	}).bind(that,mouse));
		document.addEventListener("contextmenu",(function(mouse,e){	e.preventDefault();	mouse.upos(e);	that.rclick();	}).bind(that,mouse));
		document.addEventListener("touchstart",function(e){			e.preventDefault(); 
			mouse.upos(e.touches[0]);
			console.log(e.touches[0]);
			mouse.down = true;	
			that.down();
			});
		document.addEventListener("mousedown",function(e){			e.preventDefault(); mouse.upos(e);mouse.down = true;	that.down();});
		//down);//.bind(this,mouse));//(function(mouse,e){	e.preventDefault();	mouse.upos(e);	that.down();	}).bind(that,mouse));
		document.addEventListener("mouseup",function(e){				e.preventDefault();	mouse.upos(e);mouse.down = false;	that.up();	});
		document.addEventListener("touchend",function(e){				e.preventDefault();	mouse.upos(e);mouse.down = false;	that.up();	});
		//(function(mouse,e){		e.preventDefault();	mouse.upos(e);	that.up();		}).bind(that,mouse));
		document.addEventListener("mousemove",(function(mouse,e){		e.preventDefault();	setTimeout(mouse.upos(e),20);	/*that.moved();*/	}).bind(that,mouse));
		document.addEventListener("drag",(function(e){		e.preventDefault();}));//	mouse.upos(e);	/*that.moved();*/	}).bind(that,mouse));
		document.addEventListener("touchmove",(function(mouse,e){		e.preventDefault();	
			mouse.upos(e.touches[0]);	/*that.moved();*/	}).bind(that,mouse));
		
		
	}
	
}
		/*
		
		//this.click = function(){console.log("click");}
		var actualfuncs = ["click","contextmenu","mousedown","mouseup","mousemove"];
		var calledfuncs = ["click","rclick","down","up","moved"];
		//console.log("dwiwhdihwidjdwodjowjdowdo");
		//for (var i = 0; i <actualfuncs.length; i++){var j = i;//console.log(j+" "+calledfuncs[j]+" the func "+this[calledfuncs[j]]);
		//	console.log(actualfuncs[i]+" "+that[calledfuncs[i]]);
		//	document.addEventListener(actualfuncs[j],function(e){e.preventDefault();//console.log(calledfuncs[j]);//mouse.upos(e);
	//(that[calledfuncs[j]])(e);
	//});}
	for (var i = 0; i < calledfuncs.length; i++){
		console.log(that[calledfuncs[i]]);
		var func = that[calledfuncs[i]].bind(that);
	document.addEventListener(actualfuncs[i],function(e){e.preventDefault();func();});}//that[calledfuncs[i]]);}//function(e){(that[calledfuncs[0]]).call(that,e);});
		//document.addEventListener("click",this.click);
		//document.addEventListener("mousemove",this.moved);
		//for (var p in this) 
		//	console.log("DFEFEF  "+p+" "+this[p]);
		/*window.addEventListener("click", mouseclick);
		window.addEventListener("contextmenu", mouserclick);
		window.addEventListener("mousedown", mousedown);
		window.addEventListener("mouseup", mouseup);
		window.addEventListener("mousemove", mousemove);
		window.addEventListener("drag", mousemove);*/
	
	/*
		this.relx = function(t){if (!exists(t.container)) return this.x-t.x;return (this.x - t.container.screenx() - t.x)/t.container.camera.getzoom();}
		this.rely = function(t){if (!exists(t.container)) return this.y-t.y;return (this.y - t.container.screeny() - t.y)/t.container.camera.getzoom();}
	this.setupListeners = function(keyhub){
		window.addEventListener("keydown",(function(c){this.get(c.keyCode,true).down=true;}).bind(this));
		window.addEventListener("keyup",(function(c){this.get(c.keyCode,true).down=false;}).bind(this));
		for(var i=0;i<3;i++)
			window.addEventListener("key"+(["down","up","press"])[i],keyhub.dup.bind(keyhub,this,i));
	}
	this.MouseHub = function(){
		this.down = function(){};
		this.up = function(){};
		this.clicked = function(){};
		this.rclicked = function(){};
		this.moved = function(){};
		this.dragged = function(){};
		
		this.mouse = new (function(){
			this.x = 0;
			this.y = 0;
			this.down = false;	
			this.upos = function(e){
				var rect = this.canvas.getBoundingClientRect();
				this.x = e.clientX - rect.left;
				this.y = e.clientY - rect.top;
			}
			this.relx = function(t){if (!exists(t.container)) return this.x-t.x;return (this.x - t.container.screenx() - t.x)/t.container.camera.getzoom();}
			this.rely = function(t){if (!exists(t.container)) return this.y-t.y;return (this.y - t.container.screeny() - t.y)/t.container.camera.getzoom();}
		})();
		
		this.dup = function(k,e,c){
			(([this.down,this.up,this.pressed])[e])(k.get(c.keyCode,true));
		}
	}
	this.setupListeners = function(mousehub, canvas){
		if (exists(canvas)) this.mouse.canvas = canvas;
		document.addEventListener("click", mouseclick);
		document.addEventListener("contextmenu", mouserclick);
		document.addEventListener("mousedown", mousedown);
		document.addEventListener("mouseup", mouseup);
		document.addEventListener("mousemove", mousemove);
		document.addEventListener("drag", mousemove);
		
		
		window.addEventListener("keydown",(function(c){this.get(c.keyCode,true).down=true;}).bind(this));
		window.addEventListener("keyup",(function(c){this.get(c.keyCode,true).down=false;}).bind(this));
		for(var i=0;i<3;i++)
			window.addEventListener("key"+(["down","up","press"])[i],keyhub.dup.bind(keyhub,this,i));
	}
	this.KeyHub = function(){
		this.down = function(){};
		this.up = function(){};
		this.pressed = function(){};
		this.dup = function(k,e,c){
			(([this.down,this.up,this.pressed])[e])(k.get(c.keyCode,true));
		}
	}
	this.initialize = function(canvas){
	}
*/
	//this.ready = function(){return typeof this.mouse.canvas !== "undefined";}
