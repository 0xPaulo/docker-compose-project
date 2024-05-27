import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CadastroService } from "src/app/services/cadastro.service";
import { TabelaService } from "src/app/services/tabela.service";

@Component({
  selector: "app-delete",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.scss"],
})
export class DeleteComponent {
  id_number = this.data.infoCadastro.id;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cadastroService: CadastroService,
    private tabelaService: TabelaService
  ) {}

  onDelete() {
    // const id_number = this.data.infoCadastro._id;
    const idString = String(this.id_number);
    this.cadastroService.delete(idString).subscribe(
      () => {
        this.tabelaService.emitListaAtualizada.emit();
      },
      (error) => {
        console.error("Nao deu certo", error);
      }
    );
  }
}
