package com.betha.backend.cadastros.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Random;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import com.betha.backend.cadastros.chamadoDTO.RegisterDTO;
import com.betha.backend.cadastros.models.Tecnico;
import com.betha.backend.cadastros.models.Enums.Perfils;
import com.betha.backend.cadastros.models.Enums.TecnicoCategorias;

import jakarta.persistence.EntityManager;

@DataJpaTest
@ActiveProfiles("test")
public class TecnicoRepositoryTest {

	@Autowired
	private TecnicoRepository tecnicoRepository;

	@Autowired
	EntityManager entityManager;

	Random random = new Random();
	long idTecnico = random.nextInt(10000);
	long idCliente = random.nextInt(10000);

	@Test
	@DisplayName("Primeiro teste com banco")
	void salvarNovoTecnico(RegisterDTO tecnicoDados) {
		RegisterDTO data = new RegisterDTO("1", "admin@mail", "senha", Perfils.ADMIN, "ADMIN",
				TecnicoCategorias.SEM_CATEGORIA);

		this.criarTecnico(data);

		Tecnico tecnicoAchado = tecnicoRepository.findByEmail("admin@mail");
		assertNotNull(tecnicoAchado);
		assertEquals("admin@mail", tecnicoAchado.getEmail());

	}

	private void criarTecnico(RegisterDTO data) {
		Tecnico novoTecnico = new Tecnico(
				data.email(), data.senha(), data.perfil(), data.nome(), data.tecnicoCategorias());
		tecnicoRepository.save(novoTecnico);
	}

	// @Test
	// @DisplayName("Busca Email Do Tecnico No Banco")
	// void findByEmail() {
	// salvarChamadoNoBanco();
	// UserDetails resultado = tecnicoRepository.findByEmail("teste@mail");
	// if (resultado != null) {
	// System.out.println("achou");
	// } else {
	// System.out.println("Nao achou");
	// }
	// }

	// private void salvarChamadoNoBanco() {
	// Chamado chamadoParaSerSalvo = criarChamado();
	// this.entityManager.persist(chamadoParaSerSalvo);
	// }

	// private Chamado criarChamado() {
	// var cliente = criarNovoCliente();
	// var tecnico = criarNovoTecnico();
	// var id = 1;
	// List<String> imageUrls = new ArrayList<>();
	// imageUrls.add("item1");
	// imageUrls.add("item2");
	// Chamado novoChamado = new Chamado((long) id, cliente, tecnico, "nomeItem",
	// "itemSerie", Status.DISPONIVEL_TRIAGEM,
	// "defeitoRelatado",
	// "analiseTecnica", "NaoConcluido", LocalDateTime.now(),
	// LocalDateTime.now().plusMinutes(1), 50, imageUrls);
	// return novoChamado;

	// }

	// private Cliente criarNovoCliente() {
	// Cliente novoCliente = new Cliente(idCliente, "nome", "cliente@mail",
	// "123456789", "rua", null);
	// return novoCliente;
	// }

	// private Tecnico criarNovoTecnico() {
	// // List<Chamado> chamadosDoTecnico = criarListaDeChamadosDoTecnico();
	// Tecnico novTecnico = new Tecnico(idTecnico, "nomeTecnico", "tecnico@mail",
	// "tecnicoNome",
	// TecnicoCategorias.SEM_CATEGORIA, "url.google.image", Perfils.TECNICO, null);
	// return novTecnico;
	// }

	// private List<Chamado> criarListaDeChamadosDoTecnico() {
	// List<Chamado> chamadosDoTecnico = new ArrayList<Chamado>();
	// for (int i = 0; i < 5; i++) {
	// Chamado novoChamado = salvarChamadoNoBanco();
	// chamadosDoTecnico.add(novoChamado);
	// }
	// return chamadosDoTecnico;
	// }

	@Test
	void buscarTecnicosManutencao() {
	}

	@Test
	void findByTecnicoCategorias() {
	}
}