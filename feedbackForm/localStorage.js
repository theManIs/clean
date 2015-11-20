R.hStorage = function() {
	try {
		return 'localStorage' in window && window['localStorage'] !== undefined;
	} catch (e) {
		return false;
	}
};
R.ls = function() {
	if (R.hStorage)
		return window.localStorage;
	else
		return false;
};