import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-tecnico",
  templateUrl: "./tecnico.component.html",
  styleUrls: ["./tecnico.component.scss"],
})
export class TecnicoComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    let perfil = "";
    perfil = this.authService.getPerfilToken();
    if (!(perfil == "MANUTENCAO" || perfil == "ADMIN")) {
      this.router.navigate(["home"]);
    }
  }
}
