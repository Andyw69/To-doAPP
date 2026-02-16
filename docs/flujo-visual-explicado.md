# 🎨 Flujo Visual de Tu TodoApp - Diagramas Explicados

## 1. Estructura de Archivos con Responsabilidades

```
📦 todo-app/
│
├── 📄 index.html                    🚪 PUERTA DE ENTRADA
│   └─> Solo tiene un <div id="app"> vacío
│   └─> Carga main.js como módulo
│
├── 📄 package.json                  ⚙️ CONFIGURACIÓN
│   └─> Define que el proyecto usa módulos ES6
│   └─> Lista dependencias (uuid, vite)
│
└── 📁 src/
    │
    ├── 📄 main.js                   🎬 DIRECTOR DE ORQUESTA
    │   └─> Inicializa el store
    │   └─> Inicia la app
    │   └─> Se ejecuta UNA sola vez
    │
    ├── 📄 style.css                 🎨 ESTILOS
    │   └─> Estilos globales de la app
    │
    ├── 📁 store/
    │   └── 📄 todo.store.js         🧠 CEREBRO (Datos + Lógica)
    │       └─> Guarda el state (todos, filter)
    │       └─> Funciones para manipular datos
    │       └─> NADIE puede tocar el state directamente
    │
    └── 📁 todos/
        │
        ├── 📄 app.js                🎭 CONTROLADOR DE UI
        │   └─> Crea la interfaz
        │   └─> Conecta store con UI
        │   └─> Maneja el renderizado inicial
        │
        ├── 📄 app.html              📋 TEMPLATE HTML
        │   └─> Estructura HTML de la app
        │   └─> Se importa como string en app.js
        │
        ├── 📁 models/
        │   └── 📄 todo.model.js     🏗️ MOLDE (Clase)
        │       └─> Define QUÉ es un Todo
        │       └─> Garantiza estructura consistente
        │
        └── 📁 use-cases/
            ├── 📄 index.js          📦 BARRIL
            │   └─> Re-exporta funciones
            │
            ├── 📄 render-todos.js   🖼️ RENDERIZADOR
            │   └─> Renderiza lista de todos
            │
            └── 📄 create-todo-html.js 🏭 FÁBRICA
                └─> Crea HTML de un todo individual
```

---

## 2. Flujo de Ejecución Detallado

```
┌─────────────────────────────────────────────────────────────┐
│  PASO 1: Usuario abre http://localhost:5173                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  PASO 2: Navegador carga index.html                         │
│                                                              │
│  <!doctype html>                                             │
│  <html>                                                      │
│    <body>                                                    │
│      <div id="app"></div>  ← VACÍO                          │
│      <script type="module" src="/src/main.js"></script>     │
│    </body>                                                   │
│  </html>                                                     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  PASO 3: Navegador ejecuta main.js                          │
│                                                              │
│  import './style.css'                 ← Carga estilos       │
│  import { App } from './todos/app'    ← Importa App         │
│  import todoStore from './store/...'  ← Importa Store       │
│                                                              │
│  todoStore.initStore();  ← Inicializa datos                 │
│  App('#app');            ← Renderiza UI                     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ├──────────────┬─────────────────────┐
                         ▼              ▼                     ▼
              ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
              │ todoStore    │  │    App()     │  │  style.css   │
              │ .initStore() │  │              │  │              │
              └──────┬───────┘  └──────┬───────┘  └──────────────┘
                     │                 │
                     ▼                 ▼
         ┌──────────────────┐  ┌──────────────────┐
         │  Crea state:     │  │  Ejecuta IIFE:   │
         │  {               │  │  1. Crea div     │
         │    todos: [      │  │  2. innerHTML    │
         │      Todo1,      │  │  3. append       │
         │      Todo2,      │  │  4. displayTodos │
         │      ...         │  │                  │
         │    ],            │  └────────┬─────────┘
         │    filter: 'all' │           │
         │  }               │           ▼
         └──────────────────┘  ┌──────────────────┐
                               │  displayTodos()  │
                               │  1. getTodos()   │
                               │  2. renderTodos()│
                               └────────┬─────────┘
                                        │
                                        ▼
                               ┌──────────────────┐
                               │  renderTodos()   │
                               │  forEach todo:   │
                               │    createHTML()  │
                               │    append()      │
                               └────────┬─────────┘
                                        │
                                        ▼
                               ┌──────────────────┐
                               │ createTodoHTML() │
                               │ Crea <li> con    │
                               │ checkbox, label, │
                               │ button           │
                               └────────┬─────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────┐
│  RESULTADO FINAL: DOM actualizado                           │
│                                                              │
│  <div id="app">                                              │
│    <section class="todoapp">                                 │
│      <ul class="todo-list">                                  │
│        <li data-id="123">                                    │
│          <input type="checkbox">                             │
│          <label>Piedra del alma</label>                      │
│        </li>                                                 │
│        <li data-id="456">                                    │
│          <input type="checkbox">                             │
│          <label>Piedra del infinito</label>                  │
│        </li>                                                 │
│        ... (5 todos en total)                                │
│      </ul>                                                   │
│    </section>                                                │
│  </div>                                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. La IIFE Explicada Visualmente

### ¿Qué es una IIFE?

```javascript
// Función normal (NO se ejecuta automáticamente)
const miFuncion = () => {
    console.log('Hola');
};
miFuncion(); // Tienes que llamarla manualmente

// IIFE (SE ejecuta automáticamente)
(() => {
    console.log('Hola');
})();
//  ↑↑
//  Estos paréntesis la ejecutan inmediatamente
```

### En tu código:

```javascript
export const App = (elementId) => {

    // Función auxiliar (NO se ejecuta automáticamente)
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
    };

    // IIFE (SE ejecuta automáticamente cuando llamas App())
    (() => {
        // 1. Crear contenedor
        const app = document.createElement('div');
        
        // 2. Llenar con HTML
        app.innerHTML = html;
        
        // 3. Insertar en el DOM
        document.querySelector(elementId).append(app);
        
        // 4. Renderizar todos
        displayTodos();
    })();
    //  ↑↑
    //  Se ejecuta INMEDIATAMENTE
};
```

### Flujo visual:

```
main.js llama: App('#app')
       ↓
Se ejecuta la función App
       ↓
Dentro de App, la IIFE se ejecuta INMEDIATAMENTE
       ↓
┌─────────────────────────────────────┐
│  IIFE ejecuta en orden:             │
│  1. const app = createElement()     │
│  2. app.innerHTML = html            │
│  3. querySelector('#app').append()  │
│  4. displayTodos()                  │
└─────────────────────────────────────┘
       ↓
La función App termina
       ↓
La UI está renderizada
```

### ¿Por qué usar IIFE?

**Opción 1: Sin IIFE (código suelto)**
```javascript
export const App = (elementId) => {
    const displayTodos = () => { ... };

    // Código suelto (se ejecuta inmediatamente)
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
};
```

**Opción 2: Con IIFE (código encapsulado)**
```javascript
export const App = (elementId) => {
    const displayTodos = () => { ... };

    // Código encapsulado en IIFE
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();
};
```

**Ventajas de la IIFE:**
1. Separa visualmente el código de inicialización
2. Encapsula variables (app no contamina el scope)
3. Patrón reconocible para otros desarrolladores
4. Más fácil de refactorizar después

---

## 4. Flujo de Datos: Store → UI

```
┌─────────────────────────────────────────────────────────────┐
│                         STORE                                │
│  (Fuente única de verdad)                                    │
│                                                              │
│  const state = {                                             │
│    todos: [                                                  │
│      { id: '1', description: 'Todo 1', done: false },       │
│      { id: '2', description: 'Todo 2', done: true },        │
│      { id: '3', description: 'Todo 3', done: false }        │
│    ],                                                        │
│    filter: 'all'                                             │
│  }                                                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ getTodos(filter)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      APP.JS                                  │
│  (Controlador)                                               │
│                                                              │
│  const displayTodos = () => {                                │
│    const todos = todoStore.getTodos(                         │
│      todoStore.getCurrentFilter()                            │
│    );                                                        │
│    renderTodos('.todo-list', todos);                         │
│  };                                                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ renderTodos(selector, todos)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   RENDER-TODOS.JS                            │
│  (Renderizador)                                              │
│                                                              │
│  export const renderTodos = (elementId, todos) => {          │
│    const element = document.querySelector(elementId);        │
│    todos.forEach(todo => {                                   │
│      element.append(createTodoHTML(todo));                   │
│    });                                                       │
│  };                                                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ createTodoHTML(todo)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                 CREATE-TODO-HTML.JS                          │
│  (Fábrica de HTML)                                           │
│                                                              │
│  export const createTodoHTML = (todo) => {                   │
│    const liElement = document.createElement('li');           │
│    liElement.innerHTML = `                                   │
│      <input type="checkbox" ${todo.done ? 'checked' : ''}>   │
│      <label>${todo.description}</label>                      │
│      <button class="destroy"></button>                       │
│    `;                                                        │
│    return liElement;                                         │
│  };                                                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ return <li>
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                         DOM                                  │
│  (Lo que ve el usuario)                                      │
│                                                              │
│  <ul class="todo-list">                                      │
│    <li data-id="1">                                          │
│      <input type="checkbox">                                 │
│      <label>Todo 1</label>                                   │
│      <button class="destroy"></button>                       │
│    </li>                                                     │
│    <li data-id="2" class="completed">                        │
│      <input type="checkbox" checked>                         │
│      <label>Todo 2</label>                                   │
│      <button class="destroy"></button>                       │
│    </li>                                                     │
│    <li data-id="3">                                          │
│      <input type="checkbox">                                 │
│      <label>Todo 3</label>                                   │
│      <button class="destroy"></button>                       │
│    </li>                                                     │
│  </ul>                                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Imports y Exports Visualizados

### Cadena de Imports

```
index.html
    │
    └─> <script type="module" src="main.js">
            │
            ├─> import './style.css'
            │       └─> (Vite lo procesa)
            │
            ├─> import { App } from './todos/app'
            │       │
            │       └─> app.js
            │           ├─> import html from './app.html?raw'
            │           ├─> import todoStore from '../store/todo.store'
            │           │       │
            │           │       └─> todo.store.js
            │           │           └─> import { Todo } from '../todos/models/todo.model'
            │           │                   │
            │           │                   └─> todo.model.js
            │           │                       └─> import { v6 as uuid } from 'uuid'
            │           │
            │           └─> import { renderTodos } from './use-cases'
            │                   │
            │                   └─> use-cases/index.js (BARRIL)
            │                       ├─> export { renderTodos } from './render-todos'
            │                       │       │
            │                       │       └─> render-todos.js
            │                       │           ├─> import { Todo } from '../models/todo.model'
            │                       │           └─> import { createTodoHTML } from './create-todo-html'
            │                       │                   │
            │                       │                   └─> create-todo-html.js
            │                       │                       └─> import { Todo } from '../models/todo.model'
            │                       │
            │                       └─> export { createTodoHTML } from './create-todo-html'
            │
            └─> import todoStore from './store/todo.store'
```

### Named vs Default Exports

```
┌─────────────────────────────────────────────────────────────┐
│  NAMED EXPORT                                                │
│                                                              │
│  // todo.model.js                                            │
│  export class Todo { ... }                                   │
│         ↑                                                    │
│         Exporta con nombre específico                        │
│                                                              │
│  // Importar                                                 │
│  import { Todo } from './todo.model.js'                      │
│          ↑                                                   │
│          Debes usar el nombre exacto                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  DEFAULT EXPORT                                              │
│                                                              │
│  // todo.store.js                                            │
│  export default {                                            │
│    initStore,                                                │
│    addTodo                                                   │
│  }                                                           │
│  ↑                                                           │
│  Exporta como default                                        │
│                                                              │
│  // Importar                                                 │
│  import todoStore from './todo.store.js'                     │
│         ↑                                                    │
│         Puedes usar cualquier nombre                         │
│                                                              │
│  import miStore from './todo.store.js'  ← También válido    │
│  import pepito from './todo.store.js'   ← También válido    │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Separación de Responsabilidades

```
┌─────────────────────────────────────────────────────────────┐
│                    ARQUITECTURA MVC                          │
│                  (Model-View-Controller)                     │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│      MODEL       │  │   CONTROLLER     │  │       VIEW       │
│  (Datos/Lógica)  │  │   (Orquestador)  │  │   (Interfaz)     │
├──────────────────┤  ├──────────────────┤  ├──────────────────┤
│                  │  │                  │  │                  │
│ todo.store.js    │  │ app.js           │  │ app.html         │
│ - state          │  │ - displayTodos() │  │ - HTML template  │
│ - getTodos()     │◄─┤ - Conecta store  │  │                  │
│ - addTodo()      │  │   con UI         │  │ use-cases/       │
│ - deleteTodo()   │  │                  │─►│ - renderTodos()  │
│                  │  │                  │  │ - createHTML()   │
│ todo.model.js    │  │                  │  │                  │
│ - class Todo     │  │                  │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘
        ↑                      ↑                      ↑
        │                      │                      │
   Qué es un Todo      Cómo conectar todo      Cómo se ve
```

### Responsabilidades Claras:

```
┌─────────────────────────────────────────────────────────────┐
│  STORE (todo.store.js)                                       │
│  Responsabilidad: Manejar datos                              │
│                                                              │
│  ✅ Guardar el state                                         │
│  ✅ Proveer funciones para leer datos (getTodos)             │
│  ✅ Proveer funciones para modificar datos (addTodo)         │
│  ✅ Validar datos                                            │
│  ❌ NO sabe nada del DOM                                     │
│  ❌ NO renderiza HTML                                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  APP (app.js)                                                │
│  Responsabilidad: Conectar store con UI                      │
│                                                              │
│  ✅ Obtener datos del store                                  │
│  ✅ Llamar funciones de renderizado                          │
│  ✅ Manejar eventos (más adelante)                           │
│  ❌ NO manipula el state directamente                        │
│  ❌ NO crea HTML manualmente                                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  USE-CASES (render-todos.js, create-todo-html.js)           │
│  Responsabilidad: Crear y renderizar HTML                    │
│                                                              │
│  ✅ Crear elementos del DOM                                  │
│  ✅ Insertar elementos en el DOM                             │
│  ✅ Aplicar estilos/clases                                   │
│  ❌ NO sabe de dónde vienen los datos                        │
│  ❌ NO modifica el state                                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  MODEL (todo.model.js)                                       │
│  Responsabilidad: Definir estructura de datos                │
│                                                              │
│  ✅ Define propiedades de un Todo                            │
│  ✅ Valida datos en el constructor                           │
│  ✅ Genera IDs únicos                                        │
│  ❌ NO sabe cómo se renderiza                                │
│  ❌ NO sabe dónde se guarda                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. ¿Por qué esta arquitectura?

### Ventajas:

```
┌─────────────────────────────────────────────────────────────┐
│  1. MANTENIBILIDAD                                           │
│                                                              │
│  Si necesitas cambiar cómo se renderiza un todo:            │
│  → Solo modificas create-todo-html.js                        │
│  → El store y el modelo no se tocan                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  2. TESTABILIDAD                                             │
│                                                              │
│  Puedes probar cada parte por separado:                      │
│  → Probar el store sin UI                                    │
│  → Probar renderizado sin datos reales                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  3. REUTILIZACIÓN                                            │
│                                                              │
│  createTodoHTML() puede usarse en:                           │
│  → Lista principal                                           │
│  → Lista de completados                                      │
│  → Modal de búsqueda                                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  4. ESCALABILIDAD                                            │
│                                                              │
│  Fácil agregar nuevas features:                              │
│  → Nuevo filtro: Solo modificas el store                     │
│  → Nueva vista: Solo creas nuevo use-case                    │
│  → Nuevo campo: Solo modificas el modelo                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. Comparación: Código Monolítico vs Modular

### ❌ Código Monolítico (TODO en un archivo)

```javascript
// main.js (TODO junto)
const todos = [];

function addTodo(description) {
    const todo = {
        id: Math.random(),
        description: description,
        done: false
    };
    todos.push(todo);
    renderTodos();
}

function renderTodos() {
    const list = document.querySelector('.todo-list');
    list.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${todo.done ? 'checked' : ''}>
            <label>${todo.description}</label>
        `;
        list.append(li);
    });
}

// ... 500 líneas más ...
```

**Problemas:**
- Difícil de mantener
- Difícil de testear
- Difícil de reutilizar
- Difícil de trabajar en equipo

### ✅ Código Modular (Tu arquitectura)

```
store/todo.store.js       → Maneja datos (50 líneas)
models/todo.model.js      → Define estructura (20 líneas)
use-cases/render-todos.js → Renderiza lista (15 líneas)
use-cases/create-todo.js  → Crea HTML (30 líneas)
app.js                    → Conecta todo (40 líneas)
```

**Ventajas:**
- Fácil de mantener (archivos pequeños)
- Fácil de testear (funciones aisladas)
- Fácil de reutilizar (módulos independientes)
- Fácil de trabajar en equipo (cada uno un archivo)

---

## 🎯 Resumen Visual

```
┌─────────────────────────────────────────────────────────────┐
│                    TU TODOAPP                                │
│                                                              │
│  index.html (Entrada)                                        │
│       ↓                                                      │
│  main.js (Inicializador)                                     │
│       ↓                                                      │
│  ┌─────────────┬──────────────┬──────────────┐              │
│  ↓             ↓              ↓              ↓              │
│ Store        App.js        Models       Use-Cases           │
│ (Datos)      (UI)         (Clases)     (Funciones)          │
│                                                              │
│ Flujo de datos: Store → App → Use-Cases → DOM               │
│                                                              │
│ Cada parte tiene una responsabilidad clara                   │
│ Todo está conectado pero separado                            │
│ Fácil de mantener, testear y escalar                         │
└─────────────────────────────────────────────────────────────┘
```

---

**¡Ahora entiendes la arquitectura completa de tu aplicación!**

Cada archivo tiene un propósito claro, y todos trabajan juntos de forma organizada. Esta es la base de aplicaciones profesionales.
