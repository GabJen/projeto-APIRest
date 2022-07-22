import express from 'express';
import {StatusCodes} from 'http-status-codes';

const app = express();

//Pega a porta da variável de ambiente do servidor OU a porta 3000
const PORT = process.env.PORT || 3000;

let users = [
	{id: 1, name: 'Rafael Ribeiro', age: 30},
	{id: 2, name: 'Gabriela', age: 27}
];

app.use(express.json());

app.listen(PORT, () => {
	console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/', (request, response) => {
	return response.send('<h1>Trabalhando com servidor express</h1>');
});

//GET ENDPOINT
app.get('/users', (request, response) => {
	return response.send(users);
});

app.get('/users/:userId', (request, response) => {
	const userId = request.params.userId;
	const user = users.find(user =>{
		return users.id === Number(userId);
	});
	return response.send(user);
});


//POST ENDPOINT
app.post('/users', (request, response) => {
	const newUser = request.body;

	users.push(newUser);

	return response.status(StatusCodes.CREATED).send(newUser)
})

//PUT ENDPOINT
app.put('/users/:userId', (request, response) => {
	const userId = request.params.userId;
	const updatedUser = request.body;

	users = users.map(user => {
		if(Number(userId) === user.id) {
			return updatedUser;
		}
		return user;
	});

	return response.send(updatedUser);
});

//DELETE ENDPOINT
app.delete('/users/:userId', (request, response) => {
	const userId = request.params.userId;

	users = users.filter((user)=>user.id !== Number(userId));

	return response.status(StatusCodes.NO_CONTENT).send();
});