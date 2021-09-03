/* timer */
var content = document.getElementById('content');
function examContent(){
  content.innerHTML = '<h2> Exam Finished</h2>';
 
}
setTimeout(examContent, 7000); 

/* display time */
var examTime = document.getElementById('timer');
var time = ['00:05','00:04', '00:03', '00:02', '00:01', '00:00', "end exam"];
var counter = 0;

function myTimer(){
  examTime.innerHTML = time[counter];
  examTime.className = 'show';
  counter++;
}
setInterval(myTimer, 1000);