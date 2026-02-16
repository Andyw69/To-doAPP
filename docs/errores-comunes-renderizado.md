# 🐛 Errores Comunes de Renderizado

## Error 1: Duplicación de Elementos (Tu problema)

### 🔴 El Problema

```javascript
// ❌ INCORRECTO
export const renderTodos = (elementId, todos = []) => {
    const element = document.querySelector(elementId);

    todos.forEach(todo => {
        element.append(createTodoHTML(todo));  // Agrega sin limpiar
    });
};
```

**Qué pasa:**
1. Primera renderización: 5 todos ✅
2. Agregas 1 nuevo todo
3. `renderTodos()` se ejecuta de nuevo
4. Agrega 6 todos MÁS (sin borrar los 5 anteriores)
5. Resultado: 5 + 6 = 11 todos en pantalla ❌

**Analogía:**
Es como escribir en una pizarra sin borrar lo anterior. Cada vez que escribes, se acumula más texto.

### ✅ La Solución

```javascript
// ✅ CORRECTO
export const renderTodos = (elementId, todos = []) => {
    const element = document.querySelector(elementId);

    // Limpiar el contenedor antes de renderizar
    element.innerHTML = '';

    todos.forEach(todo => {
        element.append(createTodoHTML(todo));
    });
};
```

**Ahora:**
1. Primera renderización: 5 todos ✅
2. Agregas 1 nuevo todo
3. `renderTodos()` se ejecuta de nuevo
4. **Limpia** el contenedor (0 todos)
5. Agrega 6 todos
6. Resultado: 6 todos en pantalla ✅

### 🎯 Regla de Oro

**Siempre limpia el contenedor antes de renderizar una lista completa.**

```javascript
// Patrón correcto para renderizar listas
const renderList = (elementId, items) => {
    const element = document.querySelector(elementId);
    
    // 1. Limpiar
    element.innerHTML = '';
    
    // 2. Renderizar
    items.forEach(item => {
        element.append(createItemHTML(item));
    });
};
```

---

## Error 2: No Limpiar el Input Después de Agregar

### 🔴 El Problema

```javascript
// ❌ INCORRECTO
newDescriptionInput.addEventListener('keyup', (event) => {
    if (event.keyCode !== 13) return;
    
    todoStore.addTodo(event.target.value);
    displayTodos();
    
    // ❌ No limpia el input
});
```

**Qué pasa:**
El texto queda en el input después de agregar el todo.

### ✅ La Solución

```javascript
// ✅ CORRECTO
newDescriptionInput.addEventListener('keyup', (event) => {
    if (event.keyCode !== 13) return;
    
    todoStore.addTodo(event.target.value);
    displayTodos();
    
    // ✅ Limpiar el input
    event.target.value = '';
});
```

---

## Error 3: Renderizar Elemento Individual en Lugar de Lista Completa

### 🔴 El Problema

```javascript
// ❌ INCORRECTO: Renderizar solo el nuevo elemento
const addTodo = (description) => {
    const newTodo = new Todo(description);
    state.todos.push(newTodo);
    
    // Renderizar solo el nuevo
    const element = document.querySelector('.todo-list');
    element.append(createTodoHTML(newTodo));
};
```

**Problemas:**
- Si cambias el filtro, el nuevo todo puede no cumplir el filtro
- Si ordenas la lista, el nuevo todo queda al final
- Inconsistencia entre el state y la UI

### ✅ La Solución

```javascript
// ✅ CORRECTO: Re-renderizar toda la lista
const addTodo = (description) => {
    const newTodo = new Todo(description);
    state.todos.push(newTodo);
    
    // Re-renderizar toda la lista
    displayTodos();
};
```

**Ventajas:**
- La UI siempre refleja el state completo
- Los filtros funcionan correctamente
- El orden se mantiene

---

## Error 4: Olvidar Validar el Input

### 🔴 El Problema

```javascript
// ❌ INCORRECTO
newDescriptionInput.addEventListener('keyup', (event) => {
    if (event.keyCode !== 13) return;
    
    // ❌ No valida si está vacío
    todoStore.addTodo(event.target.value);
    displayTodos();
    event.target.value = '';
});
```

**Qué pasa:**
Puedes agregar todos vacíos o con solo espacios.

### ✅ La Solución

```javascript
// ✅ CORRECTO
newDescriptionInput.addEventListener('keyup', (event) => {
    if (event.keyCode !== 13) return;
    
    // Validar que no esté vacío
    if (event.target.value.trim().length === 0) return;
    
    todoStore.addTodo(event.target.value);
    displayTodos();
    event.target.value = '';
});
```

---

## Error 5: No Manejar Errores

### 🔴 El Problema

```javascript
// ❌ INCORRECTO
newDescriptionInput.addEventListener('keyup', (event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;
    
    // ❌ Si addTodo lanza un error, la app se rompe
    todoStore.addTodo(event.target.value);
    displayTodos();
    event.target.value = '';
});
```

### ✅ La Solución

```javascript
// ✅ CORRECTO
newDescriptionInput.addEventListener('keyup', (event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;
    
    try {
        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    } catch (error) {
        console.error('Error al agregar todo:', error);
        alert('Error al agregar la tarea. Por favor, intenta de nuevo.');
    }
});
```

---

## Error 6: Usar `innerHTML` para Agregar Elementos

### 🔴 El Problema

```javascript
// ❌ INCORRECTO
export const renderTodos = (elementId, todos = []) => {
    const element = document.querySelector(elementId);
    
    let html = '';
    todos.forEach(todo => {
        html += `<li>${todo.description}</li>`;
    });
    
    element.innerHTML = html;
};
```

**Problemas:**
- Pierdes los event listeners
- Menos eficiente
- Más difícil de mantener

### ✅ La Solución

```javascript
// ✅ CORRECTO
export const renderTodos = (elementId, todos = []) => {
    const element = document.querySelector(elementId);
    
    // Limpiar
    element.innerHTML = '';
    
    // Crear elementos del DOM
    todos.forEach(todo => {
        element.append(createTodoHTML(todo));
    });
};
```

---

## Error 7: No Usar `data-id` para Identificar Elementos

### 🔴 El Problema

```javascript
// ❌ INCORRECTO
export const createTodoHTML = (todo) => {
    const liElement = document.createElement('li');
    liElement.innerHTML = `
        <label>${todo.description}</label>
        <button class="destroy">X</button>
    `;
    
    // ❌ No hay forma de saber qué todo es este
    return liElement;
};
```

**Problema:**
Cuando el usuario hace click en "X", no sabes qué todo eliminar.

### ✅ La Solución

```javascript
// ✅ CORRECTO
export const createTodoHTML = (todo) => {
    const liElement = document.createElement('li');
    liElement.innerHTML = `
        <label>${todo.description}</label>
        <button class="destroy">X</button>
    `;
    
    // ✅ Agregar el ID como atributo
    liElement.setAttribute('data-id', todo.id);
    
    return liElement;
};

// Uso:
document.querySelector('.todo-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('destroy')) {
        const li = e.target.closest('li');
        const todoId = li.getAttribute('data-id');
        todoStore.deleteTodo(todoId);
        displayTodos();
    }
});
```

---

## Error 8: Renderizar Antes de que el DOM Esté Listo

### 🔴 El Problema

```javascript
// ❌ INCORRECTO
// app.js
export const App = (elementId) => {
    const displayTodos = () => {
        const todos = todoStore.getTodos();
        renderTodos(ElementIDs.TodoList, todos);
    };

    // ❌ Renderizar antes de crear el HTML
    displayTodos();

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
    })();
};
```

**Problema:**
`querySelector('.todo-list')` retorna `null` porque el HTML aún no existe.

### ✅ La Solución

```javascript
// ✅ CORRECTO
export const App = (elementId) => {
    const displayTodos = () => {
        const todos = todoStore.getTodos();
        renderTodos(ElementIDs.TodoList, todos);
    };

    (() => {
        // 1. Crear el HTML primero
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        
        // 2. Luego renderizar
        displayTodos();
    })();
};
```

---

## Checklist de Renderizado

Antes de renderizar, verifica:

- [ ] ¿Limpio el contenedor antes de renderizar?
- [ ] ¿Valido los inputs del usuario?
- [ ] ¿Manejo errores con try-catch?
- [ ] ¿Uso `data-id` para identificar elementos?
- [ ] ¿Limpio los inputs después de agregar?
- [ ] ¿El HTML existe antes de hacer querySelector?
- [ ] ¿Re-renderizo toda la lista en lugar de agregar elementos individuales?

---

## Patrón Correcto Completo

```javascript
// ========================================
// use-cases/render-todos.js
// ========================================
export const renderTodos = (elementId, todos = []) => {
    const element = document.querySelector(elementId);
    
    // 1. Limpiar
    element.innerHTML = '';
    
    // 2. Renderizar
    todos.forEach(todo => {
        element.append(createTodoHTML(todo));
    });
};

// ========================================
// use-cases/create-todo-html.js
// ========================================
export const createTodoHTML = (todo) => {
    if (!todo) throw new Error('Todo object is required');
    
    const { done, description, id } = todo;
    
    const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${done ? 'checked' : ''}>
            <label>${description}</label>
            <button class="destroy"></button>
        </div>
    `;
    
    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', id);
    
    if (done) liElement.classList.add('completed');
    
    return liElement;
};

// ========================================
// app.js
// ========================================
export const App = (elementId) => {
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
    };

    // Inicialización
    (() => {
        // 1. Crear HTML
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        
        // 2. Renderizar inicial
        displayTodos();
    })();

    // Event listeners
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    
    newDescriptionInput.addEventListener('keyup', (event) => {
        // Validar tecla Enter
        if (event.keyCode !== 13) return;
        
        // Validar input no vacío
        if (event.target.value.trim().length === 0) return;
        
        try {
            // Agregar todo
            todoStore.addTodo(event.target.value);
            
            // Re-renderizar
            displayTodos();
            
            // Limpiar input
            event.target.value = '';
        } catch (error) {
            console.error('Error al agregar todo:', error);
            alert('Error al agregar la tarea');
        }
    });
};
```

---

## 🎯 Resumen

**Problema más común:** No limpiar el contenedor antes de renderizar.

**Solución:** Siempre usa `element.innerHTML = ''` antes de renderizar una lista.

**Patrón:**
1. Limpiar contenedor
2. Renderizar elementos
3. Agregar event listeners si es necesario

**Regla de Oro:** La UI debe ser una representación exacta del state. Si el state cambia, re-renderiza toda la lista.

---

**¡Ahora tu TodoApp debería funcionar perfectamente sin duplicaciones!**
