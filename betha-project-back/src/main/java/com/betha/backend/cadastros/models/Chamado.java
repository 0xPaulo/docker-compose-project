package com.betha.backend.cadastros.models;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "chamado", schema = "manutencao")

public class Chamado {

  @Column
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "cliente_id_fk")
  private Cliente cliente;

  @ManyToOne
  @JoinColumn(name = "tecnico_id_fk")
  private Tecnico tecnico;

  @Column
  private String nomeItem;

  @Column
  private String itemSerie;

  @Column
  private String defeitoRelatado;

  @Enumerated(EnumType.STRING)
  private com.betha.backend.cadastro.model.Enum.Status status;

  @Column
  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private LocalDateTime dataEntrada;

  @Column
  private String analiseTecnica;

  @Column
  private String laudo;

  @Column
  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private LocalDateTime dataSaida;

  @Column
  private int custoEstimado;

  @Column(columnDefinition = "text[]", name = "image_urls")
  private List<String> image_urls;

}
