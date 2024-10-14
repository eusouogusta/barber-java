// Função para agendar um serviço
async function agendarServico(data, servico, usuarioId) {
    try {
      const response = await fetch('http://localhost:8080/agendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data, servico, usuarioId }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao agendar serviço');
      }
  
      const dataResponse = await response.json();
      console.log('Agendamento bem-sucedido:', dataResponse);
      // Aqui você pode redirecionar o usuário ou mostrar uma mensagem de sucesso
    } catch (error) {
      console.error('Erro:', error);
    }
  }
  
  // Chame a função quando um botão de agendar for clicado
  document.querySelectorAll('.agendarBtn').forEach((button) => {
    button.addEventListener('click', function () {
      const servico = this.parentElement.parentElement.children[0].textContent; // Nome do serviço
      const data = document.getElementById('calendar').flatpickr.selectedDateStr; // Data selecionada
      const usuarioId = 1; // Substitua pelo ID do usuário logado
  
      if (data) {
        agendarServico(data, servico, usuarioId);
      } else {
        alert('Por favor, selecione uma data.');
      }
    });
  });
  