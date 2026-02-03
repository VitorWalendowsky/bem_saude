import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { RegistroStatusTag } from '../../../core/components/registro-status-tag/registro-status-tag';
import { AutoFocusModule } from 'primeng/autofocus';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ConsultasResponseModel} from '../../../models/consultas.model';
import { InputMaskModule } from "primeng/inputmask";
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from "primeng/textarea";

export type ConsultaStatus =
  | 'Agendada'
  | 'Atrasada'
  | 'Confirmada'
  | 'Cancelada'
  | 'Em Andamento'
  | 'Finalizada';

export interface ConsultaResponseModel {
  paciente: string;
  profissional: string;
  status: ConsultaStatus;
  data: string; // ISO: YYYY-MM-DD
  horarioPrevisto: string; // HH:mm
}

@Component({
  selector: 'app-list',
  imports: [
    ButtonModule,
    SelectModule,
    FormsModule,
    AutoFocusModule,
    DialogModule,
    TableModule,
    InputTextModule,
    InputMaskModule,
    DatePickerModule,
    TextareaModule,
    ReactiveFormsModule
],
  templateUrl: './list.html',
})


export class List {
  filtros = ["Todos", "Ativos", "Inativos"];

  filtroSelecionado: string = "Todos";

  pesquisa: string = "";

  visible: boolean = false;

  private readonly formBuilder = inject(FormBuilder);

  pacienteForm = this.formBuilder.group({
    paciente: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    profissional: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    status: [null, [Validators.required]],
    ddata: ["", [Validators.required, Validators.maxLength(10)]],
    horarioPrevisto: [null, [Validators.required, Validators.maxLength(5)]],
  });

  statusOpcoes: ConsultaStatus[] = [
  'Agendada',
  'Atrasada',
  'Confirmada',
  'Cancelada',
  'Em Andamento',
  'Finalizada'
];


  // consultas.mock.ts

consultas: ConsultaResponseModel [] = [
  {
    paciente: 'Maria Silva',
    profissional: 'Dra. Ana Souza',
    status: 'Agendada',
    data: '2026-02-03',
    horarioPrevisto: '08:00'
  },
  {
    paciente: 'João Pereira',
    profissional: 'Dr. Carlos Lima',
    status: 'Confirmada',
    data: '2026-02-03',
    horarioPrevisto: '08:30'
  },
  {
    paciente: 'Fernanda Costa',
    profissional: 'Dra. Juliana Martins',
    status: 'Atrasada',
    data: '2026-02-03',
    horarioPrevisto: '09:00'
  },
  {
    paciente: 'Rafael Almeida',
    profissional: 'Dr. Bruno Rocha',
    status: 'Em Andamento',
    data: '2026-02-03',
    horarioPrevisto: '09:30'
  },
  {
    paciente: 'Camila Santos',
    profissional: 'Dra. Ana Souza',
    status: 'Finalizada',
    data: '2026-02-03',
    horarioPrevisto: '10:00'
  },
  {
    paciente: 'Diego Fernandes',
    profissional: 'Dr. Carlos Lima',
    status: 'Cancelada',
    data: '2026-02-04',
    horarioPrevisto: '08:00'
  },
  {
    paciente: 'Patrícia Oliveira',
    profissional: 'Dra. Juliana Martins',
    status: 'Agendada',
    data: '2026-02-04',
    horarioPrevisto: '08:30'
  },
  {
    paciente: 'Lucas Ribeiro',
    profissional: 'Dr. Bruno Rocha',
    status: 'Confirmada',
    data: '2026-02-04',
    horarioPrevisto: '09:00'
  },
  {
    paciente: 'Aline Barbosa',
    profissional: 'Dra. Ana Souza',
    status: 'Finalizada',
    data: '2026-02-04',
    horarioPrevisto: '09:30'
  },
  {
    paciente: 'Gustavo Nunes',
    profissional: 'Dr. Carlos Lima',
    status: 'Em Andamento',
    data: '2026-02-05',
    horarioPrevisto: '10:00'
  },
  {
    paciente: 'Bruna Carvalho',
    profissional: 'Dra. Juliana Martins',
    status: 'Atrasada',
    data: '2026-02-05',
    horarioPrevisto: '10:30'
  },
  {
    paciente: 'Eduardo Souza',
    profissional: 'Dr. Bruno Rocha',
    status: 'Agendada',
    data: '2026-02-06',
    horarioPrevisto: '08:00'
  }
];

showDialog(): void {
    this.visible = true;
  }


cancelar(){
  this.visible = false;
  this.pacienteForm.reset();
}

salvar(){
}
}