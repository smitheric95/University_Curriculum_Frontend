function ripple(){
  var parent, ink, d, x, y;
  $(".redCircle").click(function(e){
    element = $(this);
    if(element.find(".drop").length === 0)
      element.prepend("<span class='drop'></span>");

    drop = element.find(".drop");
    drop.removeClass("animate");

    if(!drop.height() && !drop.width())
    {
      d = Math.max(element.outerWidth(), element.outerHeight());
      drop.css({height: d, width: d});
    }

    //help icon
    if( element.find('i').attr('id') == 'help-icon' || element.attr('id') == 'emailCopy' ){
      x = e.pageX - element.offset().left - drop.width()+30;
      y = e.pageY - element.offset().top - drop.height()+35;
    }

    // email and pdf
    else if(element.attr('id') == 'emailModeButton' || element.attr('id') == 'pdfModeButton'){
      x = e.pageX - element.offset().left - drop.width()+50;
      y = e.pageY - element.offset().top - drop.height()+35; 
      if(element.attr('id') == 'emailModeButton'){
        x = x+95;
      }
    }

    //start icons
    else{
      x = e.pageX - element.offset().left - drop.width()-5;
      y = e.pageY - element.offset().top - drop.height()-40;
    }
    //set the position and add class .animate
    drop.css({top: y+'px', left: x+'px'}).addClass("animate");
  });
}