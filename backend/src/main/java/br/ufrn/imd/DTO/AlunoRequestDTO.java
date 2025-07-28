package br.ufrn.imd.DTO;

import br.ufrn.imd.Entitys.Turma;
import com.fasterxml.jackson.annotation.JsonFormat;
import br.ufrn.imd.Entitys.Endereco;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

public record AlunoRequestDTO(
        @NotBlank String nome,
        @NotBlank String telefone,
        @NotBlank String nomeMae,
        String nomePai,
        @NotBlank String sexo,
        @NotNull LocalDate dataNascimento,
        @NotBlank String rua,
        @NotBlank String numero,
        @NotBlank String bairro,
        @NotBlank String cidade
) {}


