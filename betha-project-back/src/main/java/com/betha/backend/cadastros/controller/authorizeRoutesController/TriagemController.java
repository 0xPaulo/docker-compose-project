package com.betha.backend.cadastros.controller.authorizeRoutesController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.betha.backend.cadastros.chamadoDTO.ChamadoCompletoDTO;
import com.betha.backend.cadastros.models.Chamado;
import com.betha.backend.cadastros.service.ChamadoService;

@RestController
@RequestMapping("/triagem")
public class TriagemController {

  @Autowired
  private final ChamadoService chamadoService;

  TriagemController(ChamadoService chamadoService) {
    this.chamadoService = chamadoService;
  }

  @GetMapping()
  @Secured({ "ROLE_TRIAGEM" })
  public List<ChamadoCompletoDTO> buscarTodosChamadosComFiltro(@RequestParam(required = false) List<String> params) {
    List<ChamadoCompletoDTO> resultado = chamadoService.todosChamados(params);
    return resultado;
  }

  @PatchMapping("/{id}")
  @Secured({ "ROLE_TRIAGEM" })
  public Chamado editarChamado(@PathVariable Long id, @RequestBody ChamadoCompletoDTO chamadoCompletoDTO) {
    Chamado resultado = chamadoService.editar(id, chamadoCompletoDTO);
    return resultado;
  }
}
