// Inicializa o Flatpickr quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function () {
    const agendarButtons = document.querySelectorAll('.agendarBtn');

    agendarButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Cria um input temporário para o date picker
            const dateInput = document.createElement('input');
            dateInput.setAttribute('type', 'text');
            dateInput.classList.add('date-picker');

            // Insere o input próximo ao botão clicado
            this.parentElement.appendChild(dateInput);

            // Inicializa o Flatpickr para o novo input
            flatpickr(dateInput, {
                enableTime: true,
                dateFormat: "Y-m-d H:i",
                minDate: "today",
                onClose: function (selectedDates, dateStr) {
                    if (dateStr) {
                        // Salva o agendamento após selecionar a data
                        saveAppointment(button, dateStr);
                    }
                    // Remove o date picker após selecionar a data
                    dateInput.remove();
                }
            });

            // Abre o date picker imediatamente
            dateInput.click();
        });
    });
});

// Função para salvar o agendamento
function saveAppointment(button, dateStr) {
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
}
