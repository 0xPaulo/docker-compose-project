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
import com.betha.backend.cadastros.chamadoDTO.PaginatorChamadoCompleto;
import com.betha.backend.cadastros.models.Chamado;
import com.betha.backend.cadastros.repository.ChamadoRepository;
import com.betha.backend.cadastros.service.ChamadoServiceImpl;

@RestController
@RequestMapping("/manutencao")
public class ManutencaoController {

  @Autowired
  private final ChamadoServiceImpl chamadoService;
  @Autowired
  private final ChamadoRepository chamadoRepository;

  ManutencaoController(ChamadoServiceImpl chamadoService,
      ChamadoRepository chamadoRepository) {
    this.chamadoService = chamadoService;
    this.chamadoRepository = chamadoRepository;
  }

  @GetMapping()
  @Secured({ "ROLE_TECNICO" })
  public PaginatorChamadoCompleto buscarTodosChamadosComFiltro(
      @RequestParam(required = false) List<String> filtro,
      @RequestParam(required = false) List<Integer> pageConfig) {

    PaginatorChamadoCompleto resultado = chamadoService.todosChamadosCom(filtro, pageConfig);
    return resultado;
  }

  @PatchMapping("/{id}")
  @Secured({ "ROLE_TECNICO" })
  public Chamado editarChamado(@PathVariable Long id, @RequestBody ChamadoCompletoDTO chamadoCompletoDTO) {
    Chamado resultado = chamadoService.editarCamposDoId(id, chamadoCompletoDTO);
    return resultado;
  }
}
