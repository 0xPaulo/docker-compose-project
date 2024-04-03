package com.betha.backend.cadastros.models;

import com.betha.backend.cadastros.models.Enums.Perfils;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@SuperBuilder()
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public abstract class Pessoa {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column
  private Long id;

  @Column
  private String nome;

  @Column
  private String email;

  @Column
  private String telefone;

  @Column
  private String endereco;

  @Column
  private String imagem;

  @Column
  private Perfils perfil;

}
