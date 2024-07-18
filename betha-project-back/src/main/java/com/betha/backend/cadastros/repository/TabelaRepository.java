package com.betha.backend.cadastros.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.betha.backend.cadastros.models.Chamado;

@Repository
public interface TabelaRepository extends JpaRepository<Chamado, Long> {

  @Query("SELECT c FROM Chamado c WHERE c.status IN :statusList")
  Page<Chamado> findByStatusInFilter(@Param("statusList") List<String> statusList, Pageable pageable);

  // List<Chamado> findByStatusInFilter(@Param("statusList") List<String>
  // statusList);

  Page<Chamado> findAll(Pageable pageable);

}
