import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly TOKEN_KEY = "authToken"; // Chave para armazenar o token no localStorage

  constructor() {}

  // Método para salvar o token após login bem-sucedido
  login(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  // Método para verificar se o usuário está autenticado
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.TOKEN_KEY);
  }

  // Método para obter o token de autenticação
  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  // Método para realizar logout
  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}
