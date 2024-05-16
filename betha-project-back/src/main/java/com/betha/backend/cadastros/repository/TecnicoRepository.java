package com.betha.backend.cadastros.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

import com.betha.backend.cadastros.models.Tecnico;
import com.betha.backend.cadastros.models.Enums.TecnicoCategorias;

public interface TecnicoRepository extends JpaRepository<Tecnico, Long> {
  @Query("SELECT t FROM Tecnico t WHERE t.tecnicoCategorias = :categoria")
  List<Tecnico> findByTecnicoCategorias(@Param("categoria") TecnicoCategorias categoria);

  UserDetails findByEmail(String login);
}
