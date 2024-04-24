import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ImgProxyService } from "src/app/services/img-proxy.service";

@Component({
  selector: "detalhe-produto",
  templateUrl: "./detalhe-produto.component.html",
  styleUrls: ["./detalhe-produto.component.scss"],
})
export class DetalheProdutoComponent {
  form: FormGroup;
  dia: string = "";
  tecnicoImg!: string | ArrayBuffer;

  constructor(
    private imgProxyService: ImgProxyService,
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
      tecnico: [data.infoCadastro.tecnico],
      tecnicoImg: [data.infoCadastro.tecnicoImg],
      // tecnicoNome: [data.infoCadastro.tecnicoNome],
      // nao precisa de nada disso
      tecnicoCategorias: [data.infoCadastro.tecnicoCategorias],
    });
    this.dia = data.infoCadastro.dataEntrada;
    console.log(this.form.value);
    if (data.infoCadastro.tecnico) {
      this.imgProxyService
        .getImage(this.data.infoCadastro.tecnicoImg)
        .subscribe((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.tecnicoImg = reader.result as string;
          };
          reader.readAsDataURL(blob);
        });
    }
  }
}
