import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-concluido",
  templateUrl: "./concluido.component.html",
  styleUrls: ["./concluido.component.scss"],
})
export class ConcluidoComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    let perfil = "";
    perfil = this.authService.getPerfilToken();
    if (!(perfil == "TECNICO" || perfil == "ADMIN" || perfil == "RECEPCAO")) {
      this.router.navigate(["home"]);
    }
  }
}
