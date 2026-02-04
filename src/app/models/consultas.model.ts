export type ConsultaStatus =
  | 'Agendada'
  | 'Confirmada'
  | 'Em Atendimento'
  | 'Finalizada'
  | 'Cancelada';

export type ConsultaTipo =
  | 'Presencial'
  | 'Online';

export interface ConsultasResponseModel {
  id: string;
  horario: string;          // HH:mm
  data: string;             // YYYY-MM-DD
  paciente: string;
  profissional: string;
  tipo: ConsultaTipo;
  status: ConsultaStatus;
}

export interface ConsultaCriarRequestModel {
  pacienteId: string;
  profissionalId: string;
  data: string;
  horario: string;
  duracao: number;
  tipo: ConsultaTipo;
  observacoes?: string;
}

export interface ConsultaEditarRequestModel {
  data: string;
  horario: string;
  duracao: number;
  tipo: ConsultaTipo;
  status: ConsultaStatus;
  observacoes?: string;
}

export interface ConsultaPesquisaResponseModel {
  id: string;
  horario: string;
  data: string;
  paciente: string;
  profissional: string;
  tipo: ConsultaTipo;
  status: ConsultaStatus;
}
