document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    // Verifica se o email existe no localStorage
    const storedPassword = localStorage.getItem(email);

    if (storedPassword === null) {
        alert('Usuário não encontrado!');
    } else if (storedPassword === senha) {
        // Se as credenciais estiverem corretas, salva o usuário logado
        localStorage.setItem('loggedInUser', email);
        alert('Login bem-sucedido!');
        window.location.href = 'index.html';
    } else {
        alert('Senha incorreta!');
    }
});
