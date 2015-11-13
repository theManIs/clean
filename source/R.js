/*Эмулятор доступа к объекту DOM*/
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