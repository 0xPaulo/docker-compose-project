package com.betha.backend.cadastros.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.betha.backend.cadastros.chamadoDTO.AuthenticateDTO;
import com.betha.backend.cadastros.chamadoDTO.ChamadoCompletoDTO;
import com.betha.backend.cadastros.chamadoDTO.LoginResponseDTO;
import com.betha.backend.cadastros.chamadoDTO.RegisterDTO;
import com.betha.backend.cadastros.models.Chamado;
import com.betha.backend.cadastros.models.Tecnico;
import com.betha.backend.cadastros.models.Enums.TecnicoCategorias;
import com.betha.backend.cadastros.repository.ChamadoRepository;
import com.betha.backend.cadastros.repository.TecnicoRepository;
import com.betha.backend.cadastros.service.ChamadoService;
import com.betha.backend.cadastros.service.TecnicoService;
import com.betha.backend.cadastros.service.TokenService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/tecnico")
public class TecnicoController {

  private final TecnicoRepository tecnicoRepository;
  private final TecnicoService tecnicoService;
  private final AuthenticationManager authenticationManager;
  private final TokenService tokenService;
  private final ChamadoService chamadoService;

  public TecnicoController(TecnicoRepository tecnicoRepository, TecnicoService tecnicoService,
      AuthenticationManager authenticationManager, TokenService tokenService, ChamadoRepository chamadoRepository,
      ChamadoService chamadoService) {
    this.tecnicoRepository = tecnicoRepository;
    this.tecnicoService = tecnicoService;
    this.authenticationManager = authenticationManager;
    this.tokenService = tokenService;
    this.chamadoService = chamadoService;
  }

  // Verifica se email e senha existem no banco
  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody @Valid AuthenticateDTO dados) {
    var usernamePassword = new UsernamePasswordAuthenticationToken(dados.email(), dados.senha());
    var auth = this.authenticationManager.authenticate(usernamePassword);
    var token = tokenService.generateToken((Tecnico) auth.getPrincipal());
    return ResponseEntity.ok(new LoginResponseDTO(token));
  }

  // Salva um novo Tecnico na tabela
  @Secured({ "ROLE_ADMIN" })
  @PostMapping("/register")
  public ResponseEntity registrarTecino(@RequestBody @Valid RegisterDTO dados) {
    if (this.tecnicoRepository.findByEmail(dados.email()) != null)
      return ResponseEntity.badRequest().build();
    String encryptPassword = new BCryptPasswordEncoder().encode(dados.senha());
    Tecnico novoTecnico = new Tecnico(dados.email(), encryptPassword, dados.perfil());
    this.tecnicoRepository.save(novoTecnico);
    return ResponseEntity.ok().build();
  }

  // Busca Tecnicos disponiveis para o chamado
  @GetMapping()
  @Secured({ "ROLE_TECNICO" })
  public List<Tecnico> buscarTodosTecnicos(@RequestParam(required = false) String params) {
    if (params != null) {
      String categoriaString = params;
      TecnicoCategorias categoria = TecnicoCategorias.valueOf(categoriaString);
      List<Tecnico> tecnicos = tecnicoRepository.findByTecnicoCategorias(categoria);
      return tecnicos;
    }
    List<Tecnico> resultado = this.tecnicoRepository.buscarTecnicosManutencao();
    return resultado;
  }

  // Definir tecnico para o chamado
  @PatchMapping("/{id}")
  @Secured({ "ROLE_TECNICO" })
  public Chamado editarChamado(@PathVariable Long id, @RequestBody Long tecnicoID) {
    Chamado resultado = tecnicoService.editar(id, tecnicoID);
    return resultado;
  }

  // Buscar todos os chamados Do Tecnico X
  @GetMapping("/chamados")
  @Secured({ "ROLE_MANUTENCAO" })
  public List<ChamadoCompletoDTO> buscarTodosChamadosDoTecnico(@RequestParam(required = false) String params) {
    return this.chamadoService.todosChamadosDo(params);
  }

}
