package br.ufrn.imd.DTO;

public record EnderecoResponseDTO(
        String rua,
        String numero,
        String bairro,
        String cidade
) {
}