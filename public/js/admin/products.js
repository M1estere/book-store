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
        // ajax handling (add)
        $('#add-section').find('input[type="button"]').on('click', async function (e) {
            let parent = $(this).parents('.content');
    
            let title = $(parent).find('input[name="title"]').val();
            let author = $(parent).find('input[name="author"]').val();
            let genres = $(parent).find('input[name="genres"]').val();
            let description = $(parent).find('textarea[name="description"]').val();
            let imagePath = $(parent).find('input[name="image_path"]').val();
            let price = $(parent).find('input[name="price"]').val();
    
            let response = await fetch('/books/add', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title.trim(),
                    author: author.trim(),
                    genres: genres.trim(),
                    description: description.trim(),
                    image_path: imagePath,
                    price: price
                })
            });
        
            let result = await response.json();
            let insertedId = result.id;
    
            $(parent).trigger('dblclick');
            $('#status-text').html(result.message).removeClass('hidden');
    
            for (let field of $(parent).find(':input').not('[type="button"]')) {
                $(field).val('');
            }
            
            $(this).attr('disabled', true);
            $(this).removeClass('brown-button');
    
            console.log(insertedId);
            if (insertedId !== -1) {
                // add cards to 2 grids
                let card = document.createElement('div');
                card.classList.add('content', 'flex', 'flex-col', 'items-center', 'gap-[20px]', 'w-full', 'p-[15px]', 'box-border', 'bg-[var(--main-white)]', 'rounded-[25px]', 'h-[600px]')
                card.innerHTML = `
                    <span class="name text-xl font-semibold text-[var(--main-black)] uppercase">${title}</span>
                    <input name="id" type="number" required hidden value="${insertedId}" />
                    <div class="w-full flex flex-row gap-[15px] justify-between h-[40px]">
                        <span class="select-none text-lg font-medium text-[var(--main-black)]">Название</span>
                        <input name="title" type="text" class="disabled:border-[0px] w-[60%] rounded-[15px] bg-[var(--main-white)] font-normal border border-[var(--main-black)] p-[5px]" placeholder="Название товара..." value="${title}" required />
                    </div>
                    <div class="w-full flex flex-row gap-[15px] justify-between h-[40px]">
                        <span class="select-none text-lg font-medium text-[var(--main-black)]">Автор</span>
                        <input name="author" type="text" class="disabled:border-[0px] w-[60%] rounded-[15px] bg-[var(--main-white)] font-normal border border-[var(--main-black)] p-[5px]" placeholder="Имя автора..." value="${author}" required />
                    </div>
                    <div class="w-full flex flex-row gap-[15px] justify-between h-[40px]">
                        <span class="select-none text-lg font-medium text-[var(--main-black)]">Жанры</span>
                        <input name="genres" type="text" class="disabled:border-[0px] w-[60%] rounded-[15px] bg-[var(--main-white)] font-normal border border-[var(--main-black)] p-[5px]" placeholder="Жанры (id)..." value="${genres}" required />
                    </div>
                    <div class="w-full flex flex-row gap-[15px] justify-between">
                        <span class="select-none text-lg font-medium text-[var(--main-black)]">Описание</span>
                        <textarea name="description" class="disabled:border-[0px] w-[60%] rounded-[15px] bg-[var(--main-white)] resize-none font-normal border border-[var(--main-black)] p-[5px]" rows="7" placeholder="Описание товара..." required>${description}</textarea>
                    </div>
                    <div class="w-full flex flex-row gap-[15px] justify-between h-[40px]">
                        <span class="select-none text-lg font-medium text-[var(--main-black)]">Изображение</span>
                        <input name="image_path" type="text" class="disabled:border-[0px] w-[60%] rounded-[15px] bg-[var(--main-white)] font-normal border border-[var(--main-black)] p-[5px]" placeholder="Путь до изображения..." value="${imagePath}" required />
                    </div>
                    <div class="w-full flex flex-row gap-[15px] justify-between h-[40px]">
                        <span class="select-none text-lg font-medium text-[var(--main-black)]">Стоимость</span>
                        <input name="price" type="number" class="disabled:border-[0px] w-[60%] rounded-[15px] bg-[var(--main-white)] font-normal border border-[var(--main-black)] p-[5px]" placeholder="Цена (руб)..." value="${price}" required />
                    </div>
                    <input class="w-[70%] h-[50px] bg-[var(--main-dark-brown)] rounded-[30px] capitalize text-xl font-normal text-[var(--main-white)] tracking-wider leading-none align-middle text-center brown-button disabled:bg-gray-500" type="button" value="Сохранить" />
                `;

                $('#edit-section').append(card);

                card = document.createElement('div');
                card.classList.add('content', 'flex', 'flex-col', 'items-center', 'gap-[20px]', 'w-full', 'p-[15px]', 'box-border', 'bg-[var(--main-white)]', 'rounded-[25px]', 'h-[600px]')
                card.innerHTML = `
                    <span class="name text-xl font-semibold text-[var(--main-black)] uppercase">${title}</span>
                    <input name="id" type="number" required hidden value="${insertedId}" />
                    <div class="w-full flex flex-row gap-[15px] justify-between h-[40px]">
                        <span class="select-none text-lg font-medium text-[var(--main-black)]">Название</span>
                        <input name="title" type="text" class="disabled:border-[0px] w-[60%] rounded-[15px] bg-[var(--main-white)] font-normal border border-[var(--main-black)] p-[5px]" placeholder="Название товара..." value="${title}" required />
                    </div>
                    <div class="w-full flex flex-row gap-[15px] justify-between h-[40px]">
                        <span class="select-none text-lg font-medium text-[var(--main-black)]">Автор</span>
                        <input name="author" type="text" class="disabled:border-[0px] w-[60%] rounded-[15px] bg-[var(--main-white)] font-normal border border-[var(--main-black)] p-[5px]" placeholder="Имя автора..." value="${author}" required />
                    </div>
                    <div class="w-full flex flex-row gap-[15px] justify-between h-[40px]">
                        <span class="select-none text-lg font-medium text-[var(--main-black)]">Жанры</span>
                        <input name="genres" type="text" class="disabled:border-[0px] w-[60%] rounded-[15px] bg-[var(--main-white)] font-normal border border-[var(--main-black)] p-[5px]" placeholder="Жанры (id)..." value="${genres}" required />
                    </div>
                    <div class="w-full flex flex-row gap-[15px] justify-between">
                        <span class="select-none text-lg font-medium text-[var(--main-black)]">Описание</span>
                        <textarea name="description" class="disabled:border-[0px] w-[60%] rounded-[15px] bg-[var(--main-white)] resize-none font-normal border border-[var(--main-black)] p-[5px]" rows="7" placeholder="Описание товара..." required>${description}</textarea>
                    </div>
                    <div class="w-full flex flex-row gap-[15px] justify-between h-[40px]">
                        <span class="select-none text-lg font-medium text-[var(--main-black)]">Изображение</span>
                        <input name="image_path" type="text" class="disabled:border-[0px] w-[60%] rounded-[15px] bg-[var(--main-white)] font-normal border border-[var(--main-black)] p-[5px]" placeholder="Путь до изображения..." value="${imagePath}" required />
                    </div>
                    <div class="w-full flex flex-row gap-[15px] justify-between h-[40px]">
                        <span class="select-none text-lg font-medium text-[var(--main-black)]">Стоимость</span>
                        <input name="price" type="number" class="disabled:border-[0px] w-[60%] rounded-[15px] bg-[var(--main-white)] font-normal border border-[var(--main-black)] p-[5px]" placeholder="Цена (руб)..." value="${price}" required />
                    </div>
                    <input class="w-[70%] h-[50px] bg-[var(--main-dark-brown)] rounded-[30px] capitalize text-xl font-normal text-[var(--main-white)] tracking-wider leading-none align-middle text-center brown-button disabled:bg-gray-500" type="button" value="Удалить" />
                `;

                $('#delete-section').append(card);

                inputStates();
                addHandlers();
                disableFields();
                doubleClickHandle();
            }
        });


        // ajax handling (edit)
        $('#edit-section').find('input[type="button"]').on('click', async function (e) {
            let parent = $(this).parents('.content');

            let id = $(parent).find('input[name="id"]').val();
            let title = $(parent).find('input[name="title"]').val().trim();
            let author = $(parent).find('input[name="author"]').val().trim();
            let genres = $(parent).find('input[name="genres"]').val().trim();
            let description = $(parent).find('textarea[name="description"]').val().trim();
            let imagePath = $(parent).find('input[name="image_path"]').val().trim();
            let price = $(parent).find('input[name="price"]').val().trim();

            let response = await fetch('/books/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    title: title,
                    author: author,
                    genres: genres,
                    description: description,
                    image_path: imagePath,
                    price: price
                })
            });
        
            let result = await response.json();
            $(parent).trigger('dblclick');
            $('#status-text').html(result.message).removeClass('hidden');

            if (result.code === 200) {
                // update cards with the same id
                $(`input[value=${id}]`).parents('.content').find('.name').text(title);

                $(`input[value=${id}]`).parents('.content').find('input[name="title"]').val(title);
                $(`input[value=${id}]`).parents('.content').find('input[name="author"]').val(author);
                $(`input[value=${id}]`).parents('.content').find('input[name="genres"]').val(genres);
                $(`input[value=${id}]`).parents('.content').find('textarea[name="description"]').val(description);
                $(`input[value=${id}]`).parents('.content').find('input[name="image_path"]').val(imagePath);
                $(`input[value=${id}]`).parents('.content').find('input[name="price"]').val(price);
            }
        });


        // ajax handling (delete)
        $('#delete-section').find('input[type="button"]').on('click', async function (e) {
            let parent = $(this).parents('.content');

            let id = $(parent).find('input[name="id"]').val();
            let response = await fetch('/books/delete', {
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
                $(`input[name="id"][value=${id}]`).parents('.content').remove();
            }
        });
    }

});