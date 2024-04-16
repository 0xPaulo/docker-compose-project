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
      clienteNome: [data.infoCadastro.clienteNome],
      clienteEndereco: [data.infoCadastro.clienteEndereco],
      clienteTelefone: [data.infoCadastro.clienteTelefone],
      clienteEmail: [data.infoCadastro.clienteEmail],
      anotacao: [data.infoCadastro.anotacao],
      nomeItem: [data.infoCadastro.nomeItem],
      itemSerie: [data.infoCadastro.itemSerie],
      status: [data.infoCadastro.status],
      defeitoRelatado: [data.infoCadastro.defeitoRelatado],
      image_urls: [data.infoCadastro.image_urls],
      analiseTecnica: [data.infoCadastro.analiseTecnica],
      custoEstimado: [data.infoCadastro.custoEstimado],
    });
    this.dia = data.infoCadastro.dataEntrada;
  }
}
