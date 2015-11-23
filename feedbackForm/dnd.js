var DnD = {
	objdnd : false,
	drag : 'true',
	isMove : false,
	callable : {},

	mousedown : function(ev) {
		var objdnd = document.querySelector('#' + ev.target.getAttribute('name'));
		if (objdnd && objdnd.getAttribute('drag') !== null) {
			DnD.objdnd = objdnd;
			if (objdnd) {				
				DnD.currentAim = ev.target.getAttribute('id');
				DnD.preventHandler(ev.target);
				DnD.beforeDrag(objdnd);
				DnD.X = ev.clientX;
				DnD.Y = ev.clientY;
				DnD.Left = parseInt(objdnd.style.left) ? parseInt(objdnd.style.left) : objdnd.offsetLeft;
				DnD.Top = parseInt(objdnd.style.top) ? parseInt(objdnd.style.top) : objdnd.offsetTop;
			}
		}
	},
	mousemove : function(event) {
		if(DnD.objdnd) {
			DnD.offsetX = event.clientX-DnD.X;
			DnD.offsetY = event.clientY-DnD.Y;
			DnD.objdnd.style.left = DnD.Left + DnD.offsetX  + 'px';
			DnD.objdnd.style.top = DnD.Top + DnD.offsetY + 'px';
			DnD.isMove = true;
		}
	},
	mouseup : function(event) {
		if (DnD.objdnd) {
			if (!DnD.isMove) 
				if (DnD.callable[DnD.currentAim]) 
					DnD.callable[DnD.currentAim](event);
			DnD.isMove = false;
			DnD.objdnd = false;
		}
	},
	initiate : function(subject) {
		this.target = subject;
		this.listen(subject);
	},
	listen : function() {
		document.addEventListener('mousedown', DnD.mousedown);
		document.addEventListener('mousemove', DnD.mousemove);
		document.addEventListener('mouseup', DnD.mouseup);

	},
	debug : function() {
		try {
			console.log('start output');
			console.log(DnD.objdnd);
			console.log('origin offset: ' + DnD.Left + ' ' + DnD.Top + ' ' +
			'origin client: ' + DnD.X + ' ' + DnD.Y);
			console.log('current style offfset: ' + DnD.objdnd.style.left + ' ' + 
			DnD.objdnd.style.top + ' ' + 'current js offset: ' + DnD.objdnd.offsetLeft + ' ' + 
			DnD.objdnd.offsetLeft + ' ' + 'current move: ' + DnD.offsetX + ' ' + DnD.offsetY);
		} catch(e) { }
		
	},
	beforeDrag : function(obj) {
		DnD.ifPercent(obj);
	},
	ifPercent : function(objdnd) {
		var left = objdnd.style.left;
		var top = objdnd.style.top;
		if (left.search('%') !== -1)
			objdnd.style.left = objdnd.offsetLeft + 'px';
		if (top.search('%') !== -1)
			objdnd.style.top = objdnd.offsetTop + 'px';
	},
	preventHandler : function(target) {
		var moves = ['onselectstart', 'onclick', 'onmousedown', 'onmouseup', 'onmousemove'];
		for (var key in moves)
			target[moves[key]] = function() {return false};
	},
}

DnD.initiate();
//DnD.callable.callkeeperTitleForm = function(event){console.log(event);};
