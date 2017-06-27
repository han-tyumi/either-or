import Vue from 'vue'
import Router from 'vue-router'
import Collections from '@/components/Collections'
import New from '@/components/New'
import Edit from '@/components/Edit'
import Vote from '@/components/Vote'
import Rankings from '@/components/Rankings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'collections',
      component: Collections
    },
    {
      path: '/new',
      name: 'new',
      component: New
    },
    {
      path: '/:id',
      name: 'rankings',
      component: Rankings
    },
    {
      path: '/:id/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/:id/vote',
      name: 'vote',
      component: Vote
    }
  ],
  base: '/either-or/',
  mode: 'history',
  linkExactActiveClass: 'is-active'
})
