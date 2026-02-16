# ❓ Respuestas a Tus Preguntas Específicas

## Pregunta 1: ¿Por qué hay cosas en main.js y otras en app.js?

### Respuesta Corta:
- **main.js** = Inicializa la aplicación (se ejecuta UNA vez)
- **app.js** = Construye la interfaz (puede ejecutarse múltiples veces)

### Respuesta Detallada:

#### main.js - El "Gerente"

```javascript
import './style.css'
import { App } from './todos/app';
import todoStore from './store/todo.store.js'

todoStore.initStore();  // 1. Inicializa datos
App('#app');            // 2. Crea la interfaz
```

**Responsabilidades:**
1. Cargar estilos globales
2. Inicializar el store (crear el state inicial)
3. Iniciar la aplicación
4. Se ejecuta UNA sola vez cuando cargas la página

**Analogía:**
Es como el gerente que abre un restaurante:
- Enciende las luces (carga estilos)
- Prepara la cocina (inicializa store)
- Abre las puertas (inicia la app)

#### app.js - El "Constructor"

```javascript
import html from './app.html?raw'
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases';

export const App = (elementId) => {
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
    };

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();
};
```

**Responsabilidades:**
1. Crear la estructura HTML
2. Renderizar los todos
3. Manejar eventos de usuario
4. Actualizar la interfaz

**Analogía:**
Es como el mesero que atiende a los clientes:
- Toma pedidos (eventos)
- Trae la comida (renderiza datos)
- Actualiza la mesa (actualiza UI)

### Flujo Completo:

```
1. Usuario abre la página
   ↓
2. main.js se ejecuta
   ↓
3. todoStore.initStore() crea el state inicial
   ↓
4. App('#app') construye la interfaz
   ↓
5. Usuario interactúa (click, input, etc.)
   ↓
6. app.js maneja el evento
   ↓
7. Llama a funciones del store (addTodo, deleteTodo, etc.)
   ↓
8. Store actualiza el state
   ↓
9. app.js re-renderiza la interfaz
   ↓
10. Usuario ve los cambios
```

---

## Pregunta 2: ¿Por qué "todoStore" y no "initStore"?

### Respuesta Corta:
Porque estás importando el **objeto completo**, no solo la función `initStore`.

### Respuesta Detallada:

#### ¿Qué exporta todo.store.js?

```javascript
// todo.store.js
const initStore = () => { /* ... */ };
const addTodo = () => { /* ... */ };
const deleteTodo = () => { /* ... */ };

export default {
    initStore,
    addTodo,
    deleteTodo
}
```

Estás exportando un **objeto** con 3 propiedades:
```javascript
{
    initStore: function() { ... },
    addTodo: function() { ... },
    deleteTodo: function() { ... }
}
```

#### ¿Qué importa main.js?

```javascript
// main.js
import todoStore from './store/todo.store.js'
//     ↑
//     Este nombre lo eliges TÚ
```

Cuando usas `export default`, puedes importar con **CUALQUIER nombre**:

```javascript
import todoStore from './store/todo.store.js'  // ✅ Válido
import miStore from './store/todo.store.js'    // ✅ Válido
import pepito from './store/todo.store.js'     // ✅ Válido
import x from './store/todo.store.js'          // ✅ Válido
```

Todos importan el mismo objeto.

#### ¿Por qué usamos "todoStore"?

Porque es **descriptivo**. Le dice a otros programadores (y a ti en el futuro) que este objeto maneja los todos.

```javascript
// ✅ Bueno: Descriptivo
import todoStore from './store/todo.store.js'
todoStore.initStore();
todoStore.addTodo('Tarea');

// ❌ Malo: No descriptivo
import x from './store/todo.store.js'
x.initStore();
x.addTodo('Tarea');
```

### Visualización Completa:

```javascript
// ========================================
// ARCHIVO: todo.store.js
// ========================================

// 1. Defines funciones
const initStore = () => { console.log('Init'); };
const addTodo = () => { console.log('Add'); };

// 2. Creas un objeto que contiene esas funciones
const objetoQueVoyAExportar = {
    initStore: initStore,
    addTodo: addTodo
};

// 3. Exportas ese objeto como default
export default objetoQueVoyAExportar;

// ========================================
// ARCHIVO: main.js
// ========================================

// 4. Importas el objeto con el nombre que TÚ elijas
import todoStore from './store/todo.store.js'
//     ↑
//     Este nombre lo inventas tú

// 5. Ahora "todoStore" contiene el objeto exportado
console.log(todoStore);
// Output: { initStore: function() {...}, addTodo: function() {...} }

// 6. Accedes a las funciones dentro del objeto
todoStore.initStore();
//        ↑
//        Este es el nombre de la propiedad del objeto (NO cambia)
```

### Regla de Oro:

```javascript
// En export default:
// - El nombre al IMPORTAR lo eliges TÚ
// - Los nombres de las PROPIEDADES del objeto NO cambian

export default {
    initStore,    ← Nombre de propiedad (fijo)
    addTodo       ← Nombre de propiedad (fijo)
}

import cualquierNombre from './file.js';
//     ↑
//     Lo eliges tú

cualquierNombre.initStore();  // ← Nombre de propiedad (fijo)
```

---

## Pregunta 3: ¿Qué son los archivos de barril?

### Respuesta Corta:
Un archivo `index.js` que re-exporta cosas de otros archivos para tener imports más limpios.

### Respuesta Detallada:

#### Sin Archivo de Barril:

```javascript
// app.js
import { renderTodos } from './use-cases/render-todos.js';
import { createTodoHTML } from './use-cases/create-todo-html.js';
import { toggleTodo } from './use-cases/toggle-todo.js';
import { deleteTodo } from './use-cases/delete-todo.js';
```

**Problemas:**
- 4 líneas de imports
- Rutas largas
- Si cambias la estructura, tienes que actualizar muchos archivos

#### Con Archivo de Barril:

```javascript
// use-cases/index.js (ARCHIVO DE BARRIL)
export { renderTodos } from './render-todos.js';
export { createTodoHTML } from './create-todo-html.js';
export { toggleTodo } from './toggle-todo.js';
export { deleteTodo } from './delete-todo.js';
```

```javascript
// app.js
import { 
    renderTodos, 
    createTodoHTML, 
    toggleTodo, 
    deleteTodo 
} from './use-cases';
//              ↑
//              JavaScript busca index.js automáticamente
```

**Ventajas:**
- 1 sola línea de import (o pocas líneas organizadas)
- Ruta más corta
- Si cambias la estructura interna, solo actualizas el barril

### Analogía:

**Sin barril:** Ir a 4 tiendas diferentes para comprar 4 cosas
**Con barril:** Ir a un centro comercial que tiene todo en un solo lugar

---

## Pregunta 4: ¿Cómo saber qué crear y dónde?

### Respuesta Corta:
Sigue el principio de **Separación de Responsabilidades**: cada archivo/carpeta tiene UNA responsabilidad clara.

### Respuesta Detallada:

Ver documento: `arquitectura-completa-todoapp.md`

---

## Resumen Visual

```
┌─────────────────────────────────────────────────┐
│                   main.js                       │
│  (Gerente - Inicializa todo UNA vez)           │
│                                                 │
│  1. Carga estilos                              │
│  2. Inicializa store                           │
│  3. Inicia la app                              │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│                   app.js                        │
│  (Constructor - Construye la interfaz)         │
│                                                 │
│  1. Crea HTML                                  │
│  2. Renderiza datos                            │
│  3. Maneja eventos                             │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│                todo.store.js                    │
│  (Banco - Guarda y protege los datos)          │
│                                                 │
│  1. State (los datos)                          │
│  2. Funciones para modificar (cajeros)        │
└─────────────────────────────────────────────────┘
```

---

**¿Quedó más claro? Estos conceptos son fundamentales para entender arquitectura de aplicaciones.**
