import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-manutencao",
  templateUrl: "./manutencao.component.html",
  styleUrls: ["./manutencao.component.scss"],
})
export class ManutencaoComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    let perfil = "";
    perfil = this.authService.getPerfilToken();
    if (!(perfil == "TECNICO" || perfil == "ADMIN")) {
      this.router.navigate(["home"]);
    }
  }
}
