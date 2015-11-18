formWidget = {
	featuresPath : myLoader.src + 'saveFeatures.php',
	formPath : myLoader.src + 'callkeeperWidget.html',
	stylePath : myLoader.src + 'callkeeperStyle.css',
	backEnd : myLoader.src + 'backEnd.php',
	
	beforeLoad : function() {
		R.addStyle(this.stylePath);
		return this;
	},
	ld : function(it) {
		return getReq(it);
	},
	load : function() {
		this.widget = this.ld(this.featuresPath + '?form_token=' + form_token);
		this.form = this.ld(this.formPath);
		return this;
	},
	listeners : function() {
		this.form.addEventListener('load', function() {
			//R.log(widget.status);
			document.body.innerHTML = document.body.innerHTML + this.responseText;
			toggle();
		});
		this.widget.addEventListener('load', function() {
			//R.log(form.status);
			if (200 === formWidget.form.status)
				formWidget.build();
			else
				formWidget.form.addEventListener('load', formWidget.build);
		});
		return this;
	},
	build : function() {
		//R.log(formWidget.widget.status);
		//R.log(formWidget.form.status);
		formWidget.jso = JSON.parse(formWidget.widget.responseText);
		formWidget.formPaint(formWidget.jso.color);
	},
	features : function() {
		R('.callkeeperBillboard').style.marginTop = window.innerHeight/2 
			- R('.callkeeperBillboard').offsetHeight/2;
		R('#youPush').style.marginTop = window.innerHeight - R('#youPush').offsetHeight;	
	},
	specialField : function(field) {
		formWidget.origin = R('#specialField');
		R.cicle(field, formWidget.fieldCallback);
		formWidget.origin.parentNode.parentNode.removeChild(formWidget.origin.parentNode);
	},
	fieldCallback : function(k, v) {
		var clone = formWidget.origin.parentNode.cloneNode(true);
		var input = clone.querySelector('input');
		input.id = v[0];
		input.placeholder = v[1];
		R('.callkeeperMain.mainWorkFrame.displayInlineBlock section')
			.insertBefore(clone, R('#youQuestion'));
	},
	specialSelect : function(select) {
		formWidget.origin = R('#specialSelect');
		R.cicle(select, formWidget.selectCallback);
		formWidget.origin.parentNode.parentNode.removeChild(formWidget.origin.parentNode);
	},
	selectCallback : function(k, v) {
		var clone = formWidget.origin.parentNode.cloneNode(true);
		formWidget.select = clone.querySelector('select');
		formWidget.select.id = v[0];
		R.cicle(v, formWidget.optionCallback);
		R('.callkeeperMain.mainWorkFrame.displayInlineBlock section')
			.insertBefore(clone, R('#youQuestion'));
	},
	optionCallback : function(k, v, i) {
		if (0 === i) return;
		var option = document.createElement('option');
		option.innerHTML = v;
		formWidget.select.appendChild(option);
	},
};
formWidget.formPaint = function(color) {
	paint = R('.callK.anyB, .callkeeperS.messageS, .textAreaShortPost, .headerHtml.valueTitle');
	R.cicle(paint, function(k, v) {v.style.backgroundColor = color;});
	R('#callkeeperTitleForm').innerText = formWidget.jso.title;
	R('#callkeeperSecondMessage').innerText = formWidget.jso.notice;
	R('#youQuestion').placeholder = formWidget.jso.question;
	R('#youSend').innerText = formWidget.jso.send;
	R('#youClose').innerText = formWidget.jso.close;
	R('#titleForComplete').innerText = formWidget.jso.t_complete;
	R('#callMesBody').innerText = formWidget.jso.m_complete;
	R('#youPush').innerText = formWidget.jso.push;
	formWidget.specialField(JSON.parse(formWidget.jso.fields));
	formWidget.specialSelect(JSON.parse(formWidget.jso.selects));
	return this;
};

formWidget.beforeLoad().load().listeners();

function toggle() {
	var lable = document.querySelector('#youPush');
	var feature = document.querySelector('.callkeeperMain');
	var clsr = document.querySelector('#youClose');
	var send = R('#youSend');
	if (lable) {
		lable.onclick = function() {
			lable.hidden = true;
			feature.hidden = false;
		};
		formWidget.features();
	}
	if (feature) {
		feature.hidden = true;
		setTimeout(function(){feature.hidden = false;lable.hidden = true;}, 4000);
	}
	if (clsr) {
		clsr.onclick = function() {
			feature.hidden = true;
			lable.hidden = false;
		}
	}
	if (R('.callkeeperBillboard'))
		R('.callkeeperBillboard').hidden = true;
	if (send) {
		send.onclick = function() {
			feature.hidden = true;
			lable.hidden = false;			
			var fields = formGetData.fields();
			var selects = formGetData.selects();
			var textarea = formGetData.textarea();
			var request = {
				fields : fields,
				selects : selects,
				textarea : textarea,
				token : form_token,
			}
			request = JSON.stringify(request) + '&form_token=' + form_token;
			var point = postReq(formWidget.backEnd, request);
			point.onload = function(){
				//alert(point.responseText);
				R('.callkeeperBillboard').hidden = false;
				setTimeout(function(){R('.callkeeperBillboard').hidden = true;}, 2000);
			}
		}
	}
}

formGetData = {
	fields : function() {
		this.f = this.build('input.class.InputText.newFieldForm', this.cdfields);
		delete kit;
		delete rec;
		return this.f;
	},
	cdfields : function(k, v, i) {
		var selectorId = '#' + v.id;
		rec.push([[R(selectorId).placeholder], [R(selectorId).value], [selectorId]]);
	},
	build : function(indifier, callback) {
		var kit = R(indifier);
		rec = [];
		var length = (!kit) ? 0 : (kit.length) ? kit.length : 1;
		if (length !== 0) {			
			this.fCount = (length !== 0) ? '#' + kit[0].id.substr(0, 12) : false;
			if (length === 1) 
				rec.push([[kit[0].innerText], [kit.value]]);
			else
				R.cicle(kit, callback);
		return rec;
		}		
	},
	cbselects : function(k, v, i) {
		var nameSel = kit[i][0].innerText;
		rec.push([[nameSel], [kit[i].value]]);		
	},
	selects : function() {
		this.s = this.build('select.classSelectPoint.newFieldForm', this.cbselects);
		delete kit;
		delete rec;
		return this.s;
	},
	textarea : function() {
		return this.a = R('#youQuestion').value;
	},
}