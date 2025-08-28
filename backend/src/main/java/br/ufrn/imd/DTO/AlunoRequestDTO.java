package br.ufrn.imd.DTO;

import br.ufrn.imd.Entitys.Turma;
import com.fasterxml.jackson.annotation.JsonFormat;
import br.ufrn.imd.Entitys.Endereco;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

public record AlunoRequestDTO(
        @NotBlank(message = "Nome é obrigatório") String nome,
        @NotBlank(message = "Telefone é obrigatório") String telefone,
        @NotBlank(message = "Nome da mãe é obrigatório") String nomeMae,
        String nomePai,
        @NotBlank(message = "Sexo é obrigatório") String sexo,
        @NotNull(message = "Data de nascimento é obrigatória") @Past(message = "Data de nascimento deve ser no passado") LocalDate dataNascimento,
        @NotBlank(message = "Rua é obrigatória") String rua,
        @NotBlank(message = "Número é obrigatório") String numero,
        @NotBlank(message = "Bairro é obrigatório") String bairro,
        @NotBlank(message = "Cidade é obrigatória") String cidade
) {}


