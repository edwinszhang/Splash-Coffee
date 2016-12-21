

$(function(){
	var time = 25 * 60;

	createClock(time);
});


function createClock(time) {
	// create a timer
	var clock = $('#timer').FlipClock(time, {
		autoStart: true,
		countdown: true
	});
	$('#start').on('click', function (){
		clock.start();
	});
	$('#stop').on('click', function (){
		clock.stop();
	});
	return clock;
}