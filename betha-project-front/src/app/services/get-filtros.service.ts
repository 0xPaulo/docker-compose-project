import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GetFiltrosService {
  private _filtros = new BehaviorSubject<string>("");
  filtros$ = this._filtros.asObservable();

  constructor() {}

  hasFilter(): boolean {
    return this._filtros.getValue().length > 0;
  }

  getFiltros(): string {
    return this._filtros.getValue();
  }

  setFiltros(filtro: string): void {
    this._filtros.next(filtro);
  }

  clearFiltro(): void {
    this._filtros.next("");
  }
}
