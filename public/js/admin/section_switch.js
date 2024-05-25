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

});