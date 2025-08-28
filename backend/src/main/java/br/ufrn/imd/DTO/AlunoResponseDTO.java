package br.ufrn.imd.DTO;

import java.time.LocalDate;
import java.util.UUID;

public record AlunoResponseDTO(
        UUID id,
        String nome,
        String telefone,
        String matricula,
        String nomeMae,
        String nomePai,
        String sexo,
        LocalDate dataNascimento,
        EnderecoResponseDTO endereco
) {
}
