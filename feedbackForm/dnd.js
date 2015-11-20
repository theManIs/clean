var DnD = {
	objdnd : false,
	drag : 'true',

	mousedown : function(ev) {
		var objdnd = document.querySelector('#' + ev.target.getAttribute('name'));
		if (objdnd && objdnd.getAttribute('drag') !== null) {
			DnD.objdnd = objdnd;
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
		if(DnD.objdnd) {
			DnD.offsetX = event.clientX-DnD.X;
			DnD.offsetY = event.clientY-DnD.Y;
			DnD.objdnd.style.left = DnD.Left + DnD.offsetX  + 'px';
			DnD.objdnd.style.top = DnD.Top + DnD.offsetY + 'px';
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
	debug : function() {
		console.log('start output');
		console.log('origin offset: ' + DnD.Left + ' ' + DnD.Top + ' ' +
		'origin client: ' + DnD.X + ' ' + DnD.Y);
		console.log('current style offfset: ' + DnD.objdnd.style.left + ' ' + DnD.objdnd.style.top + ' ' +
		'current js offset: ' + DnD.objdnd.offsetLeft + ' ' + DnD.objdnd.offsetLeft + ' ' +
		'current move: ' + DnD.offsetX + ' ' + DnD.offsetY);
		
	},
}

DnD.initiate();
