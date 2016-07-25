var Title = "Prompt goes here."


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

    $('#writing').on("input propertychange", function() {
        var text = $("#writing").val();
        var wc = text.split(/[\s+, \r+, \n+]+/).length;
        $('#wordcount').text("Word Count: " + (wc - 1).toString());
    })

    $('#hideshow').on('click', function(event) {
        $('.prompt').toggle();
        $(this).find('i').toggleClass('fa-plus-circle fa-minus-circle')
    });

    $('#hideshowwords').on('click', function(event) {
        $('#wordcount').toggle();
    });

    $('#prompt-sub').on('click', function(e){
        e.preventDefault();
        $.ajax({url: "/addprompt/" + $('#add-prompt').val(), success: function(result){
            $("#suggest-text").html(result);
            }
        })
    });
});


$('#toggle').click(function() {
    screenfull.toggle($('#container')[0]);
});

$('#login-submit-button').on('click', function() {
    console.log("hey");
})
