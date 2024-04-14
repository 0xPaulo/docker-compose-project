package com.betha.backend.cadastros.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.betha.backend.cadastros.models.Chamado;
import com.betha.backend.cadastros.repository.TabelaRepository;

@RestController
@RequestMapping("/registros")
public class TabelaCadastrosController {

  @Autowired
  private final TabelaRepository tabelaRepository;

  TabelaCadastrosController(TabelaRepository tabelaRepository) {
    this.tabelaRepository = tabelaRepository;
  }

  @GetMapping("/filtro")
  public List<Chamado> filtrar(@RequestParam("params") List<String> filtros) {
    System.out.println(filtros);
    return this.tabelaRepository.findByStatusInFilter(filtros);
  }

}
