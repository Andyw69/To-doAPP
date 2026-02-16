# 🏗️ Arquitectura Completa de Tu TodoApp - Explicación Detallada

## 📋 Tabla de Contenidos

1. [Visión General](#visión-general)
2. [Flujo de Ejecución](#flujo-de-ejecución)
3. [Explicación Archivo por Archivo](#explicación-archivo-por-archivo)
4. [Conceptos Clave](#conceptos-clave)
5. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## Visión General

### Estructura del Proyecto

```
todo-app/
├── index.html                    ← Punto de entrada HTML
├── package.json                  ← Configuración del proyecto
├── src/
│   ├── main.js                   ← Punto de entrada JavaScript
│   ├── style.css                 ← Estilos globales
│   ├── store/
│   │   └── todo.store.js         ← Cerebro de la app (State + Lógica)
│   └── todos/
│       ├── app.js                ← Controlador principal de la UI
│       ├── app.html              ← Template HTML de la app
│       ├── models/
│       │   └── todo.model.js     ← Define QUÉ es un Todo
│       └── use-cases/
│           ├── index.js          ← Archivo de barril
│           ├── render-todos.js   ← Renderiza lista de todos
│           └── create-todo-html.js ← Crea HTML de un todo
```

### Arquitectura en Capas

```
┌─────────────────────────────────────────┐
│         index.html (Entrada)            │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│         main.js (Inicializador)         │
│  - Importa estilos                      │
│  - Inicializa Store                     │
│  - Inicia la App                        │
└─────────────┬───────────────────────────┘
              │
              ├──────────────┬─────────────┐
              ▼              ▼             ▼
    ┌─────────────┐  ┌──────────┐  ┌──────────┐
    │   Store     │  │   App    │  │  Models  │
    │  (Datos)    │  │   (UI)   │  │ (Clases) │
    └─────────────┘  └────┬─────┘  └──────────┘
                          │
                          ▼
                   ┌──────────────┐
                   │  Use Cases   │
                   │ (Funciones)  │
                   └──────────────┘
```

---

## Flujo de Ejecución

### Paso a Paso: ¿Qué pasa cuando abres la app?

```
1. Navegador carga index.html
   ↓
2. index.html ejecuta main.js (type="module")
   ↓
3. main.js importa dependencias:
   - style.css (estilos)
   - App (función de app.js)
   - todoStore (store)
   ↓
4. main.js ejecuta:
   - todoStore.initStore() → Inicializa el estado
   - App('#app') → Renderiza la interfaz
   ↓
5. App() ejecuta:
   - Crea un div
   - Le pone el HTML de app.html
   - Lo inserta en <div id="app">
   - Llama a displayTodos()
   ↓
6. displayTodos() ejecuta:
   - Obtiene los todos del store
   - Llama a renderTodos()
   ↓
7. renderTodos() ejecuta:
   - Por cada todo, llama a createTodoHTML()
   - Inserta cada elemento en el DOM
   ↓
8. ¡La app está lista! 🎉
```

---

## Explicación Archivo por Archivo

### 1. index.html - La Puerta de Entrada

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>todo-app</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

#### Explicación Línea por Línea:

**`<div id="app"></div>`**
- Este div está VACÍO al inicio
- Es el "contenedor" donde se va a renderizar toda tu aplicación
- Piensa en él como un lienzo en blanco

**`<script type="module" src="/src/main.js"></script>`**
- `type="module"`: Le dice al navegador que este script usa módulos ES6 (import/export)
- `src="/src/main.js"`: Carga el archivo main.js
- **¿Por qué type="module"?**
  - Permite usar `import` y `export`
  - Cada módulo tiene su propio scope (no contamina el global)
  - Los imports se cargan de forma asíncrona
  - Es el estándar moderno de JavaScript

**Analogía:**
- `<div id="app">` es como un marco de fotos vacío
- `main.js` es el pintor que va a llenar ese marco

---

### 2. package.json - Configuración del Proyecto

```json
{
  "name": "todo-app",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^7.2.4"
  },
  "dependencies": {
    "uuid": "^13.0.0"
  }
}
```

#### Explicación:

**`"type": "module"`**
- Le dice a Node.js que este proyecto usa módulos ES6
- Permite usar `import` en lugar de `require`

**`"scripts"`**
- `npm run dev`: Inicia servidor de desarrollo (Vite)
- `npm run build`: Crea versión de producción
- `npm run preview`: Previsualiza la versión de producción

**`"dependencies"`**
- `uuid`: Librería para generar IDs únicos
- Se usa en `todo.model.js` para crear IDs de todos

**`"devDependencies"`**
- `vite`: Herramienta de desarrollo (bundler + dev server)
- Solo se usa en desarrollo, no en producción

---

### 3. main.js - El Inicializador

```javascript
import './style.css'
import { App } from './todos/app';
import todoStore from './store/todo.store.js'

todoStore.initStore();
App('#app');
```

#### Explicación Línea por Línea:

**`import './style.css'`**
- Importa los estilos CSS
- Vite procesa este import y lo inyecta en el HTML
- **¿Por qué importar CSS en JS?** Vite lo maneja automáticamente

**`import { App } from './todos/app';`**
- Importa la función `App` de `app.js`
- Usa **named import** porque `App` se exporta como `export const App`

**`import todoStore from './store/todo.store.js'`**
- Importa el store completo
- Usa **default import** porque el store se exporta como `export default`

**`todoStore.initStore();`**
- Inicializa el estado de la aplicación
- Carga datos iniciales (las 5 piedras del infinito)
- Imprime en consola para debugging

**`App('#app');`**
- Llama a la función `App` pasándole el selector `'#app'`
- Esto renderiza toda la interfaz dentro de `<div id="app">`

#### ¿Por qué está en main.js y no en app.js?

**main.js es el "director de orquesta":**
- Inicializa todo en el orden correcto
- Primero el store (datos)
- Luego la UI (interfaz)

**app.js es el "constructor de la UI":**
- Solo se encarga de crear y renderizar la interfaz
- No sabe nada de inicialización global

**Analogía:**
- `main.js` es el gerente que abre el restaurante
- `app.js` es el chef que prepara la comida

---

### 4. todo.store.js - El Cerebro de la App

```javascript
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
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del espacio'),
        new Todo('Piedra del mente'),
    ],
    filter: Filters.All
}

const initStore = () => {
    console.log(state);
    console.log('InitStore 🤠');
};

// ... más funciones ...

export default {
    initStore,
    loadStore,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
    getTodos,
}
```

#### Explicación:

**`const Filters`**
- Define los tipos de filtros disponibles
- Es un objeto constante (no cambia)
- Se usa para evitar typos: `Filters.All` en lugar de `'all'`

**`const state`**
- El **corazón de la aplicación**
- Contiene TODA la información de la app
- `todos`: Array de todos
- `filter`: Filtro actual

**¿Por qué `state` es privado?**
- No se exporta directamente
- Solo se puede acceder a través de funciones (getTodos, addTodo, etc.)
- Esto protege los datos de modificaciones accidentales

**Funciones del Store:**

1. **Getters (Leer datos):**
   - `getTodos()`: Obtiene todos según filtro
   - `getCurrentFilter()`: Obtiene filtro actual

2. **Actions (Modificar datos):**
   - `addTodo()`: Agrega un todo
   - `toggleTodo()`: Cambia estado done
   - `deleteTodo()`: Elimina un todo
   - `deleteCompleted()`: Elimina completados
   - `setFilter()`: Cambia filtro

3. **Inicialización:**
   - `initStore()`: Inicializa el estado
   - `loadStore()`: Cargará datos de localStorage (no implementado)

**Analogía:**
- `state` es la bóveda del banco
- Las funciones son los cajeros
- Nadie puede entrar a la bóveda directamente

---

### 5. todo.model.js - Define QUÉ es un Todo

```javascript
import { v6 as uuid } from "uuid";

export class Todo {
    constructor(description) {
        if (!description) throw new Error('Falta el argumento "Description"');
        this.id = uuid();
        this.description = description;
        this.done = false;
        this.createdAt = new Date();
    }
}
```

#### Explicación:

**`import { v6 as uuid } from "uuid"`**
- Importa la función `v6` de la librería `uuid`
- La renombra como `uuid` para facilitar su uso
- `v6` genera IDs únicos basados en timestamp + random

**`export class Todo`**
- Define una clase (plantilla) para crear todos
- Se exporta como **named export**

**`constructor(description)`**
- Se ejecuta cuando haces `new Todo('Comprar pan')`
- Recibe la descripción como parámetro

**Propiedades de un Todo:**
- `id`: ID único generado con uuid
- `description`: Texto del todo
- `done`: Estado (completado o no)
- `createdAt`: Fecha de creación

**¿Por qué una clase?**
- Garantiza que todos los todos tengan la misma estructura
- Valida que tengan descripción
- Genera ID automáticamente
- Es reutilizable

**Analogía:**
- La clase `Todo` es un molde para hacer galletas
- Cada `new Todo()` es una galleta hecha con ese molde
- Todas las galletas tienen la misma forma (propiedades)

---

### 6. app.js - El Controlador de la UI

```javascript
import html from './app.html?raw'
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases';

const ElementIDs = {
    TodoList: '.todo-list',
}; 

export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
    };

    // IIFE - Immediately Invoked Function Expression
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();
};
```

#### Explicación Línea por Línea:

**`import html from './app.html?raw'`**
- Importa el contenido de `app.html` como STRING
- `?raw` es una feature de Vite que dice "dame el contenido crudo"
- `html` es una variable que contiene todo el HTML como texto

**`import todoStore from '../store/todo.store'`**
- Importa el store para obtener datos

**`import { renderTodos } from './use-cases'`**
- Importa desde el archivo de barril
- Equivalente a: `import { renderTodos } from './use-cases/index.js'`

**`const ElementIDs`**
- Objeto con selectores CSS
- Evita repetir strings en el código
- Fácil de cambiar si cambia el HTML

**`export const App = (elementId) => { ... }`**
- Función principal que crea la UI
- Recibe el selector donde renderizar (`'#app'`)
- Se exporta como **named export**

**`const displayTodos = () => { ... }`**
- Función interna (privada)
- Obtiene los todos del store
- Los renderiza en el DOM
- **¿Por qué una función separada?** Para poder llamarla múltiples veces

**La Función Anónima que se Llama Sola (IIFE):**

```javascript
(() => {
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
})();
```

**¿Qué es esto?**
- **IIFE**: Immediately Invoked Function Expression
- Es una función que se ejecuta inmediatamente después de definirse

**Sintaxis:**
```javascript
(() => {
    // código
})();
//  ↑↑
//  Estos paréntesis la ejecutan inmediatamente
```

**¿Por qué se usa?**
1. **Encapsulación:** Las variables dentro no contaminan el scope externo
2. **Ejecución inmediata:** Se ejecuta cuando se llama `App()`
3. **Patrón común:** Para código de inicialización

**Paso a paso de la IIFE:**

```javascript
// 1. Crear un div
const app = document.createElement('div');

// 2. Llenar el div con el HTML de app.html
app.innerHTML = html;

// 3. Buscar el elemento con el selector (ej: '#app')
// 4. Agregar el div creado dentro de ese elemento
document.querySelector(elementId).append(app);

// 5. Renderizar los todos
displayTodos();
```

**Analogía:**
- `App()` es como construir una casa
- La IIFE es el proceso de construcción que se ejecuta inmediatamente
- `displayTodos()` es decorar la casa con muebles (los todos)

---

### 7. app.html - El Template HTML

```html
<section class="todoapp">
    <header class="header">
        <h1>Tareas</h1>
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>
    </header>
    
    <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
            <!-- Aquí se renderizan los todos dinámicamente -->
        </ul>
    </section>

    <footer class="footer">
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>
        <ul class="filters">
            <li><a class="selected filtro" href="#/">Todos</a></li>
            <li><a class="filtro" href="#/active">Pendientes</a></li>
            <li><a class="filtro" href="#/completed">Completados</a></li>
        </ul>
        <button class="clear-completed">Borrar completados</button>
    </footer>
</section>
```

#### Explicación:

**¿Por qué un archivo HTML separado?**
- Separa estructura (HTML) de lógica (JS)
- Más fácil de leer y mantener
- Los editores pueden aplicar syntax highlighting

**Elementos importantes:**

1. **`<input id="new-todo-input">`**
   - Input para agregar nuevos todos
   - Más adelante le agregarás un event listener

2. **`<ul class="todo-list">`**
   - Lista VACÍA al inicio
   - Aquí se insertan los todos dinámicamente
   - `renderTodos()` llena esta lista

3. **`<span id="pending-count">`**
   - Muestra cantidad de todos pendientes
   - Se actualiza dinámicamente

4. **`<button class="clear-completed">`**
   - Botón para eliminar todos completados
   - Más adelante le agregarás funcionalidad

---

### 8. render-todos.js - Renderiza la Lista

```javascript
import { Todo } from "../models/todo.model";
import { createTodoHTML } from "./create-todo-html";

export const renderTodos = (elementId, todos = []) => {
    const element = document.querySelector(elementId);

    todos.forEach(todo => {
        element.append(createTodoHTML(todo));
    });
};
```

#### Explicación Detallada:

**`export const renderTodos = (elementId, todos = []) => { ... }`**
- Función que renderiza una lista de todos
- `elementId`: Selector CSS (ej: `'.todo-list'`)
- `todos = []`: Array de todos (default: array vacío)

**`const element = document.querySelector(elementId);`**
- Busca el elemento en el DOM
- Ejemplo: `document.querySelector('.todo-list')` encuentra `<ul class="todo-list">`

**`todos.forEach(todo => { ... })`**
- Itera sobre cada todo del array
- Por cada todo, ejecuta la función

**`element.append(createTodoHTML(todo));`**
- `createTodoHTML(todo)`: Crea un elemento `<li>` con el HTML del todo
- `element.append()`: Agrega ese `<li>` al final de la lista

**Flujo completo:**
```
1. Recibe: [todo1, todo2, todo3]
2. Busca: <ul class="todo-list">
3. Por cada todo:
   - Crea un <li> con createTodoHTML()
   - Lo agrega a la lista
4. Resultado: 
   <ul class="todo-list">
     <li>todo1</li>
     <li>todo2</li>
     <li>todo3</li>
   </ul>
```

**Analogía:**
- `renderTodos` es como un chef que recibe una lista de pedidos
- Por cada pedido, llama a `createTodoHTML` (el cocinero)
- El cocinero prepara el plato (el HTML)
- El chef lo sirve en la mesa (lo agrega al DOM)

---

### 9. create-todo-html.js - Crea el HTML de un Todo

```javascript
import { Todo } from "../models/todo.model";

export const createTodoHTML = (todo) => {
    if (!todo) throw new Error('A TODO object is required');

    const {done, description, id} = todo;
    
    const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${done ? 'checked' : ''}>
            <label>${description}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `;

    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', id);
    
    if (todo.done) liElement.classList.add('completed');

    return liElement;
}
```

#### Explicación Detallada:

**`const {done, description, id} = todo;`**
- **Destructuring:** Extrae propiedades del objeto `todo`
- Equivalente a:
  ```javascript
  const done = todo.done;
  const description = todo.description;
  const id = todo.id;
  ```

**Template String con Lógica:**
```javascript
${done ? 'checked' : ''}
```
- **Operador ternario:** `condición ? siVerdadero : siFalso`
- Si `done` es `true`, pone `'checked'`
- Si `done` es `false`, pone `''` (string vacío)
- Resultado: `<input type="checkbox" checked>` o `<input type="checkbox">`

**`const liElement = document.createElement('li');`**
- Crea un elemento `<li>` en memoria (no está en el DOM todavía)

**`liElement.innerHTML = html;`**
- Llena el `<li>` con el HTML creado

**`liElement.setAttribute('data-id', id);`**
- Agrega un atributo `data-id` con el ID del todo
- Resultado: `<li data-id="abc123">`
- **¿Para qué?** Para identificar qué todo se clickeó más adelante

**`if (todo.done) liElement.classList.add('completed');`**
- Si el todo está completado, agrega la clase CSS `'completed'`
- Esto aplica estilos de tachado

**`return liElement;`**
- Retorna el elemento `<li>` completo
- Este elemento se agrega al DOM en `renderTodos()`

**Flujo visual:**
```
Input: { id: '123', description: 'Comprar pan', done: false }
       ↓
Output: <li data-id="123">
          <div class="view">
            <input type="checkbox">
            <label>Comprar pan</label>
            <button class="destroy"></button>
          </div>
        </li>
```

---

### 10. use-cases/index.js - Archivo de Barril

```javascript
export { renderTodos } from "./render-todos.js";
export { createTodoHTML } from "./create-todo-html.js";
```

#### Explicación:

**¿Qué hace?**
- Re-exporta funciones de otros archivos
- Permite importar desde la carpeta en lugar de archivos individuales

**Sin archivo de barril:**
```javascript
import { renderTodos } from './use-cases/render-todos.js';
import { createTodoHTML } from './use-cases/create-todo-html.js';
```

**Con archivo de barril:**
```javascript
import { renderTodos, createTodoHTML } from './use-cases';
```

**Ventaja:** Imports más limpios y organizados

---

## Conceptos Clave

### 1. ¿Por qué type="module"?

**Sin módulos (antiguo):**
```html
<script src="file1.js"></script>
<script src="file2.js"></script>
<script src="file3.js"></script>
```
- Todas las variables son globales
- Fácil tener conflictos de nombres
- Difícil de mantener

**Con módulos (moderno):**
```html
<script type="module" src="main.js"></script>
```
- Cada archivo tiene su propio scope
- Usas `import` y `export`
- Más organizado y mantenible

---

### 2. ¿Por qué IIFE en app.js?

**Opción 1: Sin IIFE**
```javascript
export const App = (elementId) => {
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
};
```

**Opción 2: Con IIFE (tu código)**
```javascript
export const App = (elementId) => {
    const displayTodos = () => { ... };

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();
};
```

**Ventaja de la IIFE:**
- Encapsula el código de inicialización
- Separa la lógica de setup de las funciones auxiliares
- Patrón común en JavaScript

---

### 3. ¿Por qué main.js y app.js están separados?

**main.js (Inicializador global):**
- Punto de entrada de la aplicación
- Inicializa servicios globales (store)
- Inicia la aplicación
- Se ejecuta UNA vez

**app.js (Constructor de UI):**
- Crea la interfaz de usuario
- Maneja la lógica de renderizado
- Puede ser reutilizable
- Se enfoca solo en la UI

**Analogía:**
- `main.js` es el gerente que abre el negocio
- `app.js` es el empleado que atiende a los clientes

---

## Preguntas Frecuentes

### ¿Por qué solo llamamos a main.js en el HTML?

Porque `main.js` importa todo lo demás:
```
index.html
    ↓ carga
main.js
    ↓ importa
app.js, todoStore, style.css
    ↓ importan
models, use-cases, etc.
```

Es como una cadena de dominó: solo necesitas empujar el primero.

---

### ¿Por qué renderTodos recibe elementId y no usa directamente '.todo-list'?

**Flexibilidad y reutilización:**
```javascript
// Puedes renderizar en diferentes lugares
renderTodos('.todo-list', todos);
renderTodos('.completed-list', completedTodos);
renderTodos('.pending-list', pendingTodos);
```

Es más flexible que hardcodear el selector.

---

### ¿Por qué createTodoHTML retorna un elemento en lugar de insertarlo directamente?

**Separación de responsabilidades:**
- `createTodoHTML`: CREA el HTML (no sabe dónde va)
- `renderTodos`: INSERTA el HTML (sabe dónde va)

Esto hace el código más modular y testeable.

---

### ¿Por qué el state no se exporta directamente?

**Encapsulación y protección:**
```javascript
// ❌ MAL: Si exportaras el state
export const state = { todos: [] };

// Cualquiera podría hacer:
state.todos = null; // ¡Rompiste la app!

// ✅ BIEN: Solo exportas funciones
export default {
    getTodos,
    addTodo
};

// Solo puedes modificar a través de funciones controladas
```

---

## Resumen Visual del Flujo

```
Usuario abre la app
    ↓
index.html carga
    ↓
Ejecuta main.js (type="module")
    ↓
main.js inicializa:
    1. Importa estilos
    2. todoStore.initStore() → Crea state con 5 todos
    3. App('#app') → Renderiza UI
    ↓
App() ejecuta IIFE:
    1. Crea div
    2. Le pone HTML de app.html
    3. Lo inserta en <div id="app">
    4. Llama displayTodos()
    ↓
displayTodos():
    1. Obtiene todos del store
    2. Llama renderTodos()
    ↓
renderTodos():
    1. Por cada todo, llama createTodoHTML()
    2. Inserta cada <li> en <ul class="todo-list">
    ↓
createTodoHTML():
    1. Crea un <li>
    2. Le pone el HTML del todo
    3. Lo retorna
    ↓
¡App renderizada! Usuario ve 5 todos en pantalla
```

---

## 🎯 Conclusión

Tu aplicación sigue una arquitectura profesional:

1. **Separación de responsabilidades:** Cada archivo tiene un propósito claro
2. **Modularidad:** Todo está dividido en módulos pequeños
3. **Encapsulación:** El state está protegido
4. **Reutilización:** Las funciones son reutilizables
5. **Escalabilidad:** Fácil agregar nuevas features

**¡Estás aprendiendo patrones de código profesional desde el principio!**

---

**Próximo paso:** Entender cómo agregar interactividad (event listeners) para que los usuarios puedan agregar, eliminar y completar todos.
