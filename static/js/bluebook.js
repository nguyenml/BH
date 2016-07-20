// TODO: Remove this
var Title = "Instead of Oceans, they are all big forests, that gets taller and darker instead of deeper, with more dangerous animals living further out in the forest. A person decides to cross the Mariana Trench."

$('#writing').on("input propertychange", function() {
    var text = $("#writing").val();
    var wc = text.split(/[\s+, \r+, \n+]+/).length;
    $('#wordcount').text("Word Count: " + (wc - 1).toString());

})

$(function() {
    var tgl = $('body'),
        navToggleBtn = tgl.find('.nav-toggle-btn');

    navToggleBtn.on('click', function(move) {
        tgl.toggleClass('active-nav');
        move.preventDefault();
    });
});

$(document).ready(function () {
    $(document).click(function (move) {
        var clickover = $(move.target);
        var _opened = $(".navbar-collapse").hasClass("navbar-collapse in");
        if (_opened === true && !clickover.hasClass("navbar-toggle")) {
            $("button.navbar-toggle").click();
        }
    });

    $('#writing').text();
    $('#writing-info').text("Nothing written!");

    $('#hideshow').on('click', function(event) {
        $('.prompt').toggle();
        $(this).find('i').toggleClass('fa-plus-circle fa-minus-circle')
    });
    $('#hideshowwords').on('click', function(event) {
        $('#wordcount').toggle();
    });
    $('#prompt-sub').on('click', function(e){
      e.preventDefault();
      $.ajax({url: "/suggest/", sucess: function(result){
        $("#suggest-text".html("<p>Thank you for your suggestion</p>"))
      }})
    });
});


$('#toggle').click(function() {
    screenfull.toggle($('#container')[0]);
});

$('#login-submit-button').on('click', function() {
    console.log("hey");
})
