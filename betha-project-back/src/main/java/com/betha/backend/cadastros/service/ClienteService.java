package com.betha.backend.cadastros.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.betha.backend.cadastros.chamadoDTO.FormCliente;
import com.betha.backend.cadastros.models.Cliente;
import com.betha.backend.cadastros.repository.ClienteRepository;

@Service
public class ClienteService {

  @Autowired
  private ClienteRepository clienteRepository;

  public Cliente salvarClienteBanco(FormCliente novoCliente) {
    Cliente clienteTemp = Cliente.builder()
        .nome(novoCliente.getClienteNome())
        .telefone(novoCliente.getClienteTelefone())
        .endereco(novoCliente.getClienteEndereco())
        .email(novoCliente.getClienteEmail())
        .build();
    return clienteRepository.save(clienteTemp);
  }
}
