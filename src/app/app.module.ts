import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { SplashPage } from '../pages/splash/splash';
import {LoginPage} from '../pages/login/login';
import { WebapiProvider } from '../providers/webapi/webapi';
import { HttpClientModule } from '@angular/common/http';
import { CompHeaderComponent } from '../components/comp-header/comp-header';
import { CompSidebarComponent } from '../components/comp-sidebar/comp-sidebar';
import { ProvideSidebarProvider } from '../providers/provide-sidebar/provide-sidebar';
import { ReportsProvider } from '../providers/reports/reports';
import { CalendarModule } from "ionic3-calendar-en";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    SplashPage,
    LoginPage,
    CompHeaderComponent,
    CompSidebarComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'timesheet',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    CalendarModule  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    SplashPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WebapiProvider,
    ProvideSidebarProvider,
    ReportsProvider
  ]
})
export class AppModule {}
