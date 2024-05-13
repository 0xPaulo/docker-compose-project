import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { Cadastro } from "src/app/interfaces/cadastro";
import { CadastroService } from "src/app/services/cadastro.service";
import { TabelaService } from "src/app/services/tabela.service";

import { DeleteComponent } from "src/app/components/dialog/delete/delete.component";
import { DetalheProdutoComponent } from "src/app/components/dialog/detalhe-produto/detalhe-produto.component";
import { ErrorDialogComponent } from "src/app/components/dialog/errors/error-dialog/error-dialog.component";
import { PossuiCadastroComponent } from "src/app/components/dialog/possui-cadastro/possui-cadastro.component";
import { ChamadoCompleto } from "src/app/interfaces/chamadoCompleto";
import { FormCadastroComponent } from "src/app/screens/cadastro/form-cadastro/form-cadastro.component";

@Component({
  selector: "lista-cadastro",
  templateUrl: "./lista.component.html",
  styleUrls: ["./lista.component.scss"],
})
export class ListaComponent implements OnInit {
  cadastros$: Observable<ChamadoCompleto[]>;
  detalhesVisiveis: { [key: number]: boolean } = {};
  displayedColumns = ["id", "info", "ico"];

  constructor(
    private cadastroService: CadastroService,
    private dialog: MatDialog,
    private tabelaService: TabelaService
  ) {
    this.cadastros$ = this.carregarTabela();
  }

  carregarTabela(): Observable<ChamadoCompleto[]> {
    return (this.cadastros$ = this.tabelaService.carregarCadastros());
  }

  carregarNovaTabela() {
    this.tabelaService.carregarCadastros();
  }

  filterStatus(filtros: string[]) {
    this.cadastros$ = this.tabelaService.carregarFiltro(filtros);
  }

  abrirDialogForm() {
    const dialogRef = this.dialog.open(PossuiCadastroComponent, {
      maxWidth: "600px",
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  editarItem(item: ChamadoCompleto) {
    const id = item.id;
    const subscription = this.cadastroService.findById(id).subscribe(
      (dados: ChamadoCompleto[]) => {
        // if (!(item.status === "DISPONIVEL_TRIAGEM")) {
        //   const dialogPermi = this.dialog.open(SemPermissaoComponent, {
        //     width: "40%",
        //     data: { modoEdicao: true, infoCadastro: dados },
        //   });
        //   dialogPermi.afterClosed().subscribe((result) => {
        //     subscription.unsubscribe();
        //   });
        // } else {
        const dialogRef = this.dialog.open(FormCadastroComponent, {
          maxWidth: "600px",
          data: { infoCadastro: dados },
        });
        dialogRef.afterClosed().subscribe((result) => {
          subscription.unsubscribe();
        });
      }
      // }
    );
  }

  openDialoDelete(dados: Cadastro) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { infoCadastro: dados },
    });
  }

  openDialogDetalhe(dados: ChamadoCompleto) {
    this.dialog.open(DetalheProdutoComponent, {
      width: "80%",
      data: { infoCadastro: dados },
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

  ngOnInit() {
    this.tabelaService.emitListaAtualizada.subscribe(() => {
      this.carregarTabela();
    });
  }
}
