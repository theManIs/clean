var myLoader = {
	load : function () {
		for (i = 0; i < this.scripts.length; i++) {
			this.ld(this.src + this.scripts[i]);
		}
	},
	ld : function(addr) {
		var l = document.createElement('script');
		l.type = 'text/javascript';
		l.src = addr;
		document.head.appendChild(l);
	},
	recognize : function () {
		var ldrjs = document.querySelector('[src*="ldr.js"]');
		this.src = ldrjs.src.slice(0, ldrjs.src.lastIndexOf('ldr.js'));
	},
	initiate : function (scripts) {
		this.scripts = scripts;
		this.recognize();
		this.load();
	},
};

myLoader.initiate(['R.js', 'xhr.js', 'dnd.js', 'ckScript.js']);