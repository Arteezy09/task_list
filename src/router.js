import Vue from 'vue'
import Router from 'vue-router'
import Create from './views/Create.vue'
import Task from './views/Task.vue'
import List from './views/List.vue'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/task/:id',
      name: 'task',
      component: Task
    }   
  ]
})
