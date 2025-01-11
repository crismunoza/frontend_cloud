import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private msalService: MsalService) {}

  getUserId(): string | null {
    const account = this.msalService.instance.getActiveAccount(); // Obtén la cuenta activa
    if (account && account.idTokenClaims) {
      return account.idTokenClaims['oid'] || null; // 'oid' es el ID único del usuario en AAD
    }
    return null;
  }

  getUsername(): string | null {
    const account = this.msalService.instance.getActiveAccount();
    if (account && account.username) {
      return account.username; // Retorna el correo electrónico del usuario
    }
    return null;
  }
}
