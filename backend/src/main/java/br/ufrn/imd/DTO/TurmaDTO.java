package br.ufrn.imd.DTO;

import br.ufrn.imd.Turno;

import java.util.UUID;

public record TurmaDTO(UUID id, String codigo, int vagas, Turno turno) {}
