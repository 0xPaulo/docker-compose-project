import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TecnicoService } from "./../../services/tecnico.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  form: FormGroup;
  msgError: string = "";

  constructor(
    private tecnicoService: TecnicoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      email: [null, Validators.required],
      senha: [null, Validators.required],
    });
  }

  verificaLogin() {
    if (this.form.invalid) {
      this.msgError = "Por favor, preencha todos os campos.";
      console.log(this.msgError);
    } else {
      this.onACESSAR();
    }
  }

  onACESSAR() {
    this.tecnicoService.logar(this.form.value).subscribe(
      (resposta) => {
        console.log(resposta);
        this.router.navigate(["home"]);
      },
      (error) => {
        this.msgError = "Acesso não autorizado";
        console.error("Acesso não autorizado");
        // this.router.navigate(["home"]);
      }
    );
    console.log(this.form.value);
  }
}
