package br.ufrn.imd.DTO;

import br.ufrn.imd.Turno;

import java.util.Set;
import java.util.UUID;

public record TurmaRequestDTO(
        Turno turno,
        int vagas
) {}
