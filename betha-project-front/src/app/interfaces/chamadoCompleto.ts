import { FormTecnico } from "./formTecnico";

export interface ChamadoCompleto {
  id: string;
  clienteNome: string;
  nomeItem: string;
  defeitoRelatado: string;
  status: string;
  itemSerie: string;
  analiseTecnica: string;
  custoEstimado: number;
  clienteEmail: string;
  dataEntrada: string;
  clienteEndereco: string;
  clienteTelefone: string;
  image_urls: string[];
  tecnico: FormTecnico;
  motivoNaoConclusao: string;
  dataSaida: string;
  // anotacao: string;
  // defeito: string;
}
