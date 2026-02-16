# 🏗️ Arquitectura del Proyecto TodoApp

## 📁 Estructura de Directorios

```
todo-app/
├── 📄 index.html          # Punto de entrada HTML
├── 📦 package.json        # Dependencias y scripts npm
├── 📂 public/             # Archivos estáticos (imágenes, iconos)
│   └── vite.svg
├── 📂 src/                # Código fuente (SOURCE)
│   ├── 🎯 main.js         # Punto de entrada de JavaScript
│   ├── 🎨 style.css       # Estilos globales
│   ├── 📂 store/          # Gestión del ESTADO global
│   │   └── todo.store.js
│   └── 📂 todos/          # Feature/Módulo "Todos"
│       ├── app.js         # Lógica principal de la app
│       ├── app.html       # Template HTML del módulo
│       └── 📂 models/     # Definiciones de datos
│           └── todo.model.js
└── 📂 docs/               # Documentación (la creamos nosotros)
```

---

## 🧠 ¿Por qué esta estructura?

Tu instructor te enseñó una **arquitectura profesional** basada en patrones de la industria. Vamos a desglosarlo:

---

### 1️⃣ **Separación de Responsabilidades (Separation of Concerns)**

Cada carpeta tiene un **trabajo específico**. Si algo se rompe, sabes exactamente dónde buscar.

#### 🎯 `src/main.js` - El Director de Orquesta

```javascript
import "./style.css"; // 1. Cargar estilos
import { App } from "./todos/app"; // 2. Traer la aplicación
import todoStore from "./store/todo.store.js"; // 3. Inicializar el Store

todoStore.initStore(); // Configurar datos
App("#app"); // Montar la aplicación
```

**Analogía:** Es como el manager de un teatro. Él no actúa, no pinta escenarios, ni vende boletos. Solo coordina a todos.

---

### 2️⃣ **`src/store/` - El Cerebro de la Aplicación**

Aquí vive **todo el estado (datos) de tu app**.

**¿Por qué separado?**

- Si mañana quieres guardar los TODOs en una base de datos (en lugar de un array), solo modificas `todo.store.js`.
- Tu UI (interfaz) no necesita saber _cómo_ se guardan los datos.

**Patrón:** Single Source of Truth (una única fuente de verdad).

---

### 3️⃣ **`src/todos/` - El Módulo de "Todos"**

Esta carpeta es un **feature completo** (una característica). Contiene todo lo relacionado con los Todos:

```
todos/
├── app.js         # Lógica del módulo
├── app.html       # Plantilla HTML
└── models/        # Definición de datos
    └── todo.model.js
```

#### ¿Por qué es genial esto?

Si tu aplicación crece y agregas otras funcionalidades (por ejemplo, "usuarios" o "configuración"), puedes hacer:

```
src/
├── todos/
│   ├── app.js
│   └── models/
├── users/         # Nuevo módulo
│   ├── app.js
│   └── models/
└── settings/      # Otro módulo
    └── app.js
```

**Cada módulo es independiente.** Puedes incluso mover `todos/` a otro proyecto y funcionará.

---

### 4️⃣ **`src/todos/models/` - Los Planos (Blueprints)**

Un **modelo** es como un "plano de construcción" para tus datos.

```javascript
// todo.model.js define CÓMO es un Todo
class Todo {
  constructor(description) {
    this.id = new Date().getTime();
    this.description = description;
    this.done = false;
    this.createdAt = new Date();
  }
}
```

**Analogía:** Si los Todos son casas, el modelo es el plano del arquitecto. Define:

- Qué tiene una casa (id, description, done).
- Cómo se construye (el `constructor`).

**Beneficio:** Todos tus Todos tienen la misma estructura. No hay "Todos raros" con propiedades inventadas.

---

## 🎓 Patrones de Diseño Aplicados

Tu instructor te está enseñando:

### ✅ **1. Feature-Based Architecture (Arquitectura por Características)**

En lugar de agrupar por tipo de archivo:

```
❌ BAD:
src/
├── js/
├── html/
└── css/
```

Agrupas por **funcionalidad**:

```
✅ GOOD:
src/
├── todos/
├── users/
└── store/
```

### ✅ **2. Store Pattern (Patrón de Almacén)**

Centralizar el estado en un solo lugar (`store/`).

### ✅ **3. Model-View Pattern (Patrón Modelo-Vista)**

- **Model** (`models/`): Define la estructura de datos.
- **View** (`app.html`): Define la interfaz.
- **Controller** (`app.js`): Conecta ambos.

---

## 🚀 Resumen para Convertirte en Programador de Alto Nivel

| Concepto      | ¿Qué hace?              | ¿Por qué importa?        |
| ------------- | ----------------------- | ------------------------ |
| **`main.js`** | Punto de entrada        | Inicializa todo en orden |
| **`store/`**  | Gestiona datos globales | Una fuente de verdad     |
| **`todos/`**  | Módulo completo         | Reutilizable y escalable |
| **`models/`** | Define estructuras      | Consistencia de datos    |

---

## 💡 Analogía Final: La Fábrica de Autos

- **`main.js`**: El CEO que coordina todo.
- **`store/`**: El almacén de piezas (ruedas, motores).
- **`todos/`**: La línea de ensamblaje de "autos deportivos".
- **`models/todo.model.js`**: El plano de cómo se construye un auto deportivo.

Si mañana quieres fabricar "camiones", creas `trucks/` con su propio modelo. El almacén (`store/`) sigue funcionando igual.

---

🎯 **Este diseño te prepara para frameworks como React, Angular o Vue**, que usan estas mismas ideas. ¡Tu instructor te está dando bases sólidas!
