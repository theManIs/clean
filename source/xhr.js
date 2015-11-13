/*Производит кросс-доменный GET-запрос*/
function get(request) {
	request = request + '?noCache=' + (new Date()).getTime();
	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
	var xhr = new XHR();
	xhr.open('GET', request, true);
	xhr.onerror = function() {
		alert('Ошибка' + this.status);
	}
	xhr.ontimeout = function() 	{
		alert('Извините, запрос превысил максимальное время');
	}
	xhr.send();
	return xhr;
};

/*Производит кросс-доменный POST-запрос*/
function get(request) {
	time = (new Date()).getTime();
	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
	var xhr = new XHR();
	xhr.open('POST', time, true);
	xhr.onerror = function() {
		alert('Ошибка' + this.status);
	}
	xhr.ontimeout = function() 	{
		alert('Извините, запрос превысил максимальное время');
	}
	xhr.send(request);
	return xhr;
};