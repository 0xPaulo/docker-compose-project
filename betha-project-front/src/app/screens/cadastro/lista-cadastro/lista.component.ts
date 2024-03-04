import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { Cadastro } from "src/app/interfaces/cadastro";
import { RepositoryService } from "src/app/services/repository.service";
import { TabelaService } from "src/app/services/tabela.service";

import { FormCadastroComponent } from "src/app/screens/cadastro/form-cadastro/form-cadastro.component";
import { DeleteComponent } from "../../../components/delete/delete.component";
import { ErrorDialogComponent } from "../../../components/errors/error-dialog/error-dialog.component";
import { SemPermissaoComponent } from "../../../components/errors/sem-permissao/sem-permissao.component";

@Component({
  selector: "lista-cadastro",
  templateUrl: "./lista.component.html",
  styleUrls: ["./lista.component.scss"],
})
export class ListaComponent implements OnInit {
  cadastros$: Observable<Cadastro[]>;
  detalhesVisiveis: { [key: number]: boolean } = {};
  displayedColumns = ["_id", "info", "ico"];

  constructor(
    private repository: RepositoryService,
    private dialog: MatDialog,
    private tabelaService: TabelaService
  ) {
    this.cadastros$ = this.carregarTabela();
  }

  carregarTabela(): Observable<Cadastro[]> {
    return (this.cadastros$ = this.tabelaService.carregarCadastros());
  }

  carregarNovaTabela() {
    this.tabelaService.carregarCadastros();
  }
  filterStatus(filtros: string[]) {
    this.cadastros$ = this.repository.carregarTriagem(filtros);
  }

  abrirDialogForm() {
    const dialogRef = this.dialog.open(FormCadastroComponent, {
      width: "80%",
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  openDialogError() {
    this.dialog.open(ErrorDialogComponent);
  }
  alternarDetalhes(index: number): void {
    this.detalhesVisiveis[index] = !this.detalhesVisiveis[index];
  }

  editarItem(item: Cadastro) {
    const id = item._id;

    const subscription = this.repository
      .findById(id)
      .subscribe((dados: Cadastro[]) => {
        if (!(item.status === "DISPONIVEL_TRIAGEM")) {
          const dialogPermi = this.dialog.open(SemPermissaoComponent, {
            width: "40%",
            data: { modoEdicao: true, infoCadastro: dados },
          });
          dialogPermi.afterClosed().subscribe((result) => {
            subscription.unsubscribe();
          });
        } else {
          const dialogRef = this.dialog.open(FormCadastroComponent, {
            width: "80%",
            data: { modoEdicao: true, infoCadastro: dados },
          });
          dialogRef.afterClosed().subscribe((result) => {
            subscription.unsubscribe();
          });
        }
      });
  }
  openDialogDeletar(item: Cadastro) {
    this.dialog.open(DeleteComponent, {
      width: "400px",
      data: { item: item },
    });
  }

  ngOnInit() {
    this.tabelaService.emitListaAtualizada.subscribe(() => {
      this.carregarTabela();
    });
  }
}
