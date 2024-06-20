import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { DetalheProdutoComponent } from "src/app/components/dialog/detalhe-produto/detalhe-produto.component";
import { ErrorDialogComponent } from "src/app/components/dialog/errors/error-dialog/error-dialog.component";
import { FinalizarPedidoComponent } from "src/app/components/dialog/finalizar-pedido/finalizar-pedido.component";
import { ChamadoCompleto } from "src/app/interfaces/chamadoCompleto";
import { AuthService } from "src/app/services/auth.service";
import { TabelaService } from "src/app/services/tabela.service";

@Component({
  selector: "tecnico-tela",
  templateUrl: "./tecnico-tabela.component.html",
  styleUrls: ["./tecnico-tabela.component.scss"],
})
export class TecnicoTabelaComponent implements OnInit {
  cadastros$: Observable<ChamadoCompleto[]>;
  detalhesVisiveis: { [key: number]: boolean } = {};
  displayedColumns = ["id", "info", "ico"];
  filtro: string[] = ["AGUARDANDO_MANUTENCAO", "EM_MANUTENCAO"];
  subId: string = this.authService.getIdToken();
  URL = "tecnico/chamados";
  nomeTecnico = this.authService.getNome();

  constructor(
    private authService: AuthService,
    private tabelaService: TabelaService,
    private dialog: MatDialog
  ) {
    this.cadastros$ = this.carregarTabelaManu(this.subId);
  }
  carregarTabelaManu(subId?: string): Observable<ChamadoCompleto[]> {
    return (this.cadastros$ = this.tabelaService.carregarTabela(
      this.subId,
      this.URL
    ));
  }

  finalizarPedido(dados: ChamadoCompleto) {
    this.dialog.open(FinalizarPedidoComponent, {
      width: "600px",
      data: { infoCadastro: dados },
    });
  }
  openDialogError() {
    this.dialog.open(ErrorDialogComponent);
  }
  openDialogDetalhe(dados: ChamadoCompleto) {
    this.dialog.open(DetalheProdutoComponent, {
      width: "60%",
      data: { infoCadastro: dados },
    });
  }
  alternarDetalhes(index: number): void {
    this.detalhesVisiveis[index] = !this.detalhesVisiveis[index];
  }

  getStatusClass(status: string): string {
    return this.tabelaService.filterStatusClass(status);
  }

  ngOnInit() {
    const getId = this.authService.getIdToken();
    if (getId) {
      this.subId = getId;
    }
    this.tabelaService.emitListaAtualizada.subscribe(() => {
      this.carregarTabelaManu(this.subId);
    });
  }
}
