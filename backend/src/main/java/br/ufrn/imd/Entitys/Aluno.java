package br.ufrn.imd.Entitys;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "aluno")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Aluno {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String telefone;

    @Column(unique = true) // pode ser nulo, mas deve ser único se informado
    private String matricula;

    @Column(nullable = false)
    private String nomeMae;

    private String nomePai; // pode ser nulo

    @Column(nullable = false)
    private String sexo;

    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
    private boolean ativo=true;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataMatricula;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataNascimento;

    @OneToOne
    @JoinColumn(name = "endereco_id", nullable = false)
    private Endereco endereco;
}
