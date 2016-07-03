$(document).ready(function(){

  $('#writing').text("Welcome to BlueBook!");
  $('#writing-info').text("Nothing written!");
  $('#wordcount').text("0");
})

$('#writing').on("input propertychange", function(){
  var text = $("#writing").val();
  var wc = text.split(/[\s+, \r+, \n+]+/).length;
  console.log(wc - 1);
})
