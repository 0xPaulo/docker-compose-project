package com.betha.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.betha.backend.model.Cadastro;
import com.betha.backend.repository.CadastroRepository;
import com.betha.backend.service.CadastroService;

@RestController
@RequestMapping("/api/lista")
public class ManutencaoController {

  @Autowired
  private final CadastroRepository cadastroRepository;
  private final CadastroService cadastroService;

  public ManutencaoController(CadastroService cadastroService, CadastroRepository cadastroRepository) {
    this.cadastroRepository = cadastroRepository;
    this.cadastroService = cadastroService;
  }

  @GetMapping
  public List<Cadastro> list() {
    return cadastroRepository.findAll();
  }

  @SuppressWarnings("null")
  @GetMapping("/{id}")
  public Optional<Cadastro> findById(@PathVariable Long id) {
    return this.cadastroRepository.findById(id);
  }

  @SuppressWarnings("null")
  @DeleteMapping("/{id}")
  public void deletar(@PathVariable Long id) {
    this.cadastroRepository.deleteById(id);
  }

  @SuppressWarnings("null")
  @PostMapping
  @ResponseStatus(code = HttpStatus.CREATED)
  public Cadastro create(@RequestBody Cadastro cadastro) {
    return cadastroService.createCadastro(cadastro);
  }

  @PutMapping("/{id}")
  public Cadastro editarItem(@PathVariable Long id, @RequestBody Cadastro cadastro) {
    return cadastroService.editarItem(id, cadastro);
  }

}
