import { DatePipe } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TabelaService } from "src/app/services/tabela.service";
import { CadastroService } from "./../../../services/cadastro.service";

@Component({
  selector: "app-form-triagem",
  templateUrl: "./form-triagem.component.html",
  styleUrls: ["./form-triagem.component.scss"],
})
export class FormTriagemComponent {
  form: FormGroup;
  // isEditMode: boolean = false;
  result: string[] = [];
  id = "";
  URL = "triagem";
  constructor(
    private cadastroService: CadastroService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private tabelaService: TabelaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.infoCadastro.id;
    this.form = formBuilder.group({
      clienteNome: [data.infoCadastro.clienteNome],
      clienteEndereco: [data.infoCadastro.clienteEndereco],
      clienteTelefone: [data.infoCadastro.clienteTelefone],
      clienteEmail: [data.infoCadastro.clienteEmail],
      nomeItem: [data.infoCadastro.nomeItem],
      itemSerie: [data.infoCadastro.itemSerie],
      status: [data.infoCadastro.status],
      defeitoRelatado: [data.infoCadastro.defeitoRelatado],
      image_urls: [data.infoCadastro.image_urls],
      analiseTecnica: [data.infoCadastro.analiseTecnica],
      custoEstimado: [data.infoCadastro.custoEstimado],
      dataEntrada: [data.infoCadastro.dataEntrada],
    });
  }

  receberSon(result: any) {
    this.result = result;
  }

  onSubmit() {
    this.form.patchValue({ image_urls: this.result });
    const dadosAtualizados = { ...this.form.value };
    const idItem = this.data.infoCadastro.id;
    this.cadastroService.update(idItem, dadosAtualizados, this.URL).subscribe(
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
}
