// TODO: Remove this
var Title = "Instead of Oceans, they are all big forests, that gets taller and darker instead of deeper, with more dangerous animals living further out in the forest. A person decides to cross the Mariana Trench."

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
      $.ajax({url: "/addprompt/" + $('#add-prompt').val(), success: function(result){
        $("#suggest-text").html(result);
        }
        })
    });

    $('#text').on('input', function() {
        var text = this.textContent,
            count = text.trim().replace(/\s+/g, ' ').split(' ').length;

        $('.wordcount').text(count + " words");
    });
});


$('#toggle').click(function() {
    screenfull.toggle($('#container')[0]);
});

$('#login-submit-button').on('click', function() {
    console.log("hey");
});

function wordCount( val ){
    var wom = val.match(/\S+/g);
    return {
        charactersNoSpaces : val.replace(/\s+/g, '').length,
        characters         : val.length,
        words              : wom ? wom.length : 0,
        lines              : val.split(/\r*\n/).length
    };
}


var text = document.getElementById("text");
var result   = document.getElementById("result");

text.addEventListener("input", function(){
  var v = wordCount( this.value );
  result.innerHTML = (
      "<br>Characters (no spaces):  "+ v.charactersNoSpaces +
      "<br>Characters (and spaces): "+ v.characters +
      "<br>Words: "+ v.words +
      "<br>Lines: "+ v.lines
  );
}, false);
