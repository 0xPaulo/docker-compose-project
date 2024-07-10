package com.betha.backend.cadastros.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.betha.backend.cadastros.chamadoDTO.AuthenticateDTO;
import com.betha.backend.cadastros.chamadoDTO.ChamadoCompletoDTO;
import com.betha.backend.cadastros.chamadoDTO.LoginResponseDTO;
import com.betha.backend.cadastros.chamadoDTO.RegisterDTO;
import com.betha.backend.cadastros.interfaces.TecnicoServiceInterface;
import com.betha.backend.cadastros.models.Chamado;
import com.betha.backend.cadastros.models.Tecnico;
import com.betha.backend.cadastros.models.Enums.TecnicoCategorias;
import com.betha.backend.cadastros.repository.ChamadoRepository;
import com.betha.backend.cadastros.repository.TecnicoRepository;
import com.betha.backend.cadastros.service.ChamadoServiceImpl;
import com.betha.backend.cadastros.service.TokenService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/tecnico")
public class TecnicoController {

  private final TecnicoRepository tecnicoRepository;
  private final TecnicoServiceInterface tecnicoService;
  private final AuthenticationManager authenticationManager;
  private final TokenService tokenService;
  private final ChamadoServiceImpl chamadoService;

  public TecnicoController(TecnicoRepository tecnicoRepository, TecnicoServiceInterface tecnicoService,
      AuthenticationManager authenticationManager, TokenService tokenService, ChamadoRepository chamadoRepository,
      ChamadoServiceImpl chamadoService) {
    this.tecnicoRepository = tecnicoRepository;
    this.tecnicoService = tecnicoService;
    this.authenticationManager = authenticationManager;
    this.tokenService = tokenService;
    this.chamadoService = chamadoService;
  }

  @GetMapping("/chamados")
  @Secured({ "ROLE_MANUTENCAO" })
  public List<ChamadoCompletoDTO> buscarTodosChamadosDoTecnico(@RequestParam(required = false) String params) {
    return this.chamadoService.todosChamadosDo(params);
  }

  @GetMapping()
  @Secured({ "ROLE_TECNICO" })
  public List<Tecnico> buscarTodosTecnicosDisponiveis(@RequestParam(required = false) String params) {
    if (params != null) {
      String categoriaString = params;
      TecnicoCategorias categoria = TecnicoCategorias.valueOf(categoriaString);
      List<Tecnico> tecnicos = tecnicoRepository.findByTecnicoCategorias(categoria);
      return tecnicos;
    }
    List<Tecnico> resultado = this.tecnicoRepository.buscarTecnicosManutencao();
    return resultado;
  }

  @PostMapping("/login")
  public ResponseEntity<?> verificaEmailSenha(@RequestBody @Valid AuthenticateDTO dados) {
    var usernamePassword = new UsernamePasswordAuthenticationToken(dados.email(), dados.senha());
    var auth = this.authenticationManager.authenticate(usernamePassword);
    var token = tokenService.generateToken((Tecnico) auth.getPrincipal());
    return ResponseEntity.ok(new LoginResponseDTO(token));
  }

  @Secured({ "ROLE_ADMIN" })
  @PostMapping("/register")
  public ResponseEntity salvarNovoTecnicoBanco(@RequestBody @Valid RegisterDTO tecnico) {
    try {
      Tecnico novoTecnico = tecnicoService.salvarNovoTecnico(tecnico);
      return ResponseEntity.ok(novoTecnico);
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @PatchMapping("/{id}")
  @Secured({ "ROLE_TECNICO" })
  public Chamado definirTecnicoChamado(@PathVariable Long chamadoId, @RequestBody Long tecnicoID) {
    Chamado resultado = tecnicoService.editarTecnicoDoChamado(chamadoId, tecnicoID);
    return resultado;
  }

  @PatchMapping("/password-patch")
  public ResponseEntity trocarSenha(@RequestBody RegisterDTO dados) {
    try {
      this.tecnicoService.trocarSenhaDoTecnico(dados);
      return ResponseEntity.ok().body("Senha atualizada");
    } catch (ResponseStatusException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }
}
