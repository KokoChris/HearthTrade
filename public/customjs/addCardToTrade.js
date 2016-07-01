 $(document).ready(function() {

 	 $('.container').on('click','.cardsFromCollection', function(){
 	 	 var imgToTrade = $(this).children().prop('outerHTML');
 	 	 
 	 	 $("#offer").after(imgToTrade)
 	 });


 });
