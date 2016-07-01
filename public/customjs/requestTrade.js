 $(document).ready(function() {

     $('.container').on('click', '.doTrade', function() {
         var card = {};
         card.scard  =  $('.scard').children('.thumbnail').attr('value');
         card.bcard  =  $('.bcard').children('.thumbnail').attr('value');
         

         console.log(card);

        // $.post('/trades', {id: tradeeId})
        //     .done(function(data) {
        //     	console.log(data.message)
        //  });
     });
 });
