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

	@Test
	@DisplayName("Deve salvar um novo tecnico ao chamado")
	public void editarTecnicoDoChamadoSucess() {

		// arrange
		Long chamadoId = (long) 1;
		Long tecnicoId = (long) 1;

		Chamado chamadoExistente = new Chamado();
		Tecnico novoTecnico = new Tecnico();

		Mockito.when(chamadoRepository.findById(chamadoId)).thenReturn(Optional.of(chamadoExistente));

		Mockito.when(tecnicoRepository.findById(tecnicoId)).thenReturn(Optional.of(novoTecnico));

		// action
		tecnicoService.editarTecnicoDoChamado(chamadoId, tecnicoId);

		// assertions
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
			tecnicoService.editarTecnicoDoChamado(1L, 2L);
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
			tecnicoService.editarTecnicoDoChamado(1L, 2L);
		});

		Assertions.assertThat(responseStatusException.getMessage()).isEqualTo("404 NOT_FOUND \"Tecnico não encontrado\"");
	}

	@Test
	@DisplayName("Deve lançar IllegalArgument se existir email no banco")
	public void salvarNovoTecnicoErrorCase1() {

		RegisterDTO tecnicoDados = new RegisterDTO("1", "email@mail", "senha", Perfils.ADMIN, "null",
				TecnicoCategorias.SEM_CATEGORIA);

		Mockito.when(tecnicoRepository.findByEmail(anyString()))
				.thenReturn(new Tecnico("email@mail", "null", Perfils.ADMIN, "null", TecnicoCategorias.SEM_CATEGORIA));

		IllegalArgumentException illegalArgumentException = assertThrows(IllegalArgumentException.class, () -> {
			tecnicoService.salvarNovoTecnico(tecnicoDados);
		});

		Assertions.assertThat(illegalArgumentException.getMessage()).isEqualTo("Email já cadastrado");
	}

	@Test
	@DisplayName("Deve salvar corretamente um tecnico no banco")
	public void salvarNovoTecnicoSucesso() {

		RegisterDTO dto = new RegisterDTO("1", "email@mail.com", "senha", Perfils.ADMIN, "nome",
				TecnicoCategorias.SEM_CATEGORIA);
		BCryptPasswordEncoder mockEncoder = mock(BCryptPasswordEncoder.class);

		when(tecnicoRepository.findByEmail(dto.email())).thenReturn(null);
		lenient().when(mockEncoder.encode(dto.senha())).thenReturn("senhaCriptografada");
		Tecnico tecnicoSalvo = new Tecnico("email@mail.com", "senhaCriptografada", Perfils.ADMIN, "nome",
				TecnicoCategorias.SEM_CATEGORIA);
		when(tecnicoRepository.save(any(Tecnico.class))).thenReturn(tecnicoSalvo);

		Tecnico result = tecnicoService.salvarNovoTecnico(dto);

		assertNotNull(result);
		assertEquals("email@mail.com", result.getEmail());
		assertEquals("senhaCriptografada", result.getSenha());
		assertEquals(Perfils.ADMIN, result.getPerfil());
		assertEquals("nome", result.getNome());
		assertEquals(TecnicoCategorias.SEM_CATEGORIA, result.getTecnicoCategorias());
	}
}