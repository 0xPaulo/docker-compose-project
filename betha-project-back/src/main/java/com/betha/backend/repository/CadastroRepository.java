package com.betha.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.betha.backend.model.Cadastro;

@Repository
public interface CadastroRepository extends JpaRepository<Cadastro, Long> {

}
