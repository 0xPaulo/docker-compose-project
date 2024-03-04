package com.betha.backend.cadastro.controller;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.betha.backend.cadastro.model.Cadastro;
import com.betha.backend.cadastro.repository.CadastroRepository;
import com.betha.backend.cadastro.service.CadastroService;

@RestController
@RequestMapping("/api/lista")
public class CadastroController {

  @Autowired
  private final CadastroRepository cadastroRepository;
  private final CadastroService cadastroService;

  public CadastroController(CadastroService cadastroService, CadastroRepository cadastroRepository) {
    this.cadastroRepository = cadastroRepository;
    this.cadastroService = cadastroService;
  }

  @GetMapping()
  public List<Cadastro> list() {
    return cadastroRepository.findAll();
  }

  @GetMapping("/filtrar")
  public List<Cadastro> filtrar(@RequestParam("filter") List<String> filtros) {
    return this.cadastroRepository.findByStatusInFilter(filtros);
  }

  @GetMapping("/{id}")
  public Optional<Cadastro> findById(@PathVariable Long id) {
    return this.cadastroRepository.findById(id);
  }

  @DeleteMapping("/{id}")
  public void deletar(@PathVariable Long id) {
    this.cadastroRepository.deleteById(id);
  }

  @PostMapping()
  @ResponseStatus(code = HttpStatus.CREATED)
  public Cadastro newCadastro(@RequestBody Cadastro cadastro) {
    return cadastroService.createCadastro(cadastro);
  }

  @PutMapping("/{id}")
  public Cadastro editarItem(@PathVariable Long id, @RequestBody Cadastro cadastro) {
    return cadastroService.editarItem(id, cadastro);
  }

}
