package com.betha.backend.cadastros.chamadoDTO;

import java.util.List;

public record PaginatorChamadoCompleto(List<ChamadoCompletoDTO> chamadoCompletoDTOs, long totalRegistros,
    int totalPaginas) {

}
