$(document).ready(function() {
  var c=document.getElementById("canvas");
  var ctx=c.getContext("2d");
  ctx.arc(95,50,40,0,28*Math.PI);
  ctx.stroke();
});
