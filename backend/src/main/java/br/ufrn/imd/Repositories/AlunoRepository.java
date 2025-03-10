package br.ufrn.imd.Repositories;

import br.ufrn.imd.Entitys.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AlunoRepository extends JpaRepository<Aluno, UUID> {
    public Optional<Aluno> findById(UUID id);
}
