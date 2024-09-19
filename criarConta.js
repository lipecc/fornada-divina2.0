document.getElementById('createAccountForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;
    const confirmSenha = document.getElementById('confirm-password').value;

    // Verifica se os campos estão preenchidos
    if (!email || !senha || !confirmSenha) {
        alert('Todos os campos são obrigatórios!');
        return;
    }

    // Validação simples do formato do email (pode ser aprimorada)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, insira um email válido!');
        return;
    }

    // Verifica se as senhas correspondem
    if (senha !== confirmSenha) {
        alert('As senhas não correspondem!');
        return;
    }

    // Verifica se o email já existe no localStorage
    if (localStorage.getItem(email)) {
        alert('Este login já existe!');
        setTimeout(() => {
            window.location.href = 'login.html'; // Redireciona para a página de login após 1 segundo
        }, 1000); 
    } else {
        // Cria uma nova conta
        localStorage.setItem(email, senha);
        alert('Conta criada com sucesso!');
        setTimeout(() => {
            window.location.href = 'login.html'; // Redireciona para a página de login após 1 segundo
        }, 1000); 
    }
});
