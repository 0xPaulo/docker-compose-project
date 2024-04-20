package com.betha.backend.cadastros.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.betha.backend.cadastros.models.Tecnico;
import com.betha.backend.cadastros.models.Enums.TecnicoCategorias;
import com.betha.backend.cadastros.repository.TecnicoRepository;

@RestController
@RequestMapping("/tecnicos")
public class TecnicoController {

  @Autowired
  private final TecnicoRepository tecnicoRepository;

  public TecnicoController(TecnicoRepository tecnicoRepository) {
    this.tecnicoRepository = tecnicoRepository;
  }

  @GetMapping()
  public List<Tecnico> buscarTodosTecnicos(@RequestParam(required = false) String params) {
    if (params != null) {
      String categoriaString = params;
      TecnicoCategorias categoria = TecnicoCategorias.valueOf(categoriaString);
      List<Tecnico> tecnicos = tecnicoRepository.findByTecnicoCategorias(categoria);
      return tecnicos;
    }
    List<Tecnico> resultado = this.tecnicoRepository.findAll();
    return resultado;

  }

}
