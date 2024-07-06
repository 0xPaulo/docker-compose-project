package com.betha.backend.cadastros.interfaces;

import java.util.List;

import com.betha.backend.cadastros.chamadoDTO.ChamadoCompletoDTO;
import com.betha.backend.cadastros.models.Chamado;

public interface ChamadoServiceInterface {
  Chamado salvarNovoChamado(Chamado novoChamado);

  List<ChamadoCompletoDTO> todosChamadosDo(String TecnicoID);

  List<ChamadoCompletoDTO> todosChamadosCom(List<String> filtro);

  ChamadoCompletoDTO buscarPeloId(Long id);

  Chamado editarCamposDoId(Long chamadoID, ChamadoCompletoDTO chamadoRecebido);

  Chamado finalizaStatusDoId(Long id, List<String> dados);
}
