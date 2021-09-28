import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/pages/auth/login/login.component';
import { ComingSoonComponent } from 'src/app/pages/coming-soon/coming-soon.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: ComingSoonComponent
  },
  {
    path: 'reset-password',
    component: ComingSoonComponent
  },
  {
    path: 'privacy-policy',
    component: ComingSoonComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
