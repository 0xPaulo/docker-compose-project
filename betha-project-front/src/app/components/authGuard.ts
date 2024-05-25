import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Se o usuário estiver autenticado, permite acessar a rota
    } else {
      this.router.navigate(["/login"]); // Se não estiver autenticado, redireciona para a página de login
      return false;
    }
  }
}
