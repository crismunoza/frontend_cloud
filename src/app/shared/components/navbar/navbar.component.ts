import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private msalService: MsalService) {}

  usuarioEstaConectado(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }

  cerrarSesion(): void {
    firstValueFrom(this.msalService.logoutPopup({
      mainWindowRedirectUri: "/"
    })).then(() => {
      window.location.reload();
    }).catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
  }
  
}
