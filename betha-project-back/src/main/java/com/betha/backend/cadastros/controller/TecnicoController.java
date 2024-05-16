package com.betha.backend.cadastros.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.betha.backend.cadastros.chamadoDTO.AutorizacaoDTO;
import com.betha.backend.cadastros.models.Chamado;
import com.betha.backend.cadastros.models.Tecnico;
import com.betha.backend.cadastros.models.Enums.TecnicoCategorias;
import com.betha.backend.cadastros.repository.TecnicoRepository;
import com.betha.backend.cadastros.service.TecnicoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/tecnicos")
public class TecnicoController {

  private final TecnicoRepository tecnicoRepository;
  private final TecnicoService tecnicoService;
  private final AuthenticationManager authenticationManager;

  public TecnicoController(TecnicoRepository tecnicoRepository, TecnicoService tecnicoService,
      AuthenticationManager authenticationManager) {
    this.tecnicoRepository = tecnicoRepository;
    this.tecnicoService = tecnicoService;
    this.authenticationManager = authenticationManager;
  }

  @GetMapping("/auth")
  public ResponseEntity<?> login(@RequestBody @Valid AutorizacaoDTO dados) {
    var usernamePassword = new UsernamePasswordAuthenticationToken(dados.email(), dados.senha());
    var auth = this.authenticationManager.authenticate(usernamePassword);
    return ResponseEntity.ok().build();
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

  @PatchMapping("/{id}")
  public Chamado editarChamado(@PathVariable Long id, @RequestBody Long tecnicoID) {
    Chamado resultado = tecnicoService.editar(id, tecnicoID);
    return resultado;
  }

  // criar tecnico

}
