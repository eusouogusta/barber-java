// Função para realizar cadastro
async function register(name, email, password) {
    try {
        const response = await fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar');
        }

        const data = await response.json();
        console.log('Cadastro bem-sucedido:', data);
        
        // Exibir mensagem de sucesso
        Swal.fire({
            icon: 'success',
            title: 'Cadastro realizado com sucesso!',
            text: `Bem-vindo, ${name}! Você pode fazer login agora.`,
            confirmButtonText: 'OK'
        });

    } catch (error) {
        console.error('Erro:', error);
        // Exibir mensagem de erro
        Swal.fire({
            icon: 'error',
            title: 'Erro ao cadastrar',
            text: 'Houve um problema ao cadastrar. Tente novamente.',
            confirmButtonText: 'OK'
        });
    }
}

// Chame a função quando o formulário for enviado
document.getElementById('registerForm').addEventListener('submit', function (event) {
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

    register(name, email, password);
});

// Evento para o botão "Voltar"
document.getElementById("backButton").addEventListener("click", function() {
    window.history.back(); // Retorna à página anterior
});
