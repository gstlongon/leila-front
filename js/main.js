class Main {
    /**
     * create a home
     */
    constructor() {
        this.init();
    }



    saveEvent() {
            document.getElementById('btnAddEvent').addEventListener('click', () => {
                var title = document.getElementById('title').value;
                var start = document.getElementById('start').value;
                var end = document.getElementById('end').value;

                var event = {
                start: start,
                end: end,
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
                console.log('Evento salvo:', data);
                calendar.addEvent(event);
                })
                .catch(error => {
                console.error('Erro ao salvar evento:', error);
                });

                document.getElementById('title').value = '';
                document.getElementById('start').value = '';
                document.getElementById('end').value = '';
                document.getElementById('description').value = '';
                document.getElementById('eventForm').style.display = 'none';
            });

            document.getElementById('btnCancel').addEventListener('click', () => {
                document.getElementById('eventForm').style.display = 'none';
            });
            
      }

      addCalendar(events) {
        document.addEventListener('DOMContentLoaded', function() {
            var calendarEl = document.getElementById('calendar');
        
            var calendar = new FullCalendar.Calendar(calendarEl, {
              headerToolbar: {
                left: 'prev,next, today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek,dayGridDay'
              },
              initialDate: '2023-01-12',
              navLinks: true, 
              editable: true,
              dayMaxEvents: true, 
              events: events
            });
            console.log(calendar.events)
            
            calendar.setOption('locale', 'pt-br');
            calendar.render();
          });

          
    }

    

    sendData() {
        document.addEventListener("DOMContentLoaded", () => {
            const form = document.getElementById("cadastroForm");
            form.addEventListener("submit", (event) => {
                event.preventDefault();

                const nome = document.getElementById("nome").value;
                const email = document.getElementById("email").value;
                const senha = document.getElementById("senha").value;
                const telefone = document.getElementById("telefone").value;

                const colaboradorData = {
                    nome,
                    email,
                    senha,
                    telefone,
                };
                // Enviar os dados para o backend usando o método fetch
                fetch("https://teste-salao.onrender.com/colaborador", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(colaboradorData),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Colaborador cadastrado com sucesso:", data);
                        // Aqui você pode exibir uma mensagem de sucesso ou redirecionar para outra página
                    })
                    .catch((error) => {
                        console.error("Erro ao cadastrar colaborador:", error);
                        // Exibir uma mensagem de erro ou tomar outra ação apropriada
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
        // this.sendData();
        console.log("hello");
    }
}

new Main();

// // Função para obter os colaboradores do backend
// async function obterColaboradores() {
//     try {
//         const response = await fetch("https://teste-salao.onrender.com/api/colaborador");
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Erro ao obter lista de colaboradores:", error);
//         return [];
//     }
// }

// // Exemplo de uso da função para obter os colaboradores
// obterColaboradores().then((colaboradores) => {
//     // Faça algo com os colaboradores, como criar o select dinâmico
//     // Por exemplo, chame uma função para criar o select e passe os colaboradores como parâmetro
//     criarSelectDinamico(colaboradores);
// });

// function criarSelectDinamico(colaboradores) {
//     const select = document.getElementById("selectColaborador");

//     // Limpar qualquer opção anterior no select, se houver
//     select.innerHTML = "";

//     // Criar uma opção padrão vazia para ser a primeira opção do select
//     const optionPadrao = document.createElement("option");
//     optionPadrao.value = "";
//     optionPadrao.text = "Selecione um colaborador";
//     select.appendChild(optionPadrao);

//     // Adicionar as opções dos colaboradores no select
//     colaboradores.forEach((colaborador) => {
//         const option = document.createElement("option");
//         option.value = colaborador._id; // Use o ID do colaborador como valor da opção (ou outra propriedade apropriada)
//         option.text = colaborador.nome; // Use o nome do colaborador como texto da opção (ou outra propriedade apropriada)
//         select.appendChild(option);
//     });
// }

// // Chame a função de obter os colaboradores aqui (conforme mostrado no passo 1)
// obterColaboradores().then((colaboradores) => {
//     criarSelectDinamico(colaboradores);
// });