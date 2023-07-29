class Main {
    /**
     * create a home
     */
    constructor() {
        this.init();
    }

    saveEvent() {
            document.getElementById('btnAddEvent').addEventListener('click', () => {
                const secSelect = document.getElementById('servico')
                const title = document.getElementById('title').value
                const start = document.getElementById('start').value
                const description = document.getElementById('description').value
                let time = 0
                let timeMode = ''

                if (secSelect.value == 'cabelo-m') {
                    time = 30
                    timeMode = 'minutes'
                } else if (secSelect.value == 'cabelo-f') {
                    time = 60
                    timeMode = 'minutes'
                } else if (secSelect.value == 'progressiva') {
                    time = 60
                    timeMode = 'minutes'
                } else if (secSelect.value == 'maquiagem') {
                    time = 40
                    timeMode = 'minutes'
                } else if (secSelect.value == 'manicure') {
                    time = 30
                    timeMode = 'minutes'
                } else if (secSelect.value == 'manicure-pedicure') {
                    time = 60
                    timeMode = 'minutes'
                }

                const event = {
                title: title,
                start: start,
                end: moment.utc(start).add(time, timeMode).format(),
                description: description
                };

                fetch('https://teste-salao.onrender.com/horario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
               
                body: JSON.stringify(event)
                })
                .then(response => response.json())
                .then(data => {
                window.alert(`Horário Agendado!!`)
                console.log('Evento salvo:', data);
                })
                .catch(error => {
                console.error('Erro ao salvar evento:', error);
                });

                document.getElementById('title').value = '';
                document.getElementById('start').value = '';
                document.getElementById('description').value = '';
            });

      }

    addCalendar() {
        document.addEventListener('DOMContentLoaded', () => {
            var calendarEl = document.getElementById('calendar');
            var calendar = new FullCalendar.Calendar(calendarEl, {
                headerToolbar: {
                    left: 'prev,next, today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek,dayGridDay'
                },
                initialDate: new Date(),
                navLinks: true,
                editable: true,
                dayMaxEvents: true,
                events: [] ,
                eventClick: function(info) {
                    alert('Event: ' + info.event.title);
                },
                eventDrop: function(info) {
                    alert(info.event.title + "trocou para data" + info.event.start.toISOString());
                    if (!confirm("Deseja realizar mudança?")) {
                    info.revert();
                    }

                    var event = info.event;
                    var updatedEvent = {
                      _id: event.id,
                      title: event.title,
                      start: event.start.toISOString(), 
                      end: event.end.toISOString(), 
                      description: event.description
                    }
                    fetch('https://teste-salao.onrender.com/updateHorario', {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedEvent)
                      })
                      .then(response => response.json())
                      .then(data => {
                        console.log('Evento atualizado:', data);
                      })
                      .catch(error => {
                        console.error('Erro ao atualizar evento:', error);
                      });
                }
            });


        
            calendar.setOption('locale', 'pt-br');
        
            const myModal = document.querySelector("#exampleModal");
            myModal.addEventListener("shown.bs.modal", () => {
                calendar.render();

                fetch('https://teste-salao.onrender.com/return-horario')
                    .then(response => response.json())
                    .then(data => {
                        if (data && Array.isArray(data.events) && Array.isArray(data.colaboradores)) {
                          var eventsArray = data.events.map(event => ({
                            title: event.title, 
                            start: moment.utc(event.start).add(3, 'hours').format(),
                            end: moment.utc(event.end).add(3, 'hours').format(),
                            description: event.description
                        }));}
                        calendar.setOption('events', eventsArray);
                        console.log(eventsArray)
                    })
                    .catch(error => {
                        console.error('Erro ao obter os eventos:', error);
                    });
            });
        });
    }
    

    

    /**
     * initialize instance
     */
    init() {
        this.saveEvent()
        this.addCalendar()
        console.log("hello");
    }
}

new Main();
