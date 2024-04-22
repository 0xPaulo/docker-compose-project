import { FormCliente } from "./formCliente";
import { FormTecnico } from "./formTecnico";

export interface MostrarCadastro {
  clienteId: FormCliente;
  tecnico: FormTecnico;
  analiseTecnica: string;
  custoEstimado: number;
  dataEntrada: string;
  dataSaida: string;
  defeitoRelatado: string;
  id: number;
  image_urls: string;
  itemSerie: string;
  nomeItem: string;
  status: string;
}
