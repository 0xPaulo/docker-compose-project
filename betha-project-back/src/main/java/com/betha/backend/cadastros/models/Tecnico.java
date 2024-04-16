package com.betha.backend.cadastros.models;

import java.util.ArrayList;
import java.util.List;

import com.betha.backend.cadastros.models.Enums.Perfils;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tecnico", schema = "manutencao")

public class Tecnico {

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

  @OneToMany(mappedBy = "tecnico")
  private List<Chamado> chamados = new ArrayList<>();

}
