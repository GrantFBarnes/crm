import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoadingComponent } from './shared/components/loading/loading.component';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ListPageComponent } from './shared/components/list-page/list-page.component';
import { DetailPageComponent } from './shared/components/detail-page/detail-page.component';
import { ListCardComponent } from './shared/components/list-card/list-card.component';
import { DetailCardComponent } from './shared/components/detail-card/detail-card.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { CompanyComponent } from './pages/company/company.component';
import { PeopleComponent } from './pages/people/people.component';
import { PersonComponent } from './pages/person/person.component';
import { RemindersComponent } from './pages/reminders/reminders.component';
import { ReminderComponent } from './pages/reminder/reminder.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskComponent } from './pages/task/task.component';
import { ModalTableSelectComponent } from './modals/modal-table-select/modal-table-select.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    ListPageComponent,
    DetailPageComponent,
    ListCardComponent,
    DetailCardComponent,
    CompaniesComponent,
    CompanyComponent,
    PeopleComponent,
    PersonComponent,
    RemindersComponent,
    ReminderComponent,
    TasksComponent,
    TaskComponent,
    ModalTableSelectComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
