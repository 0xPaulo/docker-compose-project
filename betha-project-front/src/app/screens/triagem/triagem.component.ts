import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-triagem",
  templateUrl: "./triagem.component.html",
  styleUrls: ["./triagem.component.scss"],
})
export class TriagemComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    let perfil = "";
    perfil = this.authService.getPerfilToken();
    if (!(perfil == "TRIAGEM" || perfil == "ADMIN")) {
      this.router.navigate(["home"]);
    }
  }
}
