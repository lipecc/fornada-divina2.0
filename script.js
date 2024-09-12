    document.addEventListener('DOMContentLoaded', function() {
    const cartCount = document.getElementById('cart-count');
    const cartIcon = document.getElementById('cart-icon');
    const modal = document.getElementById('cart-modal');
    const closeBtn = document.querySelector('.close');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const payButton = document.getElementById('pay-button');
    let cart = [];

    // Updated navigation link handling
    document.querySelector('nav').addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }
    });

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            cart.push({name, price});
            updateCartCount();
            showMessage(`${name} adicionado ao carrinho!`);
        });
    });

    function showMessage(message) {
        const messageBox = document.getElementById('message-box');
        const messageText = document.getElementById('message-text');
        messageText.textContent = message;
        messageBox.style.display = 'block';
        messageBox.style.zIndex = '1001';  
        messageBox.style.maxWidth = '90%';  
        messageBox.style.width = 'auto';
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 3000);
    }

    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    function updateCartModal() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.name} - R$${item.price.toFixed(2)}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.onclick = () => removeFromCart(index);
            itemElement.appendChild(removeButton);
            cartItemsContainer.appendChild(itemElement);
            total += item.price;
        });
        cartTotalElement.textContent = `Total: R$${total.toFixed(2)}`;
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartCount();
        updateCartModal();
    }

    cartIcon.addEventListener('click', function() {
        updateCartModal();
        modal.style.display = "block";
    });

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    payButton.addEventListener('click', function() {
        const paymentMethod = document.getElementById('payment-select').value;
        showMessage(`Pagamento de R$${cartTotalElement.textContent.split('R$')[1]} processado via ${paymentMethod}. Obrigado pela sua compra!`);
        cart = [];
        updateCartCount();
        modal.style.display = "none";
    });
});