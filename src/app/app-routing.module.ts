import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { NewpatientComponent } from './features/newpatient/newpatient.component';
import { DetailComponent } from './features/detail/detail.component';
import {SignsComponent} from './features/signs/signs.component';
import { HistoryVitalComponent } from './features/history-vital/history-vital.component';
import { RecordComponent } from './features/record/record.component';
import { CustomMsalGuard } from './core/interceptors/msal.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [CustomMsalGuard] },
  { path: 'newpatient', component: NewpatientComponent, canActivate: [CustomMsalGuard] },
  { path: 'detail/:id', component: DetailComponent, canActivate: [CustomMsalGuard] }, 
  { path: 'signs/:id', component: SignsComponent, canActivate: [CustomMsalGuard] },
  { path: 'history/:id', component: HistoryVitalComponent, canActivate: [CustomMsalGuard] },    
  { path: 'record', component: RecordComponent, canActivate: [CustomMsalGuard] },
  { path: '**', redirectTo: '/login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
