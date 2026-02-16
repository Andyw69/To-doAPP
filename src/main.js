import './style.css'
import { App } from './todos/app';
import todoStore from './store/todo.store.js'


todoStore.initStore();;
App('#app');