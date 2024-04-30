import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { DialogCriarClienteComponent } from "./dialog-criar-cliente/dialog-criar-cliente.component";

@Component({
  selector: "betha-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent {
  criarCliente() {
    const dialogRef = this.dialog.open(DialogCriarClienteComponent, {
      maxWidth: "600px",
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  chamarTabelaTecnico() {
    this.router.navigate(["tecnico"]);
  }
  onCadastro() {
    this.router.navigate(["cadastrar"]);
  }
  onHome() {
    this.router.navigate(["home"]);
  }
  errorMessage: string =
    "Ops! Esta funcionalidade ainda não está disponível. Estamos trabalhando nisso.";
  constructor(private router: Router, public dialog: MatDialog) {}
  onLogin() {
    this.router.navigate(["login"]);
  }
}
