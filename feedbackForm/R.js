function R(selector) {
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
}

R.addStyle = function(link) {
	var tag = document.createElement('link');
	tag.rel = 'stylesheet';
	tag.type = 'text/css';
	tag.href = link;
	document.head.appendChild(tag);
};

R.addScript = function(src) {
	var tag = document.createElement('script');
	tag.language= 'javascript';
	tag.src = src;
	document.head.appendChild(tag);
};

R.log = function(log) {
	return console.log(log);
};

R.cicle = function(obj, cb) {
	var counter = 0;
	for (var key in obj) {
		if (obj.hasOwnProperty(key))
			cb(key, obj[key], counter);
		counter++;
	}
	return;
};