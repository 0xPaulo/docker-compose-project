import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
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
  activeTab: string = "cliente";

  constructor(
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
    });
  }
}
