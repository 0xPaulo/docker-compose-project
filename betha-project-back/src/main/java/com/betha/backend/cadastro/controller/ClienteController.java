package com.betha.backend.cadastro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.betha.backend.cadastro.model.Cadastro;
import com.betha.backend.cadastro.repository.CadastroRepository;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

  @Autowired
  private final CadastroRepository cadastroRepository;

  public ClienteController(CadastroRepository cadastroRepository) {
    this.cadastroRepository = cadastroRepository;
  }

  @GetMapping()
  public List<Cadastro> buscarClientesPorNome(@RequestParam("nome") String nome) {
    List<Cadastro> valor = cadastroRepository.findByClienteContainingIgnoreCase(nome);
    return valor;

  }
}