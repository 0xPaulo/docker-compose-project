import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormCliente } from "src/app/interfaces/formCliente";
import { TecnicoService } from "./../../../services/tecnico.service";

@Component({
  selector: "app-dialog-criar-tecnico",
  templateUrl: "./dialog-criar-tecnico.component.html",
  styleUrls: ["./dialog-criar-tecnico.component.scss"],
})
export class DialogCriarTecnicoComponent implements OnInit {
  form: FormGroup;
  novoTecnicoSalvoNoBanco!: FormCliente;
  msgError!: string;
  msgErrorCadastro!: string;

  constructor(
    private tecnicoService: TecnicoService,
    private dialogRef: MatDialogRef<any, boolean>,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      tecnicoNome: [null, Validators.required],
      tecnicoPerfil: [null, Validators.required],
      tecnicoCategoria: [null],
      tecnicoEmail: [null, [Validators.required, Validators.email]],
      tecnicoSenha: [null, [Validators.required]],
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
    const tecnicoFormFields = {
      nome: this.form.get("tecnicoNome")?.value,
      perfil: this.form.get("tecnicoPerfil")?.value,
      tecnicoCategorias: this.form.get("tecnicoCategoria")?.value,
      email: this.form.get("tecnicoEmail")?.value,
      senha: this.form.get("tecnicoSenha")?.value,
    };

    this.tecnicoService.registrarTecnico(tecnicoFormFields).subscribe(
      (resultado) => {
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
