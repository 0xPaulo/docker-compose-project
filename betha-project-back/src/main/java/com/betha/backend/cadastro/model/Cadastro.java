package com.betha.backend.cadastro.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder(toBuilder = true)
@AllArgsConstructor()
@NoArgsConstructor()
@Setter()
@Getter
@Table(name = "cadastros_manutencao", schema = "manutencao")
public class Cadastro {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @JsonProperty("_id")
  private Long id;

  @Column(name = "cliente")
  private String cliente;

  @Column(name = "email")
  private String email;

  @Column(name = "telefone")
  private String telefone;

  @Column(name = "endereco")
  private String endereco;

  @Column(name = "anotacao")
  private String anotacao;

  @Column(name = "item")
  private String item;

  @Column(name = "n_serie")
  private String itemSerie;

  @Enumerated(EnumType.STRING)
  private com.betha.backend.cadastro.model.Enum.Status status;

  @Column(name = "data_entrada")
  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private LocalDateTime dataEntrada;

  @Column(name = "descricao_defeito")
  private String desc;

  @Column(name = "laudo")
  private String laudo;

  @Column(name = "data_saida")
  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private LocalDateTime dataSaida;

  @Column(name = "valor")
  private int valor;

  @Column(columnDefinition = "text[]", name = "image_urls")
  private List<String> image_urls;
}
