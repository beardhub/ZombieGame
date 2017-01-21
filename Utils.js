function UtilsFramework(){
	this.frameworkName = "UtilsFramework";
	this.Timer = function(dur){
		this.dur = dur;
		this.count = 0;
		this.running = false;
		this.loop = false;
		this.autocons = false;
		this.setLoop = function(loop){
			this.loop = loop || false;
			return this;
		}
		this.setAuto = function(auto, oncomp){
			this.autocons = auto;
			if (typeof oncomp == "function")
				this.oncomp = oncomp;
			return this;
		}
		this.start = function(){
			this.count = 0;
			this.running = true;
			return this;
		}
		this.ready = function(){
			return this.count >= this.dur;
		}
		this.progress = function(){
			if (this.count >= this.dur)
				return 1;
			return this.count/this.dur;
		}
		this.consume = function(){
			if (this.count >= this.dur){
				this.count = 0;
				if (!this.loop)
					this.running = false;
				return true;
			}
			return false;
		}
		this.update = function(delta){
			//console.log(this.count);
			if (this.running && this.count <= this.dur)
				this.count+=delta;
			if (this.autocons)
				if (this.consume())
					if (typeof this.oncomp == "function")
						this.oncomp();
		}
	}
}