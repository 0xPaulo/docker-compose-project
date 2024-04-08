export interface FormCliente {
  id?: string;
  nome: string;
  endereco: string;
  telefone: string;
  email: string;

  chamados?: [];
  imagem?: string;
  perfil?: string;
}
