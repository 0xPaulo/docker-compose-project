package com.betha.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();
		String DB_HOST = dotenv.get("DB_HOST");
		String DB_PORT = dotenv.get("DB_PORT");

		System.out.println("URL do banco de dados: " + DB_HOST);
		System.out.println("PORTA do banco de dados: " + DB_PORT);
		dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

		SpringApplication.run(BackendApplication.class, args);
	}

}
