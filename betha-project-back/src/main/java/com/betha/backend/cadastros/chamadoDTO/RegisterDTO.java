package com.betha.backend.cadastros.chamadoDTO;

import com.betha.backend.cadastros.models.Enums.Perfils;
import com.betha.backend.cadastros.models.Enums.TecnicoCategorias;

public record RegisterDTO(String id, String email, String senha, Perfils perfil, String nome,
    TecnicoCategorias tecnicoCategorias) {

}
