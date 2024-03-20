import { DatePipe } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { RepositoryService } from "src/app/services/repository.service";
import { TabelaService } from "src/app/services/tabela.service";

@Component({
  selector: "app-form-triagem",
  templateUrl: "./form-triagem.component.html",
  styleUrls: ["./form-triagem.component.scss"],
})
export class FormTriagemComponent {
  form: FormGroup;
  isEditMode: boolean = false;
  result: string[] = [];

  constructor(
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    private service: RepositoryService,
    private formBuilder: FormBuilder,
    private tabelaService: TabelaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = true;
    this.form = formBuilder.group({
      cliente: [data.infoCadastro.cliente],
      endereco: [data.infoCadastro.endereco],
      telefone: [data.infoCadastro.telefone],
      email: [data.infoCadastro.email],
      anotacao: [data.infoCadastro.anotacao],
      item: [data.infoCadastro.item],
      itemSerie: [data.infoCadastro.itemSerie],
      status: [data.infoCadastro.status],
      data_entrada: [data.infoCadastro.dataEntrada],
      desc: [data.infoCadastro.desc],
      image_urls: [data.infoCadastro.image_urls],
      valor: [data.infoCadastro.valor],
      laudo: [data.infoCadastro.laudo],
    });
  }

  receberSon(result: any) {
    this.result = result;
  }

  onSubmit() {
    this.form.patchValue({ image_urls: this.result });
    const dataInicial = this.form.value.data_entrada;
    const dataFormatada = this.datePipe.transform(
      dataInicial,
      "yyyy-MM-ddTHH:mm:ss"
    );
    const dadosAtualizados = { ...this.form.value, dataEntrada: dataFormatada };
    const idItem = this.data.infoCadastro._id;
    this.service.update(idItem, dadosAtualizados).subscribe(
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
    this.snackBar.open("Acorreu um erro", "", { duration: 5000 });
  }
  onSucess() {
    this.snackBar.open("Atualizado com sucesso", "", { duration: 5000 });
  }
}
