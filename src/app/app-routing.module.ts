import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { CompanyComponent } from './pages/company/company.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'crm/home', component: HomeComponent },
  { path: 'crm/login', component: LoginComponent },
  { path: 'crm/companies', component: CompaniesComponent },
  { path: 'crm/company/:id', component: CompanyComponent },
  { path: 'crm', redirectTo: '/crm/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
