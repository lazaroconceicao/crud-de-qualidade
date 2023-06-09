/* eslint-disable no-console */
import fs from "fs"; // ES6
import { v4 as uuid } from "uuid";
// const fs = require('fs'); - Common.js
const DB_FILE_PATH = "./core/db";

// console.log("[CRUD]");

type UUID = string;

interface Todo {
    id: UUID;
    date: string;
    content: string;
    done: boolean;
}

function create(content: string): Todo {
    const todo: Todo = {
        id: uuid(),
        date: new Date().toISOString(),
        content: content,
        done: false,
    };
    const todos: Array<Todo> = [...read(), todo];
    //Salvar o content no sistema
    fs.writeFileSync(
        DB_FILE_PATH,
        JSON.stringify(
            {
                todos,
                dogs: [],
            },
            null,
            2
        )
    );
    return todo;
}

function updateContentById(id: UUID, content: UUID): Todo {
    return update(id, {
        content,
    });
}

export function read(): Array<Todo> {
    const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
    const db = JSON.parse(dbString || "{}");
    if (!db.todos) {
        return [];
    }
    return db.todos;
}

function update(id: UUID, partialTodo: Partial<Todo>) {
    let updatedTodo;
    const todos = read();
    todos.forEach((currentTodo) => {
        const isToUpdate = currentTodo.id === id;
        if (isToUpdate) {
            updatedTodo = Object.assign(currentTodo, partialTodo);
        }
    });
    fs.writeFileSync(
        DB_FILE_PATH,
        JSON.stringify(
            {
                todos,
            },
            null,
            2
        )
    );

    if (!updatedTodo) {
        throw new Error("Please, provide another id!");
    }
    return updatedTodo;
}

function deleteById(id: UUID) {
    const todos = read();

    const todoWithoutOne = todos.filter((todo) => {
        if (id === todo.id) {
            return false;
        }
        return true;
    });
    fs.writeFileSync(
        DB_FILE_PATH,
        JSON.stringify(
            {
                todos: todoWithoutOne,
            },
            null,
            2
        )
    );
}

function CLEAR_DB() {
    fs.writeFileSync(DB_FILE_PATH, "");
}

// [SIMULATION]
// CLEAR_DB();
// create("Primeira TODO!");
// const secondTodo = create("Segunda TODO!");
// deleteById(secondTodo.id);
// const thridTodo = create("Terceira TODO!");
// // update(thridTodo.id, {
// //     content: "ATUALIZADA!",
// //     done: true,
// // });
// updateContentById(thridTodo.id, "ATUALIZADA!");
// const todos = read();
// console.log(todos);
// console.log(todos.length);
