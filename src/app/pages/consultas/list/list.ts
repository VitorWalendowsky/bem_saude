import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { RegistroStatusTag } from '../../../core/components/registro-status-tag/registro-status-tag';
import {
  ConsultasResponseModel,
  ConsultaStatus,
  ConsultaTipo
} from '../../../models/consultas.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule, // ✅ ESSENCIAL
    ButtonModule,
    SelectModule,
    FormsModule,
    DialogModule,
    TableModule,
    InputTextModule,
    InputMaskModule,
    DatePickerModule,
    TextareaModule,
    ReactiveFormsModule,
    RegistroStatusTag
  ],
  templateUrl: './list.html',
})
export class List {

  filtros = ['Todos', 'Agendadas', 'Finalizadas', 'Canceladas'];
  filtroSelecionado = 'Todos';
  pesquisa = '';
  visible = false;

  statusOpcoes: ConsultaStatus[] = [
    'Agendada',
    'Confirmada',
    'Em Atendimento',
    'Finalizada',
    'Cancelada'
  ];

  tipoOpcoes: ConsultaTipo[] = ['Presencial', 'Online'];

  private readonly fb = inject(FormBuilder);

  consultaForm = this.fb.group({
    paciente: ['', Validators.required],
    profissional: ['', Validators.required],
    data: ['', Validators.required],
    horario: ['', Validators.required],
    duracao: [30, Validators.required],
    tipo: ['Presencial', Validators.required],
    observacoes: ['']
  });

  consultas: ConsultasResponseModel[] = [
    {
      id: '1',
      horario: '08:00',
      data: '2024-01-26',
      paciente: 'Maria Silva',
      profissional: 'Dr. João Silva',
      tipo: 'Presencial',
      status: 'Confirmada'
    },
    {
      id: '2',
      horario: '09:00',
      data: '2024-01-26',
      paciente: 'João Santos',
      profissional: 'Dra. Maria Santos',
      tipo: 'Presencial',
      status: 'Agendada'
    },
    {
      id: '3',
      horario: '10:00',
      data: '2024-01-26',
      paciente: 'Ana Oliveira',
      profissional: 'Dr. João Silva',
      tipo: 'Online',
      status: 'Em Atendimento'
    },
    {
      id: '4',
      horario: '14:00',
      data: '2024-01-25',
      paciente: 'Fernanda Lima',
      profissional: 'Dra. Ana Lima',
      tipo: 'Presencial',
      status: 'Finalizada'
    },
    {
      id: '5',
      horario: '15:00',
      data: '2024-01-25',
      paciente: 'Maria Silva',
      profissional: 'Dr. João Silva',
      tipo: 'Presencial',
      status: 'Cancelada'
    }
  ];

  showDialog(): void {
    this.visible = true;
  }

  cancelar(): void {
    this.visible = false;
    this.consultaForm.reset({
      duracao: 30,
      tipo: 'Presencial'
    });
  }

  salvar(): void {
    if (this.consultaForm.invalid) return;

    console.log(this.consultaForm.value);
    this.cancelar();
  }
}
