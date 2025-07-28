package br.ufrn.imd.Entitys;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name="aluno")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Aluno {

    @Id
    @GeneratedValue
    private UUID id;

    private String nome;
    private String cpf;
    private String email;
    private String telefone;
    private String matricula;
    private String nomeMae;
    private String nomePai;
    private String sexo;
    private boolean ativo;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataMatricula;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataNascimento;

    @OneToOne
    @JoinColumn(name="endereco_id")
    private Endereco endereco;

}
