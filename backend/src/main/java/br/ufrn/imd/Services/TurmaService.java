package br.ufrn.imd.Services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import br.ufrn.imd.Entitys.Aluno;
import br.ufrn.imd.Entitys.Turma;
import br.ufrn.imd.Repositories.AlunoRepository;
import br.ufrn.imd.Repositories.TurmaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TurmaService {

    @Autowired
    private TurmaRepository turmaRepository;

    public Turma adicionarAlunoATurma(UUID turmaId) {

        Optional<Turma> turmaOptional = turmaRepository.findById(turmaId);

        if (turmaOptional.isPresent()) {

            Turma turma = turmaOptional.get();

            return turma;

        } else {
            throw new RuntimeException("Turma ou Aluno não encontrado");
        }
    }

    public Turma buscarTurma(UUID turmaId) {
        return turmaRepository.findById(turmaId)
                .orElseThrow(() -> new EntityNotFoundException("Turma não encontrada com ID: " + turmaId));
    }

}
