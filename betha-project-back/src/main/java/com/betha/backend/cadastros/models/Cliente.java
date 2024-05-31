package com.betha.backend.cadastros.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
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
@Table(name = "cliente", schema = "manutencao")
public class Cliente {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column
  private Long id;

  @Column
  @NotNull
  private String nome;

  @Column
  @NotNull
  private String email;

  @Column
  @NotNull
  private String telefone;

  @Column
  @NotNull
  private String endereco;

  @OneToMany(mappedBy = "clienteId")
  private List<Chamado> chamados = new ArrayList<>();

}
