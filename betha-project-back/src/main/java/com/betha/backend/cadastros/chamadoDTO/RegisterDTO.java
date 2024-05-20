package com.betha.backend.cadastros.chamadoDTO;

import com.betha.backend.cadastros.models.Enums.Perfils;

public record RegisterDTO(String email, String senha, Perfils perfil) {

}
