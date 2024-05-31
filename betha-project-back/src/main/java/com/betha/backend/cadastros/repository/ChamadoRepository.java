package com.betha.backend.cadastros.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.betha.backend.cadastros.models.Chamado;

public interface ChamadoRepository extends JpaRepository<Chamado, Long> {

  @Query("SELECT c FROM Chamado c WHERE c.tecnico.id = :id AND c.status = 'EM_MANUTENCAO'")
  List<Chamado> buscarChamadosDo(@Param("id") String tecnico);

}
