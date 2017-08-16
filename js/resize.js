(function($) {

    var resizeTimer; // Set resizeTimer to empty so it resets on page load
    var hasSwitched = false;

    if(screen.width <= mobileWidth)
        hasSwitched = true;

    function resizeFunction() {
        $('a.active').click();
        
        //desktop has been switched to mobile
        if(screen.width <= mobileWidth){
            if( !hasSwitched ){
                hasSwitched = true;
            }
        }

        //mobile has been switched to desktop
        else{
            if( hasSwitched ){
                
                $('.mobile-selected').each(function(){
                    $(this).click();
                });

                $('.ms-selected').each(function(){
                    /*
                     * Need solution for switching the selected elements to mobile
                     */
                });

                hasSwitched = false;
            }
        }
    };

    // On resize, run the function and reset the timeout
    // 250 is the delay in milliseconds. Change as you see fit.
    $(window).resize(function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeFunction, 250);

    });

})(jQuery);