package com.betha.backend.cadastros.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import com.betha.backend.cadastros.chamadoDTO.ChamadoCompletoDTO;
import com.betha.backend.cadastros.models.Chamado;
import com.betha.backend.cadastros.models.Cliente;
import com.betha.backend.cadastros.models.Tecnico;
import com.betha.backend.cadastros.models.Enums.Perfils;
import com.betha.backend.cadastros.models.Enums.Status;
import com.betha.backend.cadastros.models.Enums.TecnicoCategorias;
import com.betha.backend.cadastros.repository.ChamadoRepository;
import com.betha.backend.cadastros.repository.TabelaRepository;

@ExtendWith(MockitoExtension.class)
public class ChamadoServiceImplTest {

	@InjectMocks
	private ChamadoServiceImpl chamadoServiceImpl;

	@Mock
	private ChamadoRepository chamadoRepository;

	@Mock
	private TabelaRepository tabelaRepository;

	private Chamado chamadoTeste;
	private Cliente clienteTeste;
	private Tecnico tecnicoTeste;

	@BeforeEach
	public void setup() {

		List<Chamado> chamadosTeste = new ArrayList<>();
		chamadosTeste.add(chamadoTeste);

		clienteTeste = new Cliente(1L, "cliente-nome", "cliente-email", "cliente-telefone", "cleinte-endereco",
				chamadosTeste);

		tecnicoTeste = new Tecnico(1L, "tecico-nome", "tecnico_email", "tecnico-senha", TecnicoCategorias.GERAL, null,
				Perfils.ADMIN, null);

		chamadoTeste = new Chamado(1L, clienteTeste, tecnicoTeste, "item-nome", "item-serie", Status.DISPONIVEL_TRIAGEM,
				"defeito-relatado", "analise-tecnica", null, LocalDateTime.now(), null, 0, null);
	}

	@Test
	@DisplayName("Deve salvar um novo chamado com sucesso")
	public void salvarNovoChamadoSucess() {

		when(chamadoRepository.save(any(Chamado.class))).thenReturn(chamadoTeste);
		Chamado resultado = chamadoServiceImpl.salvarNovoChamado(chamadoTeste);

		assertNotNull(resultado);
		assertEquals(resultado, chamadoTeste);
	}

	@Test
	@DisplayName("Deve lançar IllegalArgumentException, clienteId não pode ser nulo")
	public void salvarNovoChamadoErrorCase1() {

		chamadoTeste.setClienteId(null);

		IllegalArgumentException illegalArgumentException = assertThrows(IllegalArgumentException.class, () -> {
			chamadoServiceImpl.salvarNovoChamado(chamadoTeste);
		});
		Assertions.assertThat(illegalArgumentException.getMessage()).isEqualTo("clienteId não pode ser nulo");
	}

	@Test
	@DisplayName("Deve retornar uma lista de todos os chamados do Tecnico passado como parametro")
	public void todosChamadosDoTecnicoSucess() {

		List<Chamado> listaDeChamdosDoTecnicoRetorno = new ArrayList<>();
		listaDeChamdosDoTecnicoRetorno.add(chamadoTeste);

		when(chamadoRepository.buscarChamadosDo(anyString())).thenReturn(listaDeChamdosDoTecnicoRetorno);
		List<ChamadoCompletoDTO> resultados = chamadoServiceImpl.todosChamadosDo(anyString());

		assertNotNull(resultados);
		assertEquals(listaDeChamdosDoTecnicoRetorno.get(0).getTecnico().getId(), resultados.get(0).getTecnico());
	}

	@Test
	@DisplayName("Deve lançar noSuchElementException quando nao for encontrado chamado nenhum")
	public void todosChamadosDoTecnicoErrorCase1() {

		List<Chamado> ListaChamadoVaziaRetornada = new ArrayList<>();

		when(chamadoRepository.buscarChamadosDo(anyString())).thenReturn(ListaChamadoVaziaRetornada);
		NoSuchElementException noSuchElementException = assertThrows(NoSuchElementException.class, () -> {
			chamadoServiceImpl.todosChamadosDo(anyString());
		});
		Assertions.assertThat(noSuchElementException.getMessage())
				.isEqualTo("Não foi encontrado chamados para esse tecnico");
	}

	@Test
	@DisplayName("Retornar todos os Chamados de acordo com o filtro passado")
	public void todosChamdosComFiltroSucess() {

		List<String> filtros = new ArrayList<>();
		filtros.add("teste");
		List<Chamado> chamadosRetornados = new ArrayList<>();
		chamadosRetornados.add(chamadoTeste);

		when(tabelaRepository.findByStatusInFilter(anyList())).thenReturn(chamadosRetornados);
		List<ChamadoCompletoDTO> resultados = chamadoServiceImpl.todosChamadosCom(filtros);

		assertNotNull(resultados);
		assertEquals(chamadosRetornados.get(0).getItemSerie(), resultados.get(0).getItemSerie());
	}

	@Test
	@DisplayName("Retornar todos os chamados sem passar filtro")
	public void todosChamdosSemFiltroSucess() {

		List<String> filtros = new ArrayList<>();
		List<Chamado> chamadosRetornados = new ArrayList<>();
		chamadosRetornados.add(chamadoTeste);

		when(chamadoRepository.findAll()).thenReturn(chamadosRetornados);
		List<ChamadoCompletoDTO> resultados = chamadoServiceImpl.todosChamadosCom(filtros);

		assertNotNull(resultados);
		assertEquals(chamadosRetornados.get(0).getItemSerie(), resultados.get(0).getItemSerie());
	}

	@Test
	@DisplayName("Lançar NoSuchElementException quando não for encontrado chamado nenhum com o filtro")
	public void todosChamadosComFiltroErrorCase1() {

		List<String> filtros = new ArrayList<>();
		filtros.add("teste");
		chamadoTeste.setClienteId(null);
		List<Chamado> chamadosRetornados = new ArrayList<>();
		chamadosRetornados.add(chamadoTeste);

		when(tabelaRepository.findByStatusInFilter(anyList())).thenReturn(chamadosRetornados);
		NoSuchElementException noSuchElementException = assertThrows(NoSuchElementException.class, () -> {
			chamadoServiceImpl.todosChamadosCom(filtros);
		});

		Assertions.assertThat(noSuchElementException.getMessage()).isEqualTo("Aconteceu algum erro ao buscar o chamado");
	}

	@Test
	@DisplayName("Deve buscar um chamado completo pelo ID passado")
	public void buscarPeloIdSucess() {

		when(chamadoRepository.findById(anyLong())).thenReturn(Optional.of(chamadoTeste));
		ChamadoCompletoDTO resultado = chamadoServiceImpl.buscarPeloId(anyLong());

		assertNotNull(resultado);
	}

	@Test
	@DisplayName("Deve lançar StatusException quando nao for encontrado nenhum chamado utilizando o ID")
	public void buscarPeloIdErrorCase1() {

		when(chamadoRepository.findById(anyLong())).thenReturn(Optional.empty());
		ResponseStatusException responseStatusException = assertThrows(ResponseStatusException.class, () -> {
			chamadoServiceImpl.buscarPeloId(anyLong());
		});

		Assertions.assertThat(responseStatusException.getMessage()).isEqualTo("404 NOT_FOUND \"Chamado não encontrado\"");
	}

	@Test
	@DisplayName("Deve lançar NoSuchElementException quando tiver alguma coisa errada com o ID do chamado encontrado")
	public void buscarPeloIdErrorCase2() {

		chamadoTeste.setClienteId(null);

		when(chamadoRepository.findById(anyLong())).thenReturn(Optional.of(chamadoTeste));
		NoSuchElementException noSuchElementException = assertThrows(NoSuchElementException.class, () -> {
			chamadoServiceImpl.buscarPeloId(anyLong());
		});

		Assertions.assertThat(noSuchElementException.getMessage()).isEqualTo("Aconteceu algum erro ao buscar o chamado");
	}
}