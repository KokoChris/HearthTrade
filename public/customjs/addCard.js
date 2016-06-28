$(document).ready(function() {

    $('.container').on('click', '.btn-primary', function() {
        var elements = $(this).parents('.caption').children();

        var cardName = elements[0].innerHTML;
        var cardFlavor = elements[1].innerHTML;

        var photoUrl = $(this).parents('.col-sm-6').children('.thumbnail').children()[0].currentSrc; //having fun a bit not sure it is the best way to select this

        var card = {

        }

        card.name = cardName;
        card.flavor = cardFlavor;
        card.img = photoUrl;

        $.post("/cards/add", card)
            .done( function (data ) {
                console.log(data.message);
                
                var successDiv = `<div class="alert alert-success alert-dismissible" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        ${data.message}
                </div>`  

                $("#message").append(successDiv);

            })
            .fail(function(){
                var failDiv = `<div class="alert alert-danger alert-dismissible" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        Please login to add a card!
                </div>`  
                $("#message").append(failDiv);

            } );


    })
});
