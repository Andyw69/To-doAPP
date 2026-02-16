# 🏗️ Cómo Organizar y Estructurar Proyectos desde Cero

## 🎯 La Pregunta Más Importante

> "¿Cómo puedo saber yo qué crear y dónde crear tal archivo? Quiero crear otro todoApp o una calculadora pero ¿cómo puedo hacer, saber organizar y separar los archivos?"

Esta es LA pregunta que separa a un programador principiante de uno profesional. Vamos a responderla paso a paso.

---

## 📋 Principios Fundamentales

### Principio 1: Separación de Responsabilidades (SoC)

**Regla de Oro:** Cada archivo/carpeta debe tener UNA responsabilidad clara.

```
❌ MAL: Un archivo que hace TODO
app.js (1000 líneas)
- Maneja datos
- Crea HTML
- Maneja eventos
- Hace cálculos
- Guarda en localStorage

✅ BIEN: Archivos separados por responsabilidad
store/todo.store.js    → Maneja datos
todos/app.js           → Crea HTML y maneja eventos
todos/models/          → Define estructuras de datos
todos/use-cases/       → Funciones específicas
```

### Principio 2: DRY (Don't Repeat Yourself)

**Regla:** Si copias y pegas código, probablemente necesitas una función o componente.

```javascript
// ❌ MAL: Código repetido
const todo1 = document.createElement('li');
todo1.textContent = 'Tarea 1';
document.querySelector('#list').append(todo1);

const todo2 = document.createElement('li');
todo2.textContent = 'Tarea 2';
document.querySelector('#list').append(todo2);

// ✅ BIEN: Función reutilizable
const createTodoElement = (text) => {
    const todo = document.createElement('li');
    todo.textContent = text;
    return todo;
};

document.querySelector('#list').append(createTodoElement('Tarea 1'));
document.querySelector('#list').append(createTodoElement('Tarea 2'));
```

### Principio 3: KISS (Keep It Simple, Stupid)

**Regla:** Empieza simple, complejiza solo cuando sea necesario.

```
❌ MAL: Sobre-ingeniería desde el inicio
src/
├── core/
│   ├── abstracts/
│   ├── interfaces/
│   ├── factories/
│   └── decorators/
├── infrastructure/
└── domain/

✅ BIEN: Empieza simple
src/
├── store/
├── todos/
└── main.js
```

---

## 🗂️ Estructura de Carpetas: Patrones Comunes

### Patrón 1: Feature-Based (Por Funcionalidad)

**Cuándo usar:** Aplicaciones medianas/grandes con múltiples features.

```
src/
├── todos/              ← Feature: Todos
│   ├── models/
│   ├── use-cases/
│   ├── app.js
│   └── app.html
├── users/              ← Feature: Users
│   ├── models/
│   ├── use-cases/
│   └── app.js
├── store/              ← Store global
│   ├── todo.store.js
│   └── user.store.js
└── main.js
```

**Ventajas:**
- Fácil de escalar
- Cada feature es independiente
- Fácil de encontrar archivos

**Tu TodoApp usa este patrón** ✅

### Patrón 2: Layer-Based (Por Capas)

**Cuándo usar:** Aplicaciones pequeñas o cuando quieres separar por tipo de archivo.

```
src/
├── models/             ← Todos los modelos
│   ├── todo.model.js
│   └── user.model.js
├── views/              ← Todas las vistas
│   ├── todo.view.js
│   └── user.view.js
├── controllers/        ← Todos los controladores
│   ├── todo.controller.js
│   └── user.controller.js
├── store/
│   └── store.js
└── main.js
```

**Ventajas:**
- Simple de entender
- Bueno para proyectos pequeños

**Desventajas:**
- Difícil de escalar
- Archivos relacionados están separados

### Patrón 3: Hybrid (Híbrido)

**Cuándo usar:** Aplicaciones grandes con features complejas.

```
src/
├── features/
│   ├── todos/
│   │   ├── components/
│   │   ├── store/
│   │   └── index.js
│   └── users/
│       ├── components/
│       ├── store/
│       └── index.js
├── shared/             ← Código compartido
│   ├── components/
│   ├── utils/
│   └── hooks/
└── main.js
```

---

## 🎓 Proceso: Cómo Decidir la Estructura

### Paso 1: Identifica las Entidades Principales

**Pregunta:** ¿Qué "cosas" maneja mi aplicación?

**Ejemplos:**

**TodoApp:**
- Entidad: `Todo` (tarea)
- Propiedades: id, description, done, createdAt

**Calculator:**
- Entidad: `Calculation` (cálculo)
- Propiedades: operation, result, history

**Weather App:**
- Entidad: `Weather` (clima)
- Propiedades: city, temperature, condition, forecast

**Shopping Cart:**
- Entidades: `Product`, `CartItem`
- Propiedades: id, name, price, quantity

### Paso 2: Identifica las Acciones (Use Cases)

**Pregunta:** ¿Qué puede hacer el usuario?

**TodoApp:**
- Agregar todo
- Eliminar todo
- Marcar como completado
- Filtrar todos
- Ver todos

**Calculator:**
- Sumar
- Restar
- Multiplicar
- Dividir
- Limpiar
- Ver historial

**Weather App:**
- Buscar ciudad
- Ver clima actual
- Ver pronóstico
- Guardar favoritos

### Paso 3: Crea la Estructura Base

**Regla:** Empieza con lo mínimo necesario.

```
src/
├── [entidad]/          ← Carpeta de la entidad principal
│   ├── models/         ← Define QUÉ es la entidad
│   ├── use-cases/      ← Define QUÉ puede hacer
│   ├── app.js          ← Interfaz visual
│   └── app.html        ← Template HTML
├── store/              ← Manejo de datos
│   └── [entidad].store.js
├── main.js             ← Punto de entrada
└── style.css           ← Estilos
```

### Paso 4: Agrega Carpetas Según Necesites

**No crees carpetas "por si acaso". Créalas cuando las necesites.**

```
❌ MAL: Crear todo desde el inicio
src/
├── components/
├── utils/
├── helpers/
├── services/
├── hooks/
├── contexts/
└── ... (10 carpetas vacías)

✅ BIEN: Crear según necesites
src/
├── todos/
├── store/
└── main.js

// Después, si necesitas utils:
src/
├── todos/
├── store/
├── utils/              ← Agregada cuando la necesitaste
│   └── date-utils.js
└── main.js
```

---

## 💡 Ejemplos Prácticos: Paso a Paso

### Ejemplo 1: Calculator App

#### Paso 1: Identifica Entidades
- `Calculation` (cálculo)

#### Paso 2: Identifica Acciones
- Agregar número
- Seleccionar operación
- Calcular resultado
- Limpiar

#### Paso 3: Estructura Inicial

```
calculator-app/
├── index.html
├── src/
│   ├── calculator/
│   │   ├── app.js
│   │   └── app.html
│   ├── store/
│   │   └── calculator.store.js
│   ├── main.js
│   └── style.css
└── package.json
```

#### Paso 4: Código Base

**calculator.store.js:**
```javascript
const state = {
    currentValue: '0',
    previousValue: null,
    operation: null,
    history: []
};

const initStore = () => {
    state.currentValue = '0';
    state.previousValue = null;
    state.operation = null;
};

const addNumber = (number) => {
    if (state.currentValue === '0') {
        state.currentValue = number.toString();
    } else {
        state.currentValue += number.toString();
    }
};

const setOperation = (op) => {
    state.previousValue = state.currentValue;
    state.currentValue = '0';
    state.operation = op;
};

const calculate = () => {
    const prev = parseFloat(state.previousValue);
    const current = parseFloat(state.currentValue);
    let result;
    
    switch (state.operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    
    state.currentValue = result.toString();
    state.previousValue = null;
    state.operation = null;
    
    // Guardar en historial
    state.history.push({
        operation: `${prev} ${state.operation} ${current} = ${result}`,
        timestamp: new Date()
    });
};

const clear = () => {
    state.currentValue = '0';
    state.previousValue = null;
    state.operation = null;
};

const getCurrentValue = () => state.currentValue;
const getHistory = () => [...state.history];

export default {
    initStore,
    addNumber,
    setOperation,
    calculate,
    clear,
    getCurrentValue,
    getHistory
};
```

**app.js:**
```javascript
import html from './app.html?raw';
import calculatorStore from '../store/calculator.store';

export const App = (elementId) => {
    const updateDisplay = () => {
        const display = document.querySelector('#display');
        display.textContent = calculatorStore.getCurrentValue();
    };
    
    const handleNumberClick = (e) => {
        if (e.target.classList.contains('number')) {
            calculatorStore.addNumber(e.target.textContent);
            updateDisplay();
        }
    };
    
    const handleOperationClick = (e) => {
        if (e.target.classList.contains('operation')) {
            calculatorStore.setOperation(e.target.textContent);
            updateDisplay();
        }
    };
    
    const handleEqualsClick = () => {
        calculatorStore.calculate();
        updateDisplay();
    };
    
    const handleClearClick = () => {
        calculatorStore.clear();
        updateDisplay();
    };
    
    // Inicialización
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        
        // Event listeners
        document.querySelector('#numbers').addEventListener('click', handleNumberClick);
        document.querySelector('#operations').addEventListener('click', handleOperationClick);
        document.querySelector('#equals').addEventListener('click', handleEqualsClick);
        document.querySelector('#clear').addEventListener('click', handleClearClick);
        
        updateDisplay();
    })();
};
```

**main.js:**
```javascript
import './style.css';
import { App } from './calculator/app';
import calculatorStore from './store/calculator.store';

calculatorStore.initStore();
App('#app');
```

---

### Ejemplo 2: Weather App

#### Paso 1: Identifica Entidades
- `Weather` (clima)
- `City` (ciudad)

#### Paso 2: Identifica Acciones
- Buscar ciudad
- Obtener clima actual
- Obtener pronóstico
- Guardar favoritos

#### Paso 3: Estructura Inicial

```
weather-app/
├── index.html
├── src/
│   ├── weather/
│   │   ├── models/
│   │   │   └── weather.model.js
│   │   ├── use-cases/
│   │   │   ├── search-city.js
│   │   │   ├── get-weather.js
│   │   │   └── index.js
│   │   ├── app.js
│   │   └── app.html
│   ├── store/
│   │   └── weather.store.js
│   ├── services/              ← Nueva carpeta para API
│   │   └── weather-api.js
│   ├── main.js
│   └── style.css
└── package.json
```

**¿Por qué agregamos `services/`?**
Porque necesitamos hacer llamadas a una API externa. Esto es una nueva responsabilidad.

#### Paso 4: Código Base

**weather.model.js:**
```javascript
export class Weather {
    constructor(data) {
        this.city = data.city;
        this.temperature = data.temperature;
        this.condition = data.condition;
        this.humidity = data.humidity;
        this.windSpeed = data.windSpeed;
        this.timestamp = new Date();
    }
}
```

**weather-api.js:**
```javascript
const API_KEY = 'tu-api-key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = async (city) => {
    try {
        const response = await fetch(
            `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('Ciudad no encontrada');
        }
        
        const data = await response.json();
        
        return {
            city: data.name,
            temperature: data.main.temp,
            condition: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed
        };
    } catch (error) {
        throw new Error(`Error al obtener clima: ${error.message}`);
    }
};
```

**weather.store.js:**
```javascript
import { Weather } from '../weather/models/weather.model';
import { fetchWeather } from '../services/weather-api';

const state = {
    currentWeather: null,
    favorites: [],
    loading: false,
    error: null
};

const initStore = () => {
    // Cargar favoritos de localStorage
    const saved = localStorage.getItem('weather-favorites');
    if (saved) {
        state.favorites = JSON.parse(saved);
    }
};

const searchCity = async (city) => {
    state.loading = true;
    state.error = null;
    
    try {
        const data = await fetchWeather(city);
        state.currentWeather = new Weather(data);
        state.loading = false;
    } catch (error) {
        state.error = error.message;
        state.loading = false;
        throw error;
    }
};

const addFavorite = (city) => {
    if (!state.favorites.includes(city)) {
        state.favorites.push(city);
        localStorage.setItem('weather-favorites', JSON.stringify(state.favorites));
    }
};

const removeFavorite = (city) => {
    state.favorites = state.favorites.filter(fav => fav !== city);
    localStorage.setItem('weather-favorites', JSON.stringify(state.favorites));
};

const getCurrentWeather = () => state.currentWeather;
const getFavorites = () => [...state.favorites];
const isLoading = () => state.loading;
const getError = () => state.error;

export default {
    initStore,
    searchCity,
    addFavorite,
    removeFavorite,
    getCurrentWeather,
    getFavorites,
    isLoading,
    getError
};
```

---

## 🎯 Reglas de Decisión: ¿Dónde va cada cosa?

### ¿Dónde va este código?

| Tipo de Código | Dónde va | Ejemplo |
|----------------|----------|---------|
| Datos y lógica de negocio | `store/` | `addTodo()`, `deleteTodo()` |
| Estructura de datos | `models/` | `class Todo { }` |
| Funciones específicas | `use-cases/` | `renderTodos()`, `createTodoHTML()` |
| Interfaz visual | `app.js` | Event listeners, renderizado |
| Template HTML | `app.html` | Estructura HTML |
| Llamadas a APIs | `services/` | `fetchWeather()`, `fetchUsers()` |
| Funciones reutilizables | `utils/` | `formatDate()`, `validateEmail()` |
| Estilos | `style.css` o `[feature].css` | CSS |
| Inicialización | `main.js` | Punto de entrada |

### Preguntas para Decidir:

**1. ¿Este código maneja datos?**
→ Va en `store/`

**2. ¿Este código define una estructura?**
→ Va en `models/`

**3. ¿Este código hace algo específico con la UI?**
→ Va en `use-cases/`

**4. ¿Este código maneja eventos o renderiza?**
→ Va en `app.js`

**5. ¿Este código llama a una API externa?**
→ Va en `services/`

**6. ¿Este código es reutilizable en múltiples lugares?**
→ Va en `utils/`

---

## 📝 Ejercicio Práctico: Shopping Cart

### Tu Turno: Diseña la Estructura

**Requisitos:**
- Mostrar lista de productos
- Agregar productos al carrito
- Eliminar productos del carrito
- Actualizar cantidad
- Calcular total
- Aplicar descuentos
- Guardar en localStorage

**Paso 1: Identifica Entidades**
<details>
<summary>Ver Respuesta</summary>

- `Product` (producto)
- `CartItem` (item del carrito)
- `Discount` (descuento)
</details>

**Paso 2: Identifica Acciones**
<details>
<summary>Ver Respuesta</summary>

- Ver productos
- Agregar al carrito
- Eliminar del carrito
- Actualizar cantidad
- Aplicar descuento
- Calcular total
- Vaciar carrito
</details>

**Paso 3: Diseña la Estructura**
<details>
<summary>Ver Respuesta</summary>

```
shopping-cart/
├── index.html
├── src/
│   ├── products/
│   │   ├── models/
│   │   │   └── product.model.js
│   │   ├── use-cases/
│   │   │   ├── render-products.js
│   │   │   └── index.js
│   │   ├── app.js
│   │   └── app.html
│   ├── cart/
│   │   ├── models/
│   │   │   └── cart-item.model.js
│   │   ├── use-cases/
│   │   │   ├── render-cart.js
│   │   │   ├── calculate-total.js
│   │   │   └── index.js
│   │   ├── app.js
│   │   └── app.html
│   ├── store/
│   │   ├── products.store.js
│   │   └── cart.store.js
│   ├── utils/
│   │   └── currency.js
│   ├── main.js
│   └── style.css
└── package.json
```
</details>

---

## 🚀 Consejos Finales

### 1. Empieza Simple, Refactoriza Después

```
Iteración 1: Todo en un archivo
↓
Iteración 2: Separar store
↓
Iteración 3: Separar use-cases
↓
Iteración 4: Agregar utils
```

### 2. Sigue Convenciones

- `models/` para estructuras de datos
- `store/` para manejo de estado
- `use-cases/` para funciones específicas
- `services/` para APIs externas
- `utils/` para funciones reutilizables

### 3. Pregúntate: "¿Puedo Encontrar Esto Fácilmente?"

Si no sabes dónde buscar un archivo, tu estructura necesita mejorar.

### 4. Mira Proyectos de Otros

- GitHub: Busca proyectos similares
- Estudia su estructura
- Adapta lo que te sirva

### 5. No Hay UNA Estructura Perfecta

Diferentes proyectos necesitan diferentes estructuras. Lo importante es:
- Consistencia
- Claridad
- Escalabilidad

---

## 📚 Resumen

**Para decidir la estructura:**
1. Identifica entidades (¿qué "cosas" maneja?)
2. Identifica acciones (¿qué puede hacer el usuario?)
3. Crea estructura base (mínimo necesario)
4. Agrega carpetas según necesites

**Regla de Oro:**
Cada archivo/carpeta = UNA responsabilidad clara

**Próximo Paso:**
Practica creando la estructura de 3 proyectos diferentes antes de escribir código.

---

**¡Ahora tienes las herramientas para organizar cualquier proyecto como un profesional!**
