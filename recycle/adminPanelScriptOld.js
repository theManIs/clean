var fVariables = {
	countInputField: 0,
	countSelectMenu: 0,
	formColorMaster: 'cloud',
	inputFieldId : 'inputFieldId',
	selectMenuId : 'selectMenuId',
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
			fVariables.idPull.fields.push([nowId, nowId + 'Clone']);
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
	l : function(l) {
		return console.log(l);
	},
	dgebi : function(id) {
		return document.getElementById(id);;
	},
	dce : function(e) {
		return document.createElement(e);
	},
	ncnt : function(elem) {
		return elem.cloneNode(true);
	}, 	
	pac : function(parent, child) {
		parent.appendChild(child);
		return;
	},
	buildNode : function(elem, name) {
		for (i = 0; i < name.length; i++) {
			var alias = 'fVariables.idPull.' + name[i] + '[0]';
			this.pac(elem, this.ncnt(this.dgebi(eval(alias))));
		}
		return;
	},
	buildFields : function() {
		var section = this.dce('section');
		var fields = fVariables.idPull.fields;
		for (i = 0; i < fields.length; i++) {
			if ($(eval(fields[i][0]))) {
				var div = this.dce('div');
				div.className = 'callkeeper container input newFieldForm';
				var nick = 'fVariables.idPull.fields[' + i + '][0]';
				this.pac(div, this.ncnt(this.dgebi(eval(nick))));
				this.pac(section, div);
			}
		}
		section = this.buildSelects(section);
		this.buildNode(section, ['question', 'send', 'close']);
		return section;
	},
	buildSelects : function(section) {	
		var selects = fVariables.idPull.selects;
		for (i = 0; i < selects.length; i++) {
			if ($(eval(selects[i]))) {
				var div = this.dce('div');
				div.className = 'callkeeper container input newFieldForm';
				var nick = 'fVariables.idPull.selects[' + i + ']';
				this.pac(div, this.ncnt(this.dgebi(eval(nick))));
				this.pac(section, div);
			}
		}		
		return section;
	},
	sendToServer : function() {
		var idPull = fVariables.idPull;
		var header = this.dce('header');
		var wdgt = this.dce('div');
		var cBill = this.dce('div');
		var bboard = this.dce('div');
		var dvEl = this.dce('div');
		var push = this.dce('div');		
		section = this.buildFields();
		
		dvEl.className = 'callkeeperMain mainWorkFrame displayInlineBlock';
		dvEl.id = 'mainFrameForm';
		cBill.className = 'callkeeperBillboard';
		push.className = 'displayInlineBlock';
		bboard.className = 'containerBillboard displayInlineBlock';
		wdgt.className = 'displayInlineBlock redactForm';		
		
		this.buildNode(cBill, ['tComplete', 'mComplete']);
		this.buildNode(push, ['push']);		
		this.buildNode(header, ['title', 'notice']);
		
		this.pac(dvEl, header);
		this.pac(dvEl, section);
		this.pac(bboard, cBill);
		this.pac(wdgt, dvEl);
		
		push =  $('<div>').html(push).html();
		wdgt = $('<div>').html(wdgt).html();
		bboard = $('<div>').html(bboard).html();
		param = 'form_str=' + bboard + push + wdgt + '&form_token=' + form_token;
		$.post('saveFeatures.php', param, function(data){alert(data);}, 'html');
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