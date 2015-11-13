
/*Системные переменные*/
/*
	var backScript = 'backEnd.php';
	var importWidget = 'http:/' + '/cl' + 'imb.h' + 'ol.es/im' + 'port.js';
	var linkStyle = 'htt' + 'p://clim' + 'b.hol.e' + 's/myS' + 'tyle.css';
*/


	var backScript = 'backEnd.php';
	var importWidget = 'import.js';
	var linkStyle = 'myStyle.css';


/*
	var backScript = 'backEnd.php';
	var importWidget = 'htt' + 'p:' + '//a' + 'rte' + 'm.ca' + 'llkeep' + 'er.ru/im' + 'port.js';
	var linkStyle = 'htt' + 'p:' + '//a' + 'rte' + 'm.ca' + 'llkeep' + 'er.ru/myS' + 'tyle.css';
*/

/*Загружает необходимый контент*/

(function(){
	app = document.createElement('script');
	app.type = 'text/javascript';
	app.src = importWidget;
	app.async = true;
	document.body.appendChild(app);

	link = document.createElement('link');
	link.type = 'text/css';
	link.rel = 'stylesheet';
	link.href = linkStyle;
	document.head.appendChild(link);
})();

/*Показвает или скрывает окно виджета*/

(window.onload = function(){
label = document.querySelector('.lt-label-event');
if (label != null) {
	label.onclick = function() {
		label.hidden = true;
		f = document.querySelector('.lt-widget-wrap');
		f.style.top = 'calc(100% - 413px)';
		f.style.left = 'calc(100% - 343px)';
		f.classList.remove('lt-widget-hidden');
	}
doc = document.querySelectorAll('.lt-wrapper-close');
	for (i = 0, c = doc.length; i < c; i++) {
		doc[i].onclick = function() {
			f.classList.add('lt-widget-hidden');
			label.hidden = false;
			}
	}
}

/*Выполняет кросс-доменный запрос*/

var closer = function(name, mail, message) {
	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
	var xhr = new XHR();
	xhr.open('GET', backScript + '?name=' + name + '&mail=' + mail + '&mes=' + message, true);
	xhr.onload = function() {
		alert(this.responseText);
	}
	xhr.onerror = function() {
		alert('Ошибка ' + this.status)
	}
	xhr.ontimeout = function() {
	  alert( 'Извините, запрос превысил максимальное время' );
	}
	xhr.send();
};

/*Привязывает событие к кнопке отправить*/

btt  = document.getElementsByTagName('button');
if (typeof btt !== 'undefined') {
	for (i = 0, c = btt.length; i < c; i++) {
		btt[i].onclick = function() {
			inp = document.getElementsByTagName('input');
			tea = document.getElementById('txtArea').value;
			closer(inp[7].value, inp[8].value, tea);
		}
	}
}

})();
