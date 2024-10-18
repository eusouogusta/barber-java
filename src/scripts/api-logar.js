// Função para realizar login
async function login(email, password) {
    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, senha: password }), // Ajuste conforme esperado pelo backend
        });

        if (!response.ok) {
            const errorData = await response.json(); // Captura a mensagem de erro do backend
            throw new Error(errorData.message || 'Erro ao realizar login'); // Lança o erro com a mensagem do backend
        }

        const data = await response.json();
        console.log('Login bem-sucedido:', data);

        // Exibe mensagem de sucesso usando SweetAlert2
        Swal.fire({
            icon: 'success',
            title: 'Bem-vindo!',
            text: 'Login realizado com sucesso.',
            confirmButtonText: 'OK'
        }).then(() => {
            // Redireciona o usuário para a página de agendamento após o login
            window.location.href = "agendar.html";
        });

    } catch (error) {
        console.error('Erro:', error);

        // Exibe mensagem de erro usando SweetAlert2
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: error.message || 'Usuário ou senha incorretos. Por favor, tente novamente.', // Usa a mensagem do backend
            confirmButtonText: 'OK'
        });
    }
}

// Chama a função quando o formulário de login for enviado
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Previne o envio padrão do formulário
    const email = document.getElementById('username').value; // Alterado para 'email' para melhor clareza
    const password = document.getElementById('password').value;
    login(email, password);
});
