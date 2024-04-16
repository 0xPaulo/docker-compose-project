package com.betha.backend.cadastros.chamadoDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FormCliente {

  private Long clienteId;
  private String clienteNome;
  private String clienteEmail;
  private String clienteTelefone;
  private String clienteEndereco;
  // private String imagem;
  // private Perfils perfil;
}