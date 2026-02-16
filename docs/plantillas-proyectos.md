# 📋 Plantillas para Nuevos Proyectos

## 🎯 Cómo Usar Este Documento

Este documento contiene plantillas listas para usar cuando crees un nuevo proyecto. Solo copia, pega y adapta a tus necesidades.

---

## 📦 Plantilla 1: Proyecto Simple (Calculator, Counter, etc.)

### Estructura de Carpetas

```
mi-proyecto/
├── index.html
├── package.json
├── src/
│   ├── app/
│   │   ├── app.js
│   │   └── app.html
│   ├── store/
│   │   └── app.store.js
│   ├── main.js
│   └── style.css
└── README.md
```

### index.html
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Proyecto</title>
</head>
<body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
</body>
</html>
```

### package.json
```json
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "description": "Descripción de mi proyecto",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

### src/main.js
```javascript
import './style.css';
import { App } from './app/app';
import appStore from './store/app.store';

// Inicializar store
appStore.initStore();

// Iniciar aplicación
App('#app');
```

### src/store/app.store.js
```javascript
const state = {
    // Tu estado aquí
};

const initStore = () => {
    console.log('Store inicializado');
    // Cargar datos de localStorage si es necesario
    loadFromLocalStorage();
};

const loadFromLocalStorage = () => {
    // Implementar si necesitas persistencia
};

const saveToLocalStorage = () => {
    // Implementar si necesitas persistencia
};

// Getters
const getState = () => ({ ...state });

// Actions
// Agrega tus funciones aquí

export default {
    initStore,
    getState,
    // Exporta tus funciones aquí
};
```

### src/app/app.js
```javascript
import html from './app.html?raw';
import appStore from '../store/app.store';

export const App = (elementId) => {
    
    // Función para actualizar la interfaz
    const render = () => {
        // Implementar renderizado
    };
    
    // Event handlers
    const handleEvent = (e) => {
        // Implementar manejo de eventos
    };
    
    // Inicialización
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        
        // Agregar event listeners
        // document.querySelector('#elemento').addEventListener('click', handleEvent);
        
        // Renderizar inicial
        render();
    })();
};
```

### src/app/app.html
```html
<div class="container">
    <h1>Mi Proyecto</h1>
    <!-- Tu HTML aquí -->
</div>
```

### src/style.css
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: system-ui, -apple-system, sans-serif;
    background-color: #f5f5f5;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
}
```

---

## 📦 Plantilla 2: Proyecto con Múltiples Features

### Estructura de Carpetas

```
mi-proyecto/
├── index.html
├── package.json
├── src/
│   ├── feature1/
│   │   ├── models/
│   │   │   └── feature1.model.js
│   │   ├── use-cases/
│   │   │   ├── action1.js
│   │   │   ├── action2.js
│   │   │   └── index.js
│   │   ├── app.js
│   │   └── app.html
│   ├── feature2/
│   │   └── ...
│   ├── store/
│   │   ├── feature1.store.js
│   │   └── feature2.store.js
│   ├── shared/
│   │   ├── utils/
│   │   └── components/
│   ├── main.js
│   └── style.css
└── README.md
```

### src/feature/models/feature.model.js
```javascript
export class Feature {
    constructor(data) {
        // Validaciones
        if (!data) throw new Error('Data is required');
        
        // Propiedades
        this.id = data.id || this.generateId();
        this.createdAt = new Date();
        
        // Agrega tus propiedades aquí
    }
    
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}
```

### src/feature/use-cases/index.js (Barrel File)
```javascript
export { action1 } from './action1.js';
export { action2 } from './action2.js';
```

### src/feature/use-cases/action1.js
```javascript
/**
 * Descripción de la acción
 * @param {Type} param - Descripción del parámetro
 * @returns {Type} Descripción del retorno
 */
export const action1 = (param) => {
    // Implementar acción
};
```

---

## 📦 Plantilla 3: Proyecto con API

### Estructura de Carpetas

```
mi-proyecto/
├── index.html
├── package.json
├── src/
│   ├── feature/
│   │   ├── models/
│   │   ├── use-cases/
│   │   ├── app.js
│   │   └── app.html
│   ├── store/
│   │   └── feature.store.js
│   ├── services/
│   │   └── api.service.js
│   ├── config/
│   │   └── api.config.js
│   ├── main.js
│   └── style.css
└── README.md
```

### src/config/api.config.js
```javascript
export const API_CONFIG = {
    BASE_URL: 'https://api.example.com',
    API_KEY: import.meta.env.VITE_API_KEY || '',
    TIMEOUT: 10000,
    ENDPOINTS: {
        USERS: '/users',
        POSTS: '/posts',
        // Agrega tus endpoints aquí
    }
};
```

### src/services/api.service.js
```javascript
import { API_CONFIG } from '../config/api.config';

class ApiService {
    constructor() {
        this.baseUrl = API_CONFIG.BASE_URL;
        this.timeout = API_CONFIG.TIMEOUT;
    }
    
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        
        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        };
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);
            
            const response = await fetch(url, {
                ...config,
                signal: controller.signal,
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('Request timeout');
            }
            throw error;
        }
    }
    
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }
    
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }
    
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}

export default new ApiService();
```

### src/store/feature.store.js (con API)
```javascript
import apiService from '../services/api.service';
import { API_CONFIG } from '../config/api.config';

const state = {
    items: [],
    loading: false,
    error: null,
};

const initStore = async () => {
    await fetchItems();
};

const fetchItems = async () => {
    state.loading = true;
    state.error = null;
    
    try {
        const data = await apiService.get(API_CONFIG.ENDPOINTS.ITEMS);
        state.items = data;
        state.loading = false;
    } catch (error) {
        state.error = error.message;
        state.loading = false;
        console.error('Error fetching items:', error);
    }
};

const createItem = async (itemData) => {
    state.loading = true;
    state.error = null;
    
    try {
        const newItem = await apiService.post(API_CONFIG.ENDPOINTS.ITEMS, itemData);
        state.items.push(newItem);
        state.loading = false;
        return newItem;
    } catch (error) {
        state.error = error.message;
        state.loading = false;
        throw error;
    }
};

// Getters
const getItems = () => [...state.items];
const isLoading = () => state.loading;
const getError = () => state.error;

export default {
    initStore,
    fetchItems,
    createItem,
    getItems,
    isLoading,
    getError,
};
```

---

## 📦 Plantilla 4: Store con LocalStorage

### src/store/app.store.js (con persistencia)
```javascript
const STORAGE_KEY = 'mi-app-state';

const state = {
    items: [],
    settings: {
        theme: 'light',
        language: 'es',
    },
};

const initStore = () => {
    loadFromLocalStorage();
    console.log('Store inicializado');
};

const loadFromLocalStorage = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        
        if (!saved) {
            console.log('No hay datos guardados');
            return;
        }
        
        const parsed = JSON.parse(saved);
        
        // Restaurar state
        state.items = parsed.items || [];
        state.settings = parsed.settings || state.settings;
        
        console.log('Datos cargados desde localStorage');
    } catch (error) {
        console.error('Error al cargar desde localStorage:', error);
    }
};

const saveToLocalStorage = () => {
    try {
        const toSave = {
            items: state.items,
            settings: state.settings,
        };
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
        console.log('Datos guardados en localStorage');
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
    }
};

const clearLocalStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
    console.log('localStorage limpiado');
};

// Actions
const addItem = (item) => {
    state.items.push(item);
    saveToLocalStorage();
};

const removeItem = (itemId) => {
    state.items = state.items.filter(item => item.id !== itemId);
    saveToLocalStorage();
};

const updateSettings = (newSettings) => {
    state.settings = { ...state.settings, ...newSettings };
    saveToLocalStorage();
};

// Getters
const getItems = () => [...state.items];
const getSettings = () => ({ ...state.settings });

export default {
    initStore,
    addItem,
    removeItem,
    updateSettings,
    getItems,
    getSettings,
    clearLocalStorage,
};
```

---

## 📦 Plantilla 5: Store con Observer Pattern

### src/store/app.store.js (con suscriptores)
```javascript
const state = {
    items: [],
};

let subscribers = [];

const initStore = () => {
    console.log('Store inicializado');
};

// Observer Pattern
const subscribe = (callback) => {
    if (typeof callback !== 'function') {
        throw new Error('Callback debe ser una función');
    }
    
    subscribers.push(callback);
    console.log('Nuevo suscriptor agregado');
    
    // Retornar función para desuscribirse
    return () => {
        subscribers = subscribers.filter(sub => sub !== callback);
        console.log('Suscriptor eliminado');
    };
};

const notifySubscribers = () => {
    console.log(`Notificando a ${subscribers.length} suscriptores`);
    subscribers.forEach(callback => {
        try {
            callback(state);
        } catch (error) {
            console.error('Error en suscriptor:', error);
        }
    });
};

// Actions
const addItem = (item) => {
    state.items.push(item);
    notifySubscribers();
};

const removeItem = (itemId) => {
    state.items = state.items.filter(item => item.id !== itemId);
    notifySubscribers();
};

// Getters
const getItems = () => [...state.items];

export default {
    initStore,
    subscribe,
    addItem,
    removeItem,
    getItems,
};
```

### Uso del Observer Pattern
```javascript
// app.js
import appStore from '../store/app.store';

export const App = (elementId) => {
    
    const render = () => {
        // Renderizar interfaz
        const items = appStore.getItems();
        // ...
    };
    
    // Suscribirse a cambios del store
    const unsubscribe = appStore.subscribe((newState) => {
        console.log('State cambió:', newState);
        render(); // Re-renderizar automáticamente
    });
    
    // Inicialización
    (() => {
        // Crear interfaz
        // ...
        
        // Renderizar inicial
        render();
    })();
    
    // Opcional: Desuscribirse cuando sea necesario
    // unsubscribe();
};
```

---

## 📦 Plantilla 6: Utilidades Comunes

### src/utils/date-utils.js
```javascript
export const formatDate = (date) => {
    return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
};

export const formatTime = (date) => {
    return new Intl.DateTimeFormat('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
};

export const getRelativeTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `hace ${days} día${days > 1 ? 's' : ''}`;
    if (hours > 0) return `hace ${hours} hora${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    return 'hace un momento';
};
```

### src/utils/validation-utils.js
```javascript
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const validateRequired = (value) => {
    return value !== null && value !== undefined && value.trim() !== '';
};

export const validateMinLength = (value, minLength) => {
    return value.length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
    return value.length <= maxLength;
};

export const validateNumber = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
};
```

### src/utils/dom-utils.js
```javascript
export const createElement = (tag, className = '', textContent = '') => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
};

export const clearElement = (element) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
};

export const toggleClass = (element, className) => {
    element.classList.toggle(className);
};

export const show = (element) => {
    element.style.display = '';
};

export const hide = (element) => {
    element.style.display = 'none';
};
```

---

## 🎯 Checklist para Nuevo Proyecto

### Antes de Empezar
- [ ] Define las entidades principales
- [ ] Define las acciones del usuario
- [ ] Dibuja un boceto de la interfaz
- [ ] Decide si necesitas API
- [ ] Decide si necesitas persistencia

### Estructura Inicial
- [ ] Crea `index.html`
- [ ] Crea `package.json`
- [ ] Crea `src/main.js`
- [ ] Crea `src/style.css`
- [ ] Crea carpeta de feature
- [ ] Crea store

### Durante el Desarrollo
- [ ] Escribe código limpio y comentado
- [ ] Prueba cada función
- [ ] Maneja errores
- [ ] Valida inputs del usuario

### Antes de Terminar
- [ ] Revisa que todo funcione
- [ ] Limpia console.logs innecesarios
- [ ] Escribe README.md
- [ ] Agrega comentarios JSDoc
- [ ] Prueba en diferentes navegadores

---

## 🚀 Comandos Útiles

### Iniciar Proyecto con Vite
```bash
npm create vite@latest mi-proyecto -- --template vanilla
cd mi-proyecto
npm install
npm run dev
```

### Instalar Dependencias Comunes
```bash
# UUID para IDs únicos
npm install uuid

# Day.js para fechas
npm install dayjs

# Axios para HTTP requests
npm install axios
```

---

**¡Usa estas plantillas como punto de partida para tus proyectos!**
