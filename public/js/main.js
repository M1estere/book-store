window.addEventListener('load', () => {

    $('input[type="button"]').attr('disabled', true);
    $('input[type="button"]').removeClass('brown-button');

    $('form').find(':input').not('input[type="button"]').on('change', function () {
        $('.status-text').html('Отзыв сохранен').addClass('hidden');
        let fields = $('form').find(':input').not('input[type="button"]');

        for (let field of fields) {
            if ($(field).val().trim().length < 1) {
                $('input[type="button"]').attr('disabled', true);
                $('input[type="button"]').removeClass('brown-button');
                return;
            }
        }

        $('input[type="button"]').attr('disabled', false);
        $('input[type="button"]').addClass('brown-button');
    });

    $('input[type="button"]').on('click', async function (e) {
        let name = $('input[name="user_name"]').val().trim();
        let phone = $('input[name="user_phone"]').val().trim();
        let comment = $('textarea[name="user_comment"]').val().trim();

        let response = await fetch('/reviews/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
                comment: comment
            })
        });

        let result = await response.json();
        if (result.code !== 200) {
            $('.status-text').html(result.message).removeClass('hidden');
            $('.status-text').removeClass('text-green-500');
            $('.status-text').addClass('text-red-500');

            return;
        }

        $('.status-text').html('Отзыв сохранен').removeClass('hidden');
        $('.status-text').removeClass('text-red-500');
        $('.status-text').addClass('text-green-500');

        $('input[type="button"]').attr('disabled', true);
        $('input[type="button"]').removeClass('brown-button');

        $('input[name="user_name"]').val('');
        $('input[name="user_phone"]').val('');
        $('textarea[name="user_comment"]').val('');
    });

});