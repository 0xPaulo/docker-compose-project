package com.betha.backend.cadastros.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.betha.backend.cadastros.models.Chamado;
import com.betha.backend.cadastros.service.ChamadoService;

@RestController
@RequestMapping("/api/cadastro")
public class ChamadoController {

  @Autowired
  ChamadoService chamadoService;

  @PostMapping()
  @ResponseStatus(HttpStatus.CREATED)
  public Chamado salvarCadastro(@RequestBody Chamado chamado) {
    System.out.println(chamado);
    return chamadoService.salvarChamadoBanco(chamado);
  }
}
