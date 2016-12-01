jQuery(document).ready(function(){

//pkt 1 - nadanie klasy:

 jQuery('ul').parent().addClass('tabs');
 console.log(jQuery('.tabs'));

//pkt 2 - DOM:


//pkt 3:

  var tabsList = jQuery('.tabs li');
  var textList = jQuery('.tabs div');
  console.log(tabsList);
  console.log(textList);

//pkt 4:

tabsList.on('click', function(){
console.log('kliknięte w...');
console.log(this);
//sprawdzenie, jaki index w tablicy ma konkretny tab, w który kliknęliśmy:
console.log(jQuery(this).index());
  var clickedTab = jQuery(this).index();
  textList.slideUp();
  textList.eq(clickedTab).slideDown();
//zamiast slideUp i Down można zastosować po prostu show/hide
});


});
