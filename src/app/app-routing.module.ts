import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { CompanyComponent } from './pages/company/company.component';
import { PeopleComponent } from './pages/people/people.component';
import { PersonComponent } from './pages/person/person.component';
import { RemindersComponent } from './pages/reminders/reminders.component';
import { ReminderComponent } from './pages/reminder/reminder.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskComponent } from './pages/task/task.component';

const routes: Routes = [
  { path: 'crm/home', component: HomeComponent },
  { path: 'crm/login', component: LoginComponent },
  { path: 'crm/companies', component: CompaniesComponent },
  { path: 'crm/company/:id', component: CompanyComponent },
  { path: 'crm/people', component: PeopleComponent },
  { path: 'crm/person/:id', component: PersonComponent },
  { path: 'crm/reminders', component: RemindersComponent },
  { path: 'crm/reminder/:id', component: ReminderComponent },
  { path: 'crm/tasks', component: TasksComponent },
  { path: 'crm/task/:id', component: TaskComponent },
  { path: 'crm', redirectTo: '/crm/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
