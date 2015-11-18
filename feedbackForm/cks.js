R.wCookie = function(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	}
	if (document.cookie = name + "=" + value + expires + "; path=/")
		return true;
	else
		return false;
};
R.rCookie = function(name) {
	var searchName = name + "=";
	var cookies = document.cookie.split(';');
	for (var i = 0; i < cookies.length; i++) {
		var c = cookies[i];
		while (c.charAt(0) == ' ') 
			c = c.substring(1, c.length);
		if (c.indexOf(searchName) == 0)
			return c.substring(searchName.length, c.length);
	}
	return false;
};
R.eCookie = function(name) {
	R.wCookie(name,"",-1);
}
R.racks = function() {
	var obj = {};
	var cook = document.cookie.split(';');
	for (i = 0, c = cook.length; i < c; i++) {
		var it = cook[i].split('=');
		obj[it[0]] = it[1];
	}
	return obj;
};