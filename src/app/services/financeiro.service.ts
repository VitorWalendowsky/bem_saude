import { Injectable } from '@angular/core';
import {
  FinanceiroResponseModel,
  FinanceiroCriarRequestModel,
  FinanceiroEditarRequestModel,
  FinanceiroPesquisaResponseModel,
} from '../models/financeiro.model';

@Injectable({ providedIn: 'root' })
export class FinanceiroService {

  private faturamento: FinanceiroResponseModel[] = [
    { id: 1, paciente: 'João da Silva', data: '2025-01-10', valor: 250.75, status: 'PAGA' },
    { id: 2, paciente: 'Maria Oliveira', data: '2025-01-12', valor: 180.00, status: 'PENDENTE' },
    { id: 3, paciente: 'Carlos Santos', data: '2025-01-15', valor: 320.40, status: 'CANCELADA' },
    { id: 4, paciente: 'Ana Pereira', data: '2025-01-18', valor: 95.90, status: 'PAGA' },
    { id: 5, paciente: 'Fernanda Costa', data: '2025-01-20', valor: 410.00, status: 'PENDENTE' },
  ];

  consultar(): FinanceiroResponseModel[] {
    return [...this.faturamento];
  }

  pesquisar(id: number): FinanceiroPesquisaResponseModel | null {
    const f = this.faturamento.find(x => x.id === id);
    if (!f) return null;
    return { ...f };
  }

  criar(payload: FinanceiroCriarRequestModel): FinanceiroResponseModel {
    const novoId = this.faturamento.length ? Math.max(...this.faturamento.map(x => x.id)) + 1 : 1;

    const novo: FinanceiroResponseModel = {
      id: novoId,
      paciente: payload.paciente,
      data: payload.data,
      valor: payload.valor,
      status: payload.status
    };

    this.faturamento = [novo, ...this.faturamento];
    return novo;
  }

  editar(id: number, payload: FinanceiroEditarRequestModel): FinanceiroResponseModel | null {
    const idx = this.faturamento.findIndex(x => x.id === id);
    if (idx < 0) return null;

    const atualizado: FinanceiroResponseModel = {
      id,
      paciente: payload.paciente,
      data: payload.data,
      valor: payload.valor,
      status: payload.status
    };

    const clone = [...this.faturamento];
    clone[idx] = atualizado;
    this.faturamento = clone;

    return atualizado;
  }

  excluir(id: number): void {
    this.faturamento = this.faturamento.filter(x => x.id !== id);
  }
}
