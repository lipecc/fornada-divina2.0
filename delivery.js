document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const payButton = document.getElementById('pay-button');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.name} - R$${item.price.toFixed(2)}`;
            cartItemsContainer.appendChild(itemElement);
            total += item.price;
        });
        cartTotalElement.textContent = `Total: R$${total.toFixed(2)}`;
    }

    function clearCart() {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }

    payButton.addEventListener('click', function() {
        const paymentMethod = document.getElementById('payment-select').value;
        alert(`Pagamento de R$${cartTotalElement.textContent.split('R$')[1]} processado via ${paymentMethod}. Obrigado pela sua compra!`);
        clearCart();
    });

    // Atualiza o carrinho ao carregar a página
    updateCart();
});
