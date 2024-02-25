import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RepositoryService } from 'src/app/services/repository.service';
import { TabelaService } from 'src/app/services/tabela.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private repository: RepositoryService,
    private tabelaService: TabelaService
  ) {}

  onDelete() {
    const id_number = this.data.item._id;
    const idString = String(id_number);
    this.repository.delete(idString).subscribe(
      () => {
        console.log('deu certo');
        this.tabelaService.emitListaAtualizada.emit();
      },
      (error) => {
        console.error('Nao deu certo', error);
      }
    );
  }
}
