// Função para solicitar o envio do e-mail de restauração
async function solicitarRestauracao(email) {
    try {
        const response = await fetch('http://localhost:8080/restauracao-senha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error('Erro ao enviar e-mail de restauração');
        }

        const data = await response.json();
        console.log('E-mail de restauração enviado:', data.message);
        // Redirecionar para a página de confirmação
        window.location.href = "email-restauracao.html"; 

    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao solicitar a restauração da senha. Tente novamente.');
    }
}

// Exemplo de como chamar a função (apenas se o HTML tiver um formulário)
document.getElementById('formRestauracao').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('emailRestauracao').value;
    solicitarRestauracao(email);
});

// Redireciona para a página de login ao clicar no botão "Voltar"
document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = "logar.html"; // Altere para a página de login ou qualquer outra que desejar
});
