import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormChamado } from "../interfaces/formChamado";

@Injectable({
  providedIn: "root",
})
export class CadastroService {
  private readonly APIcadastro = "http://localhost:8080/api/cadastro";
  constructor(private httpClient: HttpClient) {}

  createCadastro(cadastro: FormChamado) {
    // console.log(cadastro);
    // console.log("data de entrada? ^^");

    return this.httpClient.post(this.APIcadastro, cadastro);
  }
}
