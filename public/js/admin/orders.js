window.addEventListener('load', () => {

    inputStates();
    initReset();
    addHandlers();

    function initReset() {
        $('#status-text').addClass('hidden');
        $('#add-section').find('input[type="button"]').attr('disabled', true);
        $('#add-section').find('input[type="button"]').removeClass('brown-button');

        // disable edit section inputs
        $('#edit-section').find(':input').attr('disabled', true);
        $('#edit-section').find('[type="button"]').removeClass('brown-button');

        $('#delete-section').find(':input').not('[type="button"]').attr('disabled', true);
    }

    // input fields state to disable submit button
    function inputStates() {
        $('.content :input').not('[type="button"]').on('change', function (e) {
            $('#status-text').addClass('hidden');
    
            let fields = $(this).parents('.content').find(':input').not('[type="button"]');
            for (field of fields) {
                if ($(field).val().trim().length < 1) {
                    $(this).parents('.content').find('input[type="button"]').attr('disabled', true);
                    $(this).parents('.content').find('input[type="button"]').removeClass('brown-button');
                    return;
                }
    
                $(this).parents('.content').find('input[type="button"]').attr('disabled', false);
                $(this).parents('.content').find('input[type="button"]').addClass('brown-button');
            }
        });
    }

    function addHandlers() {
        // ajax handling (delete)
        $('#delete-section').find('input[type="button"]').on('click', async function (e) {
            let parent = $(this).parents('.content');

            let id = $(parent).find('input[name="id"]').val();
            let response = await fetch('/orders/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            });
        
            let result = await response.json();
            $('#status-text').html(result.message).removeClass('hidden');
            
            if (result.code === 200) {
                // delete card
                $(`input[name="id"][value=${id}]`).parents('.content').remove();
            }
        });
    }

});