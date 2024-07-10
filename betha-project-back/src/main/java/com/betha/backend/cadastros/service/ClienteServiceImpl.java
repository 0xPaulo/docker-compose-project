package com.betha.backend.cadastros.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.betha.backend.cadastros.chamadoDTO.FormCliente;
import com.betha.backend.cadastros.interfaces.ClienteServiceInterface;
import com.betha.backend.cadastros.models.Cliente;
import com.betha.backend.cadastros.repository.ClienteRepository;

@Service
public class ClienteServiceImpl implements ClienteServiceInterface {

  @Autowired
  private ClienteRepository clienteRepository;

  @Override
  public Cliente salvarNovoCliente(FormCliente novoCliente) {
    if (!verificaCamposPreenchidos(novoCliente)) {
      throw new IllegalArgumentException("Todos os campos do FormCliente devem ser preenchidos.");
    }
    Cliente clienteTemp = Cliente.builder()
        .nome(novoCliente.getClienteNome())
        .telefone(novoCliente.getClienteTelefone())
        .endereco(novoCliente.getClienteEndereco())
        .email(novoCliente.getClienteEmail())
        .build();
    return clienteRepository.save(clienteTemp);
  }

  private boolean verificaCamposPreenchidos(FormCliente novoCliente) {
    List<String> camposNecessarios = Arrays.asList("clienteNome", "clienteTelefone", "clienteEndereco", "clienteEmail");
    for (String campo : camposNecessarios) {
      if (novoCliente.getValorDoCampo(campo) == null) {
        return false;
      }
    }
    return true;
  }
}
