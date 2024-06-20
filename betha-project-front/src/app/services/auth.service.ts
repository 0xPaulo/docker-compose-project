import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../interfaces/CustomJwtPayload ";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly TOKEN_KEY = "jwtToken";

  saveSessionStorageToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  getIdToken(): string {
    const token = sessionStorage.getItem("jwtToken");
    if (token) {
      const decodedToken: CustomJwtPayload = jwtDecode(token);
      return decodedToken.id;
    }
    return "";
  }
  getPerfilToken(): string {
    const token = sessionStorage.getItem("jwtToken");
    if (token) {
      const decodedToken: CustomJwtPayload = jwtDecode(token);
      return decodedToken.perfil;
    }
    return "";
  }
  getNome(): string {
    const token = sessionStorage.getItem("jwtToken");
    if (token) {
      const decodedToken: CustomJwtPayload = jwtDecode(token);
      return decodedToken.nome;
    }
    return "";
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}
