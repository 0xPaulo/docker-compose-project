package com.betha.backend.cadastros.chamadoDTO;

import java.lang.reflect.Field;

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
  public Object getValorDoCampo(String campo) {
    try {
      Field field = getClass().getDeclaredField(campo);
      field.setAccessible(true);
      return field.get(this);
    } catch (NoSuchFieldException | IllegalAccessException e) {
      throw new RuntimeException("Erro ao acessar campo " + campo, e);
    }
  }

  public FormCliente(long clienteId, String clienteNome, String clienteEmail, String clienteTelefone,
      String clienteEndereco) {
    this.clienteId = clienteId;
    this.clienteNome = clienteNome;
    this.clienteEmail = clienteEmail;
    this.clienteTelefone = clienteTelefone;
    this.clienteEndereco = clienteEndereco;
  }
}