package br.ufrn.imd.Repositories;

import br.ufrn.imd.Entitys.Matricula;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MatriculaRepository extends JpaRepository<Matricula, UUID> {
    boolean existsByAlunoIdAndTurmaId(UUID alunoId, UUID turmaId);

    Optional<Matricula> findByAlunoIdAndTurmaId(UUID alunoId, UUID turmaId);

    int countByTurmaId(UUID turmaId);
}
