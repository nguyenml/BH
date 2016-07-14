// TODO: Remove this
var Title = "Instead of Oceans, they are all big forests, that gets taller and darker instead of deeper, with more dangerous animals living further out in the forest. A person decides to cross the Mariana Trench."

$(document).ready(function() {

    $('#writing').text();
    $('#writing-info').text("Nothing written!");
})

$('#writing').on("input propertychange", function() {
    var text = $("#writing").val();
    var wc = text.split(/[\s+, \r+, \n+]+/).length;
    $('#wordcount').text("Word Count: " + (wc - 1).toString() );

})

$(function() {
    var tgl = $('body'),
navToggleBtn = tgl.find('.nav-toggle-btn');

navToggleBtn.on('click', function(move) {
    tgl.toggleClass('active-nav');
    move.preventDefault();
});
});


$('#toggle').click(function() {
    screenfull.toggle($('#container')[0]);
    console.log(click);
});

$('#login-submit-button').on('click', function() {
    console.log("hey");})

$(document).ready(function(){
        $('#hideshow').on('click', function(event) {
             $('.prompt').toggle();
             $(this).find('i').toggleClass('fa-plus-circle fa-minus-circle')
        });
    });

$(document).ready(function(){
    $('#hideshowwords').on('click', function(event) {
         $('#wordcount').toggle();
    });
});
