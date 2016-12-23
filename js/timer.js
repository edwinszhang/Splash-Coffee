// initialization

$(function(){

  var diffTime = 25 * 60;     // 25 min
  var interval = 1000;        // 1s
  var duration = moment.duration(diffTime*interval, 'milliseconds');

  setInterval(function(){
    duration = moment.duration(duration - interval, 'milliseconds');
    $('.digits').text(duration.hours() + ":" + duration.minutes() + ":" + duration.seconds())
  }, interval);

});

