import { DatePipe } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatRadioChange } from "@angular/material/radio";
import { MatSelectChange } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";
import { RepositoryService } from "src/app/services/repository.service";
import { TabelaService } from "src/app/services/tabela.service";
import { CadastroService } from "./../../../services/cadastro.service";
import { TecnicoService } from "./../../../services/tecnico.service";

@Component({
  selector: "app-form-manu-tec",
  templateUrl: "./form-manu-tec.component.html",
  styleUrls: ["./form-manu-tec.component.scss"],
})
export class FormManuTecComponent {
  form: FormGroup;
  id: string = "";
  dia: string = "";

  tecnicosCompleto!: any[];
  matSelectValores = new FormControl("");
  tecnicosNomes!: string[];

  tecnicoNomeSelecionado: string = "";
  tecnicoEspecialidadeSelecionado: string = "";
  tecnicoChamadosSelecionado: string = "";
  imagemTecnico: string = "";

  imageUrlTec: string = "";

  constructor(
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
    // this.tecnicoService.buscarTodos(filtro).subscribe();
  }

  onSelectionChange(event: MatSelectChange) {
    let tecnicoSelecionado = event.value;
    this.tecnicosCompleto.forEach((tecnico) => {
      if (tecnico.nome === tecnicoSelecionado) {
        this.tecnicoNomeSelecionado = tecnico.nome;
        this.tecnicoEspecialidadeSelecionado = tecnico.tecnicoCategorias;
        this.imagemTecnico = tecnico.id;
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

  onSubmit() {
    // this.form.patchValue({ tecnico: this.form.get("tecnico")?.value });
    // const dadosAtualizados = { ...this.form.value, dataEntrada: dataFormatada };

    const idItem = this.data.infoCadastro.id;
    this.cadastroService.update(idItem, this.form).subscribe(
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
