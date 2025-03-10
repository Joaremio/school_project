package br.ufrn.imd.Repositories;

import br.ufrn.imd.Entitys.Aluno;
import br.ufrn.imd.Entitys.Endereco;
import br.ufrn.imd.Entitys.Turma;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TurmaRepository extends JpaRepository<Turma, UUID> {
    public Optional<Turma> findById(UUID id);
}
