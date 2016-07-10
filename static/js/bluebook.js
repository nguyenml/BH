$(document).ready(function() {

    $('#writing').text("Welcome to BlueBook!");
    $('#writing-info').text("Nothing written!");
})

$('#writing').on("input propertychange", function() {
    var text = $("#writing").val();
    var wc = text.split(/[\s+, \r+, \n+]+/).length;
    $('#wordcount').text((wc - 1).toString() + " words");

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
});



var Title = "Instead of Oceans, they are all big forests, that gets taller and darker instead of deeper, with more dangerous animals living further out in the forest. A person decides to cross the Mariana Trench."
