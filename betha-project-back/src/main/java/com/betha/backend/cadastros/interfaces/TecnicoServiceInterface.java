package com.betha.backend.cadastros.interfaces;

import com.betha.backend.cadastros.chamadoDTO.RegisterDTO;
import com.betha.backend.cadastros.models.Chamado;
import com.betha.backend.cadastros.models.Tecnico;

public interface TecnicoServiceInterface {
  public Chamado editarTecnicoDoChamado(Long chamadoId, Long tecnicoId);

  public Tecnico salvarNovoTecnico(RegisterDTO tecnicoDados);

  public void trocarSenhaDoTecnico(RegisterDTO dados);
}
