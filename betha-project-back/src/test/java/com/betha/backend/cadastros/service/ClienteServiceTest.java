package com.betha.backend.cadastros.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.betha.backend.cadastros.chamadoDTO.FormCliente;
import com.betha.backend.cadastros.models.Cliente;
import com.betha.backend.cadastros.repository.ClienteRepository;

@ExtendWith(MockitoExtension.class)
public class ClienteServiceTest {

	@InjectMocks
	private ClienteService clienteService;

	@Mock
	ClienteRepository clienteRepository;

	private FormCliente novoCliente;
	private Cliente clienteTeste;

	@BeforeEach
	public void setup() {
		novoCliente = new FormCliente(1L, "nome", "email@mail", "9999999", "endereco");
		clienteTeste = new Cliente(1L, "nome", "email@mail", "9999999", "endereco", null);
	}

	@Test
	@DisplayName("Deve salvar um novo cliente no banco com sucesso")
	public void salvarNovoClienteSucess() {

		when(clienteRepository.save(any(Cliente.class))).thenReturn(clienteTeste);
		Cliente clienteRetornado = clienteService.salvarNovoCliente(novoCliente);

		assertNotNull(clienteRetornado);
		assertEquals(clienteTeste.getId(), clienteRetornado.getId());
	}

	@Test
	@DisplayName("Deve emitir illegalArgumentException se algum campo do FormCliente for null")
	public void salvarNovoClienteErrorCase1() {

		novoCliente = new FormCliente(1L, null, "email@mail", "9999999", "endereco");

		IllegalArgumentException illegalArgumentException = assertThrows(IllegalArgumentException.class, () -> {
			clienteService.salvarNovoCliente(novoCliente);
		});

		Assertions.assertThat(illegalArgumentException.getMessage())
				.isEqualTo("Todos os campos do FormCliente devem ser preenchidos.");
	}
}