import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalModule, MsalRedirectComponent, MsalGuardConfiguration, MsalInterceptorConfiguration, MsalBroadcastService, MSAL_INSTANCE, MsalService } from '@azure/msal-angular';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './core/interceptors/auth-interceptor.interceptor';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from './features/detail/detail.component';
import { NewpatientComponent } from './features/newpatient/newpatient.component';
import { SignsComponent } from './features/signs/signs.component';
import { RecordComponent } from './features/record/record.component';
import { HistoryVitalComponent } from './features/history-vital/history-vital.component';

export function MSALFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '0b19cd10-99f8-4030-9012-a8833beabacb',
      authority: 'https://login.microsoftonline.com/41d2db76-00a5-48bf-903a-d32d431ee022',
      redirectUri: 'https://44.193.178.223/callback'
    }
  });
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    DetailComponent,
    NewpatientComponent,
    SignsComponent,
    RecordComponent,
    HistoryVitalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALFactory
    },
    MsalService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
