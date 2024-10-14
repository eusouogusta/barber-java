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
        // Aqui você pode redirecionar o usuário para a página de confirmação
        window.location.href = "email-restauracao.html"; // Redirecionar para a página de confirmação

    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao solicitar a restauração da senha. Tente novamente.');
    }
}

// Exemplo de como chamar a função
document.getElementById('formRestauracao').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('emailRestauracao').value;
    solicitarRestauracao(email);
});
