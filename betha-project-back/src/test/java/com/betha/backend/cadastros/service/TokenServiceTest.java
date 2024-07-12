package com.betha.backend.cadastros.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.time.Instant;
import java.util.Date;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.betha.backend.cadastros.models.Tecnico;
import com.betha.backend.cadastros.models.Enums.Perfils;
import com.betha.backend.cadastros.models.Enums.TecnicoCategorias;

@ExtendWith(MockitoExtension.class)
public class TokenServiceTest {

	@InjectMocks
	private TokenService tokenService;

	private Tecnico tecnicoTeste;

	@BeforeEach
	public void setup() {

		tecnicoTeste = new Tecnico(1L, "nome-teste", "email-teste@mail", "senha-teste", TecnicoCategorias.SEM_CATEGORIA,
				null, Perfils.ADMIN, null);
	}

	@Test
	@DisplayName("Deve gerar token com sucesso")
	public void shouldGenerateToken() {

		String token = tokenService.generateToken(tecnicoTeste);

		assertNotNull(token);
	}

	@Test
	@DisplayName("Deve lançar error RuntimeException ao tentar criar token porem algum valor for nulo")
	public void shouldGenerateTokenCaseError1() {

		tecnicoTeste.setId(null);

		RuntimeException e = assertThrows(RuntimeException.class, () -> {
			tokenService.generateToken(tecnicoTeste);
		});

		Assertions.assertThat(e.getMessage()).isEqualTo("Erro ao gerar token devido a um valor nulo.");
	}

	@Test
	@DisplayName("Deve validar o token com sucesso e retornar o Subject")
	public void shouldValidateToken() {

		Algorithm algorithm = Algorithm.HMAC256("secret");
		String token = JWT.create()
				.withIssuer("auth-api")
				.withSubject(tecnicoTeste.getEmail())
				.withExpiresAt(Date.from(Instant.now().plusSeconds(3600)))
				.sign(algorithm);

		String resultado = tokenService.validateToken(token);

		assertNotNull(resultado);
		assertEquals(resultado, "email-teste@mail");

	}

	@Test
	@DisplayName("Deve validar o token e caso encontre um erro, retornar nada")
	public void shouldValidateTokenErrorCase1() {

		Algorithm algorithm = Algorithm.HMAC256("secret-errado");
		String token = JWT.create()
				.withIssuer("auth-api")
				.withSubject(tecnicoTeste.getEmail())
				.withExpiresAt(Date.from(Instant.now().plusSeconds(3600)))
				.sign(algorithm);

		String resultado = tokenService.validateToken(token);

		assertNotNull(resultado);
		assertEquals(resultado, "");
	}
}
