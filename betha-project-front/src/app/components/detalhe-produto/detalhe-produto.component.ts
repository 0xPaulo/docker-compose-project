import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "detalhe-produto",
  templateUrl: "./detalhe-produto.component.html",
  styleUrls: ["./detalhe-produto.component.scss"],
})
export class DetalheProdutoComponent {
  form: FormGroup;
  dia: string = "";

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
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
    this.dia = data.infoCadastro.dataEntrada;
  }
}
