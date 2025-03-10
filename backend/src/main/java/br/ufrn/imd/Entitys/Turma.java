package br.ufrn.imd.Entitys;


import br.ufrn.imd.Turno;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "turmas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Turma {

    @Id
    @GeneratedValue
    private UUID id;

    private String nome; // Ex: "Matutino", "Vespertino", "Noturno"

    @OneToMany(mappedBy = "turma", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference // Indica que esta é a parte "gerenciada" do relacionamento
    private Set<Aluno> alunos = new HashSet<>();
}
