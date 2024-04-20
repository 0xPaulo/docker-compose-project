import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatRadioChange } from "@angular/material/radio";
import { Observable, catchError, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TecnicoService {
  private APItecnico = "http://localhost:8080/tecnicos";

  constructor(private httpClient: HttpClient) {}

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
        filtro = "GERAL";
        return filtro;
    }
    return filtro;
  }
}
