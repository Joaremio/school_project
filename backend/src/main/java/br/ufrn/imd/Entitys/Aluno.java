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
@Table(name="alunos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Aluno {

    @Id
    @GeneratedValue
    private UUID id;

    private String nome;

    private String matricula;

    private String telefone;

    private String sexo;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate nascimento;

    private String mae;

    private String pai;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate inscricao;


    @OneToOne(cascade = CascadeType.ALL)  // Garante que o Endereco seja salvo automaticamente

    @JoinColumn(name = "endereco_id", referencedColumnName = "id")
    private Endereco endereco;

    @ManyToOne
    @JoinColumn(name = "turma_id", referencedColumnName = "id")
    @JsonIgnoreProperties("alunos") // Evita loop e permite exibir a turma no JSON do aluno
    private Turma turma;


}
