import { EventEmitter, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable, delay, first, tap } from "rxjs";

import { HttpClient, HttpParams } from "@angular/common/http";
import { ErrorDialogComponent } from "../components/dialog/errors/error-dialog/error-dialog.component";
import { ChamadoCompleto } from "../interfaces/chamadoCompleto";
import { CadastroService } from "./cadastro.service";

@Injectable({
  providedIn: "root",
})
export class TabelaService {
  emitListaAtualizada = new EventEmitter<void>();

  private readonly API = "http://localhost:8080/cadastros";
  private readonly authorizeHttpAPI = "http://localhost:8080/";

  constructor(
    private httpClient: HttpClient,
    private cadastroService: CadastroService,
    private matDialog: MatDialog
  ) {}

  carregarCadastros(): Observable<ChamadoCompleto[]> {
    return this.httpClient
      .get<ChamadoCompleto[]>(this.API)
      .pipe(delay(500), first());
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
  carregarFiltro(
    filtros: string[],
    URL?: string
  ): Observable<ChamadoCompleto[]> {
    const filtroString = filtros.join(",");
    const params = new HttpParams().set("params", filtroString);
    if (URL) {
      return this.httpClient
        .get<ChamadoCompleto[]>(`${this.authorizeHttpAPI}${URL}`, { params })
        .pipe(
          tap((resultado) => console.log(resultado)),
          delay(500)
        );
    } else {
      return this.httpClient
        .get<ChamadoCompleto[]>(`${this.API}`, { params })
        .pipe(
          tap((resultado) => console.log(resultado)),
          delay(500)
        );
    }
  }

  carregarTabela(subId: string, URL?: string): Observable<ChamadoCompleto[]> {
    const params = new HttpParams().set("params", subId);
    return this.httpClient
      .get<ChamadoCompleto[]>(`${this.authorizeHttpAPI}${URL}`, { params })
      .pipe(
        tap((resultado) => console.log(resultado)),
        delay(500)
      );
  }

  openDialogError() {
    this.matDialog.open(ErrorDialogComponent);
  }
}
