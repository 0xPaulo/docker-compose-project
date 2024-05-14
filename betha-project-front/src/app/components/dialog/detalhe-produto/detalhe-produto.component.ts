import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ImgProxyService } from "src/app/services/img-proxy.service";

@Component({
  selector: "detalhe-produto",
  templateUrl: "./detalhe-produto.component.html",
  styleUrls: ["./detalhe-produto.component.scss"],
})
export class DetalheProdutoComponent implements OnInit {
  dia: string = "";
  saida: string = "";
  motivoNaoConclusao: string = "";
  tecnicoImg!: string | ArrayBuffer;
  imageUrl: string[] = [];

  constructor(
    private imgProxyService: ImgProxyService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dia = data.infoCadastro.dataEntrada;
    if (data.infoCadastro.dataSaida) {
      this.saida = data.infoCadastro.dataSaida;
    }
    this.motivoNaoConclusao = data.infoCadastro.motivoNaoConclusao;
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
  ngOnInit(): void {
    if (this.data.infoCadastro.image_urls) {
      const imageUrls: string[] = this.data.infoCadastro.image_urls;
      imageUrls.forEach((url) => {
        this.imgProxyService.getImage(url).subscribe((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.imageUrl.push(reader.result as string);
          };
          reader.readAsDataURL(blob);
        });
      });
    } else {
      console.log("imagens nao iniciadas");
    }
  }
}
