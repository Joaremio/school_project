package br.ufrn.imd.Repositories;

import br.ufrn.imd.Entitys.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AlunoRepository extends JpaRepository<Aluno, UUID> {
    public Optional<Aluno> findById(UUID id);

    @Query("SELECT a FROM Aluno a WHERE a.id NOT IN (SELECT a2.id FROM Turma t JOIN t.alunos a2 WHERE t.id = :turmaId)")
    List<Aluno>  findAlunosNotInTurma(@Param("turmaId") UUID turmaId);
}
