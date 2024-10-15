// Função para realizar login
async function login(username, password) {
    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: username, senha: password }), // Ajuste conforme esperado pelo backend
        });

        if (!response.ok) {
            throw new Error('Erro ao realizar login');
        }

        const data = await response.json();
        console.log('Login bem-sucedido:', data);
        // Redireciona o usuário para a página de agendamento após o login
        window.location.href = "agendar.html";

    } catch (error) {
        console.error('Erro:', error);
        alert('Usuário ou senha incorretos');
    }
}

// Chama a função quando o formulário de login for enviado
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Previne o envio padrão do formulário
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
});
