var DnD = {
	objdnd : false,
	drag : 'true',

	mousedown : function(ev) {
		DnD.objdnd = document.querySelector('#' + ev.target.getAttribute('name'));
		if (DnD.objdnd && DnD.objdnd.getAttribute('drag') !== null) {
			var objdnd = DnD.objdnd;
			if (objdnd) {
				DnD.X = ev.clientX;
				DnD.Y = ev.clientY;
				DnD.Left = parseInt(objdnd.style.left) ? parseInt(objdnd.style.left) : objdnd.offsetLeft;
				DnD.Top = parseInt(objdnd.style.top) ? parseInt(objdnd.style.top) : objdnd.offsetTop;
			}
		}
		return false;
	},
	mousemove : function(event) {
		var objdnd = DnD.objdnd;
		if(objdnd) {
			objdnd.style.left = DnD.Left + event.clientX-DnD.X + document.body.scrollLeft + 'px';
			objdnd.style.top = DnD.Top + event.clientY-DnD.Y + document.body.scrollTop + 'px';
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

