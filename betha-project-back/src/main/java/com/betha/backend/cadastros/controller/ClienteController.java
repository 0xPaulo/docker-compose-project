package com.betha.backend.cadastros.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.betha.backend.cadastros.chamadoDTO.FormCliente;
import com.betha.backend.cadastros.models.Cliente;
import com.betha.backend.cadastros.repository.ClienteRepository;
import com.betha.backend.cadastros.service.ClienteService;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

  private final ClienteRepository clienteRepository;
  private final ClienteService clienteService;

  public ClienteController(ClienteService clienteService, ClienteRepository clienteRepository) {
    this.clienteRepository = clienteRepository;
    this.clienteService = clienteService;
  }

  @GetMapping()
  @Secured({ "ROLE_RECEPCAO" })
  public List<Cliente> buscarClientesPorNome(@RequestParam("nome") String nome) {
    List<Cliente> valor = this.clienteRepository.findByNomeContainingIgnoreCase(nome);
    return valor;
  }

  @PostMapping()
  @Secured({ "ROLE_RECEPCAO" })
  @ResponseStatus(HttpStatus.CREATED)
  public Cliente salvarClienteBanco(@RequestBody FormCliente cliente) {
    return clienteService.salvarNovoCliente(cliente);
  }
}
