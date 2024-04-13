import { DatePipe } from "@angular/common";
import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormChamado } from "src/app/interfaces/formChamado";
import { FormCliente } from "src/app/interfaces/formCliente";
import { ClienteService } from "src/app/services/cliente.service";
import { RepositoryService } from "src/app/services/repository.service";
import { TabelaService } from "src/app/services/tabela.service";
import { CadastroService } from "./../../../services/cadastro.service";

@Component({
  selector: "form-criar-cadastro",
  templateUrl: "./form-criar-cadastro.component.html",
  styleUrls: ["./form-criar-cadastro.component.scss"],
})
export class FormCriarCadastroComponent implements OnInit {
  form: FormGroup;
  formChamado: FormGroup;
  isEditMode: boolean = false;
  activeTab: string = "cliente";
  inputDesabilitado: boolean = true;
  clienteRecebido!: FormCliente;
  clienteIdExiste: boolean = false;
  possuiCadastro: boolean = false;
  mostrarCliente = false;
  novoClienteSalvoNoBanco!: FormCliente;
  msgError!: string;
  msgErrorCadastro!: string;

  constructor(
    private dialogRef: MatDialogRef<any, boolean>,
    private changeDetector: ChangeDetectorRef,
    private cadastroService: CadastroService,
    private snackBar: MatSnackBar,
    private service: RepositoryService,
    private formBuilder: FormBuilder,
    private tabelaService: TabelaService,
    private clienteService: ClienteService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.possuiCadastro = data.possuiCadastro;
    this.mostrarCliente = data.mostrarCliente;

    this.form = this.formBuilder.group({
      cliente: [null, Validators.required],
      endereco: [null, Validators.required],
      telefone: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
    });
    this.formChamado = formBuilder.group({
      clienteId: [null],
      nomeItem: [null, Validators.required],
      itemSerie: [null, Validators.required],
      // status: [null, Validators.required],
      data_entrada: [null, Validators.required],
      defeitoRelatado: [null, Validators.required],
    });
  }

  verificaAndSubmit() {
    if (this.form.invalid) {
      this.msgError = "Por favor, preencha todos os campos.";
      console.log(this.msgError);
    } else {
      this.onSubmitCliente();
    }
  }
  onSubmitCliente() {
    this.msgError = "";
    if (this.form.invalid) {
      this.changeDetector.detectChanges();
    } else {
      let clienteFormFields: FormCliente = {
        nome: "",
        endereco: "",
        telefone: "",
        email: "",
      };
      // tirar essas partes que nao sao usadas mais
      if (this.possuiCadastro) {
        clienteFormFields = {
          id: this.clienteRecebido.id,
          nome: this.form.get("cliente")?.value,
          endereco: this.form.get("endereco")?.value,
          email: this.form.get("email")?.value,
          telefone: this.form.get("telefone")?.value,
        };
      } else {
        clienteFormFields = {
          nome: this.form.get("cliente")?.value,
          endereco: this.form.get("endereco")?.value,
          email: this.form.get("email")?.value,
          telefone: this.form.get("telefone")?.value,
        };
      }

      this.clienteService.createCliente(clienteFormFields).subscribe(
        (resultado) => {
          console.log("resultado V");
          console.log(resultado);
          this.novoClienteSalvoNoBanco = resultado;
          this.onSucess();
        },
        () => {
          this.onError();
        }
      );
    }
  }
  validarAndSubmitCadastro() {
    if (this.formChamado.invalid || this.clienteIdExiste === false) {
      this.msgErrorCadastro = "Por favor, preencha todos os campos.";
    } else {
      this.onSubmit();
    }
  }

  onSubmit() {
    let dadosParaSalvar: FormChamado = {
      clienteId: "",
      nomeItem: "",
      itemSerie: "",
      status: "",
      dataEntrada: "",
      defeitoRelatado: "",
    };
    const dataInicial = this.formChamado.get("data_entrada")?.value;
    const dataFormatada = this.datePipe.transform(
      dataInicial,
      "yyyy-MM-ddTHH:mm:ss"
    );
    if (this.novoClienteSalvoNoBanco) {
      const cliente = this.novoClienteSalvoNoBanco;

      dadosParaSalvar = {
        clienteId: { id: cliente.id },
        dataEntrada: dataFormatada,
        defeitoRelatado: this.formChamado.get("defeitoRelatado")?.value,
        itemSerie: this.formChamado.get("itemSerie")?.value,
        nomeItem: this.formChamado.get("nomeItem")?.value,
        status: this.formChamado.get("status")?.value,
      };
      console.log(dadosParaSalvar);
      console.log("dados para salvar ^^");
    } else {
      const cliente = this.clienteRecebido;

      dadosParaSalvar = {
        clienteId: { id: cliente.id },
        dataEntrada: dataFormatada,
        defeitoRelatado: this.formChamado.get("defeitoRelatado")?.value,
        itemSerie: this.formChamado.get("itemSerie")?.value,
        nomeItem: this.formChamado.get("nomeItem")?.value,
        status: this.formChamado.get("status")?.value,
      };
      console.log(dadosParaSalvar);
      console.log("dados para salvar ^^");
    }
    this.cadastroService.createCadastro(dadosParaSalvar).subscribe(
      (result) => {
        this.tabelaService.emitListaAtualizada.emit();
        this.onSucess();
        this.dialogRef.close(true);
      },
      () => {
        this.onError();
      }
    );
  }
  receberSon(clienteRecebido: FormCliente) {
    this.clienteRecebido = clienteRecebido;
    this.clienteIdExiste = true;
    console.log(clienteRecebido);
    console.log("cliente recebido para ir para o chamado ^^");
    this.formChamado.patchValue({
      clienteId: clienteRecebido.id,
      nomeItem: this.formChamado.get("nomeItem")?.value,
    });

    console.log(this.formChamado.value);
    console.log("formChamado atualizado ^^");
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
