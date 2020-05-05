$(document).ready(() => {
    $('#getUsersB').on("click", (evt) => {
        // let text = $('#input').val();
        $.get('/getUsers', {text: 'user1'})
            .done((data) => {
                console.log(data);
                // $('#testBut').val('');
                var obj = JSON.parse(JSON.stringify(data));
                $('#users').prepend('<li>'+data['users']+'</li>');
                $(function() {
                    $.each(obj, function(i, item) {
                        var $tr = $('<tr>').append(
                            $('<td>').text(item.name1),
                            $('<td>').text(item.name2),
                        ); //.appendTo('#records_table');
                        console.log($tr.wrap('<p>').html());
                    });
                });

            })
            .fail((xhr) => {
                alert("Some message");
            });
    });
});