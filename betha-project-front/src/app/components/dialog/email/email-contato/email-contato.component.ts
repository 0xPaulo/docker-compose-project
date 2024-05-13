import { DatePipe } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CadastroService } from "src/app/services/cadastro.service";
import { RepositoryService } from "src/app/services/repository.service";
import { TabelaService } from "src/app/services/tabela.service";

@Component({
  selector: "app-email-contato",
  templateUrl: "./email-contato.component.html",
  styleUrls: ["./email-contato.component.scss"],
})
export class EmailContatoComponent {
  form: FormGroup;
  dia: string = "";

  constructor(
    private cadastroService: CadastroService,
    private datePipe: DatePipe,
    private tabelaService: TabelaService,
    private repository: RepositoryService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = formBuilder.group({
      clienteNome: [data.infoCadastro.clienteNome],
      clienteEndereco: [data.infoCadastro.clienteEndereco],
      clienteTelefone: [data.infoCadastro.clienteTelefone],
      clienteEmail: [data.infoCadastro.clienteEmail],
      nomeItem: [data.infoCadastro.nomeItem],
      itemSerie: [data.infoCadastro.itemSerie],
      status: [data.infoCadastro.status],
      defeitoRelatado: [data.infoCadastro.defeitoRelatado],
      image_urls: [data.infoCadastro.image_urls],
      analiseTecnica: [data.infoCadastro.analiseTecnica],
      custoEstimado: [data.infoCadastro.custoEstimado],
      dataEntrada: [data.infoCadastro.dataEntrada],
    });
  }
  handleSendEmail() {
    const id = this.data.infoCadastro.id;
    this.form.patchValue({ status: "AGUARDANDO_CLIENTE" });

    const dadosAtualizados = { ...this.form.value };
    this.cadastroService.mudarStatus(id, dadosAtualizados).subscribe(
      (result) => {
        this.tabelaService.emitListaAtualizada.emit();
        this.onSucess();
      },
      () => {
        this.onError();
      }
    );
  }
  onError() {
    this.snackBar.open("Ocorreu um erro", "", { duration: 5000 });
  }
  onSucess() {
    this.snackBar.open("Atualizado com sucesso", "", { duration: 5000 });
  }
}
