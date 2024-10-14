// api-restauracao.js

// Redireciona para a página de login ao clicar no botão "Voltar"
document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = "logar.html"; // Altere para a página de login ou qualquer outra que desejar
});

// Envia o e-mail para restauração de senha
document.getElementById('resetForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    const email = document.getElementById('email').value;

    // Chama a função para solicitar a restauração
    solicitarRestauracao(email);
});

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
        alert(data.message); // Mostra mensagem de sucesso ou erro
        window.location.href = "email-restauracao.html"; // Redirecionar para a página de confirmação

    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao solicitar a restauração da senha. Tente novamente.');
    }
}
