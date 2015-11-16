/*Производит кросс-доменный GET-запрос*/
function getReq(request) {
	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
	var xhr = new XHR();
	xhr.open('GET', request, true);
	xhr.onerror = function() {
		alert('Ошибка ' + this.status);
	}
	xhr.ontimeout = function() 	{
		alert('Извините, запрос превысил максимальное время');
	}
	xhr.send();
	return xhr;
};

/*Производит кросс-доменный POST-запрос*/
function postReq(url, request) {
	time = (new Date()).getTime();
	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
	var xhr = new XHR();
	xhr.open('POST', url, true);	
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
	xhr.onerror = function() {
		alert('Ошибка ' + this.status);
	}
	xhr.ontimeout = function() 	{
		alert('Извините, запрос превысил максимальное время');
	}
	xhr.send('request=' + request);
	return xhr;
};