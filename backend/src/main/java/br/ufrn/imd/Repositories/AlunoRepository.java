package br.ufrn.imd.Repositories;

import br.ufrn.imd.Entitys.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface AlunoRepository extends JpaRepository<Aluno, UUID> {

    @Query("SELECT a FROM Aluno a WHERE a.id NOT IN (SELECT m.aluno.id FROM Matricula m WHERE m.turma.id = :turmaId)")
    List<Aluno> findAlunosNaoMatriculadosNaTurma(@Param("turmaId") UUID turmaId);
}