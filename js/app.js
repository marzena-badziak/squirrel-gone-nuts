jQuery(document).ready(function(){

  var menuList = jQuery('.menu');
  var textList = jQuery('.text');

  menuList.on('click', function(){

    //sprawdzenie, jaki index w tablicy ma konkretny tab, w który kliknęliśmy:
  var clickedTab = jQuery(this).index();
    textList.slideUp();
    jQuery(this).next().slideDown();
//zamiast slideUp i Down można zastosować po prostu show/hide
});


});
