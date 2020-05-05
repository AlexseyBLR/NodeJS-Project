$(document).ready(() => {
    $('#testText').on("change", (evt) => {
        let text = $('#input').val();
        $.get('/ajax', {text: text})
            .done((data) => {
                console.log(data);
                $('#testBut').val('');
            })
            .fail((xhr) => {
                alert("Some message");
            });
    });
});