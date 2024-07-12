package com.betha.backend.cadastros.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.betha.backend.cadastros.models.Tecnico;
import com.betha.backend.cadastros.repository.TecnicoRepository;

@ExtendWith(MockitoExtension.class)
public class AuthenticateServiceTest {

	@InjectMocks
	private AuthenticateService authenticateService;

	@Mock
	private TecnicoRepository tecnicoRepository;

	private Tecnico tecnicoTeste;

	@BeforeEach
	public void setup() {
		tecnicoTeste = new Tecnico();
		tecnicoTeste.setEmail("emailTeste@mail");
		tecnicoTeste.setSenha("senha");
	}

	@Test
	@DisplayName("Metodo que sobreescreve UserDetails deve buscar com sucesso o email")
	public void deveLoadUserByUsername() {

		when(tecnicoRepository.findByEmail("emailTeste@mail")).thenReturn(tecnicoTeste);

		UserDetails resultado = authenticateService.loadUserByUsername("emailTeste@mail");

		assertNotNull(resultado);
		assertEquals("emailTeste@mail", resultado.getUsername());
		assertEquals("senha", resultado.getPassword());

	}

	@Test
	public void deveLoadUserByUsernameCaseError1() {
		when(tecnicoRepository.findByEmail("emailNaoExiste@mail")).thenThrow(UsernameNotFoundException.class);

		assertThrows(UsernameNotFoundException.class, () -> {
			authenticateService.loadUserByUsername("emailNaoExiste@mail");
		});
	}
}
