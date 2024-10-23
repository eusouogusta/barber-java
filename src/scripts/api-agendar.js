// Inicializa o Flatpickr quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function () {
    const agendarButtons = document.querySelectorAll('.agendarBtn');

    agendarButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Verifica se já existe um calendário aberto para este botão
            if (this.classList.contains('calendario-aberto')) {
                return;  // Se já estiver aberto, não faz nada
            }

            // Adiciona a classe 'calendario-aberto' para marcar que o calendário foi aberto
            this.classList.add('calendario-aberto');

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
                dateFormat: "Y-m-d H:i",  // Formato para envio (formato técnico)
                altInput: true,  // Habilita input alternativo
                altFormat: "d/m/Y H:i",  // Formato exibido para o usuário
                minDate: "today"
            });

            // Evento de clique no botão de confirmação
            confirmButton.addEventListener('click', async () => {
                const selectedDate = dateInput.value;
                if (selectedDate) {
                    // Salva o agendamento após o usuário confirmar
                    await saveAppointment(button, selectedDate);
                } else {
                    Swal.fire({
                        title: 'Erro',
                        text: 'Por favor, selecione uma data e hora.',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }

                // Remove o input, o botão e a classe 'calendario-aberto' após a confirmação
                dateInput.remove();
                confirmButton.remove();
                this.classList.remove('calendario-aberto');
            });
        });
    });
});

// Função para salvar o agendamento com comunicação com a API e SweetAlert2
async function saveAppointment(button, dateStr) {
    const service = button.closest('tr').querySelector('td:first-child').textContent.trim();
    
    // Obtém o ID do usuário do atributo data-usuario-id do botão
    const usuarioId = button.getAttribute('data-usuario-id');
    
    try {
        // Chama a função para enviar o agendamento ao backend (API)
        const response = await agendarServico(dateStr, service, usuarioId);

        // Verifica se a resposta da API foi bem-sucedida
        if (response.ok) {  // Caso a API retorne um status de sucesso
            const data = await response.json(); // Extrai os dados da resposta, se houver
            Swal.fire({
                title: 'Agendamento Confirmado!',
                text: `Agendamento para "${service}" confirmado para o dia e hora: ${dateStr}`,
                icon: 'success',
                confirmButtonText: '<i class="fas fa-check"></i> Confirmado',
                confirmButtonColor: '#3085d6',
                confirmButtonAriaLabel: 'Confirmar agendamento',
                customClass: {
                    confirmButton: 'swal2-confirm-button-custom'
                }
            });
        } else {
            // Trata erros de requisição
            Swal.fire({
                title: 'Erro',
                text: 'Ocorreu um erro ao tentar confirmar o agendamento. Por favor, tente novamente.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    } catch (error) {
        // Trata erros de comunicação com a API (problema de rede ou servidor)
        Swal.fire({
            title: 'Erro',
            text: 'Não foi possível se conectar ao servidor. Verifique sua conexão com a internet ou tente mais tarde.',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        console.error('Erro ao tentar se comunicar com a API:', error);
    }
}

// Função para agendar um serviço no backend
async function agendarServico(dataStr, servico, usuarioId) {
    // Converte a data para o formato ISO
    const data = new Date(dataStr).toISOString();

    try {
        const response = await fetch('http://localhost:8080/agendar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                usuario: { id: usuarioId }, // Enviando o usuário como objeto
                servico: servico,
                data: data // Usando o formato ISO
            }),
        });

        return response; // Retorna a resposta para o saveAppointment
    } catch (error) {
        console.error('Erro na função agendarServico:', error);
        throw error;  // Repassa o erro para ser tratado no saveAppointment
    }
}
