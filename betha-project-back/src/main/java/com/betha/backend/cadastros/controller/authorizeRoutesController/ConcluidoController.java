package com.betha.backend.cadastros.controller.authorizeRoutesController;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.betha.backend.cadastros.chamadoDTO.PaginatorChamadoCompleto;
import com.betha.backend.cadastros.repository.ChamadoRepository;
import com.betha.backend.cadastros.service.ChamadoServiceImpl;

@RestController
@RequestMapping("/concluido")
public class ConcluidoController {

  private final ChamadoServiceImpl chamadoService;

  ConcluidoController(ChamadoServiceImpl chamadoService,
      ChamadoRepository chamadoRepository) {
    this.chamadoService = chamadoService;
  }

  @GetMapping()
  public PaginatorChamadoCompleto buscarTodosChamadosComFiltro(
      @RequestParam(required = false) List<String> filtro,
      @RequestParam(required = false) List<Integer> pageConfig) {
    PaginatorChamadoCompleto resultado = chamadoService.todosChamadosCom(filtro, pageConfig);
    return resultado;
  }
}
