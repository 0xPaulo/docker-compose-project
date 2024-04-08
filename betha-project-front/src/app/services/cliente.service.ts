import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { FormCliente } from "../interfaces/formCliente";

@Injectable({
  providedIn: "root",
})
export class ClienteService {
  private readonly APIcliente = "http://localhost:8080/api/clientes";
  constructor(private httpClient: HttpClient) {}

  createCliente(formCliente: FormCliente) {
    return this.httpClient.post<FormCliente>(this.APIcliente, formCliente);
  }

  buscarNomeCliente(nomeCliente: string): Observable<FormCliente[]> {
    if (nomeCliente) {
      return this.httpClient
        .get<any[]>(`http://localhost:8080/api/clientes?nome=${nomeCliente}`)
        .pipe(
          catchError((error) => {
            console.error("Erro ao buscar clientes:", error);
            throw error;
          })
        );
    } else {
      return of([]);
    }
  }
}
