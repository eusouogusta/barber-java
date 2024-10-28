// Função para realizar cadastro
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
        // Exibir mensagem de sucesso
        Swal.fire({
            icon: 'success',
            title: 'Cadastro realizado com sucesso!',
            text: `Bem-vindo, ${name}! Você pode fazer login agora.`,
            confirmButtonText: 'OK'
        });

    } catch (error) {
        console.error('Erro:', error);
        handleError(error.message); // Passa a mensagem de erro para a função de tratamento de erro
    }
}

// Função para lidar com erros específicos do backend
function handleError(message) {
    // Exibir mensagem de erro usando SweetAlert2
    Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar',
        text: message, // Usa a mensagem de erro recebida do backend
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
document.getElementById("backButton").addEventListener("click", function () {
    window.history.back(); // Retorna à página anterior
});
