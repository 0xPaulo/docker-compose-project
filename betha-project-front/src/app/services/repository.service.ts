import { HttpClient } from '@angular/common/http';
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

  constructor(private httpClient: HttpClient) {}

  listarTodos() {
    return this.httpClient.get<Cadastro[]>(this.API).pipe(
      delay(500),
      first() // finalizar a inscriçao
    );
  }

  save(chamado: Partial<Cadastro>) {
    return this.httpClient.post<Cadastro>(this.API, chamado).pipe(
      tap(() => {
        // console.log(`(save) url: ${this.API}`);
      })
    );
  }

  update(id: string, chamado: Partial<Cadastro>) {
    console.log('dentro do update : ' + chamado.email);
    console.log('dentro do update : ' + chamado.name);

    return this.httpClient.put<Cadastro>(`${this.API}/${id}`, chamado).pipe(
      tap(() => {
        console.log(
          `(edit) id: ${id} url ${this.API}/${id} chamadoEmail: ${chamado.email} e chamadoName ${chamado.name}`
        );
      })
    );
  }

  delete(id: string) {
    // console.log(`cheguei esse é a minha url  ${this.API}/${id}`);
    return this.httpClient.delete<Cadastro>(`${this.API}/${id}`);
  }

  findById(id: string): Observable<Cadastro[]> {
    const url = `${this.API}/${id}`;
    // console.log(`url da requisiçao do id (${id}): ${url}`);

    return this.httpClient.get<Cadastro[]>(url).pipe(
      catchError((error) => {
        console.log(`Aconteceu esse erro ao buscar id (${id}):  ${error}`);
        throw error;
      })
    );
  }
}
