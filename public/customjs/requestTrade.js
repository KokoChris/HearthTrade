 $(document).ready(function() {

     $('.container').on('click', '.doTrade', function() {
         var cards = {};
         cards.scard  =  $('.scard').children('.thumbnail').attr('value');
         cards.bcard  =  $('.bcard').children('.thumbnail').attr('value');
         


        $.post('/trades', {cards})
            .done(function(data) {
           
            	window.location = data.redirect;
         	})
         	.fail(function(){
                console.log('something went wrong')
         	})
     });
 });
