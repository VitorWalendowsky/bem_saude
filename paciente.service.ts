import { inject, Injectable, ɵcontrolUpdate } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroments';
import { PacientesResponseModel, PacienteCriarRequestModel, PacienteEditarRequestModel, PacientePesquisaResponseModel } from '../models/paciente.model';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private httpClient = inject(HttpClient);

  getAll(): Observable<PacientesResponseModel[]> {
    const url = `${environment.apiUrl}/pacientes`;
    return this.httpClient.get<PacientesResponseModel[]>(url);
  }

create(form: PacienteCriarRequestModel): Observable<PacientesResponseModel> {
    const url = `${environment.apiUrl}/pacientes`;
    return this.httpClient.post<PacientesResponseModel>(url, form);
  }

update(id:string, form: PacienteEditarRequestModel): Observable<PacientesResponseModel> {
    const url = `${environment.apiUrl}/pacientes/${id}`;
    return this.httpClient.put<PacientesResponseModel>(url, form);
  }

getById(id: string): Observable<PacientePesquisaResponseModel> {
    const url = `${environment.apiUrl}/pacientes/${id}`;
    return this.httpClient.get<PacientePesquisaResponseModel>(url);
  }

delete(id: string): Observable<void> {
    const url = `${environment.apiUrl}/pacientes/${id}`;
    return this.httpClient.delete<void>(url);
  }

}
