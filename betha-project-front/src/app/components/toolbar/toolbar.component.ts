import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AuthService } from "./../../services/auth.service";
import { DialogCriarClienteComponent } from "./dialog-criar-cliente/dialog-criar-cliente.component";
import { DialogCriarTecnicoComponent } from "./dialog-criar-tecnico/dialog-criar-tecnico.component";

@Component({
  selector: "betha-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent implements OnInit {
  ADMIN: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  criarCliente() {
    const dialogRef = this.dialog.open(DialogCriarClienteComponent, {
      maxWidth: "600px",
      minWidth: "600px",
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  criarTecnico() {
    const dialogRef = this.dialog.open(DialogCriarTecnicoComponent, {
      maxWidth: "600px",
      minWidth: "600px",
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

  onLogin() {
    this.router.navigate(["login"]);
  }

  sair() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  ngOnInit(): void {
    const isAdmin = this.authService.getPerfilToken();
    if (isAdmin === "ADMIN") {
      this.ADMIN = true;
    }
  }
}
