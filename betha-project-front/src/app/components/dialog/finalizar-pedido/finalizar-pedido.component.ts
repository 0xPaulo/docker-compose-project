import { Component, Inject } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { CadastroService } from "src/app/services/cadastro.service";
import { TabelaService } from "src/app/services/tabela.service";

@Component({
  selector: "app-finalizar-pedido",
  templateUrl: "./finalizar-pedido.component.html",
  styleUrls: ["./finalizar-pedido.component.scss"],
})
export class FinalizarPedidoComponent {
  constructor(
    private cadastroService: CadastroService,
    private snackBar: MatSnackBar,
    private tabelaService: TabelaService,
    private formBuilder: FormBuilder,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  trocarStatus(status: string) {
    const id = this.data.infoCadastro.id;
    this.cadastroService.finalizarPedido(id, status).subscribe(
      (result) => {
        this.tabelaService.emitListaAtualizada.emit();
        this.onSucess();
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
  onDelete() {
    throw new Error("Method not implemented.");
  }
}
