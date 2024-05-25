window.addEventListener('load', () => {

    $('#add-button').on('click', function (e) {
        $('#status-text').addClass('hidden');

        $('#add-section').removeClass('hidden');
        $('#edit-section').addClass('hidden');
        $('#delete-section').addClass('hidden');
    });

    $('#edit-button').on('click', function (e) {
        $('#status-text').addClass('hidden');

        $('#add-section').addClass('hidden');
        $('#edit-section').removeClass('hidden');
        $('#delete-section').addClass('hidden');
    });

    $('#delete-button').on('click', function (e) {
        $('#status-text').addClass('hidden');
        
        $('#add-section').addClass('hidden');
        $('#edit-section').addClass('hidden');
        $('#delete-section').removeClass('hidden');
    });

});