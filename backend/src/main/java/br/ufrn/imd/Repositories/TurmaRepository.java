package br.ufrn.imd.Repositories;

import br.ufrn.imd.Entitys.Turma;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface TurmaRepository extends JpaRepository<Turma, UUID> {
    Optional<Turma> findById(UUID id);

    @Query("SELECT m.turma FROM Matricula m WHERE m.aluno.id = :alunoId")
    List<Turma> findTurmasByAluno(@Param("alunoId") UUID alunoId);
}
