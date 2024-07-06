package com.betha.backend.cadastros.controller;

import java.util.List;

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
import com.betha.backend.cadastros.interfaces.ChamadoServiceInterface;
import com.betha.backend.cadastros.models.Chamado;
import com.betha.backend.cadastros.repository.ChamadoRepository;

@RestController
@RequestMapping("/cadastros")
public class CadastrosController {

  private final ChamadoServiceInterface chamadoServiceInterface;
  private final ChamadoRepository chamadoRepository;

  CadastrosController(ChamadoServiceInterface chamadoServiceInterface,
      ChamadoRepository chamadoRepository) {
    this.chamadoServiceInterface = chamadoServiceInterface;
    this.chamadoRepository = chamadoRepository;
  }

  @GetMapping("/{id}")
  @Secured({ "ROLE_RECEPCAO", "ROLE_TRIAGEM", "ROLE_TECNICO" })
  public ChamadoCompletoDTO buscarChamadoPeloId(@PathVariable Long id) {
    ChamadoCompletoDTO resultado = chamadoServiceInterface.buscarPeloId(id);
    return resultado;
  }

  @GetMapping()
  @Secured({ "ROLE_RECEPCAO" })
  public List<ChamadoCompletoDTO> buscarTodosChamadosComFiltro(@RequestParam(required = false) List<String> filtro) {
    List<ChamadoCompletoDTO> resultado = chamadoServiceInterface.todosChamadosCom(filtro);
    return resultado;
  }

  @PostMapping()
  @ResponseStatus(HttpStatus.CREATED)
  @Secured({ "ROLE_RECEPCAO" })
  public Chamado salvarChamadoBanco(@RequestBody Chamado chamado) {
    return chamadoServiceInterface.salvarNovoChamado(chamado);
  }

  @PatchMapping("/{id}")
  @Secured({ "ROLE_RECEPCAO" })
  public Chamado editarCamposChamado(@PathVariable Long id, @RequestBody ChamadoCompletoDTO chamadoCompletoDTO) {
    Chamado resultado = chamadoServiceInterface.editarCamposDoId(id, chamadoCompletoDTO);
    return resultado;
  }

  @PatchMapping("change-status/{id}")
  @Secured({ "ROLE_MANUTENCAO" })
  public Chamado editarStatusChamado(@PathVariable Long id, @RequestBody List<String> dados) {
    Chamado resultado = chamadoServiceInterface.finalizaStatusDoId(id, dados);
    return resultado;
  }

  @DeleteMapping("/{id}")
  @Secured({ "ROLE_RECEPCAO" })
  public void deletarChamado(@PathVariable Long id) {
    this.chamadoRepository.deleteById(id);
  }
}