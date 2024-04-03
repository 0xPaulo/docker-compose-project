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
import lombok.experimental.SuperBuilder;

@SuperBuilder()
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cliente", schema = "manutencao")
public class Cliente extends Pessoa {

  @OneToMany(mappedBy = "cliente")
  private List<Chamado> chamados = new ArrayList<>();

}
