import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, first, tap } from 'rxjs';
import { Cadastro } from './../interfaces/cadastro';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  // private readonly API = '../../assets/cadastros.json';
  // private readonly API = 'https://betha-v2.onrender.com/api/lista';
  private readonly API = 'http://localhost:8080/api/lista';
  private readonly APIFILTER = 'http://localhost:8080/api/filtrar';

  constructor(private httpClient: HttpClient) {}

  listarTodos() {
    return this.httpClient.get<Cadastro[]>(this.API).pipe(delay(500), first());
  }

  carregarTriagem(filtros: string[]): Observable<Cadastro[]> {
    const filtroString = filtros.join(',');
    const params = new HttpParams().set('filter', filtroString);
    return this.httpClient
      .get<Cadastro[]>(`${this.APIFILTER}`, { params })
      .pipe(delay(500));
  }

  save(chamado: Partial<Cadastro>) {
    return this.httpClient
      .post<Cadastro>(this.API, chamado)
      .pipe(tap(() => {}));
  }

  update(id: string, chamado: Partial<Cadastro>) {
    return this.httpClient.put<Cadastro>(`${this.API}/${id}`, chamado);
  }

  delete(id: string) {
    return this.httpClient.delete<Cadastro>(`${this.API}/${id}`);
  }

  findById(id: string): Observable<Cadastro[]> {
    const url = `${this.API}/${id}`;

    return this.httpClient.get<Cadastro[]>(url).pipe(
      catchError((error) => {
        console.debug(`Aconteceu esse erro ao buscar id (${id}):  ${error}`);
        throw error;
      })
    );
  }
}
