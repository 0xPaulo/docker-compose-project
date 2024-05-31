import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { DetalheProdutoComponent } from "src/app/components/dialog/detalhe-produto/detalhe-produto.component";
import { ErrorDialogComponent } from "src/app/components/dialog/errors/error-dialog/error-dialog.component";
import { SemPermissaoComponent } from "src/app/components/dialog/errors/sem-permissao/sem-permissao.component";
import { ChamadoCompleto } from "src/app/interfaces/chamadoCompleto";
import { TabelaService } from "src/app/services/tabela.service";
import { EntregueClienteComponent } from "./../../../components/dialog/entregue-cliente/entregue-cliente.component";

@Component({
  selector: "lista-concluido",
  templateUrl: "./lista-concluido.component.html",
  styleUrls: ["./lista-concluido.component.scss"],
})
export class ListaConcluidoComponent implements OnInit {
  cadastros$: Observable<ChamadoCompleto[]>;
  detalhesVisiveis: { [key: number]: boolean } = {};
  displayedColumns = ["id", "info", "ico"];
  filtro: string[] = [
    "CONCLUIDO_CONSERTADO",
    "CONCLUIDO_N_CONSERTADO",
    "AGUARDANDO_FINALIZAR",
  ];

  URL: string = "concluido";

  constructor(private dialog: MatDialog, private tabelaService: TabelaService) {
    this.cadastros$ = this.carregarTabelaConclu(this.filtro);
  }

  carregarTabelaConclu(filtro: string[]): Observable<ChamadoCompleto[]> {
    return (this.cadastros$ = this.tabelaService.carregarFiltro(
      filtro,
      this.URL
    ));
  }

  carregarNovaTabela() {
    return (this.cadastros$ = this.tabelaService.carregarCadastros());
  }
  filterStatus(filtros: string[]) {
    this.cadastros$ = this.tabelaService.carregarFiltro(filtros);
  }

  entregueAoCliente(dados: ChamadoCompleto) {
    if (dados.status !== "AGUARDANDO_FINALIZAR") {
      const dialogPermi = this.dialog.open(SemPermissaoComponent, {
        width: "40%",
      });
    } else {
      this.dialog.open(EntregueClienteComponent, {
        width: "400px",
        data: { infoCadastro: dados },
      });
    }
  }

  openDialogDetalhe(dados: ChamadoCompleto) {
    this.dialog.open(DetalheProdutoComponent, {
      width: "60%",
      data: { infoCadastro: dados },
    });
  }

  openDialogError() {
    this.dialog.open(ErrorDialogComponent);
  }

  alternarDetalhes(index: number): void {
    this.detalhesVisiveis[index] = !this.detalhesVisiveis[index];
  }

  getStatusClass(status: string): string {
    return this.tabelaService.filterStatusClass(status);
  }

  ngOnInit() {
    this.tabelaService.emitListaAtualizada.subscribe(() => {
      this.carregarTabelaConclu(this.filtro);
    });
  }
}
