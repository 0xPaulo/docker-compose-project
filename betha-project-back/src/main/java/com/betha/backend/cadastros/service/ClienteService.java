package com.betha.backend.cadastros.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.betha.backend.cadastros.models.Cliente;
import com.betha.backend.cadastros.repository.ClienteRepository;

@Service
public class ClienteService {

  @Autowired
  private ClienteRepository clienteRepository;

  public Cliente salvarClienteBanco(Cliente novoCliente) {
    Cliente clienteTemp = Cliente.builder()
        .nome(novoCliente.getNome())
        .telefone(novoCliente.getTelefone())
        .endereco(novoCliente.getEndereco())
        .email(novoCliente.getEmail())
        .build();

    return clienteRepository.save(clienteTemp);

  }
}
