formWidget = {
	formPath : '../feedbackForm/saveFeatures.php',
	stylePath : '../feedbackForm/callkeeperStyle.css',
	backEnd : '../feedbackForm/backEnd.php',
	xhr : '../feedbackForm/xhr.js',
	R : '../feedbackForm/R.js',
	
	beforeLoad : function() {
		R.addStyle(this.stylePath);
		return this;
	},
	loadModel : function(it) {
		var response = getReq(it);
		response.addEventListener('load', function() {
			document.body.innerHTML = document.body.innerHTML + response.responseText;
		});
		return response;
	},
	load : function() {
		widget = this.loadModel(this.formPath + '?form_token=' + form_token);
		widget.addEventListener('load', function() {toggle();});
	},
	features : function() {
		R('.callkeeperBillboard').style.marginTop = window.innerHeight/2 
			- R('.callkeeperBillboard').offsetHeight/2;
		R('#youPush').style.marginTop = window.innerHeight - R('#youPush').offsetHeight;	
	},
};

formWidget.beforeLoad().load();

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
			request = {
				fields : fields,
				selects : selects,
				textarea : textarea,
				token : form_token,
			}
			request = JSON.stringify(request) + '&form_token=' + form_token;
			var point = postReq(formWidget.backEnd, request);
			point.onload = function(){
				alert(point.responseText);
				R('.callkeeperBillboard').hidden = false;
				setTimeout(function(){R('.callkeeperBillboard').hidden = true;}, 2000);
			}
		}
	}
}

formGetData = {
	fields : function() {
		this.f = this.build('.class.InputText.newFieldForm', this.cdfields);
		delete kit;
		delete rec;
		return this.f;
	},
	cdfields : function(i) {
		rec.push([[R(formGetData.fCount + i).placeholder], [R(formGetData.fCount + i).value]]);
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
				R.counter(kit, callback);
		return rec;
		}		
	},
	cbselects : function(i) {
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