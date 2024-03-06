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
  evento: string = "";

  constructor(
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
      fotos: [null],
    });
  }
  receberEvento(evento: string) {
    console.log("Evento recebido:", evento);
    this.evento = evento;
  }

  onSubmit() {
    console.log("dados antes" + this.data.infoCadastro.fotos);
    const dadosAtualizados = { ...this.form.value, fotos: this.evento };
    console.log("dados atualizados" + this.data.infoCadastro.fotos);

    const idItem = this.data.infoCadastro._id;
    console.log(dadosAtualizados);
    console.log(idItem);
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
