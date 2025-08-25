package br.ufrn.imd.Entitys;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "matricula", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"aluno_id", "turma_id"})
})
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class Matricula {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="aluno_id", nullable = false)
    private Aluno aluno;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="turma_id", nullable = false)
    private Turma turma;

    private String matriculaCodigo;
    private LocalDate dataMatricula;
}
