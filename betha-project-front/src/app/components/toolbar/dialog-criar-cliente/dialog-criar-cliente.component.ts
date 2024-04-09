import { DatePipe } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormCliente } from "src/app/interfaces/formCliente";
import { CadastroService } from "src/app/services/cadastro.service";
import { ClienteService } from "src/app/services/cliente.service";
import { RepositoryService } from "src/app/services/repository.service";
import { TabelaService } from "src/app/services/tabela.service";

@Component({
  selector: "app-dialog-criar-cliente",
  templateUrl: "./dialog-criar-cliente.component.html",
  styleUrls: ["./dialog-criar-cliente.component.scss"],
})
export class DialogCriarClienteComponent implements OnInit {
  form: FormGroup;
  isEditMode: boolean = false;
  activeTab: string = "cliente";
  inputDesabilitado: boolean = true;
  clienteRecebido!: FormCliente;
  clienteIdExiste: boolean = false;
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
    private datePipe: DatePipe
  ) {
    this.form = this.formBuilder.group({
      cliente: [null, Validators.required],
      endereco: [null, Validators.required],
      telefone: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
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
    const clienteFormFields = {
      nome: this.form.get("cliente")?.value,
      endereco: this.form.get("endereco")?.value,
      email: this.form.get("email")?.value,
      telefone: this.form.get("telefone")?.value,
    };
    this.clienteService.createCliente(clienteFormFields).subscribe(
      (resultado) => {
        console.log("resultado V");
        console.log(resultado);
        this.novoClienteSalvoNoBanco = resultado;
        this.dialogRef.close(true);

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
    this.snackBar.open("Cadastrado com sucesso", "", { duration: 5000 });
  }
  onCancel() {}

  ngOnInit() {}
}
