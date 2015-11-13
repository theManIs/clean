//
var fVariables = {
	countInputField: 0,
};
var fFunctions = {
	addField : function(before, addClass) {			
		$.get('inputField.html', '', function(data){
			var blockContainer = $('<div>').addClass(addClass).html(data);
			var nowId = 'inputFieldId' + fVariables.countInputField++;
			$(blockContainer.find('input')[0]).attr('id', nowId + 'Clone');
			$(blockContainer.find('input')[1]).attr('id', nowId).attr('placeholder', 'Новое поле');
			before.before(blockContainer);
			eval("keeperToggle($('#" + nowId + "'), $('#" + nowId + "Clone'))");
		}, 'html');
	},
	init : function() {		
		$('#addFieldToolId').click(function() {
			fFunctions.addField($('#addFieldToolId'), 'blockContainerElement');
		});
		$('#addListToolId').click(function(){
			$('#redactListScroll').css('display', 'block');
		});
		$('#clickAcceptId').click(function(){
			fFunctions.addList($('.itemListScroll'), $('#addListToolId'), 'selectMenuPanel newFieldForm');
			$('#redactListScroll').css('display', 'none');
		});
		return this;
	},
	addList : function(items, before) {
		//var selectMenu = $('<select>').addClass(classAdd);
		$.get('selectMenu.html', '', function(data){
			var blockContainer = $('<div>').addClass('blockContainerElement').html(data);
			selectMenu = $(blockContainer).find('select');
			if (row = $(items[0]).val())
				selectMenu.append($('<option>').attr('selected', true).text(row));
			for (i = 1, c = items.length; i < c; i++) {
				if (row = $(items[i]).val())
					selectMenu.append($('<option>').text(row));
			}
			before.before(blockContainer);
		}, 'html');
	},
	changes : function() {
		keeperToggle($('#callkeeperTitleForm'), $('#callkeeperTitleFormClone'));
		keeperToggle($('#callkeeperSecondMessage'), $('#callkeeperSecondMessageClone'));
		keeperToggle($('#youQuestion'), $('#callkeeperQuestionClone'));
		keeperToggle($('#youSend'), $('#callkeeperYouSendClone'));
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
			clone.click(function(event){
				keeperSave(origin, clone);
			});					
		};	
	},
};

$(document).ready(function(){	
	fFunctions.beforeInit();
	fFunctions.init();
	fFunctions.changes();
	fFunctions.afterInit();
});