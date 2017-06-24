import Vue from 'vue'
import Router from 'vue-router'
import Collections from '@/components/Collections'
import Settings from '@/components/Settings'
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
      component: Settings
    },
    {
      path: '/:id',
      name: 'collection',
      redirect: ':id/settings',
      props: true
    },
    {
      path: '/:id/settings',
      name: 'settings',
      component: Settings,
      props: true
    },
    {
      path: '/:id/vote',
      name: 'vote',
      component: Vote,
      props: true
    },
    {
      path: '/:id/rankings',
      name: 'rankings',
      component: Rankings,
      props: true
    }
  ],
  mode: 'history',
  linkExactActiveClass: 'is-active'
})
