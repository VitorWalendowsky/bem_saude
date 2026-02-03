export interface ConsultasResponseModel {
    id: string;
    nome: string;
    cpf: string;
    telefone: string;
    status: boolean;
} 


export interface ConsultasCriarRequestModel {
    nome: string;
    cpf: string;
    telefone: string;
    endereco: string;
    email: string;
    data_nascimento: string;
    observacoes: string;
}

export interface ConsultasEditarRequestModel {
    nome: string;
    telefone: string;
    endereco: string;
    email: string;
    observacoes: string;
}

export interface ConsultasPesquisaResponseModel {
    id: string;
    nome: string;
    cpf: string;
    telefone: string;
    endereco: string;
    email: string;
    data_nascimento: string;
    observacoes: string;
    status: boolean;
}