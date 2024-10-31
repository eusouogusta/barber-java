/*/ Função para realizar login
async function login(email, password) {
    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, senha: password }), // Certifique-se de que os campos estão corretos
        });

        if (!response.ok) {
            const errorData = await response.json(); // Captura a mensagem de erro do backend
            throw new Error(errorData.message || 'Erro ao realizar login'); // Lança o erro com a mensagem do backend
        }

        const data = await response.json();
        console.log('Login bem-sucedido:', data);

        // Armazenar o ID do usuário no sessionStorage
        const userId = data.id; // O ID vem da resposta do backend
        sessionStorage.setItem('userId', userId); // Armazena o ID

        // Exibe mensagem de sucesso usando SweetAlert2
        Swal.fire({
            icon: 'success',
            title: 'Bem-vindo!',
            text: 'Login realizado com sucesso.',
            confirmButtonText: 'OK'
        }).then(() => {
            // Redireciona o usuário para a página index.html após o login
            window.location.href = "index.html";
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
    console.log("Tentando fazer login..."); // Log para depuração
    const email = document.getElementById('username').value; // Use o ID correto
    const password = document.getElementById('password').value; // Use o ID correto
    login(email, password); // Chama a função de login
}); */

async function login(email, password) {
    try {
        const response = await fetch('http://localhost:8080/logar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha: password }), // Campos corretos
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao realizar login');
        }

        const data = await response.json();
        sessionStorage.setItem('userId', data.id); // Armazena o ID

        // Mensagem de sucesso
        Swal.fire({
            icon: 'success',
            title: 'Bem-vindo!',
            text: 'Login realizado com sucesso.',
            confirmButtonText: 'OK'
        }).then(() => {
            window.location.href = "index.html"; // Redireciona
        });

    } catch (error) {
        console.error('Erro:', error);

        // Mensagem de erro
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: error.message || 'Usuário ou senha incorretos.',
            confirmButtonText: 'OK'
        });
    }
}

// Chama a função quando o formulário de login for enviado
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Previne o envio padrão do formulário
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(email, password);
});

