import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
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
}
