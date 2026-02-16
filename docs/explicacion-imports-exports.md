# 🔍 Explicación Profunda: ¿Por qué "todoStore" y no "initStore"?

## Tu Pregunta

> "¿Por qué en main.js importamos 'todoStore' y no 'initStore'? ¿Por qué no lo llamamos así si no exporté ningún 'todoStore'?"

Esta es una pregunta **EXCELENTE** que demuestra que estás pensando como programador. Vamos a desglosarla paso a paso.

---

## La Respuesta Corta

Importas `todoStore` (puedes llamarlo como quieras) porque estás importando **el objeto completo** que exportaste, no solo la función `initStore`.

---

## La Respuesta Larga (Paso a Paso)

### Paso 1: ¿Qué exporta todo.store.js?

Mira tu código:

```javascript
// todo.store.js
const initStore = () => {
    console.log(state);
    console.log('InitStore 🤠');
};

export default {
    initStore,
}
```

**¿Qué es esto?** 👇

```javascript
export default {
    initStore,
}
```

Esto es equivalente a:

```javascript
export default {
    initStore: initStore
}
```

En ES6, cuando la clave y el valor tienen el mismo nombre, puedes abreviarlo.

**Entonces, estás exportando un OBJETO:**

```javascript
{
    initStore: function() { ... }
}
```

### Paso 2: ¿Qué importa main.js?

```javascript
// main.js
import todoStore from './store/todo.store.js'
```

Cuando usas `export default`, puedes importar con **CUALQUIER nombre**:

```javascript
import todoStore from './store/todo.store.js'
import miStore from './store/todo.store.js'
import pepito from './store/todo.store.js'
import x from './store/todo.store.js'
```

**Todos son válidos** porque estás importando el objeto completo.

### Paso 3: ¿Qué contiene "todoStore"?

Después de la importación, `todoStore` es:

```javascript
const todoStore = {
    initStore: function() {
        console.log(state);
        console.log('InitStore 🤠');
    }
}
```

Por eso usas:

```javascript
todoStore.initStore(); // Accedes a la función dentro del objeto
```

---

## Visualización Completa

```javascript
// ========================================
// ARCHIVO: todo.store.js
// ========================================

// 1. Defines una función
const initStore = () => {
    console.log('InitStore 🤠');
};

// 2. Creas un objeto que contiene esa función
const objetoQueVoyAExportar = {
    initStore: initStore
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
// Output: { initStore: function() {...} }

// 6. Accedes a la función dentro del objeto
todoStore.initStore();
//        ↑
//        Este es el nombre de la propiedad del objeto
```

---

## ¿Por qué no importar directamente "initStore"?

Podrías hacerlo, pero tendrías que cambiar el export:

### Opción A: Named Export (exportar con nombre)

```javascript
// todo.store.js
export const initStore = () => {
    console.log('InitStore 🤠');
};

// main.js
import { initStore } from './store/todo.store.js';
//       ↑ Ahora SÍ debes usar el nombre exacto
initStore(); // Llamas directamente la función
```

### Opción B: Default Export de la función directamente

```javascript
// todo.store.js
const initStore = () => {
    console.log('InitStore 🤠');
};

export default initStore; // Exportas la función, no un objeto

// main.js
import initStore from './store/todo.store.js';
//     ↑ Puedes usar cualquier nombre
initStore(); // Llamas directamente la función
```

---

## ¿Por qué tu instructor eligió exportar un objeto?

Porque el Store va a tener **MUCHAS funciones**, no solo `initStore`:

```javascript
// todo.store.js (versión completa)
const initStore = () => { ... };
const addTodo = (description) => { ... };
const deleteTodo = (id) => { ... };
const toggleTodo = (id) => { ... };
const getTodos = () => { ... };
const getCompletedTodos = () => { ... };

// Exportas TODAS las funciones en un solo objeto
export default {
    initStore,
    addTodo,
    deleteTodo,
    toggleTodo,
    getTodos,
    getCompletedTodos
}

// main.js
import todoStore from './store/todo.store.js';

// Ahora puedes usar todas las funciones
todoStore.initStore();
todoStore.addTodo('Comprar pan');
todoStore.deleteTodo(1);
todoStore.toggleTodo(2);
```

**Ventajas:**
1. Importas una sola vez
2. Todas las funciones están agrupadas bajo `todoStore`
3. Es más fácil de leer: `todoStore.addTodo()` vs solo `addTodo()`

---

## Comparación de Estilos

### Estilo 1: Default Export de Objeto (tu código)

```javascript
// todo.store.js
export default {
    initStore,
    addTodo,
    deleteTodo
}

// main.js
import todoStore from './store/todo.store.js';
todoStore.initStore();
todoStore.addTodo('Tarea');
```

**Pros:**
- Agrupación clara
- Fácil de leer
- Escalable

**Contras:**
- Tienes que escribir `todoStore.` cada vez

### Estilo 2: Named Exports

```javascript
// todo.store.js
export const initStore = () => { ... };
export const addTodo = () => { ... };
export const deleteTodo = () => { ... };

// main.js
import { initStore, addTodo, deleteTodo } from './store/todo.store.js';
initStore();
addTodo('Tarea');
```

**Pros:**
- Llamas las funciones directamente
- Puedes importar solo lo que necesitas

**Contras:**
- Si tienes 10 funciones, la línea de import es muy larga
- Menos claro de dónde viene cada función

### Estilo 3: Namespace Pattern (el más profesional)

```javascript
// todo.store.js
const TodoStore = {
    state: {
        todos: [],
        filter: 'all'
    },
    
    initStore() {
        console.log('Init');
    },
    
    addTodo(description) {
        this.state.todos.push(new Todo(description));
    },
    
    getTodos() {
        return this.state.todos;
    }
};

export default TodoStore;

// main.js
import TodoStore from './store/todo.store.js';
TodoStore.initStore();
TodoStore.addTodo('Tarea');
```

**Pros:**
- Todo está encapsulado en un objeto
- Muy organizado
- Patrón usado en librerías profesionales

---

## Experimento Mental

Imagina que tienes una caja de herramientas:

### Escenario A: Exportas la caja completa (tu código actual)

```javascript
// Exportas la caja
export default {
    martillo,
    destornillador,
    llave
}

// Importas la caja con el nombre que quieras
import miCaja from './herramientas.js';

// Usas las herramientas de la caja
miCaja.martillo();
miCaja.destornillador();
```

### Escenario B: Exportas cada herramienta por separado

```javascript
// Exportas cada herramienta
export const martillo = () => { ... };
export const destornillador = () => { ... };
export const llave = () => { ... };

// Importas solo lo que necesitas
import { martillo, destornillador } from './herramientas.js';

// Usas directamente
martillo();
destornillador();
```

---

## Reglas de Oro

1. **Default Export:** Solo UNA cosa por archivo, puedes importar con cualquier nombre
2. **Named Export:** VARIAS cosas por archivo, debes importar con el nombre exacto (o renombrar)
3. **El nombre al importar es TU elección** (en default export)
4. **El nombre de las propiedades del objeto NO cambia**

---

## Ejercicio para Entender

Predice qué imprime este código:

```javascript
// store.js
const saludar = () => console.log('Hola');
const despedir = () => console.log('Adiós');

export default {
    saludar,
    despedir
}

// main.js
import pepito from './store.js';
pepito.saludar();
pepito.despedir();
```

**Respuesta:**
```
Hola
Adiós
```

¿Por qué funciona si no hay ningún "pepito" en store.js?

Porque `pepito` es el nombre que TÚ le das al objeto exportado. El objeto sigue teniendo las propiedades `saludar` y `despedir`.

---

## Resumen Final

```javascript
// todo.store.js
export default {
    initStore,    ← Propiedad del objeto
    addTodo,      ← Propiedad del objeto
    deleteTodo    ← Propiedad del objeto
}

// main.js
import todoStore from './store/todo.store.js';
//     ↑                                    ↑
//     Nombre que TÚ eliges                 Ruta del archivo

todoStore.initStore();
//        ↑
//        Nombre de la propiedad (NO cambia)
```

**La clave:** Estás importando un **objeto**, no una función individual. Por eso puedes llamarlo como quieras, pero las propiedades del objeto siguen siendo las mismas.

---

## 🎯 Pregunta de Reflexión

¿Qué pasaría si hicieras esto?

```javascript
// main.js
import miSuperStore from './store/todo.store.js';
miSuperStore.initStore(); // ¿Funciona?
```

**Respuesta:** ¡SÍ funciona! Porque `miSuperStore` es solo el nombre que le das al objeto importado. El objeto sigue teniendo la propiedad `initStore`.

---

**¿Quedó más claro? Esta es la base de los módulos en JavaScript moderno.**
