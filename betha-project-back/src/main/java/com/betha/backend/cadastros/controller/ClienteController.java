package com.betha.backend.cadastros.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.betha.backend.cadastros.models.Cliente;
import com.betha.backend.cadastros.repository.ClienteRepository;
import com.betha.backend.cadastros.service.ClienteService;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

  @Autowired
  private final ClienteRepository clienteRepository;
  private final ClienteService clienteService;

  public ClienteController(ClienteService clienteService, ClienteRepository clienteRepository) {
    this.clienteRepository = clienteRepository;
    this.clienteService = clienteService;
  }

  @GetMapping()
  public List<Cliente> buscarClientesPorNome(@RequestParam("nome") String nome) {
    List<Cliente> valor = this.clienteRepository.findByNomeContainingIgnoreCase(nome);
    return valor;
  }

  @PostMapping()
  @ResponseStatus(HttpStatus.CREATED)
  public Cliente salvarCliente(@RequestBody Cliente cliente) {
    try {
      return clienteService.salvarClienteBanco(cliente);
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Cliente já existe", e);
    }
  }
}
