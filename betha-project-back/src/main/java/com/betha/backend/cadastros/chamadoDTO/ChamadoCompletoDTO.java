package com.betha.backend.cadastros.chamadoDTO;

import java.time.LocalDateTime;
import java.util.List;

import com.betha.backend.cadastros.models.Enums.Status;
import com.betha.backend.cadastros.models.Enums.TecnicoCategorias;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChamadoCompletoDTO {

  private Long clienteId;
  private String clienteNome;
  private String clienteEmail;
  private String clienteTelefone;
  private String clienteEndereco;
  // private String imagem;
  // private Perfils perfil;

  private Long id;
  private String nomeItem;
  private String itemSerie;
  private String defeitoRelatado;
  private String analiseTecnica;
  private int custoEstimado;
  private LocalDateTime dataEntrada;
  private Status status;
  private List<String> image_urls;
  private LocalDateTime dataSaida;

  private Long tecnico;
  private String tecnicoImg;
  private String tecnicoNome;
  private TecnicoCategorias tecnicoCategorias;
  private String motivoNaoConclusao;

  public ChamadoCompletoDTO(String clienteNome, String clienteEmail, String clienteEndereco, String clienteTelefone,
      String nomeItem, String itemSerie, String defeitoRelatado, String analiseTecnica,
      String custoEstimado) {
    this.clienteNome = clienteNome;
    this.clienteEmail = clienteEmail;
    this.clienteEndereco = clienteEndereco;
    this.clienteTelefone = clienteTelefone;
    this.nomeItem = nomeItem;
    this.itemSerie = itemSerie;
    this.defeitoRelatado = defeitoRelatado;
    this.analiseTecnica = analiseTecnica;
  }

  public ChamadoCompletoDTO() {
  }
}
