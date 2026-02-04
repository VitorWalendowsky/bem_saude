import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FaturaStatus, FinanceiroResponseModel, FinanceiroEditarRequestModel, FinanceiroCriarRequestModel } from '../../../models/financeiro.model';
import { FinanceiroService } from '../../../services/financeiro.service';

type StatusFiltroUi = 'Todos' | FaturaStatus;

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    SelectModule,
    TableModule,
    InputTextModule,
    DialogModule
  ],
  templateUrl: './list.html',
})
export class List {

  private readonly financeiroService = inject(FinanceiroService);
  private readonly fb = inject(FormBuilder);

  pesquisa = '';
  filtroSelecionado: StatusFiltroUi = 'Todos';
  filtros: StatusFiltroUi[] = ['Todos', 'PAGA', 'PENDENTE', 'CANCELADA'];

  visible = false;
  editando = false;
  faturaIdEditando: number | null = null;

  faturas: FinanceiroResponseModel[] = [];

  faturaForm = this.fb.group({
    paciente: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    data: ['', [Validators.required]],
    valor: [null as unknown as number, [Validators.required]],
    status: ['PENDENTE' as FaturaStatus, [Validators.required]],
  });

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.faturas = this.financeiroService.consultar();
  }

  get faturasFiltradas(): FinanceiroResponseModel[] {
    const termo = this.pesquisa.trim().toLowerCase();

    return this.faturas.filter((f) => {
      const matchPesquisa =
        !termo ||
        f.paciente.toLowerCase().includes(termo) ||
        String(f.id).includes(termo);

      const matchStatus =
        this.filtroSelecionado === 'Todos' || f.status === this.filtroSelecionado;

      return matchPesquisa && matchStatus;
    });
  }

  // Cards (seguindo o print)
  get totalEmAberto(): number {
    return this.faturas
      .filter((f) => f.status === 'PENDENTE')
      .reduce((acc, f) => acc + f.valor, 0);
  }

  get recebidoHoje(): number {
    if (!this.faturas.length) return 0;
    const maxData = this.faturas.reduce((max, f) => (f.data > max ? f.data : max), '0000-00-00');
    return this.faturas
      .filter((f) => f.status === 'PAGA' && f.data === maxData)
      .reduce((acc, f) => acc + f.valor, 0);
  }

  get totalDoMes(): number {
    return this.faturas.reduce((acc, f) => acc + f.valor, 0);
  }

  novaFatura(): void {
    this.editando = false;
    this.faturaIdEditando = null;
    this.faturaForm.reset({ status: 'PENDENTE' });
    this.visible = true;
  }

  editarFatura(f: FinanceiroResponseModel): void {
    this.editando = true;
    this.faturaIdEditando = f.id;
    this.faturaForm.patchValue({
      paciente: f.paciente,
      data: f.data,
      valor: f.valor,
      status: f.status
    });
    this.visible = true;
  }

  excluirFatura(id: number): void {
    this.financeiroService.excluir(id);
    this.carregar();
  }

  cancelar(): void {
    this.visible = false;
    this.faturaForm.reset({ status: 'PENDENTE' });
  }

  salvar(): void {
    if (this.faturaForm.invalid) return;

    const payload = this.faturaForm.getRawValue();

    if (this.editando && this.faturaIdEditando != null) {
      const editarPayload: FinanceiroEditarRequestModel = {
        paciente: payload.paciente!,
        data: payload.data!,
        valor: Number(payload.valor),
        status: payload.status as FaturaStatus
      };
      this.financeiroService.editar(this.faturaIdEditando, editarPayload);
    } else {
      const criarPayload: FinanceiroCriarRequestModel = {
        paciente: payload.paciente!,
        data: payload.data!,
        valor: Number(payload.valor),
        status: payload.status as FaturaStatus
      };
      this.financeiroService.criar(criarPayload);
    }

    this.cancelar();
    this.carregar();
  }

  statusLabel(status: FaturaStatus): string {
    if (status === 'PAGA') return 'Paga';
    if (status === 'PENDENTE') return 'Em Aberto';
    return 'Cancelada';
  }

  formatBRL(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
