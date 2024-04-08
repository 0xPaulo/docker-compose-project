package com.betha.backend.cadastros.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.betha.backend.cadastros.models.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

  List<Cliente> findByNomeContainingIgnoreCase(String nomeCliente);

}
