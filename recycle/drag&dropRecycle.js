/*Системная переменная*/
var objdd = false;

/*Компонент drag&drop */
function mousedown(ev) {
	objdd = R('.' + ev.target.getAttribute('name'));
	if(objdd) {
		X = ev.x;
		Y = ev.y;
		objddLeft = parseInt(objdd.style.left) ? parseInt(objdd.style.left) : objdd.offsetLeft;
		objddTop = parseInt(objdd.style.top) ? parseInt(objdd.style.top) : objdd.offsetTop;
	}
	return false;
}

function mousemove(ev) {
	if(objdd) {
		objdd.style.left = objddLeft + event.clientX-X + document.body.scrollLeft + 'px';
		objdd.style.top = objddTop + event.clientY-Y + document.body.scrollTop + 'px';
		return false;
	}
}

function mouseup() {
	objdd = false;
}


/*Установка обработчиков событий для drag&drop*/
document.onmousedown = function(event) {
	mousedown(event);
	return true;
}
document.onmousemove = mousemove;
document.onmouseup = mouseup; 