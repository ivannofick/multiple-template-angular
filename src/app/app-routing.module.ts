import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { PagesLayoutComponent } from './containers/pages-layout/pages-layoutcomponent';

const routes: Routes = [
    //Default routes goes here 
    { 
      path: '', 
      component: DefaultLayoutComponent,
      children: [
        {
          path: 'users',
          loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
        },
      ]
    },

    //Site routes goes here 
    { 
      path: '', 
      component: PagesLayoutComponent,
      children: [
        {
          path: 'pages',
          loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule),
        }
      ]
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
