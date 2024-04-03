import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
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
  nomeSelecionado: string = "";
  constructor(
    private snackBar: MatSnackBar,
    private service: RepositoryService,
    private formBuilder: FormBuilder,
    private tabelaService: TabelaService,
    private clienteService: ClienteService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
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
        valor: [data.infoCadastro.valor],
        laudo: [data.infoCadastro.laudo],
      });
      Object.keys(this.form.controls).forEach((property) => {
        const control = this.form.get(property);
        if (control) {
          control.disable();
        }
        this.inputDesabilitado = false;
      });
    } else {
      this.form = formBuilder.group({
        cliente: [null],
        endereco: [null],
        telefone: [null],
        email: [null],
        anotacao: [null],
        item: [null],
        itemSerie: [null],
        status: [null],
        data_entrada: [null],
        desc: [null],
        valor: [null],
        laudo: [null],
      });
    }
  }

  onSubmitCliente() {
    const clienteFormFields = {
      nome: this.form.get("cliente")?.value,
      endereco: this.form.get("endereco")?.value,
      email: this.form.get("email")?.value,
      telefone: this.form.get("telefone")?.value,
    };

    this.clienteService.createCliente(clienteFormFields).subscribe(
      (result) => {
        this.onSucess();
      },
      () => {
        this.onError();
      }
    );
  }

  onSubmit() {
    // antigo
    if (this.isEditMode) {
      const dataInicial = this.form.value.data_entrada;
      const dataFormatada = this.datePipe.transform(
        dataInicial,
        "yyyy-MM-ddTHH:mm:ss"
      );
      const dadosParaSalvar = {
        ...this.form.value,
        dataEntrada: dataFormatada,
      };

      const id_item: string = this.data.infoCadastro._id;
      this.service.update(id_item, dadosParaSalvar).subscribe(
        (result) => {
          this.tabelaService.emitListaAtualizada.emit();
          this.onSucess();
        },
        () => {
          this.onError();
        }
      );
    } else {
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
  }

  receberSon(nomeSelecionado: string) {
    console.log("receber son chegou" + nomeSelecionado);
    // errado string
    this.nomeSelecionado = nomeSelecionado;
    this.form.patchValue({
      telefone: nomeSelecionado,
    });
  }

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
    this.snackBar.open("Acorreu um erro", "", { duration: 5000 });
  }
  onSucess() {
    this.snackBar.open("Cadastrado com sucesso", "", { duration: 5000 });
  }
  onCancel() {}

  ngOnInit() {}
}
