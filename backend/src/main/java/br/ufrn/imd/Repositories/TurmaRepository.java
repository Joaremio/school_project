package br.ufrn.imd.Repositories;

import br.ufrn.imd.Entitys.Aluno;
import br.ufrn.imd.Entitys.Endereco;
import br.ufrn.imd.Entitys.Turma;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;
import java.util.List;


public interface TurmaRepository extends JpaRepository<Turma, UUID> {
    Optional<Turma> findById(UUID id);

    @Query("SELECT t FROM Turma t JOIN t.alunos a WHERE a.id = :alunoId ")
    List<Turma> findTurmasByAluno(@Param("alunoId") UUID alunoId);

}
