// initialization
$(function(){
	buildClock();
	// TODO
	createFullscreen();
});

function buildClock() {
	var time = 25 * 60;

	// create a timer
	var timer = $('#timer').FlipClock(time, {
		countdown: true
	});
}