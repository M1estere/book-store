window.addEventListener('load', () => {
    
    $('#add-button').addClass('bg-gray-500');

    $('#add-button').on('click', function (e) {
        $('#status-text').addClass('hidden');

        $('#add-button').addClass('bg-gray-500');
        $('#edit-button').removeClass('bg-gray-500');
        $('#delete-button').removeClass('bg-gray-500');

        $('#add-section').removeClass('hidden');
        $('#edit-section').addClass('hidden');
        $('#delete-section').addClass('hidden');
    });

    $('#edit-button').on('click', function (e) {
        $('#status-text').addClass('hidden');

        $('#add-button').removeClass('bg-gray-500');
        $('#edit-button').addClass('bg-gray-500');
        $('#delete-button').removeClass('bg-gray-500');

        $('#add-section').addClass('hidden');
        $('#edit-section').removeClass('hidden');
        $('#delete-section').addClass('hidden');
    });

    $('#delete-button').on('click', function (e) {
        $('#status-text').addClass('hidden');
        
        $('#add-button').removeClass('bg-gray-500');
        $('#edit-button').removeClass('bg-gray-500');
        $('#delete-button').addClass('bg-gray-500');

        $('#add-section').addClass('hidden');
        $('#edit-section').addClass('hidden');
        $('#delete-section').removeClass('hidden');
    });

    if ($('#add-section').length < 1) {
        $('#add-button').remove();

        $('#edit-button').addClass('bg-gray-500');
        $('#edit-button').trigger('click');
    }
    
    if ($('#edit-section').length < 1) {
        $('#edit-button').remove();

        $('#delete-button').addClass('bg-gray-500');
        $('#delete-button').trigger('click');
    }

    if ($('#delete-section').length < 1) {
        $('#delete-button').remove();

        $('#add-button').addClass('bg-gray-500');
        $('#add-button').trigger('click');
    }

});