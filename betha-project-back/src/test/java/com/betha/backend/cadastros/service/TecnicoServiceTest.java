package com.betha.backend.cadastros.service;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyLong;

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
import org.springframework.web.server.ResponseStatusException;

import com.betha.backend.cadastros.models.Chamado;
import com.betha.backend.cadastros.models.Tecnico;
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
	@DisplayName("Deve setar um novo tecnico ao chamado")
	public void deveEditarTecnicoDoChamadoSucesso() {

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
	public void deveLancarExcecaoQuandoChamadoNaoEncontrado() {

		Mockito.when(chamadoRepository.findById(ArgumentMatchers.any())).thenReturn(Optional.empty());
		ResponseStatusException responseStatusException = assertThrows(ResponseStatusException.class, () -> {
			tecnicoService.editarTecnicoDoChamado(1L, 2L);
		});

		Assertions.assertThat(responseStatusException.getMessage()).isEqualTo("404 NOT_FOUND \"Chamado não encontrado\"");
	}

	@Test
	@DisplayName("Deve lançar 404 se nao encontrar o tecnico no banco")
	public void deveLancarExcecaoQuandoTecnicoNaoEncontrado() {

		Chamado chamadoExistente = new Chamado();
		Mockito.when(chamadoRepository.findById(anyLong())).thenReturn(Optional.of(chamadoExistente));
		Mockito.when(tecnicoRepository.findById(ArgumentMatchers.any())).thenReturn(Optional.empty());

		ResponseStatusException responseStatusException = assertThrows(ResponseStatusException.class, () -> {
			tecnicoService.editarTecnicoDoChamado(1L, 2L);
		});

		Assertions.assertThat(responseStatusException.getMessage()).isEqualTo("404 NOT_FOUND \"Tecnico não encontrado\"");
	}
}