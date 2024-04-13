package com.betha.backend.cadastros.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.betha.backend.cadastros.chamadoDTO.ChamadoCompletoDTO;
import com.betha.backend.cadastros.models.Chamado;
import com.betha.backend.cadastros.models.Cliente;
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

  public List<ChamadoCompletoDTO> todosChamados() {
    List<Chamado> chamados = chamadoRepository.findAll();
    List<ChamadoCompletoDTO> chamadoCompletoDTO = new ArrayList<>();
    for (Chamado chamado : chamados) {

      Cliente cliente = chamado.getClienteId();

      ChamadoCompletoDTO dto = new ChamadoCompletoDTO();
      dto.setClienteId(cliente.getId());
      dto.setClienteNome(cliente.getNome());
      dto.setClienteEmail(cliente.getEmail());
      dto.setClienteTelefone(cliente.getTelefone());
      dto.setClienteEndereco(cliente.getEndereco());

      dto.setId(chamado.getId());
      dto.setNomeItem(chamado.getNomeItem());
      dto.setItemSerie(chamado.getItemSerie());
      dto.setDefeitoRelatado(chamado.getDefeitoRelatado());
      dto.setAnaliseTecnica(chamado.getAnaliseTecnica());
      dto.setCustoEstimado(chamado.getCustoEstimado());
      dto.setDataEntrada(chamado.getDataEntrada());
      dto.setStatus(chamado.getStatus());

      chamadoCompletoDTO.add(dto);
    }
    return chamadoCompletoDTO;
  }

  public ChamadoCompletoDTO buscarPeloId(Long id) {
    Chamado chamado = chamadoRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Chamado não encontrado"));
    Cliente cliente = chamado.getClienteId();
    ChamadoCompletoDTO dto = new ChamadoCompletoDTO();

    dto.setClienteId(cliente.getId());
    dto.setClienteNome(cliente.getNome());
    dto.setClienteEmail(cliente.getEmail());
    dto.setClienteTelefone(cliente.getTelefone());
    dto.setClienteEndereco(cliente.getEndereco());

    dto.setId(chamado.getId());
    dto.setNomeItem(chamado.getNomeItem());
    dto.setItemSerie(chamado.getItemSerie());
    dto.setDefeitoRelatado(chamado.getDefeitoRelatado());
    dto.setAnaliseTecnica(chamado.getAnaliseTecnica());
    dto.setCustoEstimado(chamado.getCustoEstimado());
    dto.setDataEntrada(chamado.getDataEntrada());
    dto.setStatus(chamado.getStatus());
    return dto;
  }
}
