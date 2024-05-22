window.onload = () => {

    $('.buy-button').on('click', function() {
        addToCart($(this).parents('.card').find('input[name="id"]').val());
    });

    function addToCart(book_id) {
        let cart = localStorage.getItem('shop_cart') ?? [];
        if (cart.length > 0) {
            cart = JSON.parse(cart);
            
            let bookExists = !!cart.filter(function(item) {
                return item.id == book_id;
            }).length > 0;

            if (bookExists) {
                cart.map(function(item) {
                    if (item.id == book_id) {
                        let price = item.price / item.amount;
                        item.amount++;
                        item.price += price;
                    }
                    return item;
                });
            } else {
                console.log(parseInt($(`input[value='${book_id}']`).parents('.card').find('.price-text').text(), 10));
                let bookObject = {
                    id: book_id,
                    amount: 1,
                    price: parseInt($(`input[value='${book_id}']`).parents('.card').find('.price-text').text(), 10)
                }
                cart.push(bookObject);
            }
        } else {
            console.log(parseInt($(`input[value='${book_id}']`).parents('.card').find('.price-text').text(), 10));
            let bookObject = {
                id: book_id,
                amount: 1,
                price: parseInt($(`input[value='${book_id}']`).parents('.card').find('.price-text').text(), 10)
            }
            cart.push(bookObject);
        }

        localStorage.setItem('shop_cart', JSON.stringify(cart));
        getBooksAmount();
    }

    function getBooksAmount() {
        let books = localStorage.getItem('shop_cart') ?? [];
        if (books.length < 1) {
            $('.cart-amount').html('');    
            return;
        }

        books = JSON.parse(localStorage.getItem('shop_cart'));

        let amount = 0;
        for (let book of books) {
            amount += book.amount;
        }

        $('.cart-amount').html(amount);
    }

    getBooksAmount();

}