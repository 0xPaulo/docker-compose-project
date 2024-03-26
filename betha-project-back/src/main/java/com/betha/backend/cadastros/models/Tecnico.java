package com.betha.backend.cadastros.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
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
@Table(name = "tecnico", schema = "manutencao")

public class Tecnico extends Pessoa {

  @OneToMany(mappedBy = "tecnico")
  private List<Chamado> chamados = new ArrayList<>();

}
