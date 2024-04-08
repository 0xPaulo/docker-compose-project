package com.betha.backend.cadastros.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.betha.backend.cadastros.models.Chamado;
import com.betha.backend.cadastros.repository.ChamadoRepository;

@Service
public class ChamadoService {
  @Autowired
  private ChamadoRepository chamadoRepository;

  public Chamado salvarChamadoBanco(Chamado novoChamado) {
    Chamado chamadoTemp = Chamado.builder()
        .clienteId(novoChamado.getClienteId())
        .nomeItem(novoChamado.getNomeItem())
        .itemSerie(novoChamado.getItemSerie())
        .defeitoRelatado(novoChamado.getDefeitoRelatado())
        .status(novoChamado.getStatus())
        .dataEntrada(novoChamado.getDataEntrada())
        .analiseTecnica(novoChamado.getAnaliseTecnica())
        .dataSaida(novoChamado.getDataSaida())
        .custoEstimado(novoChamado.getCustoEstimado())
        .image_urls(novoChamado.getImage_urls())
        .build();

    return chamadoRepository.save(chamadoTemp);

  }
}
