// Função para realizar cadastro
async function register(name, email, password, confirmPassword) {
    try {
        const response = await fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome: name, email: email, senha: password, repeticaoSenha: confirmPassword }), // Incluindo repeticaoSenha
        });

        if (!response.ok) {
            const errorData = await response.json(); // Captura a mensagem de erro detalhada do backend
            handleError(errorData.message); // Passa a mensagem de erro para a função de tratamento de erro
            throw new Error(`Erro ao cadastrar: ${errorData.message}`);
        }

        const data = await response.json();
        // Exibir mensagem de sucesso
        Swal.fire({
            icon: 'success',
            title: 'Cadastro realizado com sucesso!',
            text: `Bem-vindo, ${name}! Você pode fazer login agora.`,
            confirmButtonText: 'OK'
        });

    } catch (error) {
        console.error('Erro:', error);
    }
}

// Função para lidar com erros específicos do backend
function handleError(message) {
    let errorMessage = '';

    if (message.includes('nome')) {
        errorMessage = 'O nome não pode ser nulo ou já existe em nossa base de dados.';
    } else if (message.includes('email inválido')) {
        errorMessage = 'O formato do email é inválido.';
    } else if (message.includes('email já existe')) {
        errorMessage = 'Esse email já existe em nossa base de dados.';
    } else if (message.includes('senha')) {
        errorMessage = 'A senha não pode ser nula ou deve corresponder à repetição.';
    } else {
        errorMessage = 'Houve um problema ao cadastrar. Tente novamente.';
    }

    // Exibir mensagem de erro usando SweetAlert2
    Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar',
        text: errorMessage,
        confirmButtonText: 'OK'
    });
}

// Chame a função quando o formulário for enviado
document.querySelector('.formulario').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Verificar se as senhas correspondem
    if (password !== confirmPassword) {
        Swal.fire({
            icon: 'warning',
            title: 'Atenção!',
            text: 'As senhas não correspondem!',
            confirmButtonText: 'OK'
        });
        return;
    }

    register(name, email, password, confirmPassword); // Passando confirmPassword
});

// Evento para o botão "Voltar"
document.getElementById("backButton").addEventListener("click", function() {
    window.history.back(); // Retorna à página anterior
});
