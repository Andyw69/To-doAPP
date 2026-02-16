# State (Estado) y Store (Almacén) en JavaScript

¡Excelente pregunta! Entender `State` y `Store` es fundamental para convertirte en un programador de alto nivel. Estos conceptos son la base de aplicaciones robustas como Facebook, Netflix o tu TodoApp.

Vamos a desglosarlo con **analogías del mundo real** y luego lo conectaremos con tu código.

---

## 1. ¿Qué es el State (Estado)?

El **State** es simplemente **la información de tu aplicación en un momento específico en el tiempo**. Es una "foto instantánea" de tus datos.

### 🏪 Analogía: El Recibo de un Restaurante

Imagina que estás en un restaurante.

- El **State** es la comanda (el pedido) en un momento dado.
  - _Estado inicial:_ Mesa vacía, nadie ha pedido nada.
  - _Estado a las 8:00 PM:_ 2 hamburguesas, 1 refresco.
  - _Estado a las 8:30 PM:_ 2 hamburguesas, 1 refresco, 1 postre.

En tu **TodoApp**, el State es:

1. La lista de tareas (`todos`): `['Comprar pan', 'Estudiar JS']`
2. El filtro seleccionado (`filter`): `Todas`, `Pendientes` o `Completadas`.

Si alguien te pregunta "¿Cómo está la app ahora?", tú le muestras el **State**.

### 💻 En Código

En tu archivo `todo.store.js`, ya tienes esto definido:

```javascript
const state = {
  todos: [
    new Todo("Piedra del alma"),
    new Todo("Piedra del infinito"),
    // ...
  ],
  filter: Filters.All,
};
```

Ese objeto `state` es tu "foto actual".

---

## 2. ¿Qué es el Store (Almacén)?

El **Store** es el **Lugar Seguro** donde vive el State. Es el "banco" que protege tus datos.
No queremos que cualquiera modifique el State directamente (imagina si cualquier cliente pudiera entrar a la cocina y cambiar las comandas). Necesitamos reglas.

### 🏦 Analogía: El Banco

- **El State (Estado):** Es el dinero en tu bóveda. ($1000).
- **El Store (Almacén):** Es el edificio del banco y los cajeros.
- **Las Reglas:**
  - Tú no puedes entrar a la bóveda y agarrar dinero.
  - Debes pedirle a un cajero: "Quiero retirar $100" o "Quiero depositar $50".
  - El cajero verifica si tienes fondos y actualiza el saldo (el State).

En programación, el **Store** es un objeto o clase que:

1. **Tiene el State** (lo guarda privado).
2. **Expone métodos** (los cajeros) para leer y modificar ese State de forma segura.

### 💻 En Código (Tu TodoApp)

Tu archivo `todo.store.js` es el Store. Actualmente solo tiene el estado y `initStore`. Para que sea un Store completo, necesita "cajeros" (funciones).

**Ejemplo de cómo evolucionará tu Store:**

```javascript
// El State es privado (nadie lo toca directamente desde fuera)
const state = {
  todos: [],
  filter: Filters.All,
};

// Métodos (Los "Cajeros" del Banco)

// 1. Obtener datos (Consultar Saldo)
const getTodos = (filter = Filters.All) => {
  // Retornamos los todos según el filtro
  return [...state.todos]; // Devolvemos una copia por seguridad
};

// 2. Modificar datos (Depositar/Retirar)
const addTodo = (description) => {
  if (!description) throw new Error("Descripción requerida");
  state.todos.push(new Todo(description));
  // Aquí podríamos guardar en LocalStorage
};

const toggleTodo = (todoId) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === todoId) {
      todo.done = !todo.done;
    }
    return todo;
  });
};

// Solo exportamos lo necesario (La ventanilla del banco)
export default {
  addTodo,
  getTodos,
  toggleTodo,
  initStore,
};
```

---

## Resumen para un Programador "High-Level"

1.  **Centralización de la Verdad:**
    En lugar de tener variables dispersas por todos tus archivos (`main.js`, `index.html`, etc.), tienes **una única fuente de la verdad** en el **Store**. Si algo cambia en la app, cambia en el State del Store.

2.  **Previsibilidad:**
    Como el State solo se cambia a través de funciones específicas (`addTodo`, `toggleTodo`), es fácil rastrear errores. Si un Todo desaparece, sabes que _forzosamente_ pasó por la función `deleteTodo`.

3.  **Desacoplamiento:**
    Tu interfaz (HTML/CSS) no necesita saber _cómo_ se guardan los datos (si es un Array, una base de datos, o magia). Solo le dice al Store: "¡Oye, agrega esto!".

¡Estás construyendo una arquitectura profesional con Vanilla JS! Esto es exactamente lo que hacen librerías famosas como **Redux** (React) o **Pinia** (Vue), pero tú lo estás haciendo desde cero para entender la magia real.
