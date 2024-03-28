import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Observable, of } from "rxjs";
import { RepositoryService } from "src/app/services/repository.service";

@Component({
  selector: "busca-cliente",
  template: `
    <mat-form-field class="col-md-12">
      <mat-label>Buscar cliente</mat-label>
      <input [(ngModel)]="nomeCliente" matInput [matAutocomplete]="auto" />

      <mat-autocomplete #auto="matAutocomplete">
        <mat-option *ngFor="let cliente of clientes$ | async" [value]="cliente">
          {{ cliente }}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
    <button class="botao-betha" (click)="buscarCliente()">Buscar</button>
  `,
  styleUrls: ["./busca-cliente.component.scss"],
})
export class BuscaClienteComponent {
  nomeCliente: string = "";
  clientes$: Observable<string[]>;

  constructor(
    private http: HttpClient,
    private repositoryService: RepositoryService
  ) {
    this.clientes$ = of([]);
  }

  buscarCliente() {
    this.clientes$ = this.repositoryService.buscarNomeCliente(this.nomeCliente);
  }
}
