import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, delay, first, of } from "rxjs";
import { ChamadoCompleto } from "../interfaces/chamadoCompleto";
import { FormChamado } from "../interfaces/formChamado";

@Injectable({
  providedIn: "root",
})
export class CadastroService {
  private readonly APIcadastro = "http://localhost:8080/cadastros";
  constructor(private httpClient: HttpClient) {}

  createCadastro(cadastro: FormChamado) {
    return this.httpClient.post(this.APIcadastro, cadastro);
  }

  listarTodos() {
    return this.httpClient
      .get<ChamadoCompleto[]>(this.APIcadastro)
      .pipe(delay(500), first());
  }

  delete(id: string) {
    return this.httpClient.delete<ChamadoCompleto>(`${this.APIcadastro}/${id}`);
  }

  findById(id: string): Observable<ChamadoCompleto[]> {
    const url = `${this.APIcadastro}/${id}`;
    return this.httpClient.get<ChamadoCompleto[]>(url).pipe(
      catchError((error) => {
        console.debug(`Aconteceu esse erro ao buscar id (${id}):  ${error}`);
        throw error;
      })
    );
  }
  update(id: string, chamado: Partial<ChamadoCompleto>) {
    return this.httpClient
      .patch<ChamadoCompleto>(`${this.APIcadastro}/${id}`, chamado)
      .pipe(
        catchError((error) => {
          console.error("Erro ao atualizar o registro:", error);
          return of(null);
        })
      );
  }
}
