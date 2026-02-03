import { inject, Injectable, ɵcontrolUpdate } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroments';
import { ConsultasCriarRequestModel, ConsultasEditarRequestModel, ConsultasPesquisaResponseModel, ConsultasResponseModel } from '../models/consultas.model';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
  private httpClient = inject(HttpClient);

  getAll(): Observable<ConsultasResponseModel[]> {
    const url = `${environment.apiUrl}/consultas`;
    return this.httpClient.get<ConsultasResponseModel[]>(url);
  }

create(form: ConsultasCriarRequestModel): Observable<ConsultasResponseModel> {
    const url = `${environment.apiUrl}/consultas`;
    return this.httpClient.post<ConsultasResponseModel>(url, form);
  }

update(id:string, form: ConsultasEditarRequestModel): Observable<ConsultasResponseModel> {
    const url = `${environment.apiUrl}/consultas/${id}`;
    return this.httpClient.put<ConsultasResponseModel>(url, form);
  }

getById(id: string): Observable<ConsultasPesquisaResponseModel> {
    const url = `${environment.apiUrl}/consultas/${id}`;
    return this.httpClient.get<ConsultasPesquisaResponseModel>(url);
  }

delete(id: string): Observable<void> {
    const url = `${environment.apiUrl}/consultas/${id}`;
    return this.httpClient.delete<void>(url);
  }

}
