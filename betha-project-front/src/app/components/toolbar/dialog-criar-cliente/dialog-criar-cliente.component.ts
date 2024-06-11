import { DatePipe } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormCliente } from "src/app/interfaces/formCliente";
import { CadastroService } from "src/app/services/cadastro.service";
import { ClienteService } from "src/app/services/cliente.service";
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
    private formBuilder: FormBuilder,
    private tabelaService: TabelaService,
    private clienteService: ClienteService,
    private datePipe: DatePipe
  ) {
    this.form = this.formBuilder.group({
      clienteNome: [null, Validators.required],
      clienteEndereco: [null, Validators.required],
      clienteTelefone: [null, Validators.required],
      clienteEmail: [null, [Validators.required, Validators.email]],
    });
  }

  verificaAndSubmit() {
    if (this.form.invalid) {
      this.msgError = "Por favor, preencha todos os campos.";
      console.debug(this.msgError);
    } else {
      this.onSubmitCliente();
    }
  }
  onSubmitCliente() {
    this.msgError = "";
    const clienteFormFields = {
      clienteNome: this.form.get("clienteNome")?.value,
      clienteEndereco: this.form.get("clienteEndereco")?.value,
      clienteTelefone: this.form.get("clienteTelefone")?.value,
      clienteEmail: this.form.get("clienteEmail")?.value,
    };

    this.clienteService.createCliente(clienteFormFields).subscribe(
      (resultado) => {
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
