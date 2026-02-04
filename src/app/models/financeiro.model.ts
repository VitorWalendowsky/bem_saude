export type FaturaStatus = 'PAGA' | 'PENDENTE' | 'CANCELADA';

export interface FinanceiroResponseModel {
  id: number;
  paciente: string;
  data: string;
  valor: number;
  status: FaturaStatus;
}

export interface FinanceiroCriarRequestModel {
  paciente: string;
  data: string;
  valor: number;
  status: FaturaStatus;
}

export interface FinanceiroEditarRequestModel {
  paciente: string;
  data: string;
  valor: number;
  status: FaturaStatus;
}

export interface FinanceiroPesquisaResponseModel {
  id: number;
  paciente: string;
  data: string;
  valor: number;
  status: FaturaStatus;
}
