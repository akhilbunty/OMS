import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {path:  "", pathMatch:  "full",redirectTo:  "login"},
  { path: 'login', component: LoginComponent },
  { path: 'order', component: OrdersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
