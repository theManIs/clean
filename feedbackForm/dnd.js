var DnD = {
	objdnd : false,
	drag : 'true',
	prevent : false,
	callback : false,

	mousedown : function(ev) {
		var objdnd = document.querySelector('#' + ev.target.getAttribute('name'));
		if (objdnd && objdnd.getAttribute('drag') !== null) {
			DnD.objdnd = objdnd;
			if (objdnd) {				
				DnD.beforeDrag(objdnd);
				DnD.X = ev.clientX;
				DnD.Y = ev.clientY;
				DnD.Left = parseInt(objdnd.style.left) ? parseInt(objdnd.style.left) : objdnd.offsetLeft;
				DnD.Top = parseInt(objdnd.style.top) ? parseInt(objdnd.style.top) : objdnd.offsetTop;
				return false;
			}
		}
	},
	mousemove : function(event) {
		if(DnD.objdnd) {
			DnD.offsetX = event.clientX-DnD.X;
			DnD.offsetY = event.clientY-DnD.Y;
			DnD.objdnd.style.left = DnD.Left + DnD.offsetX  + 'px';
			DnD.objdnd.style.top = DnD.Top + DnD.offsetY + 'px';
			DnD.preventHandler(event, DnD.objdnd);
			return false;
		}
	},
	mouseup : function(event) {
		if (DnD.objdnd && 'prevent' === DnD.prevent && DnD.callback) {
			//protos = DnD.objdnd.parentNode;			
			//protos.appendChild(DnD.clone);
			//protos.removeChild(DnD.objdnd);
			//R.log(protos);
			//R.log(protos);
			//DnD.objdnd.mousedown = DnD.callback;
			//DnD.objdnd = DnD.callback = false;			
		} else 
			DnD.objdnd = false;
		return false;
	},
	initiate : function(subject) {
		this.target = subject;
		this.listen(subject);
	},
	listen : function(isPrevent) {
		DnD.prevent = isPrevent || false;
		document.addEventListener('mousedown', DnD.mousedown);
		document.addEventListener('mousemove', DnD.mousemove);
		document.addEventListener('mouseup', DnD.mouseup);
	},
	debug : function() {
		try {
			console.log('start output');
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
		/*objdnd.onclick = function() {
			alert('Suck it!');
		};*/
	},
	preventHandler : function(event, obj) {
		obj.onmousedown = function() {return false};
		obj.onselectstart = function() {return false};
		//DnD.clone = DnD.objdnd.cloneNode(true);
		//DnD.callback = obj.onclick || obj.onmousedown || DnD.callback;
		//console.log(DnD.callback);
		//console.log(obj.onclick);
		//obj.onclick = "event.preventDefault()";
		//objdnd.onclick = function(){return false};	
	},
}

DnD.initiate('prevent');
