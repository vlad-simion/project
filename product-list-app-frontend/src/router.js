import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '@/views/Home';
import EditComponent from '@/components/product/Edit';
import CreateComponent from '@/components/product/Create';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: { name: 'produse' } },
    { path: '/produse', name: 'produse', component: HomeComponent,
      children: [
        { path: '/edit/:id', name: 'Edit', component: EditComponent },
        { path: '/create', name: 'Create', component: CreateComponent }
      ]
    }
    
  ]
});