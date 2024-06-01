package com.betha.backend.cadastros.controller.authorizeRoutesController;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.betha.backend.cadastros.chamadoDTO.ChamadoCompletoDTO;
import com.betha.backend.cadastros.repository.ChamadoRepository;
import com.betha.backend.cadastros.service.ChamadoService;

@RestController
@RequestMapping("/concluido")
public class ConcluidoController {

  private final ChamadoService chamadoService;

  ConcluidoController(ChamadoService chamadoService,
      ChamadoRepository chamadoRepository) {
    this.chamadoService = chamadoService;
  }

  @GetMapping()
  public List<ChamadoCompletoDTO> buscarTodosChamadosComFiltro(@RequestParam(required = false) List<String> params) {
    List<ChamadoCompletoDTO> resultado = chamadoService.todosChamados(params);
    return resultado;
  }
}
