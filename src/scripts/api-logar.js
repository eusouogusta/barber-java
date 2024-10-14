// Função para realizar login
async function login(username, password) {
    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Erro ao realizar login');
        }

        const data = await response.json();
        console.log('Login bem-sucedido:', data);
        // Aqui você pode redirecionar o usuário ou armazenar o token
        // Exemplo de redirecionamento:
        window.location.href = "agendar.html"; // Redirecionar para a página de agendamento

    } catch (error) {
        console.error('Erro:', error);
        alert('Usuário ou senha incorretos');
    }
}

// Chame a função quando o formulário for enviado
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Previne o envio padrão do formulário
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
});
