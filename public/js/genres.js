window.addEventListener('load', () => {

    let currentGenres = [];
    let books = $('.cards-container .card');

    $('.genre-button').on('click', function (e) {
        $(this).find('.inner-block').toggleClass('hidden');

        let genreValue = $(this).find('input').val();
        if (currentGenres.includes(genreValue)) {
            let removeIndex = currentGenres.indexOf(genreValue);
            currentGenres.splice(removeIndex, 1);
        } else {
            currentGenres.push(genreValue);
        }

        drawBookCards();
    });

    function drawBookCards() {
        $('.cards-container').html('');
        for (let book of books) {
            let genresId = $(book).find('input[name="genres_id"]').val().split(' ');
            
            if (find(genresId, currentGenres) != -1) {
                $('.cards-container').append(book);
            }
        }
    }

    function find(full, sub) {
        for (let waitedGenre of sub) {
            if (full.includes(waitedGenre) == false) {
                return -1;
            }
        }

        return 1;
    }

});