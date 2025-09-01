package br.ufrn.imd.Repositories;

import br.ufrn.imd.Entitys.Aluno;
import br.ufrn.imd.Entitys.Matricula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MatriculaRepository extends JpaRepository<Matricula, UUID> {
    boolean existsByAlunoIdAndTurmaId(UUID alunoId, UUID turmaId);

    Optional<Matricula> findByAlunoIdAndTurmaId(UUID alunoId, UUID turmaId);

    @Query("SELECT m.aluno from Matricula m WHERE m.turma.id = :turmaId")
    List<Aluno> findAlunosByTurmaId(@Param("turmaId") UUID turmaId);

    int countByTurmaId(UUID turmaId);
}
