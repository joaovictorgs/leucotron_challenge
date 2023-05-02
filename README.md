Projeto de desafio leucotron

Desafio:
Desenvolva um software de gerenciamento de compromissos e agenda de reuniões que permita aos usuários visualizar e agendar compromissos e reuniões
Requisitos:
O software deve permitir aos usuários criar e agendar compromissos, definindo a data, hora, duração, localização, titulo e descrição. O software deve permitir aos usuários convidar participantes para as reuniões através de um e-mail.

para teste no terminal digite os comandos
npm install
node index.js

recomenda-se utilizar uma plataforma como o insomnia ou postman para as requisições http

as rotas são (nota: as chaves JSON são essenciais para algumas rotas, o cabeçalho é padrão mas o valor atribuido a ele depende do usuário):

    Rota para verificar os eventos que um usuário criou: GET http://localhost:8080/event
Json enviado para essa rota deve conter o campo: 
{
	"email":"victor.godoy@email.com"
}

    Rota padrão da pag: GET http://localhost:8080

    Rota para ver todos os usuarios criados: GET http://localhost:8080/allUsers

    Rota para criar um usuário: POST http://localhost:8080/create/user
jSON enviado para essa rota deve conter os campos:
{
	"email":"victor.godoy@email.com",
	"user":"victor",
	"senha":"123"
}

    Rota para adicionar um evento(nota, caso queira enviar um convite para mais de um email, separar no campo convidado os emails com uma virgula sem espaço): POST http://localhost:8080/addEvent
JSON enviado para essa rota deve conter os campos:
{
    {
	"email":"joao.godoy@email.com",
	 "atividades":{"data":"24/05/2023","hora":"15:00h","duracao":"2h","localizacao":"Santa Rita Do sapucai","descricao":"Reunião","convidados":"exemploemail@gmail.com,exemploemail2@gmail.com"}
}
}

    Rota para deletar um usuário: DELETE http://localhost:8080/delete/user
JSON enviado para essa rota deve conter os campos:
{
	"email":"victor.godoy@email.com",
	"senha":"123"
}

    Rota para deletar um evento pelo _id dele: DELETE http://localhost:8080/delete/event
JSON enviado para essa rota deve conter o campo:
{
	"_id": "644fd29ffaf744ac09475a80"
}
