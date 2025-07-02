const FIREBASE_DOMAIN = process.env.REACT_APP_FIREBASE_API

export async function addTodo(todoData) {
    const response = await fetch(`${FIREBASE_DOMAIN}/add-todo.json`, {
        method: 'POST',
        body: JSON.stringify(todoData),
        headers: {
            'Content-type': 'application/json'
        }
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Could not add Todos.")
    }

    return { id: data.name }
}

export async function getAllTodos() {
    const response = await fetch(`${FIREBASE_DOMAIN}/add-todo.json`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Could not fetch all Todos.")
    }

    const todos = [];
    for (const key in data) {
        todos.push({
            id: key,
            ...data[key]
        })
    }

    return todos.reverse();
}

export async function getSingleTodo(todoId){
    const response = await fetch(`${FIREBASE_DOMAIN}/add-todo/${todoId}.json`);
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || "Could not fetch single todo.")
    }
    return data;
}

export async function updateTodo(todoId,updatedText){
    const response = await fetch(`${FIREBASE_DOMAIN}/add-todo/${todoId}.json`,{
        method : 'PATCH',
        body : JSON.stringify({ todo : updatedText}),
        headers : {
            'Content-type' : 'application/json'
        }
    })

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || "Could not update the todo.")
    }
    return data;
}

export async function deleteTodo(todoId) {
    const response = await fetch(`${FIREBASE_DOMAIN}/add-todo/${todoId}.json`, {
        method: 'DELETE'
    })

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Could not delete Todo.")
    }

    return true;
}

export async function toggleTodo(todoId, completed) {
    const response = await fetch(`${FIREBASE_DOMAIN}/add-todo/${todoId}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ completed }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Could not update todo status.');
    }

    return true;
}