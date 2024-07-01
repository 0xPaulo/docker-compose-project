package com.betha.backend.cadastros.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.ArgumentMatchers;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import com.betha.backend.cadastros.chamadoDTO.RegisterDTO;
import com.betha.backend.cadastros.models.Chamado;
import com.betha.backend.cadastros.models.Tecnico;
import com.betha.backend.cadastros.models.Enums.Perfils;
import com.betha.backend.cadastros.models.Enums.TecnicoCategorias;
import com.betha.backend.cadastros.repository.ChamadoRepository;
import com.betha.backend.cadastros.repository.TecnicoRepository;

@ExtendWith(MockitoExtension.class)
public class TecnicoServiceTest {

	@InjectMocks
	TecnicoService tecnicoService;

	@Mock
	ChamadoRepository chamadoRepository;

	@Mock
	TecnicoRepository tecnicoRepository;

	@Captor
	ArgumentCaptor<Chamado> chamadoCaptor;

	@Captor
	ArgumentCaptor<Tecnico> tecnicoCaptor;

	private long chamadoId = 1L;
	private Long tecnicoId = 2L;
	private Tecnico tecnicoTeste;
	private RegisterDTO registroDTO;

	@BeforeEach
	public void setUp() {
		tecnicoTeste = new Tecnico("email@mail.com", "senha", Perfils.ADMIN, "nome", TecnicoCategorias.SEM_CATEGORIA);
		registroDTO = new RegisterDTO("2", "email@mail", "senha", Perfils.ADMIN, "nome", TecnicoCategorias.SEM_CATEGORIA);
	}

	@Test
	@DisplayName("Deve salvar um novo tecnico ao chamado")
	public void editarTecnicoDoChamadoSucess() {

		Chamado chamadoExistente = new Chamado();
		Mockito.when(chamadoRepository.findById(chamadoId)).thenReturn(Optional.of(chamadoExistente));
		Mockito.when(tecnicoRepository.findById(tecnicoId)).thenReturn(Optional.of(tecnicoTeste));

		tecnicoService.editarTecnicoDoChamado(chamadoId, tecnicoId);

		Mockito.verify(chamadoRepository).findById(chamadoId);
		Mockito.verify(tecnicoRepository).findById(tecnicoId);
		Mockito.verify(chamadoRepository).save(chamadoCaptor.capture());
		Chamado chamadoModificado = chamadoCaptor.getValue();
		Assertions.assertThat(chamadoModificado.getTecnico()).isNotNull();
		Assertions.assertThat(chamadoModificado.getStatus().name()).isEqualTo("EM_MANUTENCAO");
	}

	@Test
	@DisplayName("Deve lançar 404 se nao encontrar o chamado no banco")
	public void editarTecnicoDoChamadoErrorCase1() {

		Mockito.when(chamadoRepository.findById(ArgumentMatchers.any())).thenReturn(Optional.empty());
		ResponseStatusException responseStatusException = assertThrows(ResponseStatusException.class, () -> {
			tecnicoService.editarTecnicoDoChamado(chamadoId, tecnicoId);
		});

		Assertions.assertThat(responseStatusException.getMessage()).isEqualTo("404 NOT_FOUND \"Chamado não encontrado\"");
	}

	@Test
	@DisplayName("Deve lançar 404 se nao encontrar o tecnico no banco")
	public void editarTecnicoDoChamadoErrorCase2() {

		Chamado chamadoExistente = new Chamado();
		Mockito.when(chamadoRepository.findById(anyLong())).thenReturn(Optional.of(chamadoExistente));
		Mockito.when(tecnicoRepository.findById(ArgumentMatchers.any())).thenReturn(Optional.empty());

		ResponseStatusException responseStatusException = assertThrows(ResponseStatusException.class, () -> {
			tecnicoService.editarTecnicoDoChamado(chamadoId, tecnicoId);
		});

		Assertions.assertThat(responseStatusException.getMessage()).isEqualTo("404 NOT_FOUND \"Tecnico não encontrado\"");
	}

	@Test
	@DisplayName("Deve salvar corretamente um tecnico no banco")
	public void salvarNovoTecnicoSucesso() {

		BCryptPasswordEncoder mockEncoder = mock(BCryptPasswordEncoder.class);

		when(tecnicoRepository.findByEmail(registroDTO.email())).thenReturn(null);
		lenient().when(mockEncoder.encode(registroDTO.senha())).thenReturn("senhaCriptografada");
		tecnicoTeste.setSenha("senhaCriptografada");
		when(tecnicoRepository.save(any(Tecnico.class))).thenReturn(tecnicoTeste);

		Tecnico result = tecnicoService.salvarNovoTecnico(registroDTO);

		assertNotNull(result);
		assertEquals(tecnicoTeste.getEmail(), result.getEmail());
		assertEquals(tecnicoTeste.getSenha(), result.getSenha());
		assertEquals(tecnicoTeste.getPerfil(), result.getPerfil());
		assertEquals(tecnicoTeste.getNome(), result.getNome());
		assertEquals(tecnicoTeste.getTecnicoCategorias(), result.getTecnicoCategorias());
	}

	@Test
	@DisplayName("Deve lançar IllegalArgument se existir email no banco")
	public void salvarNovoTecnicoErrorCase1() {

		Mockito.when(tecnicoRepository.findByEmail(anyString()))
				.thenReturn(new Tecnico("email@mail", "senha", Perfils.ADMIN, "nome", TecnicoCategorias.SEM_CATEGORIA));

		IllegalArgumentException illegalArgumentException = assertThrows(IllegalArgumentException.class, () -> {
			tecnicoService.salvarNovoTecnico(registroDTO);
		});

		Assertions.assertThat(illegalArgumentException.getMessage()).isEqualTo("Email já cadastrado");
	}

	@Test
	@DisplayName("Deve trocar a senha do tecnico com sucesso")
	public void trocarSenhaDoTecnicoSucess() {

		Tecnico tecnicoEncontrado = new Tecnico("email@mail.com", "senha", Perfils.ADMIN, "nome",
				TecnicoCategorias.SEM_CATEGORIA);

		Mockito.when(tecnicoRepository.findById(tecnicoId)).thenReturn(Optional.of(tecnicoEncontrado));

		tecnicoService.trocarSenhaDoTecnico(registroDTO);

		Mockito.verify(tecnicoRepository).findById(tecnicoId);
		Mockito.verify(tecnicoRepository).save(tecnicoCaptor.capture());
		Tecnico tecnicoModificado = tecnicoCaptor.getValue();
		Assertions.assertThat(tecnicoModificado.getSenha()).isNotNull();
		Assertions.assertThat(registroDTO.senha()).isNotEqualTo(tecnicoEncontrado.getSenha());
	}

	@Test
	@DisplayName("Deve lançar ResponseStatusException por nao ter encontrado o tecnico")
	public void trocarSenhaDoTecnicoErrorCase1() {

		Mockito.when(tecnicoRepository.findById(tecnicoId)).thenReturn(Optional.empty());

		ResponseStatusException responseStatusException = assertThrows(ResponseStatusException.class, () -> {
			tecnicoService.trocarSenhaDoTecnico(registroDTO);
		});
		Assertions.assertThat(responseStatusException.getMessage()).isEqualTo("404 NOT_FOUND \"Tecnico não encontrado\"");

		Mockito.verify(tecnicoRepository).findById(tecnicoId);

	}
}