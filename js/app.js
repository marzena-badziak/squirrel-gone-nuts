jQuery(document).ready(function(){

  var menuList = jQuery('.menu');
  var textList = jQuery('.text');

  menuList.on('click', function(){
  var clickedTab = jQuery(this).index();
    jQuery(this).next().siblings('.text').slideUp();
    jQuery(this).next().slideDown();



  });

});
