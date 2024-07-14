import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatRadioChange } from "@angular/material/radio";
import { Observable, catchError, delay, of } from "rxjs";
import { ChamadoCompleto } from "../interfaces/chamadoCompleto";
import { MostrarCadastro } from "../interfaces/mostrarCadastro";
import { TecnicoForm } from "../interfaces/tecnico";

@Injectable({
  providedIn: "root",
})
export class TecnicoService {
  private APItecnico = "http://localhost:8080/tecnico";
  private APIlogar = "http://localhost:8080/tecnico/login";
  private APIregister = "http://localhost:8080/tecnico/register";
  private APIshowTabela = "http://localhost:8080/tecnico/chamados";

  constructor(private httpClient: HttpClient) {}

  logar(body: string[]) {
    return this.httpClient.post<string>(this.APIlogar, body);
  }

  registrarTecnico(tecnico: TecnicoForm) {
    return this.httpClient.post(this.APIregister, tecnico);
  }

  buscarTodos(filtro?: string): Observable<string[]> {
    if (filtro) {
      filtro.toUpperCase();
      const params = new HttpParams().set("params", filtro);
      return this.httpClient.get<string[]>(this.APItecnico, { params }).pipe(
        catchError(() => {
          return of([]);
        })
      );
    }
    return this.httpClient.get<string[]>(this.APItecnico).pipe(
      catchError(() => {
        return of([]);
      })
    );
  }

  setTecnico(id: string, tecnicoID: number) {
    return this.httpClient
      .patch<MostrarCadastro>(`${this.APItecnico}/${id}`, tecnicoID)
      .pipe(
        catchError((error) => {
          console.error("Erro ao atualizar o tecnico:", error);
          return of(null);
        })
      );
  }

  carregarTabela(subId: string): Observable<ChamadoCompleto[]> {
    const params = new HttpParams().set("params", subId);
    return this.httpClient
      .get<ChamadoCompleto[]>(`${this.APIshowTabela}`, { params })
      .pipe(delay(500));
  }

  handleFilter(event: MatRadioChange): string {
    let filtro = "";
    switch (+event.value) {
      case 1:
        filtro = "TELAS";
        return filtro;
      case 2:
        filtro = "PLACAS";
        return filtro;
      case 3:
        filtro = "MOBILE";
        return filtro;
      case 4:
        filtro = "";
        return filtro;
    }
    return filtro;
  }
}
