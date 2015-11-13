var fVariables = {
	countInputField: 0,
	countSelectMenu: 0,
	formColorMaster: 'coral',
	inputFieldId : 'inputFieldId',
	selectMenuId : 'selectMenuId',
	formToken : 123456,
};
var fFunctions = {
	addField : function(before, addClass) {			
		$.get('inputField.html', '', function(data){
			var blockContainer = $('<div>').addClass(addClass).html(data);
			var nowId = fVariables.inputFieldId + fVariables.countInputField++;
			$(blockContainer.find('input')[0]).attr('id', nowId + 'Clone');
			$(blockContainer.find('input')[1]).attr('id', nowId).attr('placeholder', 'Новое поле');
			before.before(blockContainer);
			eval("keeperToggle($('#" + nowId + "'), $('#" + nowId + "Clone'))");
			$('.fa.fa-times.fa-2x').parent().click(function(event) {$(this).parent().remove();});
		}, 'html');
	},
	init : function() {		
		$('#addFieldToolId').click(function() {
			fFunctions.addField($('#addFieldToolId'), 'blockContainerElement');
		});
		$('#addListToolId').click(function() {
			$('#redactListScroll').css('display', 'block');
		});
		$('#clickAcceptId').click(function() {
			fFunctions.addList($('.itemListScroll'), $('#addListToolId'), 'selectMenuPanel newFieldForm');
			$('#redactListScroll').css('display', 'none');
		});
		$('#saveButtonId').click(function() {
			fFunctions.sendToServer();
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
		fFunctions.addField($('#addFieldToolId'), 'blockContainerElement');		
		var suite = $([$('<input>').val('Название'), $('<input>').val('Поле 1'), 
			$('<input>').val('Поле 2'), $('<input>').val('Поле 3')]);
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
	},
	formPaint : function(color) {
		$('.callkeeperS.messageS').add('.callK.anyB').add('.textAreaShortPost')
			.add('.headerHtml.valueTitle').css({
				'background' : color,
				'background-image' : 
				'-webkit-linear-gradient(top , rgba(255, 255, 255, .35) 0%, rgba(255, 255, 255, 0) 80%)',
		});		
		$('.color.selector.inner').css('background', color)
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
	sendToServer : function() {
		var paramsLine = [];
		paramsLine.push(['color', fVariables.formColorMaster]);
		paramsLine.push(['title', $('#callkeeperTitleForm').text()]);
		paramsLine.push(['notice', $('#callkeeperSecondMessage').text()]);
		paramsLine.push(['question', $('#youQuestion').attr('placeholder')]);
		paramsLine.push(['send', $('#youSend').text()]);
		paramsLine.push(['close', $('#youClose').text()]);
		paramsLine.push(['push', $('#youPush').text()]);
		paramsLine.push(['tComplete', $('#titleForComplete').text()]);
		paramsLine.push(['complete', $('#callMesBody').text()]);
		for (i = 0; i < fVariables.countInputField; i++) {
			var idName = $('#' + fVariables.inputFieldId + i);
			if (idName)
				paramsLine.push(['field' + i, idName.attr('placeholder')]);
		}
		for (i = 0; i < fVariables.countSelectMenu; i++) {
			var idName = $('#' + fVariables.selectMenuId + i);
			if (idName) {
				var set = ['select' + i, []];
				for (b = 0; b < idName.find('option').size(); b++) {
					set[1].push(['option' + b, $(idName.find('option')[b]).text()]);
				}
				paramsLine.push(set);			
			}
		}
		paramsLine = $.toJSON(paramsLine);
		var strU = 'form_json=' + paramsLine + '&form_token=' + fVariables.formToken;
		$.post('saveFeatures.php', strU, function(data){alert(data);}, 'html');
	},
};



$(document).ready(function(){	
	fFunctions.colorpickerInit();
	fFunctions.formPaint(fVariables.formColorMaster);
	fFunctions.beforeInit();
	fFunctions.init();
	fFunctions.changes();
	fFunctions.afterInit();
});