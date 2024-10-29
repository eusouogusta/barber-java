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
}
