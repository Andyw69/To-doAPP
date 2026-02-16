# 💻 Ejemplos Prácticos: Construyendo un Store Completo

## Objetivo

Ver cómo evoluciona tu Store desde lo básico hasta un sistema profesional, con ejemplos reales que puedes probar en tu consola.

---

## 🎮 Cómo Usar Esta Guía

1. Lee cada nivel
2. Copia el código en tu proyecto
3. Prueba en la consola del navegador
4. Experimenta modificando los valores

---

## Nivel 1: Store Básico (Tu código inicial)

```javascript
// todo.store.js
import { Todo } from "../todos/models/todo.model";

const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending',
};

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo')
    ],
    filter: Filters.All
}

const initStore = () => {
    console.log(state);
    console.log('InitStore 🤠');
};

export default {
    initStore,
}
```

**Limitaciones:**
- Solo puedes inicializar
- No puedes agregar, eliminar o modificar todos
- No puedes cambiar el filtro

---

## Nivel 2: Store con CRUD Básico

```javascript
// todo.store.js
import { Todo } from "../todos/models/todo.model";

const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending',
};

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo')
    ],
    filter: Filters.All
}

let nextId = 4; // Para generar IDs únicos

const initStore = () => {
    console.log('InitStore 🤠');
    console.log('Todos iniciales:', state.todos);
};

// ============================================
// GETTERS (Leer datos)
// ============================================

/**
 * Obtiene todos los todos según el filtro actual
 * @returns {Array<Todo>}
 */
const getTodos = (filter = state.filter) => {
    switch(filter) {
        case Filters.All:
            return [...state.todos]; // Devolvemos una copia
        
        case Filters.Completed:
            return state.todos.filter(todo => todo.done === true);
        
        case Filters.Pending:
            return state.todos.filter(todo => todo.done === false);
        
        default:
            return [...state.todos];
    }
};

/**
 * Obtiene el filtro actual
 * @returns {String}
 */
const getFilter = () => state.filter;

// ============================================
// ACTIONS (Modificar datos)
// ============================================

/**
 * Agrega un nuevo todo
 * @param {String} description 
 */
const addTodo = (description) => {
    if (!description || description.trim() === '') {
        throw new Error('La descripción no puede estar vacía');
    }
    
    const newTodo = new Todo(description);
    newTodo.id = nextId++; // Asignamos un ID único
    
    state.todos.push(newTodo);
    
    console.log('Todo agregado:', newTodo);
};

/**
 * Elimina un todo por su ID
 * @param {Number} todoId 
 */
const deleteTodo = (todoId) => {
    const index = state.todos.findIndex(todo => todo.id === todoId);
    
    if (index === -1) {
        throw new Error(`Todo con ID ${todoId} no encontrado`);
    }
    
    const deleted = state.todos.splice(index, 1);
    console.log('Todo eliminado:', deleted[0]);
};

/**
 * Cambia el estado de un todo (done/undone)
 * @param {Number} todoId 
 */
const toggleTodo = (todoId) => {
    const todo = state.todos.find(t => t.id === todoId);
    
    if (!todo) {
        throw new Error(`Todo con ID ${todoId} no encontrado`);
    }
    
    todo.done = !todo.done;
    console.log(`Todo ${todoId} ahora está: ${todo.done ? 'completado' : 'pendiente'}`);
};

/**
 * Cambia el filtro actual
 * @param {String} newFilter 
 */
const setFilter = (newFilter) => {
    if (!Object.values(Filters).includes(newFilter)) {
        throw new Error(`Filtro inválido: ${newFilter}`);
    }
    
    state.filter = newFilter;
    console.log('Filtro cambiado a:', newFilter);
};

// ============================================
// EXPORT
// ============================================

export default {
    initStore,
    
    // Getters
    getTodos,
    getFilter,
    
    // Actions
    addTodo,
    deleteTodo,
    toggleTodo,
    setFilter,
    
    // Constantes
    Filters
}
```

### Uso en main.js

```javascript
// main.js
import todoStore from './store/todo.store.js';

// Inicializar
todoStore.initStore();

// Agregar todos
todoStore.addTodo('Estudiar JavaScript');
todoStore.addTodo('Hacer ejercicio');

// Obtener todos
console.log('Todos:', todoStore.getTodos());

// Marcar como completado
todoStore.toggleTodo(1);

// Eliminar
todoStore.deleteTodo(2);

// Cambiar filtro
todoStore.setFilter(todoStore.Filters.Completed);
console.log('Todos completados:', todoStore.getTodos());
```

---

## Nivel 3: Store con LocalStorage

```javascript
// todo.store.js
import { Todo } from "../todos/models/todo.model";

const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending',
};

const state = {
    todos: [],
    filter: Filters.All
}

// ============================================
// LOCALSTORAGE
// ============================================

const STORAGE_KEY = 'todo-app-state';

/**
 * Guarda el state en localStorage
 */
const saveToLocalStorage = () => {
    try {
        const stateToSave = {
            todos: state.todos,
            filter: state.filter
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
        console.log('💾 State guardado en localStorage');
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
    }
};

/**
 * Carga el state desde localStorage
 */
const loadFromLocalStorage = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        
        if (!saved) {
            console.log('No hay datos guardados, usando state inicial');
            return;
        }
        
        const parsed = JSON.parse(saved);
        
        // Reconstruir los todos como instancias de la clase Todo
        state.todos = parsed.todos.map(todoData => {
            const todo = new Todo(todoData.description);
            todo.id = todoData.id;
            todo.done = todoData.done;
            todo.createdAt = new Date(todoData.createdAt);
            return todo;
        });
        
        state.filter = parsed.filter || Filters.All;
        
        console.log('📂 State cargado desde localStorage');
    } catch (error) {
        console.error('Error al cargar desde localStorage:', error);
    }
};

/**
 * Limpia el localStorage
 */
const clearLocalStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
    console.log('🗑️ localStorage limpiado');
};

// ============================================
// INIT
// ============================================

const initStore = () => {
    console.log('InitStore 🤠');
    loadFromLocalStorage();
    
    // Si no hay todos, agregar algunos de ejemplo
    if (state.todos.length === 0) {
        state.todos = [
            new Todo('Piedra del alma'),
            new Todo('Piedra del infinito'),
            new Todo('Piedra del tiempo')
        ];
        
        // Asignar IDs
        state.todos.forEach((todo, index) => {
            todo.id = index + 1;
        });
        
        saveToLocalStorage();
    }
};

// ============================================
// GETTERS
// ============================================

const getTodos = (filter = state.filter) => {
    switch(filter) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done === true);
        case Filters.Pending:
            return state.todos.filter(todo => todo.done === false);
        default:
            return [...state.todos];
    }
};

const getFilter = () => state.filter;

// ============================================
// ACTIONS
// ============================================

const addTodo = (description) => {
    if (!description || description.trim() === '') {
        throw new Error('La descripción no puede estar vacía');
    }
    
    const newTodo = new Todo(description);
    
    // Generar ID único
    const maxId = state.todos.reduce((max, todo) => 
        todo.id > max ? todo.id : max, 0
    );
    newTodo.id = maxId + 1;
    
    state.todos.push(newTodo);
    saveToLocalStorage(); // ← Guardamos automáticamente
    
    console.log('Todo agregado:', newTodo);
};

const deleteTodo = (todoId) => {
    const index = state.todos.findIndex(todo => todo.id === todoId);
    
    if (index === -1) {
        throw new Error(`Todo con ID ${todoId} no encontrado`);
    }
    
    const deleted = state.todos.splice(index, 1);
    saveToLocalStorage(); // ← Guardamos automáticamente
    
    console.log('Todo eliminado:', deleted[0]);
};

const toggleTodo = (todoId) => {
    const todo = state.todos.find(t => t.id === todoId);
    
    if (!todo) {
        throw new Error(`Todo con ID ${todoId} no encontrado`);
    }
    
    todo.done = !todo.done;
    saveToLocalStorage(); // ← Guardamos automáticamente
    
    console.log(`Todo ${todoId} ahora está: ${todo.done ? 'completado' : 'pendiente'}`);
};

const setFilter = (newFilter) => {
    if (!Object.values(Filters).includes(newFilter)) {
        throw new Error(`Filtro inválido: ${newFilter}`);
    }
    
    state.filter = newFilter;
    saveToLocalStorage(); // ← Guardamos automáticamente
    
    console.log('Filtro cambiado a:', newFilter);
};

/**
 * Elimina todos los todos completados
 */
const clearCompleted = () => {
    const beforeCount = state.todos.length;
    state.todos = state.todos.filter(todo => !todo.done);
    const deletedCount = beforeCount - state.todos.length;
    
    saveToLocalStorage();
    console.log(`${deletedCount} todos completados eliminados`);
};

// ============================================
// EXPORT
// ============================================

export default {
    initStore,
    
    // Getters
    getTodos,
    getFilter,
    
    // Actions
    addTodo,
    deleteTodo,
    toggleTodo,
    setFilter,
    clearCompleted,
    
    // Storage
    clearLocalStorage,
    
    // Constantes
    Filters
}
```

---

## Nivel 4: Store con Patrón Observer (Avanzado)

Este patrón permite que la UI se actualice automáticamente cuando cambia el state.

```javascript
// todo.store.js
import { Todo } from "../todos/models/todo.model";

const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending',
};

const state = {
    todos: [],
    filter: Filters.All
}

// ============================================
// OBSERVER PATTERN
// ============================================

let subscribers = []; // Funciones que se ejecutan cuando cambia el state

/**
 * Suscribe una función para que se ejecute cuando cambie el state
 * @param {Function} callback 
 * @returns {Function} Función para desuscribirse
 */
const subscribe = (callback) => {
    if (typeof callback !== 'function') {
        throw new Error('El callback debe ser una función');
    }
    
    subscribers.push(callback);
    console.log('🔔 Nuevo suscriptor agregado');
    
    // Retornar función para desuscribirse
    return () => {
        subscribers = subscribers.filter(sub => sub !== callback);
        console.log('🔕 Suscriptor eliminado');
    };
};

/**
 * Notifica a todos los suscriptores que el state cambió
 */
const notifySubscribers = () => {
    console.log(`📢 Notificando a ${subscribers.length} suscriptores`);
    subscribers.forEach(callback => {
        try {
            callback(state);
        } catch (error) {
            console.error('Error en suscriptor:', error);
        }
    });
};

// ============================================
// LOCALSTORAGE
// ============================================

const STORAGE_KEY = 'todo-app-state';

const saveToLocalStorage = () => {
    try {
        const stateToSave = {
            todos: state.todos,
            filter: state.filter
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
    }
};

const loadFromLocalStorage = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return;
        
        const parsed = JSON.parse(saved);
        
        state.todos = parsed.todos.map(todoData => {
            const todo = new Todo(todoData.description);
            todo.id = todoData.id;
            todo.done = todoData.done;
            todo.createdAt = new Date(todoData.createdAt);
            return todo;
        });
        
        state.filter = parsed.filter || Filters.All;
    } catch (error) {
        console.error('Error al cargar desde localStorage:', error);
    }
};

// ============================================
// INIT
// ============================================

const initStore = () => {
    console.log('InitStore 🤠');
    loadFromLocalStorage();
    
    if (state.todos.length === 0) {
        state.todos = [
            new Todo('Piedra del alma'),
            new Todo('Piedra del infinito'),
            new Todo('Piedra del tiempo')
        ];
        
        state.todos.forEach((todo, index) => {
            todo.id = index + 1;
        });
        
        saveToLocalStorage();
    }
    
    // Notificar estado inicial
    notifySubscribers();
};

// ============================================
// GETTERS
// ============================================

const getTodos = (filter = state.filter) => {
    switch(filter) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done === true);
        case Filters.Pending:
            return state.todos.filter(todo => todo.done === false);
        default:
            return [...state.todos];
    }
};

const getFilter = () => state.filter;

const getTodosCount = () => ({
    total: state.todos.length,
    completed: state.todos.filter(t => t.done).length,
    pending: state.todos.filter(t => !t.done).length
});

// ============================================
// ACTIONS
// ============================================

const addTodo = (description) => {
    if (!description || description.trim() === '') {
        throw new Error('La descripción no puede estar vacía');
    }
    
    const newTodo = new Todo(description);
    const maxId = state.todos.reduce((max, todo) => 
        todo.id > max ? todo.id : max, 0
    );
    newTodo.id = maxId + 1;
    
    state.todos.push(newTodo);
    saveToLocalStorage();
    notifySubscribers(); // ← Notificamos el cambio
    
    console.log('Todo agregado:', newTodo);
};

const deleteTodo = (todoId) => {
    const index = state.todos.findIndex(todo => todo.id === todoId);
    
    if (index === -1) {
        throw new Error(`Todo con ID ${todoId} no encontrado`);
    }
    
    const deleted = state.todos.splice(index, 1);
    saveToLocalStorage();
    notifySubscribers(); // ← Notificamos el cambio
    
    console.log('Todo eliminado:', deleted[0]);
};

const toggleTodo = (todoId) => {
    const todo = state.todos.find(t => t.id === todoId);
    
    if (!todo) {
        throw new Error(`Todo con ID ${todoId} no encontrado`);
    }
    
    todo.done = !todo.done;
    saveToLocalStorage();
    notifySubscribers(); // ← Notificamos el cambio
    
    console.log(`Todo ${todoId} ahora está: ${todo.done ? 'completado' : 'pendiente'}`);
};

const setFilter = (newFilter) => {
    if (!Object.values(Filters).includes(newFilter)) {
        throw new Error(`Filtro inválido: ${newFilter}`);
    }
    
    state.filter = newFilter;
    saveToLocalStorage();
    notifySubscribers(); // ← Notificamos el cambio
    
    console.log('Filtro cambiado a:', newFilter);
};

const clearCompleted = () => {
    const beforeCount = state.todos.length;
    state.todos = state.todos.filter(todo => !todo.done);
    const deletedCount = beforeCount - state.todos.length;
    
    saveToLocalStorage();
    notifySubscribers(); // ← Notificamos el cambio
    
    console.log(`${deletedCount} todos completados eliminados`);
};

// ============================================
// EXPORT
// ============================================

export default {
    initStore,
    subscribe, // ← Nueva función
    
    // Getters
    getTodos,
    getFilter,
    getTodosCount, // ← Nueva función
    
    // Actions
    addTodo,
    deleteTodo,
    toggleTodo,
    setFilter,
    clearCompleted,
    
    // Constantes
    Filters
}
```

### Uso del Patrón Observer

```javascript
// app.js
import todoStore from './store/todo.store.js';

// Función que renderiza la UI
const renderTodos = () => {
    const todos = todoStore.getTodos();
    const todoList = document.querySelector('#todo-list');
    
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.description;
        li.className = todo.done ? 'completed' : '';
        todoList.appendChild(li);
    });
    
    // Actualizar contador
    const count = todoStore.getTodosCount();
    document.querySelector('#count').textContent = 
        `${count.pending} pendientes de ${count.total}`;
};

// Suscribirse a cambios del store
const unsubscribe = todoStore.subscribe((newState) => {
    console.log('El state cambió:', newState);
    renderTodos(); // Re-renderizar automáticamente
});

// Ahora, cada vez que cambies el store, la UI se actualiza sola
todoStore.addTodo('Nueva tarea'); // ← La UI se actualiza automáticamente
todoStore.toggleTodo(1);          // ← La UI se actualiza automáticamente
todoStore.deleteTodo(2);          // ← La UI se actualiza automáticamente

// Si quieres dejar de escuchar cambios:
// unsubscribe();
```

---

## Comparación de Niveles

| Característica | Nivel 1 | Nivel 2 | Nivel 3 | Nivel 4 |
|----------------|---------|---------|---------|---------|
| Inicialización | ✅ | ✅ | ✅ | ✅ |
| CRUD básico | ❌ | ✅ | ✅ | ✅ |
| Persistencia | ❌ | ❌ | ✅ | ✅ |
| Auto-actualización UI | ❌ | ❌ | ❌ | ✅ |
| Validaciones | ❌ | ✅ | ✅ | ✅ |
| Filtros | ❌ | ✅ | ✅ | ✅ |

---

## 🎯 Próximos Pasos

1. Implementa el Nivel 2 en tu proyecto
2. Prueba cada función en la consola
3. Conecta las funciones con tu UI (app.js)
4. Agrega localStorage (Nivel 3)
5. Implementa el patrón Observer (Nivel 4)

---

**¡Estás construyendo un Store profesional desde cero! Esto es exactamente lo que hacen Redux, Vuex y otras librerías famosas.**
