package br.ufrn.imd.DTO;

import br.ufrn.imd.Entitys.Turma;
import com.fasterxml.jackson.annotation.JsonFormat;
import br.ufrn.imd.Entitys.Endereco;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

public record AlunoRequestDTO(
        String nome,
        String matricula,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        LocalDate nascimento,
        String sexo,
        String telefone,
        EnderecoRequestDTO endereco,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        LocalDate inscricao,  // Alterado de Date para LocalDate
        UUID turmaId,
        String mae,
        String pai)
{
}

