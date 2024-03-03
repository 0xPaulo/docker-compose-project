package com.betha.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.betha.backend.model.Cadastro;

@Repository
public interface CadastroRepository extends JpaRepository<Cadastro, Long> {

  @Query("SELECT c FROM Cadastro c WHERE c.status IN :statusList")
  List<Cadastro> findByStatusInFilter(@Param("statusList") List<String> statusList);

}
