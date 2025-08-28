package br.ufrn.imd.DTO;

import java.util.UUID;

public record MatriculaRequestDTO(UUID alunoId, UUID turmaId) {
}