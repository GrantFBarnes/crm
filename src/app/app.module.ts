import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { LoadingComponent } from './shared/components/loading/loading.component';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CompaniesComponent } from './pages/companies/companies.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoadingComponent,
    HomeComponent,
    LoginComponent,
    CompaniesComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
