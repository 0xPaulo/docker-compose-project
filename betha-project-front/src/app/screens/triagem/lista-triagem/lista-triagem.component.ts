import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { TabelaService } from "src/app/services/tabela.service";

import { MatSnackBar } from "@angular/material/snack-bar";
import { DetalheProdutoComponent } from "src/app/components/dialog/detalhe-produto/detalhe-produto.component";
import { EmailComponent } from "src/app/components/dialog/email/email/email.component";
import { ErrorDialogComponent } from "src/app/components/dialog/errors/error-dialog/error-dialog.component";
import { SemPermissaoComponent } from "src/app/components/dialog/errors/sem-permissao/sem-permissao.component";
import { ChamadoCompleto } from "src/app/interfaces/chamadoCompleto";
import { AuthService } from "src/app/services/auth.service";
import { CadastroService } from "src/app/services/cadastro.service";
import { FormTriagemComponent } from "../form-triagem/form-triagem.component";

@Component({
  selector: "lista-triagem",
  templateUrl: "./lista-triagem.component.html",
  styleUrls: ["./lista-triagem.component.scss"],
})
export class ListaTriagemComponent implements OnInit {
  cadastros$: Observable<ChamadoCompleto[]>;
  detalhesVisiveis: { [key: number]: boolean } = {};
  displayedColumns = ["id", "info", "ico"];
  filtro: string[] = ["DISPONIVEL_TRIAGEM", "AGUARDANDO_CLIENTE", "CANCELADO"];
  URL: string = "triagem";

  constructor(
    private authService: AuthService,
    private cadastroService: CadastroService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private tabelaService: TabelaService
  ) {
    this.cadastros$ = this.carregarTabelaTriagem(this.filtro);
  }

  carregarTabelaTriagem(filtro: string[]): Observable<ChamadoCompleto[]> {
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

  // abrirDialogForm() {
  //   const dialogRef = this.dialog.open(FormCadastroComponent, {
  //     maxWidth: "600px",
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {});
  // }
  openDialogEmail(dados: ChamadoCompleto) {
    this.dialog.open(EmailComponent, {
      width: "60%",
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
  editartriagem(item: ChamadoCompleto) {
    const id = item.id;

    const subscription = this.cadastroService
      .findById(id)
      .subscribe((dados: ChamadoCompleto[]) => {
        const perfil = this.authService.getPerfilToken();
        if (perfil === "ADMIN") {
          const dialogRef = this.dialog.open(FormTriagemComponent, {
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
          const dialogRef = this.dialog.open(FormTriagemComponent, {
            maxWidth: "600px",
            data: { infoCadastro: dados },
          });
          dialogRef.afterClosed().subscribe((result) => {
            subscription.unsubscribe();
          });
        }
      });
  }

  alternarDetalhes(index: number): void {
    this.detalhesVisiveis[index] = !this.detalhesVisiveis[index];
  }

  chamarCancelamento(element: Partial<ChamadoCompleto>) {
    const id = element.id;
    const elementAtualizado = { ...element, status: "CANCELADO" };
    this.cadastroService.mudarStatus(id, elementAtualizado).subscribe(
      (result) => {
        this.tabelaService.emitListaAtualizada.emit();
        this.onSucess();
      },
      () => {
        this.onError();
      }
    );
  }
  chamarManutencao(element: Partial<ChamadoCompleto>) {
    const id = element.id;
    const elementAtualizado = { ...element, status: "AGUARDANDO_MANUTENCAO" };
    this.cadastroService.mudarStatus(id, elementAtualizado).subscribe(
      (result) => {
        this.tabelaService.emitListaAtualizada.emit();
        this.onSucess();
      },
      () => {
        this.onError();
      }
    );
  }

  getStatusClass(status: string): string {
    return this.tabelaService.filterStatusClass(status);
  }

  onError() {
    this.snackBar.open("Ocorreu um erro", "", { duration: 5000 });
  }
  onSucess() {
    this.snackBar.open("Atualizado com sucesso", "", { duration: 5000 });
  }
  ngOnInit() {
    this.tabelaService.emitListaAtualizada.subscribe(() => {
      this.carregarTabelaTriagem(this.filtro);
    });
  }
}
