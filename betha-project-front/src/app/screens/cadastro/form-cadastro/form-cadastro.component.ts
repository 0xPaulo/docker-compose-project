import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CadastroService } from "src/app/services/cadastro.service";
import { ClienteService } from "src/app/services/cliente.service";
import { RepositoryService } from "src/app/services/repository.service";
import { TabelaService } from "src/app/services/tabela.service";

@Component({
  selector: "form-cadastro",
  templateUrl: "./form-cadastro.component.html",
  styleUrls: ["./form-cadastro.component.scss"],
})
export class FormCadastroComponent implements OnInit {
  form: FormGroup;
  isEditMode: boolean = false;
  activeTab: string = "cliente";
  inputDesabilitado: boolean = true;

  constructor(
    private cadastroService: CadastroService,
    private snackBar: MatSnackBar,
    private service: RepositoryService,
    private formBuilder: FormBuilder,
    private tabelaService: TabelaService,
    private clienteService: ClienteService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // if (data) {
    // this.isEditMode = true;
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
      dataEntrada: [data.infoCadastro.dataEntrada],
    });
    Object.keys(this.form.controls).forEach((property) => {
      const control = this.form.get(property);
      if (control) {
        control.disable();
      }
      this.inputDesabilitado = false;
    });
    // } else {
    // this.form = formBuilder.group({
    //   cliente: [null],
    //   endereco: [null],
    //   telefone: [null],
    //   email: [null],
    //   anotacao: [null],
    //   item: [null],
    //   itemSerie: [null],
    //   status: [null],
    //   data_entrada: [null],
    //   desc: [null],
    //   valor: [null],
    //   laudo: [null],
    // });
    // }
  }

  onSubmit() {
    // if (this.isEditMode) {
    const dataInicial = this.form.value.dataEntrada;
    const dataFormatada = this.datePipe.transform(
      dataInicial,
      "yyyy-MM-ddTHH:mm:ss"
    );
    const dadosParaSalvar = {
      ...this.form.value,
      dataEntrada: dataFormatada,
    };

    const id_item: string = this.data.infoCadastro.id;
    this.cadastroService.update(id_item, dadosParaSalvar).subscribe(
      (result) => {
        this.tabelaService.emitListaAtualizada.emit();
        this.onSucess();
      },
      () => {
        this.onError();
      }
    );
    // } else {
    this.service.save(this.form.value).subscribe(
      (result) => {
        this.tabelaService.emitListaAtualizada.emit();
        this.onSucess();
      },
      () => {
        this.onError();
      }
    );
  }
  // }

  habilitarCampos() {
    if (!this.inputDesabilitado) {
      Object.keys(this.form.controls).forEach((property) => {
        const control = this.form.get(property);
        if (control) {
          control.enable();
        }
      });
      return (this.inputDesabilitado = true);
    } else {
      Object.keys(this.form.controls).forEach((property) => {
        const control = this.form.get(property);
        if (control) {
          control.disable();
        }
      });
    }
    return (this.inputDesabilitado = false);
  }

  onError() {
    this.snackBar.open("Ocorreu um erro", "", { duration: 5000 });
  }
  onSucess() {
    this.snackBar.open("Cadastrado com sucesso", "", { duration: 5000 });
  }
  onCancel() {}

  ngOnInit() {}
}
