import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { CadastroService } from "src/app/services/cadastro.service";
import { TabelaService } from "src/app/services/tabela.service";

@Component({
  selector: "app-finalizar-pedido",
  templateUrl: "./finalizar-pedido.component.html",
  styleUrls: ["./finalizar-pedido.component.scss"],
})
export class FinalizarPedidoComponent {
  addMsgBol: boolean = false;
  dados: string[] = [];
  form: FormGroup;
  msgError: string = "";
  constructor(
    private dialogRef: MatDialogRef<any, boolean>,
    private cadastroService: CadastroService,
    private snackBar: MatSnackBar,
    private tabelaService: TabelaService,
    private formBuilder: FormBuilder,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.formBuilder.group({
      motivoNaoConclusao: [null, Validators.required],
    });
  }

  addMsg(status: string) {
    if (status === "VMANUTENCAO") {
      this.addMsgBol = true;
    } else {
      this.addMsgBol = false;
    }
  }

  verificaTrocarStatus(arg0: string) {
    if (this.form.invalid) {
      this.msgError = "Por favor, preencha todos os campos.";
      console.log(this.msgError);
    } else {
      this.trocarStatus(arg0);
    }
  }
  trocarStatus(status: string) {
    const id = this.data.infoCadastro.id;
    let msgTxt = this.form.get("motivoNaoConclusao")?.value;
    if (status === "VMANUTENCAO") {
      this.dados.push(status);
      this.dados.push(msgTxt);
    } else if (status === "CONCLUIDO") {
      this.dados.push(status);
    }
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
