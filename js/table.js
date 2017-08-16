function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

$(document).ready(function(){
  var $table = $('.table');
  $table.floatThead({
      position:'fixed',
      headerCellSelector: 'tr:nth-child(3) > th',
      scrollContainer: function($table){
        return $table.closest('.wrapper');
    }
  });
  
  ripple();
  
  var x = $('.wrapper').position().left + 20;
  $('.button-wrapper').css('right',x);


  $(window).resize(function(){
    var x = $('.wrapper').position().left + 20;
    $('.button-wrapper').css('right',x);
  });

  var over = true;
  $('form, #emailModeButton').mouseenter(function(){
    over = true;
  });
  $('form, #emailModeButton').mouseleave(function(){
    over = false;
  });

  $('#emailModeButton').click(function(){
    $('.wrapper, #pdfModeButton, #emailModeButton').css('opacity','0.2');
    $('form').fadeIn();
    $('input').focus();

    $('body').click(function(){
      if(over == false){
        $('.wrapper, #pdfModeButton, #emailModeButton').css('opacity','1');
        $('form').fadeOut();
      }
    });
  });

  $('form').submit(function(e){
    e.preventDefault();
    if ( isEmail($('input').val()) ) {
      var win = window.open( window.location.origin + window.location.pathname + EMAIL_PDF_URL + $('input').val(), '_blank' );  
      if(win){
          win.focus();
      }

      else{
          alert('Please allow popups to send an email');
      }
      return;
    }

    else{
      $('.group > p:nth-child(5)').text('Please enter a valid email');
    }
    
  });

  $('#loadingAnimation').hide();
  $('.wrapper, .button-wrapper').css('opacity', '1');
  $('body > div.wrapper.table-responsive-vertical.shadow-z-1 > div:nth-child(1)').css('z-index', '1002');

});