
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function setCompletedTodo(id, isCompleted) {
    try {
        const completed = Number.isInteger(isCompleted) ? Boolean(isCompleted) : isCompleted;

        // save to db
        const todo = await prisma.todo.update({
            where: { id: id },
            data: {
                isCompleted: completed
            }
        });

        // return created todo
        return todo;

    } catch(e) {
        console.error('Failed to update Todo in database. Error: ',e);
        return e;
    }
}

export async function createTodo(title) {

    try {
        // save to db
        const todo = await prisma.todo.create({
            data: {
                title: title,
                isCompleted: false
            }
        });

        // return created todo
        return todo;

    } catch(e) {
        console.error('Failed to save Todo to database. Error: ',e);
        return e;
    }
}

export async function updateTodo(id, title) {
    try {
        // save to db
        const todo = await prisma.todo.update({
            where: { id: id },
            data: {
                title: title
            }
        });

        // return created todo
        return todo;

    } catch(e) {
        console.error('Failed to update Todo in database. Error: ',e);
        return e;
    }
}

export async function getAllTodos() {
    
    try {
        // return all todos stored    
        const todos = await prisma.todo.findMany();

        // return list
        return todos;

    } catch(e) {
        console.error('Failed to get Todos from database. Error: ',e);
        return e;
    }
}