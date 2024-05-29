package com.betha.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
  @Autowired
  SecurityFilter securityFilter;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
    return httpSecurity
        .csrf(csrf -> csrf.disable())
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(
            authorize -> authorize

                .requestMatchers(HttpMethod.POST, "/tecnico/login").permitAll()

                // Cadastrar
                .requestMatchers(HttpMethod.GET, "/cadastros").hasAnyRole("ADMIN", "RECEPCAO")
                .requestMatchers(HttpMethod.PATCH, "/cadastros").hasAnyRole("ADMIN", "RECEPCAO")
                .requestMatchers(HttpMethod.POST, "/cadastros").hasAnyRole("ADMIN", "RECEPCAO")
                .requestMatchers(HttpMethod.DELETE, "/cadastros").hasAnyRole("ADMIN", "RECEPCAO")
                .requestMatchers(HttpMethod.POST, "/clientes").hasAnyRole("ADMIN", "RECEPCAO")

                // Triagem
                .requestMatchers(HttpMethod.GET, "/triagem").hasAnyRole("ADMIN", "TRIAGEM")
                .requestMatchers(HttpMethod.PATCH, "/triagem").hasAnyRole("ADMIN", "TRIAGEM")

                // Tecnico
                .requestMatchers(HttpMethod.GET, "/tecnico").hasAnyRole("ADMIN", "TECNICO")
                .requestMatchers(HttpMethod.POST, "/tecnico").hasAnyRole("ADMIN", "TECNICO")
                .requestMatchers(HttpMethod.PATCH, "/tecnico").hasAnyRole("ADMIN", "TECNICO")
                .requestMatchers(HttpMethod.POST, "/uploadToGoogleDrive").permitAll()
                .requestMatchers(HttpMethod.GET, "/proxy").permitAll()
                .requestMatchers(HttpMethod.GET, "/concluido").hasAnyRole("ADMIN", "TECNICO")

                // Manutencao
                // trocar para url manutencao e cada um com o seu
                .requestMatchers(HttpMethod.GET, "/tecnico").hasAnyRole("ADMIN", "MANUTENCAO") // sem route controler

                .requestMatchers(HttpMethod.POST, "/tecnico/register").hasRole("ADMIN")
                .anyRequest().authenticated())
        .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
      throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
