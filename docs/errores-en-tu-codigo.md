# 🐛 Errores en Tu Código y Cómo Corregirlos

## Errores Encontrados en todo.store.js

### Error 1: `deleteTodo` - Typo en el nombre de la variable

```javascript
// ❌ INCORRECTO (línea actual)
const deleteTodo = (todoId) => {
    state.todos = state.filter(todo => todos.id !== todoId);
    //            ↑           ↑
    //            state       todos (sin "state.")
};
```

**Problema:** Escribiste `state.filter` y `todos.id` en lugar de `state.todos.filter` y `todo.id`.

**Corrección:**

```javascript
// ✅ CORRECTO
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    //            ↑           ↑           ↑
    //            state.todos state.todos todo.id
};
```

**Explicación:**
- `state.filter` no existe, debe ser `state.todos.filter`
- `todos.id` no existe (no hay variable `todos`), debe ser `todo.id` (el parámetro del filter)

---

### Error 2: `deleteCompleted` - Lógica invertida

```javascript
// ❌ INCORRECTO (línea actual)
const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => todo.done);
    //                                        ↑
    //                                        Esto MANTIENE los completados
};
```

**Problema:** Estás filtrando los que tienen `todo.done === true`, lo que significa que MANTIENES los completados en lugar de eliminarlos.

**Corrección:**

```javascript
// ✅ CORRECTO
const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    //                                       ↑
    //                                       Negación: mantiene los NO completados
};
```

**Explicación:**
- `filter(todo => todo.done)` mantiene los que están completados
- `filter(todo => !todo.done)` mantiene los que NO están completados (elimina los completados)

**Analogía:**
Imagina que tienes una lista de tareas:
- ✅ Comprar pan (done: true)
- ❌ Estudiar JS (done: false)
- ✅ Hacer ejercicio (done: true)

Si haces `filter(todo => todo.done)`, obtienes:
- ✅ Comprar pan
- ✅ Hacer ejercicio

Si haces `filter(todo => !todo.done)`, obtienes:
- ❌ Estudiar JS

---

## Código Corregido Completo

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

const loadStore = () => {
    throw new Error('Not implemented');
};

/**
 * Agrega un nuevo todo
 * @param {String} description 
 */
const addTodo = (description) => {
    if (!description) throw new Error('Description is required');
    state.todos.push(new Todo(description));
};

/**
 * Cambia el estado done de un todo
 * @param {String} todoId 
 */
const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });
};

/**
 * Elimina un todo por su ID
 * @param {String} todoId 
 */
const deleteTodo = (todoId) => {
    // ✅ CORREGIDO: state.todos.filter y todo.id
    state.todos = state.todos.filter(todo => todo.id !== todoId);
};

/**
 * Elimina todos los todos completados
 */
const deleteCompleted = () => {
    // ✅ CORREGIDO: !todo.done para mantener los NO completados
    state.todos = state.todos.filter(todo => !todo.done);
};

/**
 * Cambia el filtro actual
 * @param {String} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
};

/**
 * Obtiene el filtro actual
 * @returns {String}
 */
const getCurrentFilter = () => {
    return state.filter;
};

/**
 * Obtiene los todos según el filtro
 * @param {String} filter 
 * @returns {Array<Todo>}
 */
const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);

        default: 
            throw new Error(`Option ${filter} is not valid`);
    }
};

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

---

## Mejoras Adicionales Recomendadas

### Mejora 1: Validación en `toggleTodo`

Tu código actual no valida si el todo existe:

```javascript
// ❌ Problema: Si el ID no existe, no pasa nada
const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });
};

// ✅ Mejor: Validar si existe
const toggleTodo = (todoId) => {
    const todo = state.todos.find(t => t.id === todoId);
    
    if (!todo) {
        throw new Error(`Todo with ID ${todoId} not found`);
    }
    
    todo.done = !todo.done;
};
```

### Mejora 2: Validación en `deleteTodo`

```javascript
// ✅ Mejor: Validar si existe antes de eliminar
const deleteTodo = (todoId) => {
    const index = state.todos.findIndex(todo => todo.id === todoId);
    
    if (index === -1) {
        throw new Error(`Todo with ID ${todoId} not found`);
    }
    
    state.todos.splice(index, 1);
};
```

### Mejora 3: Retornar información útil

```javascript
// ✅ Mejor: Retornar el todo eliminado
const deleteTodo = (todoId) => {
    const index = state.todos.findIndex(todo => todo.id === todoId);
    
    if (index === -1) {
        throw new Error(`Todo with ID ${todoId} not found`);
    }
    
    const deleted = state.todos.splice(index, 1)[0];
    return deleted; // Retornar el todo eliminado
};

// ✅ Mejor: Retornar cuántos se eliminaron
const deleteCompleted = () => {
    const beforeCount = state.todos.length;
    state.todos = state.todos.filter(todo => !todo.done);
    const deletedCount = beforeCount - state.todos.length;
    
    return deletedCount; // Retornar cuántos se eliminaron
};
```

### Mejora 4: Inmutabilidad en `toggleTodo`

Tu código actual muta el objeto directamente. Una mejor práctica es crear un nuevo array:

```javascript
// ✅ Mejor: Inmutabilidad
const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            return { ...todo, done: !todo.done }; // Crear nuevo objeto
        }
        return todo;
    });
};
```

Aunque en tu caso, como estás usando clases (`new Todo()`), es aceptable mutar directamente.

---

## Pruebas para Verificar las Correcciones

Agrega esto en tu `main.js` para probar:

```javascript
// main.js
import todoStore from './store/todo.store.js';

// Inicializar
todoStore.initStore();

console.log('=== PRUEBA 1: Agregar Todo ===');
todoStore.addTodo('Nueva tarea');
console.log('Todos:', todoStore.getTodos());

console.log('=== PRUEBA 2: Toggle Todo ===');
const todos = todoStore.getTodos();
const firstTodoId = todos[0].id;
console.log('Antes:', todos[0]);
todoStore.toggleTodo(firstTodoId);
console.log('Después:', todoStore.getTodos()[0]);

console.log('=== PRUEBA 3: Delete Todo ===');
console.log('Antes:', todoStore.getTodos().length);
todoStore.deleteTodo(firstTodoId);
console.log('Después:', todoStore.getTodos().length);

console.log('=== PRUEBA 4: Delete Completed ===');
// Marcar algunos como completados
todoStore.getTodos().forEach((todo, index) => {
    if (index % 2 === 0) {
        todoStore.toggleTodo(todo.id);
    }
});
console.log('Antes de eliminar completados:', todoStore.getTodos());
todoStore.deleteCompleted();
console.log('Después de eliminar completados:', todoStore.getTodos());
```

---

## Resumen de Errores

| Función | Error | Corrección |
|---------|-------|------------|
| `deleteTodo` | `state.filter` y `todos.id` | `state.todos.filter` y `todo.id` |
| `deleteCompleted` | `todo.done` (mantiene completados) | `!todo.done` (elimina completados) |

---

## 🎯 Próximos Pasos

1. Corrige los errores en `todo.store.js`
2. Ejecuta las pruebas en `main.js`
3. Verifica que todo funcione correctamente
4. Considera implementar las mejoras adicionales

---

**¡Estos errores son comunes cuando estás aprendiendo! Lo importante es entender POR QUÉ ocurren y cómo corregirlos.**
