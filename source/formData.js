formGetData = {
	resultStr : '',
	rStr : '?',
	
	fields : function() {
		this.f = this.build('input', this.cdfields);
		return this.f;
	},
	cdfields : function(k, v, i) {
		var selectorId = '#' + v.id;
		formGetData.rec.push([R(selectorId).placeholder, R(selectorId).value, v.id,
			R(selectorId).name]);
	},
	build : function(indifier, callback) {
		var kit = formGetData.kit = R(indifier);
		var rec = formGetData.rec = [];
		var length = (!kit) ? 0 : (kit.length) ? kit.length : 1;
		if (length !== 0) {
			if (length === 1) {
				this.fCount = (length !== 0) ? '#' + kit.id.substr(0, 12) : false;
				R.cicle([kit], callback);
			} else {
				this.fCount = (length !== 0) ? '#' + kit[0].id.substr(0, 12) : false;
				R.cicle(kit, callback);
			}
		return formGetData.rec;
		}		
	},
	cbselects : function(k, v, i) {
		var nameSel = formGetData.kit[i][0].innerHTML;
		formGetData.rec.push([nameSel, formGetData.kit[i].value, formGetData.kit[i].name]);		
	},
	selects : function() {
		this.s = this.build('select', this.cbselects);
		return this.s;
	},
	textarea : function() {
		this.a = this.build('textarea', this.cbkarea);
		return this.a;
	},
	cbkarea : function(k, v, i) {
		formGetData.rec.push([v.value, v.getAttribute('id'), v.name]);
	},
	data : function() {
		return {fields : this.fields(), selects : this.selects(), textarea : this.textarea()};
	},
	dt : function() {
		R.cicle(this.data(), formGetData.cbkdt);
		return formGetData.rStr.substr(0, formGetData.rStr.length - 1);
	},
	cbkdata : function(k, v, i) {
		formGetData.resultStr = formGetData.resultStr + v.join(',') + ';';
	},
	cbkdt : function(k, v, i) {
		R.cicle(v, formGetData.cbkdata);
		formGetData.rStr = formGetData.rStr + k + '=' + formGetData.resultStr + '&';
		formGetData.resultStr = '';
	},
	
};
