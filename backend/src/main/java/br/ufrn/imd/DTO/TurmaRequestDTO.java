package br.ufrn.imd.DTO;

import java.util.Set;
import java.util.UUID;

public record TurmaRequestDTO(
        UUID id,
        String nome
) {}
