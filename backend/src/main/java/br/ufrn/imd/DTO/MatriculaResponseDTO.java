package br.ufrn.imd.DTO;


import br.ufrn.imd.StatusMatricula;

import java.time.LocalDate;
import java.util.UUID;

public record MatriculaResponseDTO(UUID id, UUID alunoId, UUID turmaId, LocalDate dataMatricula,
                                   StatusMatricula status) {
}