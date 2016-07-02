 $(document).ready(function() {

 	 $('.container').on('click','.cardsFromCollection', function(){
 	 	 var imgToTrade = $(this).children().prop('outerHTML');

 	 	 $(".bcard").children('.thumbnail').remove();
 	 	 
 	 	 $("#offer").after(imgToTrade)
 	 });


 });
