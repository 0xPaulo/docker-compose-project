import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { DetalheProdutoComponent } from "src/app/components/dialog/detalhe-produto/detalhe-produto.component";
import { EmailComponent } from "src/app/components/dialog/email/email.component";
import { ErrorDialogComponent } from "src/app/components/dialog/errors/error-dialog/error-dialog.component";
import { Cadastro } from "src/app/interfaces/cadastro";
import { RepositoryService } from "src/app/services/repository.service";
import { TabelaService } from "src/app/services/tabela.service";
import { FormCadastroComponent } from "../../cadastro/form-cadastro/form-cadastro.component";
import { FormManuTecComponent } from "../form-manu-tec/form-manu-tec.component";

@Component({
  selector: "lista-manu",
  templateUrl: "./lista-manu.component.html",
  styleUrls: ["./lista-manu.component.scss"],
})
export class ListaManuComponent implements OnInit {
  cadastros$: Observable<Cadastro[]>;
  detalhesVisiveis: { [key: number]: boolean } = {};
  displayedColumns = ["_id", "info", "ico"];
  filtro: string[] = ["AGUARDANDO_MANUTENCAO"];

  constructor(
    private snackBar: MatSnackBar,
    private repository: RepositoryService,
    private dialog: MatDialog,
    private tabelaService: TabelaService
  ) {
    this.cadastros$ = this.carregarTabelaTriagem(this.filtro);
  }

  carregarTabelaTriagem(filtro: string[]): Observable<Cadastro[]> {
    return (this.cadastros$ =
      this.tabelaService.carregarCadastrosTriagem(filtro));
  }

  carregarNovaTabela() {
    return (this.cadastros$ = this.tabelaService.carregarCadastros());
  }
  filterStatus(filtros: string[]) {
    this.cadastros$ = this.repository.carregarFiltro(filtros);
  }

  abrirDialogForm() {
    const dialogRef = this.dialog.open(FormCadastroComponent, {
      width: "80%",
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  openDialogEmail(dados: Cadastro) {
    this.dialog.open(EmailComponent, {
      width: "80%",
      data: { infoCadastro: dados },
    });
  }
  openDialogError() {
    this.dialog.open(ErrorDialogComponent);
  }
  openDialogDetalhe(dados: Cadastro) {
    this.dialog.open(DetalheProdutoComponent, {
      width: "80%",
      data: { infoCadastro: dados },
    });
  }
  addTecnico(item: Cadastro) {
    const id = item._id;

    const subscription = this.repository.findById(id).subscribe(
      (dados: Cadastro[]) => {
        // if (!(item.status === "DISPONIVEL_TRIAGEM")) {
        //   const dialogPermi = this.dialog.open(SemPermissaoComponent, {
        //     width: "40%",
        //     data: { modoEdicao: true, infoCadastro: dados },
        //   });
        //   dialogPermi.afterClosed().subscribe((result) => {
        //     subscription.unsubscribe();
        //   });
        // } else {
        const dialogRef = this.dialog.open(FormManuTecComponent, {
          width: "70%",
          // height: "516px",
          data: { modoEdicao: true, infoCadastro: dados },
        });
        dialogRef.afterClosed().subscribe((result) => {
          subscription.unsubscribe();
        });
      }
      // }
    );
  }
  alternarDetalhes(index: number): void {
    this.detalhesVisiveis[index] = !this.detalhesVisiveis[index];
  }

  chamarCancelamento(element: Partial<Cadastro>) {
    const id = element._id;
    const elementAtualizado = { ...element, status: "CANCELADO" };
    this.repository.mudarStatus(id, elementAtualizado).subscribe(
      (result) => {
        this.tabelaService.emitListaAtualizada.emit();
        this.onSucess();
      },
      () => {
        this.onError();
      }
    );
  }
  chamarManutencao(element: Partial<Cadastro>) {
    const id = element._id;
    const elementAtualizado = { ...element, status: "AGUARDANDO_MANUTENCAO" };
    this.repository.mudarStatus(id, elementAtualizado).subscribe(
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
    this.snackBar.open("Acorreu um erro", "", { duration: 5000 });
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
