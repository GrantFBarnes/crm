import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageUserComponent } from './pages/page-user/page-user.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageCompaniesComponent } from './pages/page-companies/page-companies.component';
import { PageCompanyComponent } from './pages/page-company/page-company.component';
import { PagePeopleComponent } from './pages/page-people/page-people.component';
import { PagePersonComponent } from './pages/page-person/page-person.component';
import { PageRemindersComponent } from './pages/page-reminders/page-reminders.component';
import { PageReminderComponent } from './pages/page-reminder/page-reminder.component';
import { PageTasksComponent } from './pages/page-tasks/page-tasks.component';
import { PageTaskComponent } from './pages/page-task/page-task.component';

const routes: Routes = [
  { path: 'crm/home', component: PageHomeComponent },
  { path: 'crm/login', component: PageLoginComponent },
  { path: 'crm/user', component: PageUserComponent },
  { path: 'crm/companies', component: PageCompaniesComponent },
  { path: 'crm/company/:id', component: PageCompanyComponent },
  { path: 'crm/people', component: PagePeopleComponent },
  { path: 'crm/person/:id', component: PagePersonComponent },
  { path: 'crm/reminders', component: PageRemindersComponent },
  { path: 'crm/reminder/:id', component: PageReminderComponent },
  { path: 'crm/tasks', component: PageTasksComponent },
  { path: 'crm/task/:id', component: PageTaskComponent },
  { path: 'crm', redirectTo: '/crm/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
