function magicNavBar() {

    var $el, leftPos, newWidth,
        $mainNav = $("ul.onepage-pagination");

    $mainNav.append("<li id='magic-line'></li>");
    var $magicLine = $("#magic-line");

    $magicLine
        .width($("a.active").parent().width() - 80)
        .css("left", $("a.active").parent().position().left + 40)
        .data("origLeft", $magicLine.position().left)
        .data("origWidth", $magicLine.width());

    $("ul.onepage-pagination li a").hover(function() {
        $el = $(this);
        leftPos = $el.position().left + 40;
        newWidth = $el.parent().width() - 80;
        $magicLine.stop().animate({
            left: leftPos,
            width: newWidth
        });
        $magicLine.css('background','#e53935');
    }, function() {
        $magicLine.stop().animate({
            left: $magicLine.data("origLeft"),
            width: $magicLine.data("origWidth"),
        });
        $magicLine.css('background','#f9f9f9');
    });

    $("ul.onepage-pagination li a").click(function(event) {
      event.preventDefault();
      $magicLine.data('origLeft', $("a.active").parent().position().left + 40);
      $magicLine.data('origWidth', $("a.active").parent().width() - 80);
      $magicLine.stop().animate({
            left: $magicLine.data("origLeft"),
            width: $magicLine.data("origWidth")
        });
    });



}

function initNav(){
  var $nav = $('nav');
  $nav.append('<button class="c-hamburger c-hamburger--htx"><span>toggle menu</span></button><a class="redCircle"><i id="help-icon" class="material-icons">?</i></a>');
  $nav.after('<div id="help-box"><h2>Lorem Ipsum</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur blandit ligula non tortor porttitor, non pulvinar magna elementum. Nulla euismod, libero eget finibus lobortis, metus felis laoreet leo, ac viverra leo felis a leo. Suspendisse scelerisque dignissim mi, maximus blandit urna laoreet eu.</p><a href="#" id="help-close">Close</a></div>');

  $('.c-hamburger').click(function(){
    $(this).toggleClass('is-active');
    $('.onepage-pagination').toggleClass('showing');
  });


  //use $nav below??

  $('.onepage-pagination > li:nth-child(1) > a:nth-child(1)').click(function(){
    $nav.css('top', '100%');
  });
  
  $('nav > .redCircle').on('click.openHelp', function(){
    var msSelection = $('.ms-selection:not(:last-child)');
    var activeSection = $('.section');

    $('#help-box').css({ 'z-index' : '2', 'opacity' : '1'});
    activeSection.css('opacity','0.2');
    $('nav').css('box-shadow','none');
    msSelection.addClass('ms-animation');

    $clickAway = $(this).add(activeSection);
    $clickAway = $clickAway.add('#help-close');

    $clickAway.on('click.closeHelp', function(event){
      $('#help-box').css({ 'z-index' : '0', 'opacity' : '0'});
      activeSection.css('opacity','1');
      $('nav').css('box-shadow','0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)');
      msSelection.removeClass('ms-animation');
      $clickAway.off('click.closeHelp');
    });

  });
}

var NAV_INITIALIZED = false;

function updateNav(navText, orMode){
  /*

    TODO: Update the nav bar to use the new data

  */
  //if(!NAV_INITIALIZED) {
    initNav();
    //NAV_INITIALIZED = true;
  //}

  if(orMode) {
    $('#help-box').show();
    $('#help-icon').parent().show();
  }
  else {
    $('#help-box').hide();
    $('#help-icon').parent().hide();
  }

  /*
  var temp = $('.onepage-pagination');
  console.log(temp.size());
  for(var i = temp.size(); i < navText.length; i++) {
    temp.append('<a data-index="' + (i + 1) + '" href="#' + (i + 1) + '"></a>');
  }
  */

  var navElems = $('.onepage-pagination > li > a');
  for( var i=0; i<navText.length;i++){
    if(i < navElems.size())
      navElems.eq(i).html('<p>' + navText[i] + '</p>');
    //else
      //$('<p>' + navText[i] + '</p>').insertBefore(navElems.eq(navElems.size()-1));

  }

  //nav = choose which mode
}

function createMultiSelect(navText){


  //last slection box
  var lastSelect = $('#optgroup');

  //last multiple selector
  lastSelect.multiSelect({
    selectableOptgroup: true
  });

  var multiSelectCounter = 0;

        //<div class='group'><input type='text' required><span class='highlight'></span><span class='bar'></span><label>Email</label><p>Press enter to send</p></div>


  //first three multiple selectors
  $('.multiple-select:not(#optgroup)').multiSelect({
    selectableHeader: "<div class='group'><input type='text' class='search-input' autocomplete='off' required><span class='highlight'></span><span class='bar'></span><label>Search All</label></div>",
    selectionHeader: "<div class='group'><input type='text' class='search-input' autocomplete='off' required><span class='highlight'></span><span class='bar'></span><label>Search Selected</label></div>",
    afterInit: function(ms){
      var that = this,
          $selectableSearch = that.$selectableUl.prev(),
          $selectionSearch = that.$selectionUl.prev(),
          selectableSearchString = '#'+that.$container.attr('id')+' .ms-elem-selectable:not(.ms-selected)',
          selectionSearchString = '#'+that.$container.attr('id')+' .ms-elem-selection.ms-selected';

      that.qs1 = $selectableSearch.children('input').quicksearch(selectableSearchString)
      .on('keydown', function(e){
        if (e.which === 40){
          that.$selectableUl.focus();
          return false;
        }
      });

      that.qs2 = $selectionSearch.children('input').quicksearch(selectionSearchString)
      .on('keydown', function(e){
        if (e.which == 40){
          that.$selectionUl.focus();
          return false;
        }
      });

      //add preselected elements to last multiselect
      var preselectedItems = this.$selectionUl.children('.ms-selected');

      //determine what category the selected item belongs to
      var nestCategory = navText[multiSelectCounter+1];
      /*
      if(multiSelectCounter == 0){
        nestCategory = 'Pillars';
      }
      else if(multiSelectCounter == 1){
        nestCategory = 'Proficiencies';
      }
      else if(multiSelectCounter == 2){
        nestCategory = 'Majors';
      }else{console.log('nestCategory error:line 52');}
      */

      preselectedItems.each(function(){
        if( $('#or-submit').length === 0 ){
          //get the index alphabetical of the element that is clicked
          var insertIndex = $(this).parent().children('.ms-selected').index( $(this) );

          console.log(nestCategory);
          console.log($(this).children('span').text());
          //add option to last multiselect

          lastSelect.multiSelect('addOption', {
            value: '' + Math.random(),
            text: $(this).children('span').text(),
            index: insertIndex,
            nested: nestCategory
          });
        }

      });

      multiSelectCounter++;

    },
    afterSelect: function(values){
      this.qs1.cache();
      this.qs2.cache();

      //mobile site
      if(screen.width <= mobileWidth){

        //get the element that's been selected
        var $selectedIndex = this.$selectableUl.find( $('li.ms-elem-selectable:contains(' + values[0] + ')') );

        //if the selected item isn't already selected (counterintuitive)
        if( $selectedIndex.hasClass('mobile-selected') ){

          //get the index alphabetical of the element that is clicked
          var selectedId = $selectedIndex.attr('id');
          var $relativeItem = $( '#' + parseInt(selectedId) + '-selection' );

          var insertIndex = $relativeItem.parent().children('.ms-elem-selection.ms-selected').index( $relativeItem );
        }

        else{

          //delete a deselected element from the last multiselect
          var postedSelects = $('.ms-optgroup').slice(0,3).children('.ms-elem-selectable').children('span').filter(function(){
            return $(this).text() === values[0];
          });

          if(postedSelects.length > 0){
            postedSelects.parent().remove();
          }

          //break out of function
          return;
        }
      }

      else{
        //get the index alphabetical of the element that is clicked
        var $selectedIndex = this.$selectionUl.find( $('li.ms-selected:contains(' + values[0] + ')') );
        var insertIndex = $selectedIndex.parent().children('.ms-selected').index( $selectedIndex );
      }

      //determine what category the selected item belongs to
      var contextName = this.$element.context.name;
      var nestCategory = contextName.substring(0,contextName.length-2);

      /* No longer needed, php is generating navText and forces the multiselect names
         to match the "pretty title" format found in navText
      nestCategory = nestCategory.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
      });
      */
      console.log(nestCategory);

/*
      if(contextName == 'pillars[]'){
        nestCategory = 'Pillars';
      }
      else if(contextName == 'pe[]'){
        nestCategory = 'Proficiencies';
      }
      else{
        nestCategory = 'Majors';
      }
*/

      //add option to last multiselect
      lastSelect.multiSelect('addOption', {
        value: '' + Math.random(),
        text: values[0],
        index: insertIndex,
        nested: nestCategory
      });

      keepStable();

    },
    afterDeselect: function(values){
      this.qs1.cache();
      this.qs2.cache();

      //delete a deselected element from the last multiselect
      var postedSelects = $('.ms-optgroup').slice(0,3).children('.ms-elem-selectable').children('span').filter(function(){
        return $(this).text() === values[0];
      });

      if(postedSelects.length > 0){
        postedSelects.parent().remove();
      }

      keepStable();

    }
  });//multiselect object call ends

  if($('.material-icons').size() < 6) {
    $('.ms-selectable:not(:last)').each(function () {
      $(this).after('<i class="material-icons">swap_horiz</i>');
    });
  }

  //prepare multiselect for mobile nav
  var mainForm = $('.main-form');

  mainForm.onepage_scroll({
    loop: false,
    animationTime: 750,
    updateURL: false, //change to false!
    sectionContainer: "section[class*='orMode']",
    afterMove: function(index){
      $('.search-input').prop('required',true);
    }
  });

  var navUl = $('ul.onepage-pagination');

  //prepare mobile nav onload
  if($(window).width() <= mobileWidth){
    var pageNum = $('body').attr('class').substring(13);
    navUl.css('top', ('-' + (pageNum-1)*mobileNavGap) + 'px');
  }

  $('nav > a:first-child').click(function(){
    mainForm.moveUp();
  });
  $('nav > a:last-child').click(function(){
    mainForm.moveDown();
  });


  // switch this to a loop thru an array. eq will be == to i*2. Search all <name> will be ith element

  var searchBars = $('.search-input');
  for(var i=1;i<navText.length;i++){
    //searchBars.eq((i-1)*2).attr('placeholder', 'Search All ' + navText[i] );
  }


}
function countLongestSelect(){
  var maxChildren = 0;

  $('section.section > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(2)').each(function(){
    var curNum = $(this).children().length;

    if(curNum > maxChildren)
      maxChildren = curNum;
  });

  $('#ms-optgroup > div:nth-child(1) > ul:nth-child(1) > li > ul:nth-child(1) > li:last-child').each(function(){
    for(var i=0;i<maxChildren;i++)
      $(this).before("<li class='blank-space ms-elem-selectable disabled'><span> </span></li>");
  });

  $('#ms-optgroup').append("<p id='emptyLastSelect'>You haven't selected anything.<span class='highlight'></span></p>");
}

function keepStable(){
  var $lastSelectULs = $('#ms-optgroup > div:nth-child(1) > ul:nth-child(1) > li > ul:nth-child(1)');
  var maxChildren = 0;

  $lastSelectULs.each(function(){
    var curNum = $(this).children().not('.blank-space').length;

    if(curNum > maxChildren)
      maxChildren = curNum;
  });

  if(maxChildren < 3){
    $('#emptyLastSelect').show();
  }
  else{
    $('#emptyLastSelect').hide();
  }

  $lastSelectULs.children().each(function(){
    $(this).show();
    
    if( ($(this).index() > (maxChildren-2)) && !$(this).is('li:last-child')){
      $(this).hide();
    }
  });
}

$(document).ready(function(){

  //click corresponding button if an info card is clicked
  $('.info-card').click(function(){
    $( $(this).prev() ).click();
  });

  var navText = ['Start'];

  var navElems = $('.onepage-pagination > li > a');
  for( var i=0; i<navElems.size();i++){
    navElems.eq(i).prepend('<p>' + navText[i] + '</p>');
  }

  ripple();
  
  $(document).on('keypress', '.search-input', function(event){
    return event.keyCode != 13;
  });

  console.log('All scripts have loaded.');

  /*

    TODO: make sure if button is push multiple times it clears the previous changes before appending

    Also, write the js that will validate input on the search bar (preferably in a seperate file that
    can be included in the AJAX response in frontend.php [the loadSearch() function])

    The format of the URL for the AJAX requests will be:
      $.get(AJAX_EXEC_SEARCH_URL+'&department='+d+'&classnum='+cnum, function(data, status){
        $('body').append(data);
        updateNav(navText);
      });

      where variables d and cnum represent the department from the select tag and the course/class
      number in the input tag respecitvely

  */

/*
  $('#orModeButton').click(function(){
    $.get(AJAX_OR_MODE_URL, function(data, status){
      $('body').append(data);
      createMultiSelect(navText);
      updateNav(navText);
    });
  });

    $('#searchModeButton').click(function(){
    $.get(AJAX_SEARCH_MODE_URL, function(data, status){
      $('body').append(data);
      updateNav(navText);
    });
  });
  */

  var delay = (function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
  })();

    // Make a hide all function (also needs to move intro back if in form)
    function hideAll(){

      if ( $('.intro').parent().prop('tagName') != "BODY" ) {
        $('.intro').detach().prependTo('body');
        $('.intro').css('margin-top', '200px');
      }

      $('#orModeWrapper').hide();
      $('#searchModeWrapper').hide();
      $('#feedbackModeWrapper').hide();

      $('nav').remove();
      $('#help-box').remove();
      $('#help-icon').remove();
    }

    var OR_MODE_RENDERED = false;

    $('#orModeButton').click(function(){
        delay(function() {
          hideAll();

          $('#orModeWrapper').show();

          //move the intro section
          $('.intro').detach().prependTo('.main-form');
          $('.intro').css('margin-top','0');

          createMultiSelect(UC_CATEGORIES);

          



          updateNav(UC_CATEGORIES, true);

          magicNavBar();
          ripple();

          //scroll to the first page
          $('.onepage-pagination > li:nth-child(2) > a').click();
          $('nav').css('top', '0');


          //style last multiselect
          $('.ms-optgroup-label').css('position','fixed');
          $('ul.ms-optgroup').each(function(){
            var w = $(this).children('.ms-optgroup-label').outerWidth();
            $(this).css('width', w-1);
          });


          var $lastMulti = $('#ms-optgroup > div:nth-child(1)');
          w = ($lastMulti.outerWidth() * -1) / 2;
          $lastMulti.css({
            'position' : 'absolute',
            'left' : '50%',
            'margin-left' : w
          });

          $lastMultiBottom = $('#ms-optgroup > div:nth-child(1)');

          //this is the first time the orModeButton has been clicked
          if( $lastMultiBottom.children('input').length === 0 ){
            
            //add no results to each multiselect
            $('.ms-list').slice(0, -2).each(function(){
              $(this).prepend("<p class='noresults'>No results.</p>");
            });

            $lastMultiBottom.append("<input id='or-submit' type='submit' value='Submit'></input>");
            $('#or-submit').click(function(event){
              $('.search-input').removeAttr('required');
              
              if( $('.ms-elem-selection.ms-selected').length === 0 ){
                $('#emptyLastSelect').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
              }
              
            });

            $('.group').each(function(){
              $(this).append("<i class='material-icons'>close</i>");
            });
            $('.group > i').click(function(){
              var $curInput = $(this).siblings('.search-input');
              $curInput.val("");
              $curInput.focus();
              $curInput.trigger({type: 'keydown', which: 8, keyCode: 8});

            });

            $(this).submit(function(event){
              if( $('.ms-elem-selection.ms-selected').length === 0 ){
                event.preventDefault();
              }
            });

            countLongestSelect();
            keepStable();
          }

          //createHelp()
        }, 500);
    });


  $('#searchModeButton').click(function(){
    delay(function() {
      hideAll();

      var navText = ['Start', 'Course Lookup'];

      $('#searchModeWrapper').show();

      //move the intro section
      $('.intro').detach().prependTo('.searchDiv');
      $('.intro').css('margin-top','0');

      $('.searchDiv').onepage_scroll({
        loop: false,
        animationTime: 750,
        updateURL: false, //change to false!
        sectionContainer: "section[class*='searchMode']"
      });

      updateNav(navText, false);
      magicNavBar();
      ripple();

      $('.onepage-pagination > li:nth-child(2) > a').click();
      $('nav').css('top', '0px');

    }, 500);
  });

  $('#feedbackModeButton').click(function(){
    delay(function() {
      hideAll();

      $('.searchDiv').removeClass('onepage-wrapper');

      var navText = ['Start', 'Feedback'];

      $('#feedbackModeWrapper').show();

      //move the intro section
      $('.intro').detach().prependTo('.feedbackDiv');
      $('.intro').css('margin-top','0');

      $('.feedbackDiv').onepage_scroll({
        loop: false,
        animationTime: 750,
        updateURL: false, //change to false!
        sectionContainer: "section[class*='feedbackMode']"
      });

      updateNav(navText, false);
      magicNavBar();
      ripple();

      $('.onepage-pagination > li:nth-child(2) > a').click();
      $('nav').css('top', '0px');

    }, 500);
  });

  function courseLookup(){
    var department = $('#departmentInput').find(':selected').text();
    var catalogNumber = $('#classNumberInput').find(':selected').text();

    console.log("/lookup/" + department + "/" + catalogNumber);

    $.getJSON("/lookup/" + department + "/" + catalogNumber, function(data){
      var $satisfiesList = $('#componentTable');
      $satisfiesList.empty();
      $.each( data, function( key, value ) {
        $satisfiesList.append("<tr><td class='componentAbbv'>" + value.abbreviation + "</td><td class='componentTitle'>" + value.title + "</td></tr>");
      });
    });
  }

  function fillClassNumberInput(selected){
    var $classNum = $('#classNumberInput');
    $classNum.empty();
    $.each(UC_COURSES[selected], function(key, value) {
      $classNum.append($("<option></option>")
          .attr("value", value).text(value));
    });
  }

  var $departmentInput = $('#departmentInput');

  $departmentInput.change(function(){
    fillClassNumberInput($(this).find(':selected').text())
    courseLookup();
  });

  fillClassNumberInput($departmentInput.find(':selected').text());

  $('#classNumberInput').change(function() {
    courseLookup();
  });

  courseLookup();

});
