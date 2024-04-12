package com.betha.backend.cadastros.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.betha.backend.cadastros.chamadoDTO.ChamadoCompletoDTO;
import com.betha.backend.cadastros.models.Chamado;
import com.betha.backend.cadastros.models.Cliente;
import com.betha.backend.cadastros.repository.ChamadoRepository;
import com.betha.backend.cadastros.repository.ClienteRepository;
import com.betha.backend.cadastros.service.ChamadoService;

@RestController
@RequestMapping("/api/cadastro") // trocar
public class ChamadoController {

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

  @GetMapping()
  // trocar par aum service
  public List<ChamadoCompletoDTO> mapearChamadoCompletoDTO() {
    List<Chamado> chamados = chamadoRepository.findAll();
    List<ChamadoCompletoDTO> chamadoCompletoDTO = new ArrayList<>();
    for (Chamado chamado : chamados) {

      Cliente cliente = chamado.getClienteId();

      ChamadoCompletoDTO dto = new ChamadoCompletoDTO();
      dto.setClienteId(cliente.getId());
      dto.setClienteNome(cliente.getNome());
      dto.setClienteEmail(cliente.getEmail());
      dto.setClienteTelefone(cliente.getTelefone());
      dto.setClienteEndereco(cliente.getEndereco());

      dto.setId(chamado.getId());
      dto.setNomeItem(chamado.getNomeItem());
      dto.setItemSerie(chamado.getItemSerie());
      dto.setDefeitoRelatado(chamado.getDefeitoRelatado());
      dto.setAnaliseTecnica(chamado.getAnaliseTecnica());
      dto.setCustoEstimado(chamado.getCustoEstimado());
      dto.setDataEntrada(chamado.getDataEntrada());
      dto.setStatus(chamado.getStatus());

      chamadoCompletoDTO.add(dto);
    }
    return chamadoCompletoDTO;
  }
}