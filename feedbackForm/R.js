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

R.counter = function(kit, callback) {
	var eachCounter = 0;
	while (eachRow = kit[eachCounter]) {
		callback(eachCounter);
		eachCounter++;
	}
};

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