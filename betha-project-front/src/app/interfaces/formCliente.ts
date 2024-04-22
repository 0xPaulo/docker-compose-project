export interface FormCliente {
  id?: string;
  clienteNome: string;
  clienteEndereco: string;
  clienteTelefone: string;
  clienteEmail: string;

  chamados?: [];
  imagem?: string;
  perfil?: string;
  nome?: string;
}
