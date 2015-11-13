//

//var crack = $('<div>').load('soundModule.html');
//$('body').append(crack);
//(function() {
	//var crack = $('<div>').load('soundModule.html');
	//$('body').append(crack);
//})();
//$('head').append($('<script>').load('extensions/soundM/demo/bar-ui/script/bar-ui.js'));
//$('.sm2-bar-ui').css('display', 'none');
$(document).ready(function() {
	//$('body').append($('<script>').load('extensions/soundM/demo/bar-ui/script/bar-ui.js'));
	
	//var scr = $('<script>').attr('language', 'javascript').attr('async', 'true');
	//scr.attr('src', 'extensions/soundM/demo/bar-ui/script/bar-ui.js');
	//$('body').append(crack);
	
	
	$.get('soundModule.html', '', function(data) {
		var sound = $('a[href$=".mp3"]');	
		$(data).appendTo($('body'));
		for (i = 0, c = sound.length; i < c; i++) {
			var newS = $('<li>').append($('<a>').attr('href', sound[i].href).text($(sound[i]).text()));
			$($('.sm2-playlist-bd')[1]).append(newS);
		}
		$(sound).attr('href', '#');	
		$('.sm2-bar-ui').css('display', 'none');
		$.get('extensions/soundM/script/soundmanager2.js', '' , function(){
			console.log(soundManager);
			$.get('extensions/soundM/demo/bar-ui/script/bar-ui.js', '' , function() {
				console.log(sm2BarPlayers[0]);
				var clickMp3 = function(o) {
				$(sound[o]).click(function(){
					$('.sm2-bar-ui').css('display', 'inline-block');
					sm2BarPlayers[0].playlistController.playItemByOffset(o + 1);
				});
				}		
				for (i = 0, c = sound.length; i < c; i++) {
					clickMp3(i);
				}
			} , 'script');
		} , 'script');
	}, 'html');
});