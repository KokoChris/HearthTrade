$(document).ready(function() {

    $('.container').on('click', '.tradeBtn', function() {
        var tradeeId =  $(this).attr('value');


        $.post('/trades', {id: tradeeId})
            .done(function(data) {
            	console.log(data.message)
            });
    });
});
