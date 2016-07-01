$(document).ready(function() {

     $('.container').on('click', '.accept', function() {
         
         let tradeId = $(this).attr('value');


        


        $.post('/trades/incoming', {tradeId:tradeId})
            .done(function(data) {
            	console.log(data)
            	// window.location = data.redirect;
         	})
         	.fail(function(){

         	})
     });
 });
