async function get() {
    return fetch("/api/todos").then(async (respostaDoServidor) => {
        const todosEmString = await respostaDoServidor.text();
        const todosFromServer = JSON.parse(todosEmString).todos;
        return todosFromServer;
    });
}

export const todoController = {
    get,
};
