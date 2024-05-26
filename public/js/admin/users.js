window.addEventListener('load', () => {

    doubleClickHandle();
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

    // double click handle
    function doubleClickHandle() {
        $('#edit-section').find('.content').on('dblclick', function (e) {
            $('#status-text').addClass('hidden');
            let firstInputElement = $(this).find(':input')[0];
            if ($(firstInputElement).is('[disabled="disabled"]')) {
                $(this).find(':input').attr('disabled', false);
                $(this).find('[type="button"]').addClass('brown-button');
            } else {
                $(this).find(':input').attr('disabled', true);
                $(this).find('[type="button"]').removeClass('brown-button');
            }        
        });
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

    function disableFields() {
        $('#edit-section').find(':input').attr('disabled', true);
        $('#delete-section').find(':input').not('[type="button"]').attr('disabled', true);
    }

    function addHandlers() {
        // ajax handling (edit)
        $('#edit-section').find('input[type="button"]').on('click', async function (e) {
            let parent = $(this).parents('.content');

            let id = $(parent).find('input[name="id"]').val();
            let name = $(parent).find('input[name="name"]').val().trim();
            let mail = $(parent).find('input[name="mail"]').val().trim();
            let password = $(parent).find('input[name="password"]').val().trim();

            let response = await fetch('/users/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    name: name,
                    mail: mail,
                    password: password
                })
            });
        
            let result = await response.json();
            $(parent).trigger('dblclick');
            $('#status-text').html(result.message).removeClass('hidden');

            if (result.code === 200) {
                // update cards with the same id
                $(`input[value=${id}]`).parents('.content').find('.name').text(name);

                $(`input[value=${id}]`).parents('.content').find('input[name="name"]').val(name);
                $(`input[value=${id}]`).parents('.content').find('input[name="mail"]').val(mail);
                $(`input[value=${id}]`).parents('.content').find('input[name="password"]').val(password);
            }
        });

        // ajax handling (delete)
        $('#delete-section').find('input[type="button"]').on('click', async function (e) {
            let parent = $(this).parents('.content');

            let id = $(parent).find('input[name="id"]').val();
            let response = await fetch('/users/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            });
        
            let result = await response.json();
            $(parent).trigger('dblclick');
            $('#status-text').html(result.message).removeClass('hidden');
            
            if (result.code === 200) {
                // delete book card
                $(`input[value=${id}]`).parents('.content').remove();
            }
        });
    }

});