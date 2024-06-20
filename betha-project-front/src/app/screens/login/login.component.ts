import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./../../services/auth.service";
import { TecnicoService } from "./../../services/tecnico.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  form: FormGroup;
  msgError = "";

  constructor(
    private authService: AuthService,
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
      console.debug(this.msgError);
    } else {
      this.onACESSAR();
    }
  }

  onACESSAR() {
    this.tecnicoService.logar(this.form.value).subscribe(
      (resposta: any) => {
        this.authService.saveSessionStorageToken(resposta.token);
        this.router.navigate(["home"]);
      },
      (error) => {
        this.msgError = "Acesso não autorizado";
        console.error("Acesso não autorizado");
      }
    );
  }
}
