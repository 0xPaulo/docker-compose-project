package com.betha.backend.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.betha.backend.model.Cadastro;
import com.betha.backend.repository.CadastroRepository;

@Service
public class CadastroService {

  private final CadastroRepository cadastroRepository;

  @Autowired
  public CadastroService(CadastroRepository cadastroRepository) {
    this.cadastroRepository = cadastroRepository;
  }

  public Cadastro editarItem(Long id, Cadastro cadastro) {
    Optional<Cadastro> cadastroExistenteOptional = cadastroRepository.findById(id);

    return cadastroExistenteOptional.map(cadastroExistente -> {
      Cadastro cadastroAtualizado = Cadastro.builder()
          .id(cadastroExistente.getId())
          .name(cadastro.getName())
          .item(cadastro.getItem())
          .defeito(cadastro.getDefeito())
          .dataEntrada(cadastro.getDataEntrada())
          .dataSaida(cadastro.getDataSaida())
          .valor(cadastro.getValor())
          .desc(cadastro.getDesc())
          .status(cadastro.getStatus())
          .email(cadastro.getEmail())
          .build();

      return cadastroRepository.save(cadastroAtualizado);
    }).orElseGet(() -> {
      System.out.println("Cadastro não encontrado pelo ID: " + id);
      return null;
    });
  }

  public Cadastro createCadastro(Cadastro cadastro) {
    Cadastro novoCadastro = Cadastro.builder()
        .name(cadastro.getName())
        .item(cadastro.getItem())
        .defeito(cadastro.getDefeito())
        .dataEntrada(LocalDateTime.now().atZone(ZoneId.systemDefault()).toLocalDateTime())
        .dataSaida(cadastro.getDataSaida())
        .valor(cadastro.getValor())
        .desc(cadastro.getDesc())
        .status(cadastro.getStatus())
        .email(cadastro.getEmail())
        .build();

    return cadastroRepository.save(novoCadastro);
  }

}
