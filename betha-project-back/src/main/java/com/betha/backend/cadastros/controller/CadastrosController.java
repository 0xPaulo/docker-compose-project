package com.betha.backend.cadastros.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.betha.backend.cadastros.chamadoDTO.ChamadoCompletoDTO;
import com.betha.backend.cadastros.models.Chamado;
import com.betha.backend.cadastros.repository.ChamadoRepository;
import com.betha.backend.cadastros.service.ChamadoService;

@RestController
@RequestMapping("/cadastros")
public class CadastrosController {

  @Autowired
  private final ChamadoService chamadoService;
  @Autowired
  private final ChamadoRepository chamadoRepository;

  CadastrosController(ChamadoService chamadoService,
      ChamadoRepository chamadoRepository) {
    this.chamadoService = chamadoService;
    this.chamadoRepository = chamadoRepository;
  }

  @PostMapping()
  @ResponseStatus(HttpStatus.CREATED)
  @Secured({ "ROLE_RECEPCAO" })
  public Chamado salvarCadastro(@RequestBody Chamado chamado) {
    System.out.println(chamado);
    return chamadoService.salvarChamadoBanco(chamado);
  }

  @DeleteMapping("/{id}")
  @Secured({ "ROLE_RECEPCAO" })
  public void deletar(@PathVariable Long id) {
    this.chamadoRepository.deleteById(id);
  }

  // Filtro de estado do chamado
  @GetMapping()
  @Secured({ "ROLE_RECEPCAO" })
  public List<ChamadoCompletoDTO> buscarTodosChamadosComFiltro(@RequestParam(required = false) List<String> params) {
    List<ChamadoCompletoDTO> resultado = chamadoService.todosChamados(params);
    return resultado;
  }

  // Busca o chamado pelo seu ID
  @GetMapping("/{id}")
  @Secured({ "ROLE_RECEPCAO", "ROLE_TRIAGEM", "ROLE_TECNICO" })
  public ChamadoCompletoDTO findChamadoPeloId(@PathVariable Long id) {
    ChamadoCompletoDTO resultado = chamadoService.buscarPeloId(id);
    return resultado;
  }

  // Possibilita editar todos os campos do chamado
  @PatchMapping("/{id}")
  @Secured({ "ROLE_RECEPCAO" })
  public Chamado editarChamado(@PathVariable Long id, @RequestBody ChamadoCompletoDTO chamadoCompletoDTO) {
    Chamado resultado = chamadoService.editar(id, chamadoCompletoDTO);
    return resultado;
  }

  // Finaliza o pedido ou reenvia para o Gerente Tecnico com a info da falha
  @PatchMapping("change-status/{id}")
  @Secured({ "ROLE_MANUTENCAO" })
  public Chamado editarStatus(@PathVariable Long id, @RequestBody List<String> dados) {
    Chamado resultado = chamadoService.editarStatus(id, dados);
    return resultado;
  }
}