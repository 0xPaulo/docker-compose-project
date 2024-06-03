import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.scss"],
})
export class CadastroComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    let perfil = "";
    perfil = this.authService.getPerfilToken();
    if (!(perfil == "RECEPCAO" || perfil == "ADMIN")) {
      this.router.navigate(["home"]);
    }
  }
}
