/*/ Função para realizar cadastro
async function register(name, email, password, confirmPassword) {
    try {
        const response = await fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: name,
                email: email,
                senha: password,
                repeticaoSenha: confirmPassword
            }),
        });

        if (!response.ok) {
            const errorData = await response.json(); // Captura a mensagem de erro detalhada do backend
            throw new Error(errorData.message || "Erro desconhecido"); // Lança o erro com a mensagem do backend
        }

        const data = await response.json();
        
        // Exibir mensagem de sucesso e redirecionar para logar.html
        Swal.fire({
            icon: 'success',
            title: 'Cadastro realizado com sucesso!',
            text: `Bem-vindo, ${name}! Você pode fazer login agora.`,
            confirmButtonText: 'OK'
        }).then(() => {
            window.location.href = 'logar.html'; // Redireciona para logar.html
        });

    } catch (error) {
        console.error('Erro:', error);
        handleError(error.message); // Passa a mensagem de erro para a função de tratamento de erro
    }
} */



    // Função para realizar cadastro
async function register(name, email, password, confirmPassword) {
    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
        return Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'As senhas não coincidem. Por favor, tente novamente.',
            confirmButtonText: 'OK'
        });
    }

    try {
        const response = await fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: name,
                email: email,
                senha: password,
                repeticaoSenha: confirmPassword // Enviando a repetição da senha
            }),
        });

        if (!response.ok) {
            const errorData = await response.json(); // Captura a mensagem de erro do backend
            throw new Error(errorData.message || "Erro desconhecido"); // Lança o erro com a mensagem do backend
        }

        const data = await response.json();

        // Exibir mensagem de sucesso e redirecionar para logar.html
        Swal.fire({
            icon: 'success',
            title: 'Cadastro realizado com sucesso!',
            text: `Bem-vindo, ${name}! Você pode fazer login agora.`,
            confirmButtonText: 'OK'
        }).then(() => {
            window.location.href = 'logar.html'; // Redireciona para logar.html
        });

    } catch (error) {
        console.error('Erro:', error);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: error.message || 'Erro ao realizar o cadastro.',
            confirmButtonText: 'OK'
        });
    }
}

// Chama a função quando o formulário de cadastro for enviado
document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Previne o envio padrão do formulário
    const name = document.getElementById('name').value; // Obtém o nome
    const email = document.getElementById('email').value; // Obtém o email
    const password = document.getElementById('password').value; // Obtém a senha
    const confirmPassword = document.getElementById('confirm-password').value; // Obtém a repetição da senha
    register(name, email, password, confirmPassword); // Chama a função de cadastro
});
