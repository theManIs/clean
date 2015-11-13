//L.js
window.L = {
	dgebi : function(id) {
		return document.getElementById(id);;
	},
	dce : function(e) {
		return document.createElement(e);
	},
	ncnt : function(elem) {
		return elem.cloneNode(true);
	}, 	
	pac : function(parent, child) {
		parent.appendChild(child);
		return;
	},
	log : function(log) {
		return console.log(log);
	},
	dir : function(dir) {
		return console.dir(dir);
	},
	dqsa : function(selector) {
		if (selector[0] === '#') {
			if (kit = document.querySelector(selector))
				return kit;
			else
				return false;
		} else {
			if(kit = document.querySelectorAll(selector)) {
				if (typeof kit[0] == 'undefined')
					return false;
				else {
					if (kit[1])	
						return kit;
					else 
						return kit[0];
				}
			} else
				return false;
		}
	},
}
L.fr = function(size, callback) {
	for (i = 0; i < size; i++) {
		callback(i);
	}
};