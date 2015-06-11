$().ready(function(){
   	var lyric = [];
   	var musicSrcs = [
						'/../music/我在人民广场吃炸鸡.mp3'
					];
 	var lyricSrcs = [
 						'/../music/我在人民广场吃炸鸡.lrc'
 					];


	function palyMusic(index) {
		$('.music-play-icon').css('display','none');
		$('.music-part .music-play-icon').eq(index).css('display','block');
		$('#player').attr('src', musicSrcs[index]);
	}

	$.get(lyricSrcs[0], function(lrc) {
	 	lyric = parseLyric(lrc);
	 	debugger
	 	loadLyric(lyric);
		palyMusic(0);
	});

	function loadLyric(lyric) {
		var lyricContent = $('#show-lrc-content');
		_.each(lyric, function(content, index, $){
			lyricContent.append('<p name="lyric" id=' + index + '>' + content[1] + '</p>');
		});
	}

	document.getElementById('player').ontimeupdate = function(e) {
		if(this.ended){
			palyMusic(0);
		}
		for (var i = 0;i < lyric.length; i++) {
	        if (this.currentTime > lyric[i][0] - 1) {
	            $('p[name=lyric]').css('color', '#fff'); 
	            $('p#'+i).css('color', '#a6e22d');

	            $('.lyric-content').css('top',210 - 30 * (i + 1));
	        };
	    };

	}

	function parseLyric(lyric) {
	    var lines = lyric.split('\n'),
	        pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
	        result = [];
	    while (!pattern.test(lines[0])) {
	        lines = lines.slice(1);
	    };
	    lines[lines.length - 1].length === 0 && lines.pop();
	    _.each(lines, function(data, step){
	        var index = data.indexOf(']');
	        var time = data.substring(0, index+1),
	        	value = data.substring(index+1);
        	var timeString = time.substring(1, time.length-2);
        	var timeArr = timeString.split(':');
        	result.push([parseInt(timeArr[0], 10) * 60 + parseFloat(timeArr[1]), value]);

	    });
	    result.sort(function(a, b) {
	        return a[0] - b[0];
	    });
    	return result;
	}
});