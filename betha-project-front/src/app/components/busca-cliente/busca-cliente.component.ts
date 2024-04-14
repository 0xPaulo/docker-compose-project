import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Output } from "@angular/core";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Observable, map, of, tap } from "rxjs";
import { ClienteService } from "src/app/services/cliente.service";

@Component({
  selector: "busca-cliente",
  template: `
    <mat-form-field class="col-md-12">
      <mat-label>Buscar cliente</mat-label>
      <input [(ngModel)]="nomeCliente" matInput [matAutocomplete]="auto" />

      <mat-autocomplete
        #auto="matAutocomplete"
        (optionSelected)="lidarClienteSelecionado($event)"
      >
        <mat-option *ngFor="let cliente of clientes$ | async" [value]="cliente">
          {{ cliente }}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
    <div class="erro-busca-cliente" *ngIf="mostrarMensagemErro">
      Cliente não encontrado.
    </div>
    <button class="botao-betha mb-4" (click)="buscarCliente()">Buscar</button>
  `,
  styleUrls: ["./busca-cliente.component.scss"],
})
export class BuscaClienteComponent {
  nomeCliente: string = "";
  clientes$: Observable<string[]>;
  mostrarMensagemErro: boolean = false;

  clienteCompleto!: any[];

  clienteSelecionadoRoot: any;
  @Output() clienteSelecionadoOut = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
    private clienteService: ClienteService
  ) {
    this.clientes$ = of([]);
  }

  buscarCliente() {
    this.clientes$ = this.clienteService
      .buscarNomeCliente(this.nomeCliente)
      .pipe(
        tap((resposta) => {
          this.mostrarMensagemErro = resposta.length === 0;
          this.clienteCompleto = resposta;
        }),
        map((resposta) => resposta.map((obj: any) => obj.nome))
      );
  }

  lidarClienteSelecionado(event: MatAutocompleteSelectedEvent) {
    let nomeClienteSelecionadoRoot = event.option.value;
    this.clienteCompleto.forEach((cliente) => {
      if (cliente.nome === nomeClienteSelecionadoRoot) {
        this.clienteSelecionadoRoot = cliente;
      }
    });
    if (this.clienteSelecionadoRoot) {
      this.clienteSelecionadoOut.emit(this.clienteSelecionadoRoot);
    } else {
      console.log(`${nomeClienteSelecionadoRoot} nao encontrado`);
    }
  }
}
