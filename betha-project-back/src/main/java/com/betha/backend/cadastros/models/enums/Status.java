package com.betha.backend.cadastros.models.enums;

public enum Status {
  DISPONIVEL_TRIAGEM("Disponivel para triagem"),
  AGUARDANDO_CLIENTE("Aguardando confirmação do Cliente"),
  CANCELADO("Cancelado pelo cliente"),
  AGUARDANDO_MANUTENCAO("Pronto para manutenção"),
  CONCLUIDO_CONSERTADO("Produto consertado"),
  CONCLUIDO_N_CONSERTADO("Não foi possivel consertar");

  private final String descricao;

  private Status(String descricao) {
    this.descricao = descricao;
  }

  public String getDescricao() {
    return descricao;
  }

}
