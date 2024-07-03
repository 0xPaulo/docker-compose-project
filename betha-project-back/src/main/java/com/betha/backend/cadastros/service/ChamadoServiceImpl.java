package com.betha.backend.cadastros.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.betha.backend.cadastros.chamadoDTO.ChamadoCompletoDTO;
import com.betha.backend.cadastros.interfaces.ChamadoServiceInterface;
import com.betha.backend.cadastros.models.Chamado;
import com.betha.backend.cadastros.models.Cliente;
import com.betha.backend.cadastros.models.Tecnico;
import com.betha.backend.cadastros.models.Enums.Status;
import com.betha.backend.cadastros.repository.ChamadoRepository;
import com.betha.backend.cadastros.repository.ClienteRepository;
import com.betha.backend.cadastros.repository.TabelaRepository;

@Service
public class ChamadoServiceImpl implements ChamadoServiceInterface {
  @Autowired
  private ChamadoRepository chamadoRepository;
  @Autowired
  private ClienteRepository clienteRepository;
  @Autowired
  private TabelaRepository tabelaRepository;

  @Override
  public Chamado salvarNovoChamado(Chamado novoChamado) {
    Chamado chamadoTemp = construirNovoChamado(novoChamado);
    return chamadoRepository.save(chamadoTemp);
  }

  @Override
  public List<ChamadoCompletoDTO> todosChamadosDo(String TecnicoID) {
    List<Chamado> chamados = new ArrayList<>();
    chamados = this.chamadoRepository.buscarChamadosDo(TecnicoID);
    if (chamados.isEmpty()) {
      throw new NoSuchElementException("Não foi encontrado chamados para esse tecnico");
    }
    return processarChamadoToDTO(chamados);
  }

  @Override
  public List<ChamadoCompletoDTO> todosChamadosCom(List<String> filtro) {
    List<Chamado> chamados = new ArrayList<>();
    if (filtro != null && !filtro.isEmpty()) {
      chamados = tabelaRepository.findByStatusInFilter(filtro);
    } else {
      chamados = chamadoRepository.findAll();
    }
    return processarChamadoToDTO(chamados);
  }

  @Override
  public ChamadoCompletoDTO buscarPeloId(Long id) {
    Chamado chamado = chamadoRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Chamado não encontrado"));
    return construirDTO(chamado);
  }

  @Override
  public Chamado editarCamposDoId(Long chamadoID, ChamadoCompletoDTO chamadoRecebido) {
    Chamado chamadoExistente = chamadoRepository.findById(chamadoID)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Chamado não encontrado"));
    Cliente clienteExistente = chamadoExistente.getClienteId();
    return editarChamadoExistente(chamadoRecebido, chamadoExistente, clienteExistente);
  }

  @Override
  public Chamado editarStatusDoId(Long id, List<String> dados) {
    Chamado chamadoExistente = chamadoRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Chamado não encontrado"));

    Status statusEncontrado = null;
    for (Status s : Status.values()) {
      if (s.getDescricao().equals(dados.get(0))) {
        statusEncontrado = s;
        break;
      }
    }

    if (statusEncontrado == null) {
      throw new IllegalArgumentException("Status não reconhecido: " + dados.get(0));
    } else if (statusEncontrado.toString() == "CONCLUIDO_CONSERTADO") {
      chamadoExistente.setDataSaida(LocalDateTime.now());
    }

    chamadoExistente.setStatus(statusEncontrado);
    if (dados.size() >= 2) {
      chamadoExistente.setMotivoNaoConclusao(dados.get(1));
    }
    chamadoRepository.save(chamadoExistente);

    return chamadoExistente;
  }

  private List<ChamadoCompletoDTO> processarChamadoToDTO(List<Chamado> chamados) {
    if (chamados.get(0).getClienteId() == null) {
      throw new NoSuchElementException("Aconteceu algum erro ao buscar o chamado");
    }
    List<ChamadoCompletoDTO> chamadoCompletoDTOs = new ArrayList<>();
    for (Chamado chamado : chamados) {
      Cliente cliente = chamado.getClienteId();
      Tecnico tecnico = chamado.getTecnico();
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
      if (chamado.getStatus().toString() == "CONCLUIDO_CONSERTADO") {
        dto.setDataSaida(chamado.getDataSaida());
      }
      dto.setImage_urls(chamado.getImage_urls());
      dto.setMotivoNaoConclusao(chamado.getMotivoNaoConclusao());

      if (tecnico != null) {
        dto.setTecnico(tecnico.getId());
        dto.setTecnicoImg(tecnico.getImagem());
        dto.setTecnicoNome(tecnico.getNome());
        dto.setTecnicoCategorias(tecnico.getTecnicoCategorias());
      }
      chamadoCompletoDTOs.add(dto);
    }
    return chamadoCompletoDTOs;
  }

  private ChamadoCompletoDTO construirDTO(Chamado chamado) {
    Cliente cliente = chamado.getClienteId();
    Tecnico tecnico = chamado.getTecnico();
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
    dto.setImage_urls(chamado.getImage_urls());
    dto.setMotivoNaoConclusao(chamado.getMotivoNaoConclusao());

    if (tecnico != null) {
      dto.setTecnico(tecnico.getId());
      dto.setTecnicoNome(tecnico.getNome());
      dto.setTecnicoImg(tecnico.getImagem());
      dto.setTecnicoCategorias(tecnico.getTecnicoCategorias());
    }
    return dto;
  }

  private Chamado editarChamadoExistente(ChamadoCompletoDTO chamadoRecebido, Chamado chamadoExistente,
      Cliente clienteExistente) {
    Cliente clienteTemp = clienteExistente.builder()
        .id(clienteExistente.getId())
        .nome(chamadoRecebido.getClienteNome())
        .email(chamadoRecebido.getClienteEmail())
        .endereco(chamadoRecebido.getClienteEndereco())
        .telefone(chamadoRecebido.getClienteTelefone())
        .build();

    Chamado chamadoTemp = chamadoExistente.builder()
        .id(chamadoExistente.getId())
        .clienteId(chamadoExistente.getClienteId())
        .nomeItem(chamadoRecebido.getNomeItem())
        .itemSerie(chamadoRecebido.getItemSerie())
        .defeitoRelatado(chamadoRecebido.getDefeitoRelatado())
        .analiseTecnica(chamadoRecebido.getAnaliseTecnica())
        .custoEstimado(chamadoRecebido.getCustoEstimado())
        .dataEntrada(chamadoRecebido.getDataEntrada())
        .image_urls(chamadoRecebido.getImage_urls())
        .status(chamadoRecebido.getStatus())
        .build();

    clienteRepository.save(clienteTemp);
    chamadoRepository.save(chamadoTemp);
    return chamadoTemp;
  }

  private Chamado construirNovoChamado(Chamado novoChamado) {

    if (novoChamado.getClienteId() == null) {
      throw new IllegalArgumentException("clienteId não pode ser nulo");
    }

    return Chamado.builder()
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
  }
}
