//class
var loader = {
	
	//fields
	directory : 'none',
	
	//metods
	getAdress : function() {
		this.sm2 = $('<script>').attr('language', 'javascript')
			.attr('src', this.directory + 'sm2.min.js');
		this.bar = $('<script>').attr('language', 'javascript')
			.attr('src', this.directory + 'script/bar-ui.js');
		this.module = $('<script>').attr('language', 'javascript')
			.attr('src', this.directory + 'sModule.js');
		this.bStyle = $('<link>').attr('rel', 'stylesheet').attr('type', 'text/css')
			.attr('href', this.directory + 'css/bar-ui.css');
		this.uStyle = $('<link>').attr('rel', 'stylesheet').attr('type', 'text/css')
			.attr('href', this.directory + 'userSoundStyle.css');
		return this;
	},
	getDir : function() {
		directory = $('script[src$="sLoader.js"]').attr('src');
		this.directory = directory.substr(0, directory.search('sLoader.js'));
		return this;
	},
	appendLoader : function() {
		$('head').append(this.sm2).append(this.bar).append(this.module)
			.append(this.bStyle).append(this.uStyle);
		return this;
	},
	htmlFile : function() {
		$.get(this.directory + 'sModule.html', '', function(data) {		
			$('body').append($('<div>').html(data));
			loader.getAdress().appendLoader();
			$(soundManager).ready(function() {
				soundManager.setup({url: loader.directory + 'swf/'})
			});
		}, 'html');
		return this;
	},
	init : function() {
		this.getDir().htmlFile();
	},
};
if (document.createElement("audio") instanceof HTMLAudioElement)
	loader.init();