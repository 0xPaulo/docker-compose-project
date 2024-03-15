import { EventEmitter, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable, catchError, of } from "rxjs";

import { ErrorDialogComponent } from "../components/dialog/errors/error-dialog/error-dialog.component";
import { Cadastro } from "../interfaces/cadastro";
import { RepositoryService } from "./repository.service";

@Injectable({
  providedIn: "root",
})
export class TabelaService {
  emitListaAtualizada = new EventEmitter<void>();

  constructor(
    private repository: RepositoryService,
    private matDialog: MatDialog
  ) {}

  carregarCadastros(): Observable<Cadastro[]> {
    return this.repository.listarTodos().pipe(
      catchError(() => {
        this.openDialogError();
        return of([]);
      })
    );
  }
  carregarCadastrosTriagem(filtro: string[]): Observable<Cadastro[]> {
    return this.repository.carregarFiltro(filtro).pipe(
      catchError(() => {
        this.openDialogError();
        return of([]);
      })
    );
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
      default:
        return ""; // Retorna uma string vazia se o status não corresponder a nenhum dos casos acima
    }
  }

  openDialogError() {
    this.matDialog.open(ErrorDialogComponent);
  }
}
