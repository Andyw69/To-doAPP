# 📚 Guía Completa: State y Store en JavaScript

## Autor: Tu Mentor de Programación
## Fecha: Febrero 2026
## Proyecto: TodoApp con Vanilla JavaScript

---

## 🎯 Tabla de Contenidos

1. [Fundamentos de State](#fundamentos-de-state)
2. [Fundamentos de Store](#fundamentos-de-store)
3. [Imports y Exports en JavaScript](#imports-y-exports)
4. [Arquitectura de tu TodoApp](#arquitectura-de-tu-todoapp)
5. [Patrones Profesionales](#patrones-profesionales)
6. [Ejercicios Prácticos](#ejercicios-prácticos)

---

## 1. Fundamentos de STATE

### ¿Qué es el State?

El **State** es un objeto JavaScript que contiene **toda la información importante de tu aplicación en un momento específico**.

### Analogía Profunda: El Tablero de Ajedrez

Imagina un juego de ajedrez:

```
Estado Inicial:
- Peones blancos en fila 2
- Peones negros en fila 7
- Torres en las esquinas
- Turno: Blancas
- Movimientos: 0

Estado después de 5 movimientos:
- Peón blanco en E4
- Caballo negro en F6
- Turno: Negras
- Movimientos: 5
```

Cada "foto" del tablero es un **estado diferente**. El State es esa foto.

### En tu TodoApp

```javascript
const state = {
    todos: [
        { id: 1, description: 'Comprar pan', done: false },
        { id: 2, description: 'Estudiar JS', done: true }
    ],
    filter: 'all'  // 'all', 'completed', 'pending'
}
```

Este objeto responde a preguntas como:
- ¿Cuántas tareas hay? → `state.todos.length`
- ¿Cuáles están completadas? → `state.todos.filter(t => t.done)`
- ¿Qué filtro está activo? → `state.filter`

### ¿Por qué necesitamos State?

**Sin State (código caótico):**
```javascript
// archivo1.js
let tareas = ['Comprar pan'];

// archivo2.js
let tareas = ['Estudiar']; // ¡Sobrescribimos sin querer!

// archivo3.js
console.log(tareas); // ¿Cuál tareas? ¡Confusión!
```

**Con State (código organizado):**
```javascript
// store.js
const state = {
    todos: ['Comprar pan', 'Estudiar']
}

// Todos los archivos usan EL MISMO state
// Una única fuente de verdad
```

---

## 2. Fundamentos de STORE

### ¿Qué es el Store?

El **Store** es un **módulo** (archivo) que:
1. Contiene el State (privado)
2. Expone funciones para leer/modificar el State
3. Aplica reglas de negocio

### Analogía Profunda: La Biblioteca

Imagina una biblioteca:

**El State = Los libros en los estantes**
- "Harry Potter" está en el estante A3
- "1984" está prestado a Juan
- Hay 500 libros en total

**El Store = El bibliotecario + Las reglas**
- No puedes entrar a los estantes directamente
- Debes pedirle al bibliotecario: "Quiero el libro X"
- El bibliotecario verifica si está disponible
- El bibliotecario actualiza el registro

**Sin Store (caos):**
```javascript
// Cualquiera puede modificar directamente
let libros = ['Harry Potter', '1984'];
libros = []; // ¡Alguien borró todo!
```

**Con Store (orden):**
```javascript
// Solo el Store puede modificar
const prestarLibro = (titulo) => {
    const libro = state.libros.find(l => l.titulo === titulo);
    if (!libro.disponible) {
        throw new Error('Libro no disponible');
    }
    libro.disponible = false;
    libro.prestadoA = usuario;
    guardarEnBaseDeDatos();
}
```

### Componentes de un Store

```javascript
// 1. STATE (privado)
const state = {
    todos: [],
    filter: 'all'
}

// 2. GETTERS (leer datos)
const getTodos = () => state.todos;
const getFilter = () => state.filter;

// 3. ACTIONS (modificar datos)
const addTodo = (description) => {
    state.todos.push(new Todo(description));
}

const toggleTodo = (id) => {
    const todo = state.todos.find(t => t.id === id);
    todo.done = !todo.done;
}

// 4. EXPORT (lo que otros pueden usar)
export default {
    getTodos,
    addTodo,
    toggleTodo
}
```

---

## 3. Imports y Exports en JavaScript

### ¿Qué son los Módulos?

Los módulos son archivos JavaScript que pueden **exportar** e **importar** código.

### Tipos de Export

#### A) Named Export (Exportación con nombre)

```javascript
// math.js
export const sumar = (a, b) => a + b;
export const restar = (a, b) => a - b;
export const PI = 3.1416;

// main.js
import { sumar, restar, PI } from './math.js';
console.log(sumar(2, 3)); // 5
console.log(PI); // 3.1416
```

**Características:**
- Puedes exportar múltiples cosas
- Debes importar con el **mismo nombre** entre llaves `{}`
- Puedes renombrar: `import { sumar as add } from './math.js'`

#### B) Default Export (Exportación por defecto)

```javascript
// calculator.js
const calculator = {
    sumar: (a, b) => a + b,
    restar: (a, b) => a - b
}

export default calculator;

// main.js
import miCalculadora from './calculator.js';
// ↑ Puedes usar CUALQUIER nombre
console.log(miCalculadora.sumar(2, 3)); // 5
```

**Características:**
- Solo UNA exportación default por archivo
- Puedes importar con **cualquier nombre**
- No usas llaves `{}`

### Tu Caso: todo.store.js

```javascript
// todo.store.js
const initStore = () => {
    console.log('InitStore 🤠');
};

export default {
    initStore,
}
```

**¿Qué está pasando aquí?**

1. **Creamos un objeto:**
```javascript
{
    initStore: initStore
}
// En ES6 se puede abreviar a:
{
    initStore
}
```

2. **Exportamos ese objeto como default:**
```javascript
export default {
    initStore
}
```

3. **En main.js importamos con el nombre que queramos:**
```javascript
import todoStore from './store/todo.store.js'
//     ↑ Este nombre lo elegimos nosotros
```

### ¿Por qué no se llama "initStore"?

Porque estamos importando **el objeto completo**, no solo la función `initStore`.

**Visualización:**

```javascript
// todo.store.js exporta esto:
{
    initStore: function() { ... }
}

// main.js recibe ese objeto y lo llama "todoStore"
const todoStore = {
    initStore: function() { ... }
}

// Por eso usamos:
todoStore.initStore(); // Accedemos a la función dentro del objeto
```

### Comparación de Estilos

#### Estilo 1: Default Export (tu código actual)
```javascript
// todo.store.js
export default {
    initStore,
    addTodo,
    getTodos
}

// main.js
import todoStore from './store/todo.store.js';
todoStore.initStore();
todoStore.addTodo('Tarea');
```

#### Estilo 2: Named Exports
```javascript
// todo.store.js
export const initStore = () => { ... };
export const addTodo = () => { ... };
export const getTodos = () => { ... };

// main.js
import { initStore, addTodo, getTodos } from './store/todo.store.js';
initStore();
addTodo('Tarea');
```

#### Estilo 3: Mixto
```javascript
// todo.store.js
const initStore = () => { ... };
const addTodo = () => { ... };

export { initStore, addTodo };
export default { initStore, addTodo };

// main.js - Opción A
import todoStore from './store/todo.store.js';
todoStore.initStore();

// main.js - Opción B
import { initStore, addTodo } from './store/todo.store.js';
initStore();
```

---

## 4. Arquitectura de tu TodoApp

### Flujo Completo de Datos

```
┌─────────────────────────────────────────────────┐
│                   main.js                       │
│  (Punto de entrada - Inicia todo)              │
└─────────────────┬───────────────────────────────┘
                  │
                  ├──> todoStore.initStore()
                  │    (Inicializa el estado)
                  │
                  └──> App('#app')
                       (Renderiza la interfaz)
                       
┌─────────────────────────────────────────────────┐
│              todo.store.js                      │
│  (El cerebro - Maneja los datos)               │
│                                                 │
│  const state = {                                │
│      todos: [...],                              │
│      filter: 'all'                              │
│  }                                              │
│                                                 │
│  export default {                               │
│      initStore,                                 │
│      addTodo,      ← Funciones que              │
│      deleteTodo,     modifican el state         │
│      getTodos       ← Funciones que             │
│  }                    leen el state             │
└─────────────────────────────────────────────────┘
                  ↑
                  │ usa
                  │
┌─────────────────────────────────────────────────┐
│            todo.model.js                        │
│  (Define QUÉ es un Todo)                        │
│                                                 │
│  export class Todo {                            │
│      constructor(description) {                 │
│          this.id = uuid();                      │
│          this.description = description;        │
│          this.done = false;                     │
│          this.createdAt = new Date();           │
│      }                                          │
│  }                                              │
└─────────────────────────────────────────────────┘
                  ↑
                  │ renderiza
                  │
┌─────────────────────────────────────────────────┐
│                app.js                           │
│  (La interfaz - Lo que ve el usuario)          │
│                                                 │
│  - Muestra los todos                            │
│  - Captura eventos (clicks, inputs)             │
│  - Llama funciones del Store                    │
└─────────────────────────────────────────────────┘
```

### Ejemplo de Flujo: Agregar un Todo

```javascript
// 1. Usuario escribe "Comprar leche" y presiona Enter

// 2. app.js captura el evento
input.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const description = event.target.value;
        
        // 3. Llama al Store
        todoStore.addTodo(description);
        
        // 4. Limpia el input
        event.target.value = '';
        
        // 5. Re-renderiza la lista
        renderTodos();
    }
});

// 6. todo.store.js recibe la petición
const addTodo = (description) => {
    // 7. Crea un nuevo Todo usando el modelo
    const newTodo = new Todo(description);
    
    // 8. Modifica el state
    state.todos.push(newTodo);
    
    // 9. Guarda en localStorage (opcional)
    saveToLocalStorage();
    
    // 10. Notifica a los suscriptores (avanzado)
    notifySubscribers();
}
```

---

## 5. Patrones Profesionales

### Patrón 1: Single Source of Truth (Una Única Fuente de Verdad)

**Problema:**
```javascript
// archivo1.js
let todos = ['Tarea 1'];

// archivo2.js
let todos = ['Tarea 2']; // ¿Cuál es la correcta?
```

**Solución:**
```javascript
// store.js - UNA ÚNICA fuente
const state = { todos: [] };

// Todos los archivos usan el mismo state
```

### Patrón 2: Encapsulación

**Problema:**
```javascript
// Cualquiera puede romper el state
state.todos = null; // ¡Rompimos la app!
```

**Solución:**
```javascript
// El state es privado (no se exporta)
const state = { todos: [] };

// Solo se exportan funciones controladas
export default {
    addTodo: (desc) => {
        if (!desc) throw new Error('Descripción requerida');
        state.todos.push(new Todo(desc));
    }
}
```

### Patrón 3: Inmutabilidad (Avanzado)

**Problema:**
```javascript
const todos = state.todos;
todos.push('Nuevo'); // ¡Modificamos el state directamente!
```

**Solución:**
```javascript
const getTodos = () => {
    return [...state.todos]; // Devolvemos una COPIA
}
```

### Patrón 4: Separación de Responsabilidades

```
Model (todo.model.js)
  ↓ Define la estructura
Store (todo.store.js)
  ↓ Maneja la lógica
View (app.js)
  ↓ Muestra la interfaz
```

Cada archivo tiene **una sola responsabilidad**.

---

## 6. Ejercicios Prácticos

### Ejercicio 1: Entender el Flujo

Traza mentalmente qué pasa cuando ejecutas:
```javascript
todoStore.addTodo('Estudiar JavaScript');
```

**Respuesta:**
1. Se llama a la función `addTodo` del Store
2. Se crea un nuevo objeto `Todo` con la descripción
3. Se agrega al array `state.todos`
4. (Opcional) Se guarda en localStorage
5. (Opcional) Se notifica a la UI para re-renderizar

### Ejercicio 2: Agregar una Función

Agrega al Store una función para obtener solo los todos completados:

```javascript
const getCompletedTodos = () => {
    return state.todos.filter(todo => todo.done === true);
}

// No olvides exportarla
export default {
    initStore,
    getCompletedTodos  // ← Agregar aquí
}
```

### Ejercicio 3: Modificar el State

Crea una función para marcar un todo como completado:

```javascript
const toggleTodo = (todoId) => {
    // Encuentra el todo por ID
    const todo = state.todos.find(t => t.id === todoId);
    
    // Cambia su estado
    if (todo) {
        todo.done = !todo.done;
    }
}
```

---

## 🎓 Conceptos Clave para Memorizar

1. **State = Datos de la aplicación en un momento específico**
2. **Store = Módulo que protege y maneja el State**
3. **Default Export = Exportar UNA cosa con cualquier nombre**
4. **Named Export = Exportar VARIAS cosas con nombres específicos**
5. **Encapsulación = Mantener el State privado**
6. **Single Source of Truth = Un solo lugar para los datos**

---

## 🚀 Próximos Pasos

1. Agregar funciones al Store: `addTodo`, `deleteTodo`, `toggleTodo`
2. Conectar el Store con la UI (app.js)
3. Implementar filtros (All, Completed, Pending)
4. Guardar en localStorage
5. Implementar el patrón Observer (suscriptores)

---

## 📚 Recursos Adicionales

- **Patrón Store:** Similar a Redux (React), Vuex (Vue), NgRx (Angular)
- **Módulos ES6:** https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Modules
- **State Management:** Concepto fundamental en aplicaciones modernas

---

**¡Sigue así! Estás aprendiendo los fundamentos que usan aplicaciones de millones de usuarios.**
