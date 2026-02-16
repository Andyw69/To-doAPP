# 🔄 Flujo Visual Completo: Tu TodoApp

## 📊 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                         USUARIO                                  │
│                    (Abre la página)                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      index.html                                  │
│  <div id="app"></div>  ← Contenedor vacío                       │
│  <script src="main.js"></script>                                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                       main.js                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 1. import './style.css'                                  │  │
│  │ 2. import { App } from './todos/app'                     │  │
│  │ 3. import todoStore from './store/todo.store.js'         │  │
│  │                                                           │  │
│  │ 4. todoStore.initStore();  ← Inicializa el state        │  │
│  │ 5. App('#app');            ← Construye la interfaz      │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────┬───────────────────────────────────┬────────────────┘
             │                                   │
             ▼                                   ▼
┌─────────────────────────┐      ┌──────────────────────────────┐
│   todo.store.js         │      │      todos/app.js            │
│   (El Cerebro)          │      │      (La Interfaz)           │
│                         │      │                              │
│  const state = {        │      │  1. Importa HTML template    │
│    todos: [...],        │      │  2. Importa todoStore        │
│    filter: 'all'        │      │  3. Importa use-cases        │
│  }                      │      │                              │
│                         │      │  4. Crea estructura HTML     │
│  export default {       │      │  5. Renderiza todos          │
│    initStore,           │      │  6. Maneja eventos           │
│    addTodo,             │      │                              │
│    deleteTodo,          │      └──────────┬───────────────────┘
│    toggleTodo,          │                 │
│    getTodos,            │                 │
│    ...                  │                 ▼
│  }                      │      ┌──────────────────────────────┐
└────────┬────────────────┘      │   use-cases/                 │
         │                       │   (Funciones Específicas)    │
         │                       │                              │
         │                       │  ├── render-todos.js         │
         │                       │  │   → Renderiza lista       │
         │                       │  │                           │
         │                       │  ├── create-todo-html.js     │
         │                       │  │   → Crea elemento HTML    │
         │                       │  │                           │
         │                       │  └── index.js (barrel)       │
         │                       │      → Re-exporta todo       │
         │                       └──────────────────────────────┘
         │
         ▼
┌─────────────────────────┐
│   models/               │
│   (Estructura de Datos) │
│                         │
│  class Todo {           │
│    id                   │
│    description          │
│    done                 │
│    createdAt            │
│  }                      │
└─────────────────────────┘
```

---

## 🎬 Flujo de Ejecución: Paso a Paso

### Fase 1: Inicialización (Se ejecuta UNA vez)

```
1. Usuario abre index.html
   ↓
2. Navegador carga main.js
   ↓
3. main.js importa dependencias:
   - style.css (estilos)
   - App (función para crear interfaz)
   - todoStore (manejo de datos)
   ↓
4. main.js ejecuta: todoStore.initStore()
   ↓
5. todo.store.js inicializa el state:
   state = {
     todos: [
       new Todo('Piedra del alma'),
       new Todo('Piedra del infinito'),
       ...
     ],
     filter: 'all'
   }
   ↓
6. main.js ejecuta: App('#app')
   ↓
7. app.js crea la estructura HTML:
   - Carga app.html
   - Crea un div
   - Inserta el HTML en #app
   ↓
8. app.js ejecuta: displayTodos()
   ↓
9. displayTodos() llama a:
   - todoStore.getTodos() → Obtiene los todos
   - todoStore.getCurrentFilter() → Obtiene el filtro
   - renderTodos() → Renderiza en pantalla
   ↓
10. Usuario ve la interfaz con los todos iniciales
```

---

### Fase 2: Interacción del Usuario

#### Ejemplo: Usuario agrega un todo

```
1. Usuario escribe "Comprar pan" y presiona Enter
   ↓
2. app.js detecta el evento (keypress o click)
   ↓
3. app.js llama a: todoStore.addTodo('Comprar pan')
   ↓
4. todo.store.js ejecuta addTodo():
   - Valida que la descripción no esté vacía
   - Crea: new Todo('Comprar pan')
   - Agrega al state: state.todos.push(newTodo)
   ↓
5. app.js llama a: displayTodos()
   ↓
6. displayTodos() obtiene los todos actualizados
   ↓
7. renderTodos() re-renderiza la lista
   ↓
8. Usuario ve el nuevo todo en pantalla
```

#### Ejemplo: Usuario marca un todo como completado

```
1. Usuario hace click en el checkbox de un todo
   ↓
2. app.js detecta el evento (click)
   ↓
3. app.js obtiene el ID del todo (data-id)
   ↓
4. app.js llama a: todoStore.toggleTodo(todoId)
   ↓
5. todo.store.js ejecuta toggleTodo():
   - Busca el todo con ese ID
   - Cambia: todo.done = !todo.done
   ↓
6. app.js llama a: displayTodos()
   ↓
7. renderTodos() re-renderiza la lista
   ↓
8. Usuario ve el todo marcado/desmarcado
```

#### Ejemplo: Usuario filtra todos

```
1. Usuario hace click en "Completados"
   ↓
2. app.js detecta el evento (click)
   ↓
3. app.js llama a: todoStore.setFilter('Completed')
   ↓
4. todo.store.js ejecuta setFilter():
   - Actualiza: state.filter = 'Completed'
   ↓
5. app.js llama a: displayTodos()
   ↓
6. displayTodos() llama a: todoStore.getTodos('Completed')
   ↓
7. todo.store.js ejecuta getTodos():
   - Filtra: state.todos.filter(todo => todo.done)
   - Retorna solo los completados
   ↓
8. renderTodos() renderiza solo los completados
   ↓
9. Usuario ve solo los todos completados
```

---

## 🗂️ Responsabilidades de Cada Archivo

### main.js - El Gerente
```javascript
// Responsabilidad: Inicializar la aplicación
import './style.css'                    // Cargar estilos
import { App } from './todos/app'       // Importar interfaz
import todoStore from './store/todo.store.js'  // Importar store

todoStore.initStore();  // Inicializar datos
App('#app');            // Iniciar interfaz
```

**Analogía:** El gerente que abre el restaurante.

---

### todo.store.js - El Cerebro
```javascript
// Responsabilidad: Manejar TODOS los datos

const state = {
    todos: [...],
    filter: 'all'
};

// Funciones para modificar el state
const addTodo = (description) => { /* ... */ };
const deleteTodo = (todoId) => { /* ... */ };
const toggleTodo = (todoId) => { /* ... */ };
const getTodos = (filter) => { /* ... */ };

export default {
    initStore,
    addTodo,
    deleteTodo,
    toggleTodo,
    getTodos,
    // ...
};
```

**Analogía:** El banco que guarda y protege el dinero.

**Reglas:**
- ✅ Solo el store puede modificar el state
- ✅ Otros archivos solo pueden llamar funciones del store
- ❌ Nadie puede acceder a `state` directamente

---

### todos/app.js - La Interfaz
```javascript
// Responsabilidad: Crear y actualizar la interfaz

import html from './app.html?raw'
import todoStore from '../store/todo.store'
import { renderTodos } from './use-cases'

export const App = (elementId) => {
    // Función para mostrar todos
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
    };
    
    // Función para manejar eventos
    const handleAddTodo = (e) => {
        // ...
        todoStore.addTodo(description);
        displayTodos();
    };
    
    // Inicialización
    (() => {
        // Crear HTML
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        
        // Agregar event listeners
        // ...
        
        // Renderizar inicial
        displayTodos();
    })();
};
```

**Analogía:** El mesero que atiende a los clientes.

**Reglas:**
- ✅ Maneja eventos del usuario
- ✅ Llama funciones del store
- ✅ Actualiza la interfaz
- ❌ NO modifica el state directamente

---

### use-cases/ - Funciones Específicas
```javascript
// render-todos.js
// Responsabilidad: Renderizar la lista de todos

export const renderTodos = (elementId, todos = []) => {
    const element = document.querySelector(elementId);
    element.innerHTML = ''; // Limpiar
    
    todos.forEach(todo => {
        element.append(createTodoHTML(todo));
    });
};
```

```javascript
// create-todo-html.js
// Responsabilidad: Crear el HTML de un todo

export const createTodoHTML = (todo) => {
    const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.done ? 'checked' : ''}>
            <label>${todo.description}</label>
            <button class="destroy"></button>
        </div>
    `;
    
    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', todo.id);
    
    if (todo.done) liElement.classList.add('completed');
    
    return liElement;
};
```

**Analogía:** Los cocineros especializados (uno hace ensaladas, otro hace carnes).

**Reglas:**
- ✅ Cada función hace UNA cosa específica
- ✅ Son reutilizables
- ✅ No manejan el state directamente

---

### models/ - Estructura de Datos
```javascript
// todo.model.js
// Responsabilidad: Definir QUÉ es un Todo

import { v6 as uuid } from "uuid";

export class Todo {
    constructor(description) {
        if (!description) throw new Error('Description required');
        
        this.id = uuid();
        this.description = description;
        this.done = false;
        this.createdAt = new Date();
    }
}
```

**Analogía:** El plano de una casa (define cómo debe ser).

**Reglas:**
- ✅ Define la estructura de datos
- ✅ Puede tener validaciones
- ❌ NO maneja lógica de negocio

---

## 🔄 Flujo de Datos Completo

```
┌──────────────┐
│   Usuario    │
│  (Interactúa)│
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   app.js     │ ← Detecta evento
│  (Interfaz)  │
└──────┬───────┘
       │
       │ Llama función
       ▼
┌──────────────┐
│ todo.store.js│ ← Modifica state
│   (Store)    │
└──────┬───────┘
       │
       │ Retorna datos
       ▼
┌──────────────┐
│   app.js     │ ← Actualiza interfaz
│  (Interfaz)  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  use-cases/  │ ← Renderiza
│ (Funciones)  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│     DOM      │ ← Usuario ve cambios
│  (Pantalla)  │
└──────────────┘
```

---

## 📝 Ejemplo Completo: Agregar un Todo

### Código Completo del Flujo

```javascript
// ========================================
// 1. Usuario escribe "Comprar pan" y presiona Enter
// ========================================

// ========================================
// 2. app.js detecta el evento
// ========================================
const handleAddTodo = (e) => {
    if (e.key !== 'Enter') return;
    
    const input = e.target;
    const description = input.value.trim();
    
    if (!description) return;
    
    // 3. Llama al store
    todoStore.addTodo(description);
    
    // 4. Limpia el input
    input.value = '';
    
    // 5. Actualiza la interfaz
    displayTodos();
};

// ========================================
// 3. todo.store.js ejecuta addTodo
// ========================================
const addTodo = (description) => {
    // Validación
    if (!description) throw new Error('Description is required');
    
    // Crear nuevo todo
    const newTodo = new Todo(description);
    
    // Agregar al state
    state.todos.push(newTodo);
    
    // Opcional: Guardar en localStorage
    saveToLocalStorage();
};

// ========================================
// 5. app.js ejecuta displayTodos
// ========================================
const displayTodos = () => {
    // Obtener datos del store
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    
    // Renderizar
    renderTodos(ElementIDs.TodoList, todos);
};

// ========================================
// 6. use-cases/render-todos.js renderiza
// ========================================
export const renderTodos = (elementId, todos = []) => {
    const element = document.querySelector(elementId);
    element.innerHTML = ''; // Limpiar lista
    
    // Crear HTML para cada todo
    todos.forEach(todo => {
        element.append(createTodoHTML(todo));
    });
};

// ========================================
// 7. use-cases/create-todo-html.js crea el HTML
// ========================================
export const createTodoHTML = (todo) => {
    const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.done ? 'checked' : ''}>
            <label>${todo.description}</label>
            <button class="destroy"></button>
        </div>
    `;
    
    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', todo.id);
    
    return liElement;
};

// ========================================
// 8. Usuario ve el nuevo todo en pantalla
// ========================================
```

---

## 🎯 Resumen Visual

```
USUARIO → app.js → todo.store.js → app.js → use-cases/ → DOM
         (evento)  (modifica state) (obtiene) (renderiza) (muestra)
```

**Flujo de Datos:**
1. Usuario interactúa
2. app.js detecta evento
3. app.js llama al store
4. Store modifica el state
5. app.js obtiene datos actualizados
6. use-cases renderiza
7. Usuario ve los cambios

**Separación de Responsabilidades:**
- `main.js` → Inicializa
- `todo.store.js` → Maneja datos
- `app.js` → Maneja interfaz y eventos
- `use-cases/` → Funciones específicas
- `models/` → Define estructuras

---

**¡Ahora entiendes completamente cómo fluye la información en tu TodoApp!**
