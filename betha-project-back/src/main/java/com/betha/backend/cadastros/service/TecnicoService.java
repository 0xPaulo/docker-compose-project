package com.betha.backend.cadastros.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.betha.backend.cadastros.models.Chamado;
import com.betha.backend.cadastros.models.Tecnico;
import com.betha.backend.cadastros.models.Enums.Status;
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

}
