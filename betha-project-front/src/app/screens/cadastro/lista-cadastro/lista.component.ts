import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable, Subscription } from "rxjs";
import { CadastroService } from "src/app/services/cadastro.service";
import { TabelaService } from "src/app/services/tabela.service";

import { PageEvent } from "@angular/material/paginator";
import { DeleteComponent } from "src/app/components/dialog/delete/delete.component";
import { DetalheProdutoComponent } from "src/app/components/dialog/detalhe-produto/detalhe-produto.component";
import { ErrorDialogComponent } from "src/app/components/dialog/errors/error-dialog/error-dialog.component";
import { SemPermissaoComponent } from "src/app/components/dialog/errors/sem-permissao/sem-permissao.component";
import { PossuiCadastroComponent } from "src/app/components/dialog/possui-cadastro/possui-cadastro.component";
import { Cadastro } from "src/app/interfaces/cadastro";
import { ChamadoCompleto } from "src/app/interfaces/chamadoCompleto";
import { PaginatorChamadoCompleto } from "src/app/interfaces/paginatorChamadoCompleto";
import { FormCadastroComponent } from "src/app/screens/cadastro/form-cadastro/form-cadastro.component";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "lista-cadastro",
  templateUrl: "./lista.component.html",
  styleUrls: ["./lista.component.scss"],
})
// , AfterViewInit
// implements OnInit
export class ListaComponent {
  cadastros$: Observable<PaginatorChamadoCompleto>;
  // private subscription!: Subscription;
  private subscription1 = new Subscription();
  private subscription2 = new Subscription();
  detalhesVisiveis: { [key: number]: boolean } = {};
  displayedColumns = ["id", "info", "ico"];

  pageIndex = 0;
  pageSize = 5;
  totalRegistros = 0;

  constructor(
    private authService: AuthService,
    private cadastroService: CadastroService,
    private dialog: MatDialog,
    private tabelaService: TabelaService
  ) {
    this.cadastros$ = this.carregarTabela({ length: 0, pageIndex: 0, pageSize: 5 });
  }

  carregarTabela(
    pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 5 }
  ): Observable<PaginatorChamadoCompleto> {
    return (this.cadastros$ = this.tabelaService.carregarCadastros(
      pageEvent.pageIndex,
      pageEvent.pageSize
    ));
  }

  carregarNovaTabela() {
    console.log("Método carregarNovaTabela() chamado");
    this.tabelaService.carregarCadastros();
  }

  filterStatus(filtros: string[]) {
    this.cadastros$ = this.tabelaService.carregarFiltro(filtros);
    this.subscription2 = this.cadastros$.subscribe((paginator) => {
      this.totalRegistros = paginator.totalRegistros;
    });
  }

  abrirDialogForm() {
    const dialogRef = this.dialog.open(PossuiCadastroComponent, {
      maxWidth: "600px",
    });
    dialogRef.afterClosed().subscribe();
  }

  editarItem(item: ChamadoCompleto) {
    const id = item.id;
    const perfil = this.authService.getPerfilToken();
    const subscription = this.cadastroService.findById(id).subscribe((dados: ChamadoCompleto[]) => {
      if (perfil === "ADMIN") {
        const dialogRef = this.dialog.open(FormCadastroComponent, {
          maxWidth: "600px",
          data: { infoCadastro: dados },
        });
        dialogRef.afterClosed().subscribe((result) => {
          subscription.unsubscribe();
        });
      } else if (!(item.status === "DISPONIVEL_TRIAGEM")) {
        const dialogPermi = this.dialog.open(SemPermissaoComponent, {
          width: "40%",
          data: { modoEdicao: true, infoCadastro: dados },
        });
        dialogPermi.afterClosed().subscribe((result) => {
          subscription.unsubscribe();
        });
      } else {
        const dialogRef = this.dialog.open(FormCadastroComponent, {
          maxWidth: "600px",
          data: { infoCadastro: dados },
        });
        dialogRef.afterClosed().subscribe((result) => {
          subscription.unsubscribe();
        });
      }
    });
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
    this.subscription1 = this.tabelaService.emitListaAtualizada.subscribe(() => {
      this.carregarTabela();
    });

    this.subscription2 = this.cadastros$.subscribe((paginator) => {
      this.totalRegistros = paginator.totalRegistros;
    });
  }

  ngOnDestroy() {
    if (this.subscription1) {
      this.subscription1.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }
  // ngAfterViewInit(): void {
  // this.subscription = this.cadastros$.subscribe((paginator) => {
  //   this.totalRegistros = paginator.totalRegistros;
  // });
  // }
}
