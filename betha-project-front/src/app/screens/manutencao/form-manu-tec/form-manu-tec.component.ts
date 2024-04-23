import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatRadioChange } from "@angular/material/radio";
import { MatSelectChange } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ImgProxyService } from "src/app/services/img-proxy.service";
import { RepositoryService } from "src/app/services/repository.service";
import { TabelaService } from "src/app/services/tabela.service";
import { CadastroService } from "./../../../services/cadastro.service";
import { TecnicoService } from "./../../../services/tecnico.service";

@Component({
  selector: "app-form-manu-tec",
  templateUrl: "./form-manu-tec.component.html",
  styleUrls: ["./form-manu-tec.component.scss"],
})
export class FormManuTecComponent implements OnInit {
  form: FormGroup;
  id: string = "";
  dia: string = "";

  tecnicosCompleto!: any[];
  tecnicosNomes!: string[];

  tecnicoNomeSelecionado: string = "";
  tecnicoEspecialidadeSelecionado: string = "";
  tecnicoChamadosSelecionado: string = "";
  imagemTecnico: string = "";
  tecnicoID!: Number;

  imageUrlTec: string = "";

  msgDeErro!: string;

  imageUrl: string[] = [];

  constructor(
    private imgProxyService: ImgProxyService,
    private dialogRef: MatDialogRef<any, boolean>,
    private tecnicoService: TecnicoService,
    private cadastroService: CadastroService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    private service: RepositoryService,
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
      dataEntrada: [data.infoCadastro.dataEntrada],
      defeitoRelatado: [data.infoCadastro.defeitoRelatado],
      image_urls: [data.infoCadastro.image_urls],
      custoEstimado: [data.infoCadastro.custoEstimado],
      analiseTecnica: [data.infoCadastro.analiseTecnica],
      // tecnico: [data.infoCadastro.tecnico, Validators.required],
      // se tem tecnico nao deixa escolher outro
    });
    this.dia = data.infoCadastro.dataEntrada;
    this.chamarBuscarTodos();
  }

  chamarBuscarTodos(filtro?: string) {
    this.tecnicoService.buscarTodos(filtro).subscribe(
      (resultado) => {
        this.tecnicosCompleto = resultado;
        this.tecnicosNomes = resultado.map((obj: any) => obj.nome);
      },
      (error) => {
        console.error("Erro ao buscar técnicos:", error);
      }
    );
  }
  filtroTecnico(event: MatRadioChange) {
    let filtro = this.tecnicoService.handleFilter(event);
    this.chamarBuscarTodos(filtro);
  }

  onSelectionChange(event: MatSelectChange) {
    let tecnicoSelecionado = event.value;
    this.tecnicosCompleto.forEach((tecnico) => {
      if (tecnico.nome === tecnicoSelecionado) {
        this.tecnicoNomeSelecionado = tecnico.nome;
        this.tecnicoEspecialidadeSelecionado = tecnico.tecnicoCategorias;
        this.imagemTecnico = tecnico.id;
        this.tecnicoID = tecnico.id;
        // this.form.patchValue({ tecnico: this.tecnicoID });
        this.msgDeErro = "";
      }
    });
    switch (+this.imagemTecnico) {
      case 1:
        this.imageUrlTec = "/assets/image/tecnicos/tec1.jpg";
        break;
      case 2:
        this.imageUrlTec = "/assets/image/tecnicos/tec3.jpg";
        break;
      case 3:
        this.imageUrlTec = "/assets/image/tecnicos/tec2.jpg";
        break;
      case 4:
        this.imageUrlTec = "/assets/image/tecnicos/tec5.jpg";
        break;
      case 5:
        this.imageUrlTec = "/assets/image/tecnicos/tec4.jpg";
        break;
      case 6:
        this.imageUrlTec = "/assets/image/tecnicos/tec6.jpg";
        break;
      default:
        console.log("O número não está entre 1 e 6");
    }
  }
  verificaSubmit() {
    if (this.form.invalid) {
      this.msgDeErro = "Por favor, escolha um tecnico para o serviço";
    } else {
      this.onSubmit();
    }
  }

  onSubmit() {
    // this.form.patchValue({ tecnico: this.form.get("tecnico")?.value });
    // const dadosAtualizados = { ...this.form.value, tecnico: this.tecnicoID };
    const idItem = this.data.infoCadastro.id;
    // const formValues = this.form.getRawValue();
    this.tecnicoService.setTecnico(idItem, this.tecnicoID).subscribe(
      (result) => {
        this.dialogRef.close(true);
        this.onSucess();
        this.tabelaService.emitListaAtualizada.emit();
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
  ngOnInit(): void {
    // const imageUrls = [
    //   "https://lh3.googleusercontent.com/d/1EHraJ6bZ9CTFoTembwjU_c8RWidupFpW",
    //   "https://lh3.googleusercontent.com/d/1pveDRcPLsjOH8suALuxW6GOM18LL7yV4",
    // ];
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
  }
}
// ngOnInit(): void {
//   const imageUrls = [
//     "https://lh3.googleusercontent.com/d/1pveDRcPLsjOH8suALuxW6GOM18LL7yV4",
//     // Adicione mais URLs de imagem aqui
//   ];
//   imageUrls.forEach(url => {
//     this.imgProxyService.getImage(url).subscribe((blob) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         this.imageUrl.push(reader.result as string); // Adiciona a URL da imagem ao array
//       };
//       reader.readAsDataURL(blob); // Lê o Blob como Data URL
//     });
//   });
// }
// }
