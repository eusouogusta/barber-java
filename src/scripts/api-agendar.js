// Inicializa o Flatpickr e configura o comportamento do botão de agendamento quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function () {
    const agendarButtons = document.querySelectorAll('.agendarBtn');
    let selectedDateTime = null;  // Variável para armazenar data/hora selecionada

    agendarButtons.forEach(button => {
        button.addEventListener('click', async function () {
            // Verifica se o usuário está logado
            const isUserLoggedIn = await verificarLogin();

            if (!isUserLoggedIn) {
                // Exibe o alerta para login ou cadastro se o usuário não estiver logado
                Swal.fire({
                    title: 'Você não está logado!',
                    text: 'Para agendar um corte, você precisa estar logado.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Login',
                    cancelButtonText: 'Cadastrar',
                    cancelButtonColor: '#d33',
                    confirmButtonColor: '#3085d6'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = 'logar.html';
                    } else {
                        window.location.href = 'cadastro.html';
                    }
                });
            } else {
                // Verifica se o calendário já está aberto para o botão atual
                if (this.classList.contains('calendario-aberto')) {
                    return;
                }

                this.classList.add('calendario-aberto');

                // Cria um input para o date picker e um botão de confirmação
                const dateInput = document.createElement('input');
                dateInput.type = 'text';
                dateInput.classList.add('date-picker');

                const confirmButton = document.createElement('button');
                confirmButton.textContent = 'Confirmar';
                confirmButton.classList.add('confirm-btn');

                this.parentElement.appendChild(dateInput);
                this.parentElement.appendChild(confirmButton);

                // Inicializa o Flatpickr para o novo input
                flatpickr(dateInput, {
                    enableTime: true,
                    dateFormat: "Y-m-d H:i",
                    altInput: true,
                    altFormat: "d/m/Y H:i",
                    minDate: "today",
                    onChange: function(selectedDates, dateStr) {
                        selectedDateTime = dateStr;
                    }
                });

                // Evento de clique no botão de confirmação
                confirmButton.addEventListener('click', async () => {
                    const service = this.closest('tr').children[0].textContent.trim(); // Obtém o nome do serviço
                    const usuarioId = this.getAttribute('data-usuario-id');

                    if (selectedDateTime) {
                        await saveAppointment(service, selectedDateTime, usuarioId);
                    } else {
                        Swal.fire({
                            title: 'Erro',
                            text: 'Por favor, selecione uma data e hora.',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        });
                    }

                    // Remove o input, o botão e a classe 'calendario-aberto'
                    dateInput.remove();
                    confirmButton.remove();
                    this.classList.remove('calendario-aberto');
                });
            }
        });
    });
});

// Função para verificar se o usuário está logado
async function verificarLogin() {
    try {
        const response = await fetch('http://localhost:8080/api/verificar-login', {
            method: 'GET',
            credentials: 'include',
        });
        return response.ok;
    } catch (error) {
        console.error('Erro ao verificar login:', error);
        return false;
    }
}

// Função para salvar o agendamento com comunicação com a API e SweetAlert2
async function saveAppointment(servico, dataHora, usuarioId) {
    if (!usuarioId) {
        Swal.fire({
            title: 'Erro',
            text: 'ID do usuário não encontrado. Faça login novamente.',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return;
    }

    const dataISO = new Date(dataHora).toISOString();

    try {
        const response = await fetch('http://localhost:8080/agendar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usuario: { id: usuarioId },
                servico: servico,
                data: dataISO
            }),
        });

        if (response.ok) {
            Swal.fire({
                title: 'Agendamento Confirmado!',
                text: `Agendamento para "${servico}" confirmado para o dia e hora: ${dataHora}`,
                icon: 'success',
                confirmButtonText: '<i class="fas fa-check"></i> Confirmado',
            });
        } else {
            const errorData = await response.json();
            Swal.fire({
                title: 'Erro',
                text: errorData.message || 'Ocorreu um erro ao tentar confirmar o agendamento.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'Erro',
            text: 'Não foi possível se conectar ao servidor. Verifique sua conexão com a internet ou tente mais tarde.',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        console.error('Erro ao tentar se comunicar com a API:', error);
    }
}
