package com.betha.backend.cadastros.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.betha.backend.cadastros.chamadoDTO.RegisterDTO;
import com.betha.backend.cadastros.interfaces.TecnicoServiceInterface;
import com.betha.backend.cadastros.models.Chamado;
import com.betha.backend.cadastros.models.Tecnico;
import com.betha.backend.cadastros.models.Enums.Status;
import com.betha.backend.cadastros.models.Enums.TecnicoCategorias;
import com.betha.backend.cadastros.repository.ChamadoRepository;
import com.betha.backend.cadastros.repository.TecnicoRepository;

@Service
public class TecnicoServiceImpl implements TecnicoServiceInterface {

  @Autowired
  private ChamadoRepository chamadoRepository;
  @Autowired
  private TecnicoRepository tecnicoRepository;

  @Override
  public Chamado editarTecnicoDoChamado(Long chamadoId, Long tecnicoId) {
    Chamado chamadoExistente = chamadoRepository.findById(chamadoId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Chamado não encontrado"));
    Tecnico tecnicoExistente = tecnicoRepository.findById(tecnicoId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tecnico não encontrado"));

    chamadoExistente.setTecnico(tecnicoExistente);
    chamadoExistente.setStatus(Status.EM_MANUTENCAO);
    chamadoRepository.save(chamadoExistente);

    return chamadoExistente;
  }

  @Override
  public Tecnico salvarNovoTecnico(RegisterDTO tecnicoDados) {
    if (this.tecnicoRepository.findByEmail(tecnicoDados.email()) != null) {
      throw new IllegalArgumentException("Email já cadastrado");
    }
    String encryptPassword = new BCryptPasswordEncoder().encode(tecnicoDados.senha());
    TecnicoCategorias categorias = tecnicoDados.tecnicoCategorias() != null ? tecnicoDados.tecnicoCategorias()
        : TecnicoCategorias.SEM_CATEGORIA;
    Tecnico novoTecnico = new Tecnico(
        tecnicoDados.email(), encryptPassword, tecnicoDados.perfil(), tecnicoDados.nome(), categorias);
    return tecnicoRepository.save(novoTecnico);
  }

  @Override
  public void trocarSenhaDoTecnico(RegisterDTO dados) {
    Long novoId = Long.parseLong(dados.id());
    Tecnico novoTecnico = tecnicoRepository.findById(novoId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tecnico não encontrado"));
    String encryptPassword = new BCryptPasswordEncoder().encode(dados.senha());
    novoTecnico.setSenha(encryptPassword);
    tecnicoRepository.save(novoTecnico);
  }
}