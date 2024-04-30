import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { DetalheProdutoComponent } from "src/app/components/dialog/detalhe-produto/detalhe-produto.component";
import { ErrorDialogComponent } from "src/app/components/dialog/errors/error-dialog/error-dialog.component";
import { FinalizarPedidoComponent } from "src/app/components/dialog/finalizar-pedido/finalizar-pedido.component";
import { ChamadoCompleto } from "src/app/interfaces/chamadoCompleto";
import { CadastroService } from "src/app/services/cadastro.service";
import { RepositoryService } from "src/app/services/repository.service";
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

  constructor(
    private cadastroService: CadastroService,
    private snackBar: MatSnackBar,
    private tabelaService: TabelaService,
    private repository: RepositoryService,
    private dialog: MatDialog
  ) {
    this.cadastros$ = this.carregarTabelaManu(this.filtro);
  }

  carregarTabelaManu(filtro: string[]): Observable<ChamadoCompleto[]> {
    return (this.cadastros$ = this.tabelaService.carregarFiltro(filtro));
  }

  carregarNovaTabela() {
    return (this.cadastros$ = this.tabelaService.carregarCadastros());
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

  // chamarManutencao(element: Partial<ChamadoCompleto>) {
  //   const id = element.id;
  //   const elementAtualizado = { ...element, status: "AGUARDANDO_MANUTENCAO" };
  //   this.cadastroService.mudarStatus(id, elementAtualizado).subscribe(
  //     (result) => {
  //       this.tabelaService.emitListaAtualizada.emit();
  //       this.onSucess();
  //     },
  //     () => {
  //       this.onError();
  //     }
  //   );
  // }
  // finalizar(element: Partial<ChamadoCompleto>) {
  //   const id = element.id;
  //   const elementAtualizado = { ...element, status: "AGUARDANDO_MANUTENCAO" };
  //   this.cadastroService.mudarStatus(id, elementAtualizado).subscribe(
  //     (result) => {
  //       this.tabelaService.emitListaAtualizada.emit();
  //       this.onSucess();
  //     },
  //     () => {
  //       this.onError();
  //     }
  //   );
  // }

  getStatusClass(status: string): string {
    return this.tabelaService.filterStatusClass(status);
  }

  // onError() {
  //   this.snackBar.open("Ocorreu um erro", "", { duration: 5000 });
  // }
  // onSucess() {
  //   this.snackBar.open("Atualizado com sucesso", "", { duration: 5000 });
  // }
  ngOnInit() {
    this.tabelaService.emitListaAtualizada.subscribe(() => {
      this.carregarTabelaManu(this.filtro);
    });
  }
}
