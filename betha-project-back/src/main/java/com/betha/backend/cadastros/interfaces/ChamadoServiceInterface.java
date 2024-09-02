package com.betha.backend.cadastros.interfaces;

import java.util.List;

import com.betha.backend.cadastros.chamadoDTO.ChamadoCompletoDTO;
import com.betha.backend.cadastros.chamadoDTO.PaginatorChamadoCompleto;
import com.betha.backend.cadastros.models.Chamado;

public interface ChamadoServiceInterface {
  Chamado salvarNovoChamado(Chamado novoChamado);

  List<ChamadoCompletoDTO> todosChamadosDo(String TecnicoID);

  PaginatorChamadoCompleto todosChamadosCom(List<String> filtro, List<Integer> pageConfig);

  ChamadoCompletoDTO buscarPeloId(Long id);

  Chamado editarCamposDoId(Long chamadoID, ChamadoCompletoDTO chamadoRecebido);

  Chamado finalizaStatusDoId(Long id, List<String> dados);
}
