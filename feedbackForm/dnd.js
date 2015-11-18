var DnD = {
	objdnd : false,
	dndAttribute : 'dragable',

	mousedown : function(ev) {
		DnD.objdnd = document.querySelector('#' + ev.target.getAttribute('name'));
		if (DnD.objdnd && DnD.objdnd.getAttribute('dndattribute') === DnD.dndAttribute) {
			var objdnd = DnD.objdnd;
			if(objdnd) {
				X = ev.x;
				Y = ev.y;
				objdndLeft = parseInt(objdnd.style.left) ? parseInt(objdnd.style.left) : objdnd.offsetLeft;
				objdndTop = parseInt(objdnd.style.top) ? parseInt(objdnd.style.top) : objdnd.offsetTop;
			}
		}
		return false;
	},
	mousemove : function(ev) {
		var objdnd = DnD.objdnd;
		if(objdnd) {
			objdnd.style.left = objdndLeft + event.clientX-X + document.body.scrollLeft + 'px';
			objdnd.style.top = objdndTop + event.clientY-Y + document.body.scrollTop + 'px';
			return false;
		}
	},
	mouseup : function() {
		DnD.objdnd = false;
		return false;
	},
	initiate : function(subject) {
		this.target = subject;
		this.listen();
	},
	listen : function() {
		document.addEventListener('mousedown', DnD.mousedown);
		document.addEventListener('mousemove', DnD.mousemove);
		document.addEventListener('mouseup', DnD.mouseup);
	},
}

DnD.initiate();


