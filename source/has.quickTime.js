//has.quickTime.js

window.checkQuickTime = function() {
	for (i = 0, c = navigator.plugins.length; i < c; i++) {
		if (navigator.plugins[i].name.match('QuickTime')) {
			return true;
		} else {
			if (typeof  window.ActiveXObject !=  "undefined") 
				return 'It\'s IE brouser!';
		}
	}
	return false;
};