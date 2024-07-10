package com.betha.backend.cadastros.interfaces;

import com.betha.backend.cadastros.chamadoDTO.FormCliente;
import com.betha.backend.cadastros.models.Cliente;

public interface ClienteServiceInterface {

  public Cliente salvarNovoCliente(FormCliente novoCliente);

}
