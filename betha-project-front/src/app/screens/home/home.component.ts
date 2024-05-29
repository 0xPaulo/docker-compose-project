import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { jwtDecode } from "jwt-decode";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  isADMIN: boolean = false;
  isRECEPCAO: boolean = false;
  isTRIAGEM: boolean = false;
  isTECNICO: boolean = false;
  isMANUTENCAO: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute) {}

  cadastros() {
    this.router.navigate(["cadastrar"]);
  }

  triagem() {
    this.router.navigate(["triagem"]);
  }

  manutencao() {
    this.router.navigate(["manutencao"]);
  }
  concluido() {
    this.router.navigate(["concluido"]);
  }

  ngOnInit() {
    const token = sessionStorage.getItem("jwtToken");
    if (token) {
      const decoded = jwtDecode(token);
      this.applyStylesBasedOnToken(decoded);
    }
  }

  applyStylesBasedOnToken(decodedToken: any) {
    console.log(decodedToken.perfil);

    if (decodedToken.perfil === "ADMIN") {
      this.isRECEPCAO = true;
      this.isTRIAGEM = true;
      this.isTECNICO = true;
    }
    if (decodedToken.perfil === "RECEPCAO") {
      this.isRECEPCAO = true;
    }
    if (decodedToken.perfil === "TRIAGEM") {
      this.isTRIAGEM = true;
    }
    if (decodedToken.perfil === "TECNICO") {
      this.isTECNICO = true;
    }
    if (decodedToken.perfil === "MANUTENCAO") {
      this.router.navigate(["tecnico"]);
    }
  }
}
