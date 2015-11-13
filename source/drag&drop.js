/*Компонент drag&drop */
function mousedown(ev) {
	alert('.' + ev.target.getAttribute('name'));
	obj = R(ev.target.getAttribute('name'));
	if(obj) {
		X = ev.x;
		Y = ev.y;
		objLeft = parseInt(obj.style.left) ? parseInt(obj.style.left) : obj.offsetLeft;
		objTop = parseInt(obj.style.top) ? parseInt(obj.style.top) : obj.offsetTop;
	}
	return false;
}

function mousemove(ev) {
	if(obj) {
		obj.style.left = objLeft + event.clientX-X + document.body.scrollLeft + 'px';
		obj.style.top = objTop + event.clientY-Y + document.body.scrollTop + 'px';
		return false;
	}
}

function mouseup() {
	obj = false;
}

/*Установка обработчиков событий для drag&drop*/
document.onmousedown = function(event) {
	mousedown(event);
	return true;
}
document.onmousemove = mousemove;
document.onmouseup = mouseup; 