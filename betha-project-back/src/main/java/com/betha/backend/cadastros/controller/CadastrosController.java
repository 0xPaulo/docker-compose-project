package com.betha.backend.cadastros.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.betha.backend.cadastros.chamadoDTO.ChamadoCompletoDTO;
import com.betha.backend.cadastros.models.Chamado;
import com.betha.backend.cadastros.repository.ChamadoRepository;
import com.betha.backend.cadastros.repository.ClienteRepository;
import com.betha.backend.cadastros.service.ChamadoService;

@RestController
@RequestMapping("/cadastros")
public class CadastrosController {

  @Autowired
  ChamadoService chamadoService;
  @Autowired
  ClienteRepository clienteRepository;
  @Autowired
  ChamadoRepository chamadoRepository;

  @PostMapping()
  @ResponseStatus(HttpStatus.CREATED)
  public Chamado salvarCadastro(@RequestBody Chamado chamado) {
    System.out.println(chamado);
    return chamadoService.salvarChamadoBanco(chamado);
  }

  @DeleteMapping("/{id}")
  public void deletar(@PathVariable Long id) {
    this.chamadoRepository.deleteById(id);
  }

  @GetMapping()
  public List<ChamadoCompletoDTO> buscarTodosChamados() {
    List<ChamadoCompletoDTO> resultado = chamadoService.todosChamados();
    return resultado;
  }

  @GetMapping("/{id}")
  public ChamadoCompletoDTO buscarTodosChamadosPeloId(@PathVariable Long id) {
    ChamadoCompletoDTO resultado = chamadoService.buscarPeloId(id);
    return resultado;
  }

  @PatchMapping("/{id}")
  public Chamado editarChamado(@PathVariable Long id, @RequestBody ChamadoCompletoDTO chamadoCompletoDTO) {
    return chamadoService.editar(id, chamadoCompletoDTO);
  }
}