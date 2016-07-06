$(document).ready(function(){

    $('#writing').text("Welcome to BlueBook!");
    $('#writing-info').text("Nothing written!");
})

$('#writing').on("input propertychange", function(){
    var text = $("#writing").val();
    var wc = text.split(/[\s+, \r+, \n+]+/).length;
    $('#wordcount').text((wc - 1).toString() + " words");

})

$(function()
{ var tgl = $('body'),
    navToggleBtn = tgl.find('.nav-toggle-btn');

navToggleBtn.on('click', function(move) {
    tgl.toggleClass('active-nav');
    move.preventDefault();});
});
