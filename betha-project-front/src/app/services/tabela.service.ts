import { EventEmitter, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable, catchError, delay, first, of } from "rxjs";

import { HttpClient, HttpParams } from "@angular/common/http";
import { ErrorDialogComponent } from "../components/dialog/errors/error-dialog/error-dialog.component";
import { ChamadoCompleto } from "../interfaces/chamadoCompleto";
import { PaginatorChamadoCompleto } from "../interfaces/paginatorChamadoCompleto";
import { GetFiltrosService } from "./get-filtros.service";

@Injectable({
  providedIn: "root",
})
export class TabelaService {
  emitListaAtualizada = new EventEmitter<void>();

  private readonly API = "http://localhost:8080/cadastros";
  private readonly authorizeHttpAPI = "http://localhost:8080/";

  constructor(private httpClient: HttpClient, private matDialog: MatDialog, private getFiltro: GetFiltrosService) {}

  carregarCadastros(page = 0, pageSize = 5): Observable<PaginatorChamadoCompleto> {
    let params = new HttpParams();
    let valor = [`${page}`, `${pageSize}`];
    const pageConfiString = valor.join(",");
    params = params.set("pageConfig", pageConfiString);

    const temFiltro = this.getFiltro.hasFilter();
    if (temFiltro) {
      const filtros = this.getFiltro.getFiltros();
      params = params.set("filtro", filtros);
    }

    return this.httpClient.get<PaginatorChamadoCompleto>(this.API, { params }).pipe(
      delay(500),
      first(),
      catchError((error) => {
        console.error("Error", error);
        return of({ chamadoCompletoDTOs: [], totalRegistros: 0 });
      })
    );
  }

  carregarFiltro(filtros?: string[] | null, URL?: string): Observable<PaginatorChamadoCompleto> {
    let params = new HttpParams();

    if (filtros && filtros.length > 0) {
      const filtroString = filtros.join(",");
      params = params.set("filtro", filtroString);

      this.getFiltro.setFiltros(filtroString);
    }

    const valor = ["0", "15"];
    const pageConfiString = valor.join(",");
    params = params.set("pageConfig", pageConfiString);

    const urlBase = URL ? `${this.authorizeHttpAPI}${URL}` : this.API;

    return this.httpClient.get<PaginatorChamadoCompleto>(urlBase, { params }).pipe(
      delay(500),
      first(),
      catchError((error) => {
        console.error("Error", error);
        return of({ chamadoCompletoDTOs: [], totalRegistros: 0 });
      })
    );
  }

  carregarTabela(subId: string, URL?: string): Observable<ChamadoCompleto[]> {
    const params = new HttpParams().set("params", subId);
    return this.httpClient.get<ChamadoCompleto[]>(`${this.authorizeHttpAPI}${URL}`, { params }).pipe(
      delay(500),
      first(),
      catchError((error) => {
        console.error("Error", error);
        return of([]);
      })
    );
  }

  openDialogError() {
    this.matDialog.open(ErrorDialogComponent);
  }

  filterStatusClass(status: any) {
    switch (status) {
      case "CANCELADO":
        return "CANCELADO";
      case "DISPONIVEL_TRIAGEM":
        return "DISPONIVEL_TRIAGEM";
      case "AGUARDANDO_CLIENTE":
        return "AGUARDANDO_CLIENTE";
      case "AGUARDANDO_MANUTENCAO":
        return "AGUARDANDO_MANUTENCAO";
      case "CONCLUIDO_CONSERTADO":
        return "CONCLUIDO_CONSERTADO";
      case "CONCLUIDO_N_CONSERTADO":
        return "CONCLUIDO_N_CONSERTADO";
      case "EM_MANUTENCAO":
        return "EM_MANUTENCAO";
      case "VOLTOU_MANUTENCAO":
        return "VOLTOU_MANUTENCAO";
      case "AGUARDANDO_FINALIZAR":
        return "AGUARDANDO_FINALIZAR";
      default:
        return "";
    }
  }
}
