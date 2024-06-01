package com.betha.backend.cadastros.models;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.betha.backend.cadastros.models.Enums.Perfils;
import com.betha.backend.cadastros.models.Enums.TecnicoCategorias;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tecnico", schema = "manutencao")

public class Tecnico implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @Column
  private Long id;

  @Column
  @NotNull
  private String nome;

  @Column(unique = true)
  @NotNull
  private String email;

  @Column
  @NotNull
  private String senha;

  @Column(name = "tecnico_categorias")
  @Enumerated(EnumType.STRING)
  private TecnicoCategorias tecnicoCategorias;

  @Column
  private String imagem;

  @Column
  @Enumerated(EnumType.STRING)
  @NotNull
  private Perfils perfil;

  @OneToMany(mappedBy = "tecnico")
  private List<Chamado> chamados = new ArrayList<>();

  public Tecnico(String email, String senha, Perfils perfil, String nome, TecnicoCategorias tecnicoCategorias) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.tecnicoCategorias = tecnicoCategorias;
    this.perfil = perfil;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    List<SimpleGrantedAuthority> authorities = new ArrayList<>();

    switch (this.perfil) {
      case ADMIN:
        authorities.addAll(List.of(
            new SimpleGrantedAuthority("ROLE_ADMIN"),
            new SimpleGrantedAuthority("ROLE_RECEPCAO"),
            new SimpleGrantedAuthority("ROLE_TRIAGEM"),
            new SimpleGrantedAuthority("ROLE_TECNICO"),
            new SimpleGrantedAuthority("ROLE_MANUTENCAO")));
        break;
      case RECEPCAO:
        authorities.add(new SimpleGrantedAuthority("ROLE_RECEPCAO"));
        break;
      case TRIAGEM:
        authorities.add(new SimpleGrantedAuthority("ROLE_TRIAGEM"));
        break;
      case TECNICO:
        authorities
            .addAll(List.of(new SimpleGrantedAuthority("ROLE_TECNICO"), new SimpleGrantedAuthority("ROLE_ADMIN")));
        break;
      case MANUTENCAO:
        authorities.add(new SimpleGrantedAuthority("ROLE_MANUTENCAO"));
        break;
    }
    return authorities;
  }

  @Override
  public String getPassword() {
    return senha;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

}
