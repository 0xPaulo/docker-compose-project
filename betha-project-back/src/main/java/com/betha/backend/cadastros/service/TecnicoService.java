package com.betha.backend.cadastros.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.betha.backend.cadastros.chamadoDTO.RegisterDTO;
import com.betha.backend.cadastros.models.Chamado;
import com.betha.backend.cadastros.models.Tecnico;
import com.betha.backend.cadastros.models.Enums.Status;
import com.betha.backend.cadastros.models.Enums.TecnicoCategorias;
import com.betha.backend.cadastros.repository.ChamadoRepository;
import com.betha.backend.cadastros.repository.TecnicoRepository;

@Service
public class TecnicoService {

  @Autowired
  private ChamadoRepository chamadoRepository;
  @Autowired
  private TecnicoRepository tecnicoRepository;

  public Chamado editar(Long id, Long nomeTecnico) {
    Chamado chamadoExistente = chamadoRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Chamado não encontrado"));
    Tecnico tecnicoExistente = tecnicoRepository.findById(nomeTecnico)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tecnico não encontrado"));

    chamadoExistente.setTecnico(tecnicoExistente);
    chamadoExistente.setStatus(Status.EM_MANUTENCAO);
    chamadoRepository.save(chamadoExistente);

    return chamadoExistente;
  }

  public Tecnico salvarNovoTecnico(RegisterDTO dados) {
    if (this.tecnicoRepository.findByEmail(dados.email()) != null) {
      throw new IllegalArgumentException("Email já cadastrado");
    }
    String encryptPassword = new BCryptPasswordEncoder().encode(dados.senha());
    TecnicoCategorias categorias = dados.tecnicoCategorias() != null ? dados.tecnicoCategorias()
        : TecnicoCategorias.SEM_CATEGORIA;
    Tecnico novoTecnico = new Tecnico(
        dados.email(), encryptPassword, dados.perfil(), dados.nome(), categorias);
    return tecnicoRepository.save(novoTecnico);
  }

}
