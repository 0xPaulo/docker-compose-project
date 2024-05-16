package com.betha.backend.cadastros.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.betha.backend.cadastros.repository.TecnicoRepository;

@Service
public class AuthenticateService implements UserDetailsService {

  @Autowired
  TecnicoRepository tecnicoRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return tecnicoRepository.findByEmail(username);
  }

}
