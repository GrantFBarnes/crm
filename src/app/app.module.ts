import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoadingComponent } from './shared/components/loading/loading.component';

import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageCompaniesComponent } from './pages/page-companies/page-companies.component';
import { PageCompanyComponent } from './pages/page-company/page-company.component';
import { PagePeopleComponent } from './pages/page-people/page-people.component';
import { PagePersonComponent } from './pages/page-person/page-person.component';
import { PageRemindersComponent } from './pages/page-reminders/page-reminders.component';
import { PageReminderComponent } from './pages/page-reminder/page-reminder.component';
import { PageTasksComponent } from './pages/page-tasks/page-tasks.component';
import { PageTaskComponent } from './pages/page-task/page-task.component';

import { PageListTableComponent } from './shared/components/page-list-table/page-list-table.component';
import { PageDetailContactComponent } from './shared/components/page-detail-contact/page-detail-contact.component';

import { CardListTableComponent } from './shared/components/card-list-table/card-list-table.component';
import { CardDetailRowComponent } from './shared/components/card-detail-row/card-detail-row.component';

import { ModalTableSelectComponent } from './modals/modal-table-select/modal-table-select.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,

    PageHomeComponent,
    PageLoginComponent,
    PageNotFoundComponent,
    PageCompaniesComponent,
    PageCompanyComponent,
    PagePeopleComponent,
    PagePersonComponent,
    PageRemindersComponent,
    PageReminderComponent,
    PageTasksComponent,
    PageTaskComponent,

    PageListTableComponent,
    PageDetailContactComponent,

    CardListTableComponent,
    CardDetailRowComponent,

    ModalTableSelectComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
