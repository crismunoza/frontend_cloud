import { Component } from '@angular/core';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus } from '@azure/msal-browser';
import { Router } from '@angular/router'; // Importa Router
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isInteractionInProgress = false;
  
  constructor(
    private msalService: MsalService,
    private router: Router,
    private msalBroadcastService: MsalBroadcastService
  ) { 
    this.msalBroadcastService.inProgress$
      .subscribe(status => {
        this.isInteractionInProgress = status !== InteractionStatus.None;
      });
  }

  async iniciarSesion(): Promise<void> {
    await this.msalService.instance.initialize();
    this.msalService.loginPopup()
      .subscribe(
        (response: AuthenticationResult) => {
          console.log('Respuesta de inicio de sesión:', response);
          this.msalService.instance.setActiveAccount(response.account);

          this.msalService.acquireTokenSilent({ scopes: [] }).subscribe({
            next: (tokenResponse) => {
              console.log('Token adquirido:', tokenResponse);
              localStorage.setItem('jwt', tokenResponse.idToken);
              this.router.navigate(['/home']);
            },
            error: (error) => {
              console.error('Error al adquirir el token:', error);
            }
          });
        },
        (error) => {
          console.error('Error en el inicio de sesión:', error);
        }
      );
  }

  cerrarSesion(): void {
    this.msalService.logout();
  }

}

