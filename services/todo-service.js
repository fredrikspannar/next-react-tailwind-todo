
// in-memory storage
let todoList = [];

export function setCompletedTodo(id, isCompleted) {
    let updatedItem = null;

    const newList = todoList.map( (item) => {
        // match id
        if ( item.id !== id ) {
            // return other todo
            return item;
        } else {
            // matched todo, update completed
            updatedItem = { ...item, isCompleted: isCompleted};
            return updatedItem;
        }
    });

    // update in-memory storage with updated list
    todoList = newList;

    // return updated item
    return updatedItem;
}

export function createTodo(title) {
    // setup object to store and push to memory
    const newTodo = { title: title, isCompleted: 0, id: todoList.length+1};
    todoList.push(newTodo);

    // return created todo
    return newTodo;
}

export function updateTodo(id, title) {
    let updatedItem = null;

    const newList = todoList.map( (item) => {
        // match id
        if ( item.id !== id ) {
            // return other todo
            return item;
        } else {
            // matched todo, update title and completed
            updatedItem = { ...item, title: title};
            return updatedItem;
        }
    });

    // update in-memory storage with updated list
    todoList = newList;

    // return updated item
    return updatedItem;
}

export function getAllTodos() {
    // return all todos stored
    return todoList;
}