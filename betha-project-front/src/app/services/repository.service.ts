import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, delay, first, map, of, tap } from "rxjs";
import { ClienteNames } from "../interfaces/clienteNames";
import { Cadastro } from "./../interfaces/cadastro";

@Injectable({
  providedIn: "root",
})
export class RepositoryService {
  // private readonly API = 'https://betha-v2.onrender.com/api/lista';
  private readonly API = "http://localhost:8080/api/lista";

  constructor(private httpClient: HttpClient) {}

  listarTodos() {
    return this.httpClient.get<Cadastro[]>(this.API).pipe(delay(500), first());
  }

  carregarFiltro(filtros: string[]): Observable<Cadastro[]> {
    const filtroString = filtros.join(",");
    const params = new HttpParams().set("filter", filtroString);
    return this.httpClient
      .get<Cadastro[]>(`${this.API}/filtrar`, { params })
      .pipe(delay(500));
  }

  mudarStatus(id: string | undefined, element: Partial<Cadastro>) {
    return this.httpClient.patch<Cadastro>(`${this.API}/${id}`, element).pipe(
      tap(),
      catchError((error) => {
        console.log("Erro ao atualizar registro", error);
        return of(null);
      })
    );
  }

  update(id: string, chamado: Partial<Cadastro>) {
    return this.httpClient.patch<Cadastro>(`${this.API}/${id}`, chamado).pipe(
      catchError((error) => {
        console.error("Erro ao atualizar o registro:", error);
        return of(null);
      })
    );
  }
  save(chamado: Partial<Cadastro>) {
    return this.httpClient
      .post<Cadastro>(this.API, chamado)
      .pipe(tap(() => {}));
  }

  delete(id: string) {
    return this.httpClient.delete<Cadastro>(`${this.API}/${id}`);
  }

  findById(id: string): Observable<Cadastro[]> {
    const url = `${this.API}/${id}`;
    return this.httpClient.get<Cadastro[]>(url).pipe(
      catchError((error) => {
        console.debug(`Aconteceu esse erro ao buscar id (${id}):  ${error}`);
        throw error;
      })
    );
  }

  buscarNomeCliente(nomeCliente: string): Observable<string[]> {
    if (nomeCliente) {
      return this.httpClient
        .get<any[]>(`http://localhost:8080/api/clientes?nome=${nomeCliente}`)
        .pipe(
          map(
            (response) => response.map((obj: ClienteNames) => obj.cliente),
            catchError((error) => {
              console.error("Erro ao buscar clientes:", error);
              throw error;
            })
          )
        );
    } else {
      return of([]);
    }
  }
}
