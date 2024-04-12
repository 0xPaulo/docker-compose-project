import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, delay, first, of, tap } from "rxjs";
import { ChamadoCompleto } from "../interfaces/chamadoCompleto";

@Injectable({
  providedIn: "root",
})
export class RepositoryService {
  // private readonly API = 'https://betha-v2.onrender.com/api/lista';
  private readonly API = "http://localhost:8080/api/lista";
  private readonly API2 = "http://localhost:8080/api/cadastro";

  constructor(private httpClient: HttpClient) {}

  // listarTodos() {
  //   return this.httpClient.get<Cadastro[]>(this.API).pipe(delay(500), first());
  // }
  listarTodos() {
    return this.httpClient
      .get<ChamadoCompleto[]>(this.API2)
      .pipe(delay(500), first());
  }

  carregarFiltro(filtros: string[]): Observable<ChamadoCompleto[]> {
    const filtroString = filtros.join(",");
    const params = new HttpParams().set("filter", filtroString);
    return this.httpClient
      .get<ChamadoCompleto[]>(`${this.API}/filtrar`, { params })
      .pipe(delay(500));
  }

  mudarStatus(id: string | undefined, element: Partial<ChamadoCompleto>) {
    return this.httpClient
      .patch<ChamadoCompleto>(`${this.API}/${id}`, element)
      .pipe(
        tap(),
        catchError((error) => {
          console.log("Erro ao atualizar registro", error);
          return of(null);
        })
      );
  }

  update(id: string, chamado: Partial<ChamadoCompleto>) {
    return this.httpClient
      .patch<ChamadoCompleto>(`${this.API}/${id}`, chamado)
      .pipe(
        catchError((error) => {
          console.error("Erro ao atualizar o registro:", error);
          return of(null);
        })
      );
  }
  save(chamado: Partial<ChamadoCompleto>) {
    return this.httpClient
      .post<ChamadoCompleto>(this.API, chamado)
      .pipe(tap(() => {}));
  }

  delete(id: string) {
    return this.httpClient.delete<ChamadoCompleto>(`${this.API}/${id}`);
  }

  findById(id: string): Observable<ChamadoCompleto[]> {
    const url = `${this.API}/${id}`;
    return this.httpClient.get<ChamadoCompleto[]>(url).pipe(
      catchError((error) => {
        console.debug(`Aconteceu esse erro ao buscar id (${id}):  ${error}`);
        throw error;
      })
    );
  }
}
