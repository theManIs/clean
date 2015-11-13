
supportFunction = {
	lightRow: function(i, sound) {
		var recordname = $(sound[i]).attr('recordname');			
		$('tr.success').removeClass('success');
		recognizeExpr = ('a[recordname="' + recordname + '"]');
		$(recognizeExpr).parent().parent().addClass('success');
	},
	clickPlaylist: function(i, sound) {		
		$($($('.sm2-playlist-bd')[1]).find('a')[i]).click(function() {
			supportFunction.lightRow(i, sound);
		});
	},
	clickMp3: function(i, sound) {
		$(sound[i]).click(function(event) {
			event.preventDefault();
			supportFunction.lightRow(i, sound);
			$('.sm2-bar-ui').css('display', 'inline-block');
			sm2BarPlayers[0].playlistController.playItemByOffset(i + 1);
		});
	},
	buildPlaylist: function(i, sound) {
		var recordname = $(sound[i]).attr('recordname');
		var newS = $('<li>').append($('<a>').attr('href', sound[i].href).text(recordname));
		$($('.sm2-playlist-bd')[1]).append(newS);
	},
	clickClose: function() {
		$('a[href="#close"]').click(function(){
		sm2BarPlayers[0].actions.stop();
		$('.success').removeClass('success');
		$('.sm2-bar-ui').css('display', 'none');		
		});
	},
	nextStep: function(sound) {
		$('a[href="#next"]').add('a[href="#prev"]').click(function(event){
			var side = event.target.href.substr(-4);
			var the = $('tr.success').find('a[href$=".mp3"].playlink').attr('recordname');
			var playlist = $($('.sm2-playlist-bd')[1]).find('a');
			if (sound && the && playlist) {
				for (i = 0, c = playlist.size(); i < c; i++) {
					if ($(playlist[i]).text() === the)
						next = i;	
				}
				$('tr.success').removeClass('success');
			}
			
			if (side === 'next')
				next = (sound[next + 1]) ? next + 1 : next;
			else
				next = (sound[next - 1]) ? next - 1 : next;
			
			var recordname = $(sound[next]).attr('recordname');
		$('*[recordname="' + recordname + '"]').parent().parent().addClass('success');
			return true;
		});
	},
	controller: function() {
		var sound = $('a[href$=".mp3"].playlink');
		for (i = 0, c = sound.length; i < c; i++) {
			supportFunction.buildPlaylist(i, sound);
			supportFunction.clickPlaylist(i, sound);
			supportFunction.clickMp3(i, sound);
		}
		supportFunction.nextStep(sound);
		supportFunction.clickClose();
		$('.sm2-bar-ui').css('display', 'none');
	},
};


$(document).ready(function() {	
	supportFunction.controller();
});

