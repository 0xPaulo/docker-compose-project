package com.betha.backend.cadastros.service;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

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

	@Test
	@DisplayName("Deve setar um novo tecnico ao chamado")
	public void shouldEditarTecnicoDoChamadoSucesso() {

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
		Mockito.verify(chamadoRepository).save(chamadoExistente);
	}

}
