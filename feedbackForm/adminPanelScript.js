var fVariables = {
	countInputField: 0,
	countSelectMenu: 0,
	formColorMaster: '#16a085',
	inputFieldId : 'inputFieldId',
	selectMenuId : 'selectMenuId',
	addClass : 'blockContainerElement',
	idPull : {
		title : ['callkeeperTitleForm', 'callkeeperTitleFormClone'],
		notice : ['callkeeperSecondMessage', 'callkeeperSecondMessageClone'],
		question : ['youQuestion', 'callkeeperQuestionClone'],
		send : ['youSend', 'callkeeperYouSendClone'],
		close : ['youClose', 'callkeeperYouCloseClone'],
		push : ['youPush', 'callYouPushClone'],
		tComplete : ['titleForComplete', 'titleForCompleteClone'],
		mComplete : ['callMesBody', 'callMesBodyClone'],
		fields : [],
		selects : [],
	},
	bundle : {},
	tmp : [],
};
var fFunctions = {
	addField : function(before, addId, addValue) {			
		$.get('inputField.html', '', function(data) {
			var addClass = fVariables.addClass;
			addValue = (addValue) ? addValue : 'Новое поле';
			var blockContainer = $('<div>').addClass(addClass).html(data);
			var nowId = (addId) ? addId : fVariables.inputFieldId + fVariables.countInputField++;
			$(blockContainer.find('input')[0]).attr('id', nowId + 'Clone').attr('value', addValue);
			$(blockContainer.find('input')[1]).attr('id', nowId).attr('placeholder', addValue);
			before.before(blockContainer);
			eval("keeperToggle($('#" + nowId + "'), $('#" + nowId + "Clone'))");
			$('.fa.fa-times.fa-2x').parent().click(function(event) {$(this).parent().remove();});			
			fVariables.idPull.fields.push([nowId, nowId + 'Clone']);
		}, 'html');
	},
	init : function() {		
		$('#addFieldToolId').click(function() {
			fFunctions.addField($('#addFieldToolId'));
		});
		$('#addListToolId').click(function() {
			$('#redactListScroll').css('display', 'block');
		});
		$('#clickAcceptId').click(function() {
			fFunctions.addList($('.itemList.scrollElem'), $('#addListToolId'), 'selectMenuPanel newFieldForm');
			$('#redactListScroll').css('display', 'none');
		});
		$('#saveButtonId').click(function() {
			fFunctions.serverSend();
		});
		return this;
	},
	addList : function(items, before) {
		$.get('selectMenu.html', '', function(data){
			var blockContainer = $('<div>').addClass('blockContainerElement').html(data);
			var nowId = fVariables.selectMenuId + fVariables.countSelectMenu++;
			var selectMenu = $(blockContainer).find('select').attr('id', nowId);
			if (row = $(items[0]).val())
				selectMenu.append($('<option>').attr('selected', true).text(row));
			for (i = 1, c = items.length; i < c; i++) {
				if (row = $(items[i]).val())
					selectMenu.append($('<option>').text(row));
			}
			before.before(blockContainer);
			$('.fa.fa-times.fa-2x').parent().click(function(event) {$(this).parent().remove();});
			fVariables.idPull.selects.push(nowId);
		}, 'html');
	},
	changes : function() {
		keeperToggle($('#callkeeperTitleForm'), $('#callkeeperTitleFormClone'));
		keeperToggle($('#callkeeperSecondMessage'), $('#callkeeperSecondMessageClone'));
		keeperToggle($('#youQuestion'), $('#callkeeperQuestionClone'));
		keeperToggle($('#youSend'), $('#callkeeperYouSendClone'));
		keeperToggle($('#youClose'), $('#callkeeperYouCloseClone'));
		keeperToggle($('#youPush'), $('#callYouPushClone'));
		keeperToggle($('#titleForComplete'), $('#titleForCompleteClone'));
		keeperToggle($('#callMesBody'), $('#callMesBodyClone'));
		return this;
	},
	afterInit : function() {
		fFunctions.addField($('#addFieldToolId'), 'personName', 'Ваше имя');	
		fFunctions.addField($('#addFieldToolId'), 'phoneNumber', 'Мобильный телефон');	
		fFunctions.addField($('#addFieldToolId'), 'mailAdress', 'Электронная почта');	
		fFunctions.addField($('#addFieldToolId'));	
		var suite = $([$('<input>').val('Название'), $('<input>').val('Поле 1'), 
			$('<input>').val('Поле 2'), $('<input>').val('Поле 3'), $('<input>').val('Поле 4')]);
		fFunctions.addList(suite, $('#addListToolId'));
		fFunctions.addList(suite, $('#addListToolId'));
		fFunctions.addList(suite, $('#addListToolId'));
		return this;
	},
	beforeInit : function() {
		keeperRedact = function(origin, clone){
			origin.css('display', 'none');
			clone.css('display', 'block');
			keeperRead(origin, clone);
			clone.focus();
		};
		keeperRead = function(origin, clone) {
			if (origin.is('input') || origin.is('textarea'))
				clone.val(origin.attr('placeholder'));
			else
				clone.val(origin.text());
			
		};
		keeperSave = function(origin, clone){
			origin.css('display', 'block');
			clone.css('display', 'none');
			keeperWrite(origin, clone);
		};
		keeperWrite = function(origin, clone) {
			if (origin.is('input')  || origin.is('textarea'))
				origin.attr('placeholder', clone.val());
			else
				origin.text(clone.val());
		};
		keeperToggle = function(origin, clone) {
			origin.click(function(){
				keeperRedact(origin, clone);
			});	
			clone.keydown(function(event){
				if (event.keyCode == 13)
					keeperSave(origin, clone);
			});
			save = origin.is('input') ? origin.parent().parent().find('.fa.fa-check.fa-2x').parent() :
				origin.parent().find('.fa.fa-check.fa-2x').parent();
			save.click(function(event) {
				keeperSave(origin, clone);
			});					
		};
		return this;
	},
	formPaint : function(color) {
		$('.callkeeperS.messageS').add('.callK.anyB').add('.textAreaShortPost')
			.add('.headerHtml.valueTitle').css({
				'background' : color,
				'background-image' : 
				'-linear-gradient(top, rgba(255, 255, 255, .35) 0%, rgba(255, 255, 255, 0) 80%)',
				'background-image' : 
				'-o-linear-gradient(top, rgba(255, 255, 255, .35) 0%, rgba(255, 255, 255, 0) 80%)',
				'background-image' : 
				'-ms-linear-gradient(top, rgba(255, 255, 255, .35) 0%, rgba(255, 255, 255, 0) 80%)',
				'background-image' : 
				'-moz-linear-gradient(top, rgba(255, 255, 255, .35) 0%, rgba(255, 255, 255, 0) 80%)',
				'background-image' : 
				'-webkit-linear-gradient(top , rgba(255, 255, 255, .35) 0%, rgba(255, 255, 255, 0) 80%)',
		});		
		$('.color.selector.inner').css('background', color)
		return this;
	},
	colorpickerInit : function() {
		$('#colorpickerHolder').ColorPicker({
			flat : true,
			onSubmit: function(hsb, hex, rgb, el) {
				$(el).val(hex);
				$('.color.selector.inner').css('background', '#' + hex);
				fVariables.formColorMaster = '#' + hex;
				fFunctions.formPaint('#' + hex);
			},
			onBeforeShow: function () {
				$(this).ColorPickerSetColor(this.value);
			},
			onShow : function() {
				$('.colorpicker').css({'top':'50px','left':'50px',});
			},
		}).bind('keyup', function(){	
			$(this).ColorPickerSetColor(this.value);
		})
		$('.color.selector').click(function(){
			$('#colorPickerId').ColorPickerShow();
		});
		return this;
	},
	serverSend : function() {
		this.cicle(fVariables.idPull, this.findKeys);
		fVariables.bundle.color = fVariables.formColorMaster;
		var send =  'send=' + $.toJSON(fVariables.bundle) + '&form_token=' + form_token;
		//console.log(send);
		$.post('saveFeatures.php',send, function(data){alert(data);}, 'html');
		return this;
	},
	cicle : function(obj, cb) {
		//console.log(obj);
		for (var key in obj) {
			cb(key, obj[key]);
		}
		return;
	},
	findKeys : function(key, val) {
		if (key === 'fields') {
			//console.dir(val);
			fVariables.bundle.fields = [];
			fFunctions.cicle(val, fFunctions.bFields);
		} else if (key === 'selects') {
			//console.dir(val);
			fVariables.bundle.selects = [];
			fFunctions.cicle(val, fFunctions.bSelects);
		} else if (key === 'question') {
			fVariables.bundle[key] = [val[0], $('#' + val[0]).attr('placeholder')];
		} else {
			fVariables.bundle[key] = [val[0], $('#' + val[0]).text()];
			//console.log(val);
		}
	},
	bFields : function(key, val) {
		fVariables.bundle.fields.push([val[0], $('#' + val[0]).attr('placeholder')]);
	},
	bSelects : function(key, val) {
		//console.log(val);
		var opt = [], pack = $('#' + val).find('option');
		fVariables.tmp = ['#' + val];
		for (i = 0; i < pack.size(); i++)
			opt.push($(pack[i]).text());
		//console.log(opt);
		fFunctions.cicle(opt, fFunctions.bOptions);
		fVariables.bundle.selects.push(fVariables.tmp);
	},
	bOptions : function(key, val) {
		fVariables.tmp.push(val);
	},
};



$(document).ready(function(){
	fFunctions.colorpickerInit().formPaint(fVariables.formColorMaster);
	//fFunctions.colorpickerInit();
	//fFunctions.formPaint(fVariables.formColorMaster);
	fFunctions.beforeInit().init().changes().afterInit();
	//fFunctions.beforeInit();
	//fFunctions.init();
	//fFunctions.changes();
	//fFunctions.afterInit();
	//fFunctions.serverSend();
});
