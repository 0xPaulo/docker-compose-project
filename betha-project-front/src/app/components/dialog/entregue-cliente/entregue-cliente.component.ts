import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TabelaService } from "src/app/services/tabela.service";
import { CadastroService } from "./../../../services/cadastro.service";

@Component({
  selector: "app-entregue-cliente",
  templateUrl: "./entregue-cliente.component.html",
  styleUrls: ["./entregue-cliente.component.scss"],
})
export class EntregueClienteComponent {
  dados: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cadastroService: CadastroService,
    private tabelaService: TabelaService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<any, boolean>
  ) {}
  idproduto = this.data.infoCadastro.id;
  trocarStatus(status?: string) {
    const id = this.data.infoCadastro.id;
    if (status === "CONCLUIDO") this.dados.push(status);

    this.cadastroService.finalizarPedido(id, this.dados).subscribe(
      (result) => {
        this.tabelaService.emitListaAtualizada.emit();
        this.onSucess();
        this.dialogRef.close(true);
      },
      () => {
        this.onError();
      }
    );
  }
  onError() {
    this.snackBar.open("Ocorreu um erro", "", { duration: 5000 });
  }
  onSucess() {
    this.snackBar.open("Atualizado com sucesso", "", { duration: 5000 });
  }
}
