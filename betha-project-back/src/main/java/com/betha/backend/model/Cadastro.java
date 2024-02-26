package com.betha.backend.model;

import java.time.LocalDateTime;

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
import lombok.Data;

@Data
@Entity
@Table(name = "Cadastros")
public class Cadastro {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @JsonProperty("_id")
  private Long id;

  @Column(name = "name")
  private String name;

  @Column(name = "item")
  private String item;

  @Column(name = "defeito")
  private String defeito;

  @Column(name = "data_entrada")
  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private LocalDateTime dataEntrada;

  @Column(name = "data_saida")
  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private LocalDateTime dataSaida;

  @Column(name = "valor")
  private int valor;

  @Column(name = "descricao")
  private String desc;

  @Enumerated(EnumType.STRING)
  private com.betha.backend.Enum.Status status;

  @Column(name = "email")
  private String email;
}
