# 🔄 Imports y Exports en JavaScript - Guía Definitiva

## Tabla de Contenidos

1. [Tipos de Exports](#tipos-de-exports)
2. [Tipos de Imports](#tipos-de-imports)
3. [Combinaciones Comunes](#combinaciones-comunes)
4. [Errores Comunes](#errores-comunes)
5. [Ejemplos Prácticos](#ejemplos-prácticos)

---

## Tipos de Exports

### 1. Named Export (Exportación con Nombre)

Exportas múltiples cosas con sus nombres específicos.

```javascript
// utils.js
export const sumar = (a, b) => a + b;
export const restar = (a, b) => a - b;
export const PI = 3.14159;

export class Calculadora {
    // ...
}
```

**Características:**
- Puedes exportar múltiples cosas
- Debes usar el nombre exacto al importar (o renombrar explícitamente)
- Puedes exportar en la declaración o al final del archivo

**Variante: Exportar al final**

```javascript
// utils.js
const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;
const PI = 3.14159;

// Exportar todo al final
export { sumar, restar, PI };
```

### 2. Default Export (Exportación por Defecto)

Exportas UNA cosa principal del archivo.

```javascript
// todo.store.js
const todoStore = {
    initStore() { },
    addTodo() { },
    deleteTodo() { }
};

export default todoStore;
```

**Características:**
- Solo UNA exportación default por archivo
- Puedes importar con cualquier nombre
- Es la exportación "principal" del archivo

**Variantes:**

```javascript
// Opción 1: Exportar objeto
export default {
    initStore,
    addTodo,
    deleteTodo
};

// Opción 2: Exportar función
export default function initStore() {
    // ...
}

// Opción 3: Exportar clase
export default class Todo {
    // ...
}

// Opción 4: Exportar constante
const store = { /* ... */ };
export default store;
```

### 3. Mixed Exports (Combinación)

Puedes combinar default y named exports en el mismo archivo.

```javascript
// todo.store.js
export const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
};

const todoStore = {
    initStore() { },
    addTodo() { }
};

export default todoStore;
```

---

## Tipos de Imports

### 1. Named Import (Importación con Nombre)

Importas cosas específicas por su nombre.

```javascript
// Importar una cosa
import { sumar } from './utils.js';

// Importar múltiples cosas
import { sumar, restar, PI } from './utils.js';

// Importar con renombre
import { sumar as add, restar as subtract } from './utils.js';

// Importar todo como namespace
import * as Utils from './utils.js';
// Uso: Utils.sumar(), Utils.restar()
```

### 2. Default Import (Importación por Defecto)

Importas la exportación default con el nombre que quieras.

```javascript
// Puedes usar CUALQUIER nombre
import todoStore from './todo.store.js';
import miStore from './todo.store.js';
import pepito from './todo.store.js';

// Todos son válidos y apuntan a lo mismo
```

### 3. Mixed Import (Importación Combinada)

Importas default y named exports juntos.

```javascript
// todo.store.js exporta:
// - export default todoStore
// - export const Filters = { ... }

// Importar ambos
import todoStore, { Filters } from './todo.store.js';
//     ↑           ↑
//     default     named

// Uso
todoStore.initStore();
console.log(Filters.All);
```

### 4. Side Effect Import (Importación de Efecto)

Importas un archivo solo para ejecutar su código, sin importar nada.

```javascript
// Ejecuta el código del archivo pero no importa nada
import './style.css';
import './init-app.js';
```

---

## Combinaciones Comunes

### Caso 1: Default Export de Objeto

```javascript
// ========================================
// ARCHIVO: todo.store.js
// ========================================
const initStore = () => { };
const addTodo = () => { };

export default {
    initStore,
    addTodo
};

// ========================================
// ARCHIVO: main.js
// ========================================
import todoStore from './todo.store.js';
todoStore.initStore();
todoStore.addTodo();
```

### Caso 2: Named Exports

```javascript
// ========================================
// ARCHIVO: utils.js
// ========================================
export const sumar = (a, b) => a + b;
export const restar = (a, b) => a - b;

// ========================================
// ARCHIVO: main.js
// ========================================
import { sumar, restar } from './utils.js';
sumar(2, 3);
restar(5, 2);
```

### Caso 3: Default Export de Clase

```javascript
// ========================================
// ARCHIVO: todo.model.js
// ========================================
export default class Todo {
    constructor(description) {
        this.description = description;
    }
}

// ========================================
// ARCHIVO: main.js
// ========================================
import Todo from './todo.model.js';
const todo = new Todo('Comprar pan');
```

### Caso 4: Mixed (Default + Named)

```javascript
// ========================================
// ARCHIVO: todo.store.js
// ========================================
export const Filters = {
    All: 'all',
    Completed: 'completed'
};

const todoStore = {
    initStore() { }
};

export default todoStore;

// ========================================
// ARCHIVO: main.js
// ========================================
import todoStore, { Filters } from './todo.store.js';
todoStore.initStore();
console.log(Filters.All);
```

### Caso 5: Re-exportación (Barrel Files)

```javascript
// ========================================
// ARCHIVO: use-cases/render-todos.js
// ========================================
export const renderTodos = () => { };

// ========================================
// ARCHIVO: use-cases/index.js (BARREL)
// ========================================
export { renderTodos } from './render-todos.js';
export { createTodoHTML } from './create-todo-html.js';

// ========================================
// ARCHIVO: app.js
// ========================================
import { renderTodos, createTodoHTML } from './use-cases';
```

---

## Errores Comunes

### Error 1: Confundir Named y Default

```javascript
// ❌ INCORRECTO
// utils.js
export const sumar = (a, b) => a + b;

// main.js
import sumar from './utils.js'; // ❌ Error: sumar no es default export

// ✅ CORRECTO
import { sumar } from './utils.js';
```

### Error 2: Olvidar las llaves en Named Import

```javascript
// ❌ INCORRECTO
// utils.js
export const sumar = (a, b) => a + b;

// main.js
import sumar from './utils.js'; // ❌ Error

// ✅ CORRECTO
import { sumar } from './utils.js';
```

### Error 3: Usar llaves en Default Import

```javascript
// ❌ INCORRECTO
// todo.store.js
export default todoStore;

// main.js
import { todoStore } from './todo.store.js'; // ❌ Error

// ✅ CORRECTO
import todoStore from './todo.store.js';
```

### Error 4: Múltiples Default Exports

```javascript
// ❌ INCORRECTO
export default const sumar = () => { };
export default const restar = () => { }; // ❌ Error: solo un default

// ✅ CORRECTO - Opción 1: Named Exports
export const sumar = () => { };
export const restar = () => { };

// ✅ CORRECTO - Opción 2: Default Export de Objeto
export default {
    sumar: () => { },
    restar: () => { }
};
```

### Error 5: Importar sin extensión .js (en algunos entornos)

```javascript
// ❌ Puede fallar en algunos entornos
import todoStore from './todo.store';

// ✅ Más seguro
import todoStore from './todo.store.js';
```

---

## Ejemplos Prácticos de Tu Proyecto

### Ejemplo 1: todo.model.js

```javascript
// ========================================
// ARCHIVO: todo.model.js
// ========================================
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

// ========================================
// CÓMO IMPORTAR
// ========================================

// Opción 1: Named import (porque usaste "export class")
import { Todo } from './todo.model.js';
const todo = new Todo('Tarea');

// Opción 2: Si fuera default export
// export default class Todo { ... }
// import Todo from './todo.model.js';
```

### Ejemplo 2: todo.store.js

```javascript
// ========================================
// ARCHIVO: todo.store.js
// ========================================
import { Todo } from "../todos/models/todo.model";

const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending',
};

const state = {
    todos: [],
    filter: Filters.All
}

const initStore = () => { };
const addTodo = (description) => { };
const getTodos = () => { };

// Default export de objeto
export default {
    initStore,
    addTodo,
    getTodos,
}

// ========================================
// CÓMO IMPORTAR
// ========================================

// Opción 1: Default import (lo que estás usando)
import todoStore from './todo.store.js';
todoStore.initStore();
todoStore.addTodo('Tarea');

// Opción 2: Si quisieras exportar Filters también
// export default { initStore, addTodo };
// export { Filters };

// import todoStore, { Filters } from './todo.store.js';
```

### Ejemplo 3: use-cases/index.js (Barrel File)

```javascript
// ========================================
// ARCHIVO: use-cases/render-todos.js
// ========================================
export const renderTodos = (elementId, todos) => {
    // ...
};

// ========================================
// ARCHIVO: use-cases/create-todo-html.js
// ========================================
export const createTodoHTML = (todo) => {
    // ...
};

// ========================================
// ARCHIVO: use-cases/index.js (BARREL)
// ========================================
export { renderTodos } from "./render-todos.js";
export { createTodoHTML } from "./create-todo-html.js";

// ========================================
// ARCHIVO: app.js
// ========================================
// Importar desde el barrel
import { renderTodos, createTodoHTML } from './use-cases';

// O importar directamente (sin barrel)
import { renderTodos } from './use-cases/render-todos.js';
import { createTodoHTML } from './use-cases/create-todo-html.js';
```

---

## Tabla de Referencia Rápida

| Tipo de Export | Sintaxis Export | Sintaxis Import | Notas |
|----------------|-----------------|-----------------|-------|
| Named | `export const x = 1;` | `import { x } from './file.js';` | Múltiples por archivo |
| Named (al final) | `export { x, y };` | `import { x, y } from './file.js';` | Exportar al final |
| Default | `export default x;` | `import x from './file.js';` | Solo uno por archivo |
| Default + Named | `export default x; export const y = 2;` | `import x, { y } from './file.js';` | Combinación |
| Re-export | `export { x } from './other.js';` | `import { x } from './barrel.js';` | Barrel files |
| Re-export all | `export * from './other.js';` | `import { x, y } from './barrel.js';` | Todo de un archivo |
| Rename export | `export { x as y };` | `import { y } from './file.js';` | Cambiar nombre |
| Rename import | - | `import { x as y } from './file.js';` | Cambiar nombre al importar |
| Namespace | - | `import * as Utils from './file.js';` | Todo como objeto |

---

## Reglas de Oro

1. **Named Export:** Usa cuando tienes múltiples cosas para exportar
   ```javascript
   export const a = 1;
   export const b = 2;
   ```

2. **Default Export:** Usa cuando tienes UNA cosa principal
   ```javascript
   export default class Todo { }
   ```

3. **Default Export de Objeto:** Usa para agrupar funciones relacionadas
   ```javascript
   export default {
       initStore,
       addTodo,
       deleteTodo
   }
   ```

4. **Barrel Files:** Usa para organizar carpetas con múltiples archivos
   ```javascript
   // use-cases/index.js
   export { renderTodos } from './render-todos.js';
   ```

5. **Consistencia:** Mantén el mismo estilo en todo tu proyecto

---

## Ejercicio de Comprensión

Predice qué imprime este código:

```javascript
// ========================================
// ARCHIVO: math.js
// ========================================
export const sumar = (a, b) => a + b;
export const restar = (a, b) => a - b;

const multiplicar = (a, b) => a * b;

export default {
    sumar,
    restar,
    multiplicar
};

// ========================================
// ARCHIVO: main.js
// ========================================
import math from './math.js';
import { sumar } from './math.js';

console.log(math.sumar(2, 3));
console.log(sumar(2, 3));
console.log(math.multiplicar(2, 3));
```

**Respuesta:**
```
5
5
6
```

**Explicación:**
- `math` es el default export (el objeto con las 3 funciones)
- `sumar` es el named export (la función directa)
- `multiplicar` solo está disponible en el default export, no como named export

---

## Resumen Visual

```javascript
// ========================================
// NAMED EXPORT
// ========================================
export const x = 1;
import { x } from './file.js';

// ========================================
// DEFAULT EXPORT
// ========================================
export default x;
import cualquierNombre from './file.js';

// ========================================
// MIXED
// ========================================
export default x;
export const y = 2;
import x, { y } from './file.js';

// ========================================
// BARREL
// ========================================
export { x } from './other.js';
import { x } from './barrel.js';
```

---

## 🎯 Conclusión

Los imports y exports son la base de la modularidad en JavaScript moderno. Entenderlos bien te permite:

1. Organizar tu código de forma profesional
2. Reutilizar código fácilmente
3. Mantener tu proyecto escalable
4. Trabajar en equipo sin conflictos

**¡Dominar esto te pone en el camino de ser un programador de alto nivel!**
