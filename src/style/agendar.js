$(document).ready(function() {
    // Inicializando o FullCalendar
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        selectable: true,
        select: function(start, end) {
            var title = prompt('Digite o título do agendamento:');
            if (title) {
                var eventData = {
                    title: title,
                    start: start,
                    end: end
                };
                $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
            }
            $('#calendar').fullCalendar('unselect');
        },
        editable: true,
        eventLimit: true // permite "ver mais" se houver muitos eventos
    });

    // Evento de clique para mostrar o calendário
    $('.agendarBtn').on('click', function() {
        $('#calendar').toggle(); // Alterna a exibição do calendário
    });
});
