// Inicializa o Flatpickr quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function () {
  const agendarButtons = document.querySelectorAll('.agendarBtn');

  agendarButtons.forEach(button => {
      button.addEventListener('click', function () {
          // Cria um input temporário para o date picker
          const dateInput = document.createElement('input');
          dateInput.setAttribute('type', 'text');
          dateInput.classList.add('date-picker');

          // Cria um botão de confirmação
          const confirmButton = document.createElement('button');
          confirmButton.textContent = 'Confirmar';
          confirmButton.classList.add('confirm-btn');

          // Insere o input e o botão próximo ao botão clicado
          this.parentElement.appendChild(dateInput);
          this.parentElement.appendChild(confirmButton);

          // Inicializa o Flatpickr para o novo input
          flatpickr(dateInput, {
              enableTime: true,
              dateFormat: "Y-m-d H:i",
              minDate: "today"
          });

          // Evento de clique no botão de confirmação
          confirmButton.addEventListener('click', function () {
              const selectedDate = dateInput.value;
              if (selectedDate) {
                  // Salva o agendamento após o usuário confirmar
                  saveAppointment(button, selectedDate);
              } else {
                  alert('Por favor, selecione uma data e hora.');
              }

              // Remove o input e o botão após a confirmação
              dateInput.remove();
              confirmButton.remove();
          });
      });
  });
});

// Função para salvar o agendamento
async function saveAppointment(button, dateStr) {
  const service = button.closest('tr').querySelector('td:first-child').textContent.trim();
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  // Cria um novo objeto de agendamento
  const newAppointment = {
      service: service,
      date: dateStr
  };

  // Adiciona o novo agendamento à lista
  appointments.push(newAppointment);

  // Salva a lista atualizada no localStorage
  localStorage.setItem('appointments', JSON.stringify(appointments));

  // Exibe uma mensagem de confirmação
  alert(`Agendamento para "${service}" confirmado para o dia e hora: ${dateStr}`);

  // Aqui você pode adicionar a chamada para agendar no backend
  const usuarioId = 1; // Substitua pelo ID do usuário logado
  await agendarServico(dateStr, service, usuarioId);
}

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
