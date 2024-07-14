import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, Observable, of } from "rxjs";
import { ChamadoCompleto } from "src/app/interfaces/chamadoCompleto";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: "app-tabela-tecnico",
  templateUrl: "./tabela-tecnico.component.html",
  styleUrls: ["./tabela-tecnico.component.scss"],
})
export class TabelaTecnicoComponent implements OnInit {
  displayedColumns = ["id", "clienteNome", "nomeItem", "status", "dataEntrada"];

  cadastros$!: Observable<ChamadoCompleto[]>;
  constructor(
    private snackBar: MatSnackBar,
    private tecnicoService: TecnicoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.cadastros$ = this.tecnicoService
      .carregarTabela(this.data.dados.toString())
      .pipe(
        catchError((error) => {
          this.onError();
          return of([]);
        })
      );
  }
  onError() {
    this.snackBar.open("Esse tecnico não tem chamados", "", { duration: 5000 });
  }
}
