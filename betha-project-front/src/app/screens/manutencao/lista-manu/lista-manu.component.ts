import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { DetalheProdutoComponent } from "src/app/components/dialog/detalhe-produto/detalhe-produto.component";
import { ErrorDialogComponent } from "src/app/components/dialog/errors/error-dialog/error-dialog.component";
import { SemPermissaoComponent } from "src/app/components/dialog/errors/sem-permissao/sem-permissao.component";
import { CancelarComponent } from "src/app/components/dialog/finalizar-pedido/cancelar/cancelar.component";
import { ChamadoCompleto } from "src/app/interfaces/chamadoCompleto";
import { CadastroService } from "src/app/services/cadastro.service";
import { TabelaService } from "src/app/services/tabela.service";
import { FormManuTecComponent } from "../form-manu-tec/form-manu-tec.component";

@Component({
  selector: "lista-manu",
  templateUrl: "./lista-manu.component.html",
  styleUrls: ["./lista-manu.component.scss"],
})
export class ListaManuComponent implements OnInit {
  cadastros$: Observable<ChamadoCompleto[]>;
  detalhesVisiveis: { [key: number]: boolean } = {};
  displayedColumns = ["id", "info", "ico"];
  filtro: string[] = [
    "AGUARDANDO_MANUTENCAO",
    "EM_MANUTENCAO",
    "VOLTOU_MANUTENCAO",
  ];

  URL: string = "manutencao";

  constructor(
    private cadastroService: CadastroService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private tabelaService: TabelaService
  ) {
    this.cadastros$ = this.carregarTabelaManu(this.filtro);
  }

  carregarTabelaManu(filtro: string[]): Observable<ChamadoCompleto[]> {
    return (this.cadastros$ = this.tabelaService.carregarFiltro(
      filtro,
      this.URL
    ));
  }

  carregarNovaTabela() {
    return (this.cadastros$ = this.tabelaService.carregarFiltro(
      null,
      this.URL
    ));
  }

  filterStatus(filtros: string[]) {
    this.cadastros$ = this.tabelaService.carregarFiltro(filtros, this.URL);
  }

  addTecnico(item: ChamadoCompleto) {
    const id = item.id;
    const subscription = this.cadastroService
      .findById(id)
      .subscribe((dados: ChamadoCompleto[]) => {
        if (
          item.status !== "AGUARDANDO_MANUTENCAO" &&
          item.status !== "VOLTOU_MANUTENCAO"
        ) {
          const dialogPermi = this.dialog.open(SemPermissaoComponent, {
            width: "40%",
            data: { modoEdicao: true, infoCadastro: dados },
          });
          dialogPermi.afterClosed().subscribe((result) => {
            subscription.unsubscribe();
          });
        } else {
          const dialogRef = this.dialog.open(FormManuTecComponent, {
            width: "60%",
            data: { infoCadastro: dados },
          });
          dialogRef.afterClosed().subscribe((result) => {
            subscription.unsubscribe();
          });
        }
      });
  }

  openDialogDetalhe(dados: ChamadoCompleto) {
    this.dialog.open(DetalheProdutoComponent, {
      width: "60%",
      data: { infoCadastro: dados },
    });
  }

  chamarCancelamento(dados: ChamadoCompleto, status: string) {
    this.dialog.open(CancelarComponent, {
      width: "500px",
      data: { infoCadastro: dados, status: status },
    });
  }

  alternarDetalhes(index: number): void {
    this.detalhesVisiveis[index] = !this.detalhesVisiveis[index];
  }

  getStatusClass(status: string): string {
    return this.tabelaService.filterStatusClass(status);
  }

  openDialogError() {
    this.dialog.open(ErrorDialogComponent);
  }

  onError() {
    this.snackBar.open("Ocorreu um erro", "", { duration: 5000 });
  }

  onSucess() {
    this.snackBar.open("Atualizado com sucesso", "", { duration: 5000 });
  }

  ngOnInit() {
    this.tabelaService.emitListaAtualizada.subscribe(() => {
      this.carregarTabelaManu(this.filtro);
    });
  }
}
