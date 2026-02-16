import html from './app.html?raw'
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases';


const ElementIDs = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    ActiveFilter: '.selected', /* Use Optional */
    PendingCountLabel: '#pending-count',
    
}; 

/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    };

    const updatePendingCount = () => {
        
        renderPending( ElementIDs.PendingCountLabel );
    }


    // Cuando la función App() se llama
    (()=> {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    // Referencias HTML
    const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );
    const todoListUL = document.querySelector( ElementIDs.TodoList );
    const clearCompletedButton = document.querySelector( ElementIDs.ClearCompleted );
    const filtersLink = document.querySelectorAll( ElementIDs.TodoFilters );

    // Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        
        if(event.keyCode !== 13) return;

        if(event.target.value.trim().length === 0) return;

        todoStore.addTodo( event.target.value );
        displayTodos();

        event.target.value = ''; 
    });

    // Toggle todo (marcar como completado)
    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    // Delete todo (eliminar)
    todoListUL.addEventListener('click', (event) => {
        const isDestroyButton = event.target.classList.contains('destroy');
        
        // Obtener el ID del todo
        const element = event.target.closest('[data-id]');
        // Verificar si se hizo click en el botón destroy
        if ( !element || !isDestroyButton ) return;
        const todoId = element.getAttribute('data-id');
        
        // Eliminar del store
        todoStore.deleteTodo(todoId);
        
        // Re-renderizar
        displayTodos();
    });

    /* todoListUL.addEventListener('click', (event) => {
        const isDestroyButton = event.target.classList.contains('destroy');
        console.log(isDestroyButton);
        if(!isDestroyButton) return;
        const element = event.target.closest('[data-id]');
        const id = element.getAttribute('data-id');

        todoStore.deleteTodo(id);
        displayTodos();
    }); */

    /*Button for delete the completed todos */
    clearCompletedButton.addEventListener('click', ()=>{
        
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLink.forEach(element => {
        element.addEventListener('click', (elem) => {
            filtersLink.forEach(el => el.classList.remove('selected'));
            elem.target.classList.add('selected');

            switch( elem.target.text ){
                case 'Todos':
                    todoStore.setFilter(Filters.All);
                break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed);
                break;

                default :
                    todoStore.setFilter(Filters.All);
                break;
            }
            displayTodos();
        });
    });

};