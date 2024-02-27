import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RepositoryService } from 'src/app/services/repository.service';
import { TabelaService } from 'src/app/services/tabela.service';

@Component({
  selector: 'app-form-cadastro',
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.scss'],
})
export class FormCadastroComponent implements OnInit {
  form: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private service: RepositoryService,
    private formBuilder: FormBuilder,
    private tabelaService: TabelaService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.isEditMode = true;
      this.form = formBuilder.group({
        name: [data.infoCadastro.name],
        defeito: [data.infoCadastro.defeito],
        email: [data.infoCadastro.email],
        item: [data.infoCadastro.item],
        data_entrada: [data.infoCadastro.dataEntrada],
        desc: [data.infoCadastro.desc],
        status: [data.infoCadastro.status],
      });
    } else {
      this.form = formBuilder.group({
        name: [null],
        defeito: [null],
        email: [null],
        item: [null],
        data_entrada: [null],
        desc: [null],
        status: [null],
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      const dataInicial = this.form.value.data_entrada;
      const dataFormatada = this.datePipe.transform(
        dataInicial,
        'yyyy-MM-ddTHH:mm:ss'
      );
      const dadosParaSalvar = {
        ...this.form.value,
        dataEntrada: dataFormatada,
      };

      const id_item: string = this.data.infoCadastro._id;
      this.service.update(id_item, dadosParaSalvar).subscribe(
        (result) => {
          this.tabelaService.emitListaAtualizada.emit();
          this.onSucess();
        },
        () => {
          this.onError();
        }
      );
    } else {
      this.service.save(this.form.value).subscribe(
        (result) => {
          this.tabelaService.emitListaAtualizada.emit();
          this.onSucess();
        },
        () => {
          this.onError();
        }
      );
    }
  }

  onError() {
    this.snackBar.open('Acorreu um erro', '', { duration: 5000 });
  }
  onSucess() {
    this.snackBar.open('Cadastrado com sucesso', '', { duration: 5000 });
  }
  onCancel() {}

  ngOnInit() {}
}
