import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import todo from '@/components/todo'
import layout from '@/components/layout'
import login from '@/components/login'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
  	{
      path: '/todo',
      component: layout
    }
  ]
})
