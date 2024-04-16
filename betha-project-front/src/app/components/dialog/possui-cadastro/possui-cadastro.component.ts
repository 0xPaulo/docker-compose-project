import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FormCriarCadastroComponent } from "src/app/screens/cadastro/form-criar-cadastro/form-criar-cadastro.component";

@Component({
  selector: "app-possui-cadastro",
  templateUrl: "./possui-cadastro.component.html",
  styleUrls: ["./possui-cadastro.component.scss"],
})
export class PossuiCadastroComponent {
  constructor(private dialog: MatDialog) {}

  onNao() {
    const dialogRef = this.dialog.open(FormCriarCadastroComponent, {
      maxWidth: "600px",
      data: { possuiCadastro: false, mostrarCliente: true },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  onSim() {
    const dialogRef = this.dialog.open(FormCriarCadastroComponent, {
      maxWidth: "600px",
      data: { possuiCadastro: true, mostrarCliente: false },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
