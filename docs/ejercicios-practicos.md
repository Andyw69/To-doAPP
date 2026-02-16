# 🏋️ Ejercicios Prácticos: State, Store, Imports y Exports

## Objetivo

Practicar los conceptos de State, Store, imports, exports y archivos de barril con ejercicios progresivos.

---

## Ejercicio 1: Entendiendo el State

### Pregunta 1.1
¿Qué imprime este código?

```javascript
const state = {
    todos: [
        { id: 1, description: 'Tarea 1', done: false },
        { id: 2, description: 'Tarea 2', done: true },
        { id: 3, description: 'Tarea 3', done: false }
    ],
    filter: 'all'
};

console.log(state.todos.length);
console.log(state.todos[1].done);
console.log(state.filter);
```

<details>
<summary>Ver Respuesta</summary>

```
3
true
all
```

**Explicación:**
- `state.todos.length` → 3 (hay 3 todos)
- `state.todos[1].done` → true (el segundo todo está completado)
- `state.filter` → 'all' (el filtro actual)
</details>

### Pregunta 1.2
¿Qué hace este código?

```javascript
const state = {
    todos: [
        { id: 1, description: 'Tarea 1', done: false },
        { id: 2, description: 'Tarea 2', done: true }
    ]
};

state.todos.push({ id: 3, description: 'Tarea 3', done: false });
console.log(state.todos.length);
```

<details>
<summary>Ver Respuesta</summary>

```
3
```

**Explicación:**
- `push` agrega un nuevo elemento al array
- Ahora hay 3 todos en total
</details>

---

## Ejercicio 2: Manipulando el State

### Ejercicio 2.1: Filtrar Completados

Completa la función:

```javascript
const state = {
    todos: [
        { id: 1, description: 'Tarea 1', done: false },
        { id: 2, description: 'Tarea 2', done: true },
        { id: 3, description: 'Tarea 3', done: true }
    ]
};

const getCompletedTodos = () => {
    // TODO: Retornar solo los todos con done === true
};

console.log(getCompletedTodos());
// Debe imprimir: [{ id: 2, ... }, { id: 3, ... }]
```

<details>
<summary>Ver Respuesta</summary>

```javascript
const getCompletedTodos = () => {
    return state.todos.filter(todo => todo.done === true);
    // O simplemente: return state.todos.filter(todo => todo.done);
};
```

**Explicación:**
- `filter` crea un nuevo array con los elementos que cumplen la condición
- `todo.done === true` es la condición (puede abreviarse a `todo.done`)
</details>

### Ejercicio 2.2: Eliminar un Todo

Completa la función:

```javascript
const state = {
    todos: [
        { id: 1, description: 'Tarea 1', done: false },
        { id: 2, description: 'Tarea 2', done: true },
        { id: 3, description: 'Tarea 3', done: false }
    ]
};

const deleteTodo = (todoId) => {
    // TODO: Eliminar el todo con el ID especificado
};

deleteTodo(2);
console.log(state.todos);
// Debe imprimir: [{ id: 1, ... }, { id: 3, ... }]
```

<details>
<summary>Ver Respuesta</summary>

```javascript
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
};
```

**Explicación:**
- `filter(todo => todo.id !== todoId)` mantiene todos los todos EXCEPTO el que tiene el ID especificado
- `!==` significa "diferente de"
</details>

### Ejercicio 2.3: Toggle Todo

Completa la función:

```javascript
const state = {
    todos: [
        { id: 1, description: 'Tarea 1', done: false },
        { id: 2, description: 'Tarea 2', done: true }
    ]
};

const toggleTodo = (todoId) => {
    // TODO: Cambiar el estado done del todo con el ID especificado
};

toggleTodo(1);
console.log(state.todos[0].done); // Debe imprimir: true

toggleTodo(1);
console.log(state.todos[0].done); // Debe imprimir: false
```

<details>
<summary>Ver Respuesta</summary>

```javascript
const toggleTodo = (todoId) => {
    const todo = state.todos.find(t => t.id === todoId);
    if (todo) {
        todo.done = !todo.done;
    }
};

// O con map:
const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });
};
```

**Explicación:**
- `find` busca el primer elemento que cumple la condición
- `!todo.done` invierte el valor booleano (true → false, false → true)
</details>

---

## Ejercicio 3: Imports y Exports

### Ejercicio 3.1: Named Export

Tienes este archivo:

```javascript
// utils.js
const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;

// TODO: Exportar sumar y restar
```

¿Cómo lo exportas y cómo lo importas?

<details>
<summary>Ver Respuesta</summary>

```javascript
// utils.js
export const sumar = (a, b) => a + b;
export const restar = (a, b) => a - b;

// O al final:
const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;
export { sumar, restar };

// main.js
import { sumar, restar } from './utils.js';
console.log(sumar(2, 3)); // 5
```
</details>

### Ejercicio 3.2: Default Export

Tienes este archivo:

```javascript
// todo.store.js
const initStore = () => console.log('Init');
const addTodo = (description) => console.log('Add:', description);

// TODO: Exportar como default export
```

¿Cómo lo exportas y cómo lo importas?

<details>
<summary>Ver Respuesta</summary>

```javascript
// todo.store.js
const initStore = () => console.log('Init');
const addTodo = (description) => console.log('Add:', description);

export default {
    initStore,
    addTodo
};

// main.js
import todoStore from './todo.store.js';
todoStore.initStore();
todoStore.addTodo('Tarea');
```
</details>

### Ejercicio 3.3: Mixed Export

Tienes este archivo:

```javascript
// todo.store.js
const Filters = {
    All: 'all',
    Completed: 'completed'
};

const todoStore = {
    initStore() { },
    addTodo() { }
};

// TODO: Exportar Filters como named export y todoStore como default
```

¿Cómo lo exportas y cómo lo importas?

<details>
<summary>Ver Respuesta</summary>

```javascript
// todo.store.js
export const Filters = {
    All: 'all',
    Completed: 'completed'
};

const todoStore = {
    initStore() { },
    addTodo() { }
};

export default todoStore;

// main.js
import todoStore, { Filters } from './todo.store.js';
todoStore.initStore();
console.log(Filters.All);
```
</details>

---

## Ejercicio 4: Archivos de Barril

### Ejercicio 4.1: Crear un Barrel File

Tienes esta estructura:

```
use-cases/
├── render-todos.js    → export const renderTodos = () => { };
├── create-todo.js     → export const createTodo = () => { };
└── delete-todo.js     → export const deleteTodo = () => { };
```

Crea un archivo de barril `use-cases/index.js` que re-exporte todas las funciones.

<details>
<summary>Ver Respuesta</summary>

```javascript
// use-cases/index.js
export { renderTodos } from './render-todos.js';
export { createTodo } from './create-todo.js';
export { deleteTodo } from './delete-todo.js';

// app.js
import { renderTodos, createTodo, deleteTodo } from './use-cases';
```
</details>

### Ejercicio 4.2: Usar un Barrel File

Tienes este código:

```javascript
// app.js
import { renderTodos } from './use-cases/render-todos.js';
import { createTodo } from './use-cases/create-todo.js';
import { deleteTodo } from './use-cases/delete-todo.js';
import { toggleTodo } from './use-cases/toggle-todo.js';
```

Refactoriza usando un archivo de barril.

<details>
<summary>Ver Respuesta</summary>

```javascript
// use-cases/index.js
export { renderTodos } from './render-todos.js';
export { createTodo } from './create-todo.js';
export { deleteTodo } from './delete-todo.js';
export { toggleTodo } from './toggle-todo.js';

// app.js
import { renderTodos, createTodo, deleteTodo, toggleTodo } from './use-cases';
```
</details>

---

## Ejercicio 5: Store Completo

### Ejercicio 5.1: Implementar un Store

Crea un Store completo para una aplicación de contador con estas funcionalidades:

- `initStore()`: Inicializa el contador en 0
- `increment()`: Incrementa el contador en 1
- `decrement()`: Decrementa el contador en 1
- `reset()`: Resetea el contador a 0
- `getCount()`: Retorna el valor actual del contador

<details>
<summary>Ver Respuesta</summary>

```javascript
// counter.store.js
const state = {
    count: 0
};

const initStore = () => {
    state.count = 0;
    console.log('Counter initialized');
};

const increment = () => {
    state.count++;
};

const decrement = () => {
    state.count--;
};

const reset = () => {
    state.count = 0;
};

const getCount = () => {
    return state.count;
};

export default {
    initStore,
    increment,
    decrement,
    reset,
    getCount
};

// main.js
import counterStore from './counter.store.js';

counterStore.initStore();
console.log(counterStore.getCount()); // 0

counterStore.increment();
counterStore.increment();
console.log(counterStore.getCount()); // 2

counterStore.decrement();
console.log(counterStore.getCount()); // 1

counterStore.reset();
console.log(counterStore.getCount()); // 0
```
</details>

### Ejercicio 5.2: Store con Validaciones

Mejora el Store del ejercicio anterior agregando:

- `increment(amount)`: Incrementa por una cantidad específica (default: 1)
- `decrement(amount)`: Decrementa por una cantidad específica (default: 1)
- Validación: No permitir números negativos

<details>
<summary>Ver Respuesta</summary>

```javascript
// counter.store.js
const state = {
    count: 0
};

const initStore = () => {
    state.count = 0;
    console.log('Counter initialized');
};

const increment = (amount = 1) => {
    if (amount < 0) {
        throw new Error('Amount must be positive');
    }
    state.count += amount;
};

const decrement = (amount = 1) => {
    if (amount < 0) {
        throw new Error('Amount must be positive');
    }
    
    const newCount = state.count - amount;
    if (newCount < 0) {
        throw new Error('Count cannot be negative');
    }
    
    state.count = newCount;
};

const reset = () => {
    state.count = 0;
};

const getCount = () => {
    return state.count;
};

export default {
    initStore,
    increment,
    decrement,
    reset,
    getCount
};

// main.js
import counterStore from './counter.store.js';

counterStore.initStore();

counterStore.increment(5);
console.log(counterStore.getCount()); // 5

counterStore.decrement(2);
console.log(counterStore.getCount()); // 3

try {
    counterStore.decrement(10); // Error: Count cannot be negative
} catch (error) {
    console.error(error.message);
}
```
</details>

---

## Ejercicio 6: Debugging

### Ejercicio 6.1: Encuentra el Error

¿Qué está mal en este código?

```javascript
// utils.js
export const sumar = (a, b) => a + b;

// main.js
import sumar from './utils.js';
console.log(sumar(2, 3));
```

<details>
<summary>Ver Respuesta</summary>

**Error:** Estás usando default import para un named export.

**Corrección:**
```javascript
// main.js
import { sumar } from './utils.js';
console.log(sumar(2, 3));
```
</details>

### Ejercicio 6.2: Encuentra el Error

¿Qué está mal en este código?

```javascript
const state = {
    todos: [
        { id: 1, description: 'Tarea 1', done: false },
        { id: 2, description: 'Tarea 2', done: true }
    ]
};

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => todo.done);
};

deleteCompleted();
console.log(state.todos);
// Esperado: [{ id: 1, ... }]
// Actual: [{ id: 2, ... }]
```

<details>
<summary>Ver Respuesta</summary>

**Error:** La lógica del filter está invertida. `filter(todo => todo.done)` mantiene los completados.

**Corrección:**
```javascript
const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    //                                       ↑ Negación
};
```
</details>

### Ejercicio 6.3: Encuentra el Error

¿Qué está mal en este código?

```javascript
const state = {
    todos: [
        { id: 1, description: 'Tarea 1', done: false }
    ]
};

const deleteTodo = (todoId) => {
    state.todos = state.filter(todo => todo.id !== todoId);
};

deleteTodo(1);
```

<details>
<summary>Ver Respuesta</summary>

**Error:** `state.filter` no existe, debe ser `state.todos.filter`.

**Corrección:**
```javascript
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    //            ↑
    //            state.todos
};
```
</details>

---

## Ejercicio 7: Proyecto Completo

### Desafío Final: Shopping Cart Store

Crea un Store completo para un carrito de compras con estas funcionalidades:

**State:**
```javascript
{
    items: [
        { id: 1, name: 'Producto 1', price: 10, quantity: 2 },
        { id: 2, name: 'Producto 2', price: 20, quantity: 1 }
    ]
}
```

**Funciones:**
- `addItem(product)`: Agrega un producto al carrito
- `removeItem(productId)`: Elimina un producto del carrito
- `updateQuantity(productId, quantity)`: Actualiza la cantidad de un producto
- `getTotal()`: Retorna el total del carrito
- `getItemCount()`: Retorna la cantidad total de items
- `clearCart()`: Vacía el carrito

<details>
<summary>Ver Respuesta</summary>

```javascript
// cart.store.js
const state = {
    items: []
};

const initStore = () => {
    state.items = [];
    console.log('Cart initialized');
};

const addItem = (product) => {
    if (!product || !product.id || !product.name || !product.price) {
        throw new Error('Invalid product');
    }
    
    // Verificar si el producto ya existe
    const existingItem = state.items.find(item => item.id === product.id);
    
    if (existingItem) {
        // Incrementar cantidad
        existingItem.quantity++;
    } else {
        // Agregar nuevo producto
        state.items.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
};

const removeItem = (productId) => {
    state.items = state.items.filter(item => item.id !== productId);
};

const updateQuantity = (productId, quantity) => {
    if (quantity < 0) {
        throw new Error('Quantity cannot be negative');
    }
    
    const item = state.items.find(item => item.id === productId);
    
    if (!item) {
        throw new Error(`Product with ID ${productId} not found`);
    }
    
    if (quantity === 0) {
        // Si la cantidad es 0, eliminar el producto
        removeItem(productId);
    } else {
        item.quantity = quantity;
    }
};

const getTotal = () => {
    return state.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
};

const getItemCount = () => {
    return state.items.reduce((count, item) => {
        return count + item.quantity;
    }, 0);
};

const clearCart = () => {
    state.items = [];
};

const getItems = () => {
    return [...state.items]; // Retornar copia
};

export default {
    initStore,
    addItem,
    removeItem,
    updateQuantity,
    getTotal,
    getItemCount,
    clearCart,
    getItems
};

// main.js - Pruebas
import cartStore from './cart.store.js';

cartStore.initStore();

// Agregar productos
cartStore.addItem({ id: 1, name: 'Laptop', price: 1000 });
cartStore.addItem({ id: 2, name: 'Mouse', price: 20 });
cartStore.addItem({ id: 1, name: 'Laptop', price: 1000 }); // Incrementa cantidad

console.log('Items:', cartStore.getItems());
// [{ id: 1, name: 'Laptop', price: 1000, quantity: 2 },
//  { id: 2, name: 'Mouse', price: 20, quantity: 1 }]

console.log('Total:', cartStore.getTotal()); // 2020
console.log('Item count:', cartStore.getItemCount()); // 3

// Actualizar cantidad
cartStore.updateQuantity(1, 1);
console.log('Total después de actualizar:', cartStore.getTotal()); // 1020

// Eliminar producto
cartStore.removeItem(2);
console.log('Items después de eliminar:', cartStore.getItems());
// [{ id: 1, name: 'Laptop', price: 1000, quantity: 1 }]

// Limpiar carrito
cartStore.clearCart();
console.log('Items después de limpiar:', cartStore.getItems()); // []
```
</details>

---

## 🎯 Resumen

Has practicado:

1. ✅ Manipulación del State
2. ✅ Funciones del Store (CRUD)
3. ✅ Named y Default Exports
4. ✅ Archivos de Barril
5. ✅ Debugging de errores comunes
6. ✅ Proyecto completo

**¡Ahora estás listo para construir aplicaciones profesionales con JavaScript puro!**

---

## 📚 Próximos Pasos

1. Implementa estos ejercicios en tu proyecto
2. Experimenta creando tus propios Stores
3. Practica con diferentes estructuras de datos
4. Aprende sobre LocalStorage para persistir datos
5. Estudia el patrón Observer para actualizar la UI automáticamente

**¡Sigue practicando y te convertirás en un programador de alto nivel!**
