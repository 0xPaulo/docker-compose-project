package com.betha.backend.cadastros.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.betha.backend.cadastros.models.Chamado;

public interface ChamadoRepository extends JpaRepository<Chamado, Long> {

}
