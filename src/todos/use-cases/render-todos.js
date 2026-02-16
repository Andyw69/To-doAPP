import { Todo } from "../models/todo.model";
import { createTodoHTML } from "./create-todo-html";

let element;
/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = (elementId, todos = []) => {

    // TODO: referencia
    if( !element ) element = document.querySelector(elementId);
    if( !element ) throw new Error(`Element ${elementId} not found`)
    // ✅ SOLUCIÓN: Limpiar el contenedor antes de renderizar
    element.innerHTML = '';

    todos.forEach( todo => {
        element.append(createTodoHTML(todo));
    });

};