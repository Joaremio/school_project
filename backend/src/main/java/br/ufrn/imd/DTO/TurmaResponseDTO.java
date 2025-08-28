package br.ufrn.imd.DTO;


import br.ufrn.imd.Turno;

import java.util.UUID;

public record TurmaResponseDTO(UUID id, String codigo, Turno turno, int vagas, int quantidadeAlunos) {
}
