window.addEventListener('load', () => {

    async function getProducts() {
        let booksStorage = localStorage.getItem('shop_cart') ?? [];
        if (booksStorage.length < 1) {
            $('.amount-text').text('');
            return;
        }
        booksStorage = JSON.parse(booksStorage);

        getProductsAmount();

        let ids = [];
        booksStorage.forEach(function (item) {
            ids.push(parseInt(item.id, 10));
        });

        if (ids.length > 0) {
            let response = await fetch('/books/get', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ids: ids
                }),
            });
    
            let result = await response.json();
            drawCards(booksStorage, result.books);
        }
    }

    function drawCards(booksStorage, books) {
        $('.cards-container').html('');
        for (let block of books) {
            let card = document.createElement('div');
            card.classList.add('card', 'w-full', 'h-[160px]', 'bg-[var(--main-white)]', 'rounded-[15px]', 'flex', 'flex-row', 'justify-between', 'p-[14px]');
            card.innerHTML = `
                <div class="flex flex-row gap-[15px] w-[57%]">
                    <input type='text' value='${block.book_id}' name='id' hidden />
                    <div class="min-w-[90px] h-[130px]">
                        <img src="${block.image_path}" class="object-cover size-full" />
                    </div>

                    <div class="flex flex-col">
                        <span class="font-bold text-[var(--main-black)] text-xl tracking-wide">${block.title}</span>
                        <span class="font-normal text-[var(--main-black)] text-xl tracking-wide">${block.author}</span>
                    </div>
                </div>

                <div class="flex flex-row gap-[50px] justify-between w-[40%]">
                    <div>
                        <div class="flex flex-row items-center justify-center gap-[15px] px-[13px] py-[3px] align-middle text-2xl text-[var(--main-black)] rounded-[3px] border-[1px] border-[var(--main-grey)]">
                            <span class="remove-button text-center cursor-pointer select-none">-</span>
                            <span class="product-amount-text text-center select-none">${getProductAmount(booksStorage, block.book_id)}</span>
                            <span class="add-button text-center cursor-pointer select-none">+</span>
                        </div>
                    </div>

                    <div class="flex flex-col justify-between items-end h-full">
                        <span class="price-text font-bold text-[var(--main-black)] text-xl tracking-wide">${getProductPrice(booksStorage, block.book_id)} ₽</span>

                        <!--<div class="rounded-full size-[25px] bg-red-600"></div>-->
                    </div>
                </div>
            `;

            $('.cards-container').append(card);
        }

        addHandlers();
    }

    function addHandlers() {
        $('.add-button').on('click', function(e) {
            addProduct($(this).parents('.card').find('input[name="id"]').val());
        });
        
        $('.remove-button').on('click', function(e) {
            removeProduct($(this).parents('.card').find('input[name="id"]').val());
        });
    }

    function getProductAmount(books, id) {
        for (let book of books) {
            if (book.id == id) {
                return book.amount;
            }
        }
    }

    function getProductPrice(books, id) {
        for (let book of books) {
            if (book.id == id) {
                return book.price;
            }
        }
    }

    function getOrderPrice() {
        let booksStorage = localStorage.getItem('shop_cart')?? [];
        if (booksStorage.length < 1) {
            return 0;
        }
        booksStorage = JSON.parse(booksStorage);

        let totalPrice = 0;
        booksStorage.forEach(function (book) {
            totalPrice += book.price;
        });

        $('.products-price-text').text(totalPrice + ' ₽');
    }

    function getProductsAmount() {
        let amount = 0;
        let booksStorage = localStorage.getItem('shop_cart') ?? [];
        if (booksStorage.length > 0) {
            let books = JSON.parse(booksStorage);

            books.forEach(item => amount += parseInt(item.amount, 10));
        }

        $('.amount-text').text(amount + ' товаров');
        $('.cart-amount').text(amount);
        getOrderPrice();
        return amount;
    }

    function removeProduct(id) {
        let booksStorage = localStorage.getItem('shop_cart');
        booksStorage = JSON.parse(booksStorage);

        let cart = booksStorage.map((item) => {
            if (item.id == id) {
                let price = item.price / item.amount;
                item.price -= price;
                item.amount--;

                $(`input[name="id"][value="${id}"]`).parents('.card').find('.product-amount-text').text(item.amount);
                $(`input[name="id"][value="${id}"]`).parents('.card').find('.price-text').text(item.price + ' ₽');
            }

            return item;
        }).filter((item) => {
            let amount = item.amount;
            if (amount <= 0) {
                $(`input[name='id'][value='${id}']`).parents('.card').remove();
            }
            
            return item.amount >= 1;
        });

        localStorage.setItem('shop_cart', JSON.stringify(cart));
        checkCartButton();
        getProductsAmount();
    }

    function addProduct(id) {
        let booksStorage = localStorage.getItem('shop_cart');
        booksStorage = JSON.parse(booksStorage);

        let cart = booksStorage.map(function(item) {
            if (item.id == id) {
                let price = item.price / item.amount;
                item.price += price;
                item.amount++;
                
                $(`input[name="id"][value="${id}"]`).parents('.card').find('.product-amount-text').text(item.amount);
                $(`input[name="id"][value="${id}"]`).parents('.card').find('.price-text').text(item.price + ' ₽');
            }

            return item;
        });

        localStorage.setItem('shop_cart', JSON.stringify(cart));

        getProductsAmount();
    }

    function checkCartButton() {
        $('#error-text').addClass('hidden');
        let amount = getProductsAmount();
        if (amount > 0) {
            $('.checkout-button').removeClass('bg-gray-600');
            $('.checkout-button').addClass('bg-[var(--main-dark-brown)]');
            $('.checkout-button').addClass('brown-button');
        } else {
            $('.checkout-button').addClass('bg-gray-600');
            $('.checkout-button').removeClass('bg-[var(--main-dark-brown)]');
            $('.checkout-button').removeClass('brown-button');
        }
    }

    $('.checkout-button').on('click', async function () {
        if (getProductsAmount() < 1) return;

        let booksStorage = localStorage.getItem('shop_cart');
        booksStorage = JSON.parse(booksStorage);

        let ids = [];
        booksStorage.forEach(function (item) {
            ids.push(parseInt(item.id, 10));
        });

        let response = await fetch('/orders/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ids: ids,
                amount: getProductsAmount(),
                cost: parseInt($('.products-price-text').text(), 10),
                date: new Date().toISOString().slice(0, 10)
            })
        });

        let result = await response.json();
        if (result.code !== 200) {
            $('#error-text').text(result.message).removeClass('hidden');
            return;
        }
    
        localStorage.setItem('shop_cart', JSON.stringify([]));
        window.location.replace('/profile');
    });

    checkCartButton();
    getProducts();

});