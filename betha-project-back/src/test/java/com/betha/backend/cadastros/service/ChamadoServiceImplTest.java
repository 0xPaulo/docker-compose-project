package com.betha.backend.cadastros.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.betha.backend.cadastros.models.Chamado;
import com.betha.backend.cadastros.models.Cliente;
import com.betha.backend.cadastros.models.Tecnico;
import com.betha.backend.cadastros.models.Enums.Perfils;
import com.betha.backend.cadastros.models.Enums.Status;
import com.betha.backend.cadastros.models.Enums.TecnicoCategorias;
import com.betha.backend.cadastros.repository.ChamadoRepository;

@ExtendWith(MockitoExtension.class)
public class ChamadoServiceImplTest {

	@InjectMocks
	private ChamadoServiceImpl chamadoServiceImpl;

	@Mock
	private ChamadoRepository chamadoRepository;

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
	@DisplayName("Deve lançar IllegalArgumentException clienteId não pode ser nulo")
	public void salvarNovoChamadoErrorCase1() {

		chamadoTeste.setClienteId(null);

		IllegalArgumentException illegalArgumentException = assertThrows(IllegalArgumentException.class, () -> {
			chamadoServiceImpl.salvarNovoChamado(chamadoTeste);
		});
		Assertions.assertThat(illegalArgumentException.getMessage()).isEqualTo("clienteId não pode ser nulo");
	}

}
