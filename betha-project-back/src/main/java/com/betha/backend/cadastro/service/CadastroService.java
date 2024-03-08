package com.betha.backend.cadastro.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.betha.backend.cadastro.model.Cadastro;
import com.betha.backend.cadastro.repository.CadastroRepository;

@Service
public class CadastroService {

  private final CadastroRepository cadastroRepository;

  @Autowired
  public CadastroService(CadastroRepository cadastroRepository) {
    this.cadastroRepository = cadastroRepository;
  }

  @SuppressWarnings("null")
  public Cadastro editarItem(Long id, Cadastro cadastro) {
    Optional<Cadastro> cadastroExistenteOptional = cadastroRepository.findById(id);

    return cadastroExistenteOptional.map(cadastroExistente -> {
      Cadastro cadastroAtualizado = Cadastro.builder()
          .id(cadastroExistente.getId())
          .cliente(cadastro.getCliente())
          .email(cadastro.getEmail())
          .telefone(cadastro.getTelefone())
          .endereco(cadastro.getEndereco())
          .anotacao(cadastro.getAnotacao())
          .item(cadastro.getItem())
          .itemSerie(cadastro.getItemSerie())
          .status(cadastro.getStatus())
          .dataEntrada(cadastro.getDataEntrada())
          .desc(cadastro.getDesc())
          .dataSaida(cadastro.getDataSaida())
          .valor(cadastro.getValor())
          .image_urls(cadastro.getImage_urls())
          .build();

      return cadastroRepository.save(cadastroAtualizado);
    }).orElseGet(() -> {
      System.out.println("Cadastro não encontrado pelo ID: " + id);
      return null;
    });
  }

  @SuppressWarnings("null")
  public Cadastro createCadastro(Cadastro cadastro) {
    Cadastro novoCadastro = Cadastro.builder()
        .cliente(cadastro.getCliente())
        .email(cadastro.getEmail())
        .telefone(cadastro.getTelefone())
        .endereco(cadastro.getEndereco())
        .anotacao(cadastro.getAnotacao())
        .item(cadastro.getItem())
        .itemSerie(cadastro.getItemSerie())
        .status(cadastro.getStatus())
        .dataEntrada(LocalDateTime.now().atZone(ZoneId.systemDefault()).toLocalDateTime())
        .desc(cadastro.getDesc())
        .dataSaida(cadastro.getDataSaida())
        .valor(cadastro.getValor())
        .build();

    return cadastroRepository.save(novoCadastro);
  }

}
