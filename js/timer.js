// initialization
$(function(){

	var clock = $('#clock');
	// 0-9 
    var digit_to_name = [
  		'zero','one', 'two', 'three', 'four', 
  		'five', 'six', 'seven', 'eight', 'nine'
  	]; 
  	var digits = {}; 

  	var weekday = [
  		'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
  	];

  	var position = [
  		'h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'
  	];

  	var digit_holder = clock.find('.digits');

	$.each(position, function(){
		if (this == ':') {
			digit_holder.append('<div class="dots">');
		}
		else {
			var pos = $('<div>');
			for (var i = 1; i < 8; i++) {
				pos.append('<span class="d' + i + '">'); 
			}
			digits[this] = pos;
			digit_holder.append(pos);
		}
	});

	(function update_time(){ 
 
        //调用moment.js来格式化时间 
        var now = moment().format("HHmmss"); 
 
        digits.h1.attr('class', digit_to_name[now[0]]); 
        digits.h2.attr('class', digit_to_name[now[1]]); 
        digits.m1.attr('class', digit_to_name[now[2]]); 
        digits.m2.attr('class', digit_to_name[now[3]]); 
        digits.s1.attr('class', digit_to_name[now[4]]); 
        digits.s2.attr('class', digit_to_name[now[5]]); 
 
        var date = moment().format("YYYY/MM/DD"); 
        var week = weekday[moment().format('d')]; 
        $(".date").html(date + ' ' + week); 
 
 
        // 每秒钟运行一次 
        setTimeout(update_time, 1000); 
 
    })(); 
});

function buildClock(clock, position, weekday, digit_to_name) {
	
}

