package br.ufrn.imd.Services;

import br.ufrn.imd.DTO.MatriculaRequestDTO;
import br.ufrn.imd.DTO.MatriculaResponseDTO;
import br.ufrn.imd.DTO.TurmaRequestDTO;
import br.ufrn.imd.DTO.TurmaResponseDTO;
import br.ufrn.imd.Entitys.Aluno;
import br.ufrn.imd.Entitys.Matricula;
import br.ufrn.imd.Entitys.Turma;
import br.ufrn.imd.Repositories.AlunoRepository;
import br.ufrn.imd.Repositories.MatriculaRepository;
import br.ufrn.imd.Repositories.TurmaRepository;
import br.ufrn.imd.StatusMatricula;
import br.ufrn.imd.exceptions.AlunoJaMatriculadoException;
import br.ufrn.imd.exceptions.ResourceNotFoundException;
import br.ufrn.imd.exceptions.TurmaEsgotadaException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
public class TurmaService {

    private final TurmaRepository turmaRepository;
    private final AlunoRepository alunoRepository;
    private final MatriculaRepository matriculaRepository;

    public TurmaService(TurmaRepository turmaRepository, AlunoRepository alunoRepository, MatriculaRepository matriculaRepository) {
        this.turmaRepository = turmaRepository;
        this.alunoRepository = alunoRepository;
        this.matriculaRepository = matriculaRepository;
    }

    @Transactional
    public TurmaResponseDTO createTurma(TurmaRequestDTO data) {
        Turma turma = new Turma();
        turma.setTurno(data.turno());
        turma.setVagas(data.vagas());
        String codigo = data.turno().name().substring(0, 3).toUpperCase() + String.format("%04d", new Random().nextInt(10000));
        turma.setCodigo(codigo);

        Turma turmaSalva = turmaRepository.save(turma);

        return toResponseDTO(turmaSalva);
    }

    @Transactional(readOnly = true)
    public List<TurmaResponseDTO> getTurmas() {
        return turmaRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public TurmaResponseDTO getTurma(UUID id) {
        Turma turma = turmaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Turma não encontrada"));
        return toResponseDTO(turma);
    }

    @Transactional
    public void deleteTurma(UUID id) {
        Turma turma = findTurmaById(id);
        turmaRepository.delete(turma);
    }

    @Transactional
    public MatriculaResponseDTO matricularAluno(MatriculaRequestDTO data) {
        Turma turma = findTurmaById(data.turmaId());
        Aluno aluno = alunoRepository.findById(data.alunoId()).orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado com ID: " + data.alunoId()));

        if (matriculaRepository.existsByAlunoIdAndTurmaId(aluno.getId(), turma.getId())) {
            throw new AlunoJaMatriculadoException("Aluno já matriculado nesta turma.");
        }

        if (turma.getVagas() <= 0) {
            throw new TurmaEsgotadaException("Não há vagas disponíveis nesta turma.");
        }

        Matricula matricula = new Matricula();
        matricula.setAluno(aluno);
        matricula.setTurma(turma);
        matricula.setDataMatricula(LocalDate.now());
        matricula.setStatus(StatusMatricula.ATIVA);

        Matricula matriculaSalva = matriculaRepository.save(matricula);

        turma.setVagas(turma.getVagas() - 1);
        turmaRepository.save(turma);


        return toMatriculaResponseDTO(matriculaSalva);
    }

    @Transactional
    public void cancelarMatricula(UUID alunoId, UUID turmaId) {
        Matricula matricula = matriculaRepository.findByAlunoIdAndTurmaId(alunoId, turmaId)
                .orElseThrow(() -> new ResourceNotFoundException("Matrícula não encontrada para o aluno e turma informados."));

        matriculaRepository.delete(matricula);

        Turma turma = matricula.getTurma();
        turma.setVagas(turma.getVagas() + 1);
        turmaRepository.save(turma);
    }

    @Transactional
    public TurmaResponseDTO updateTurma(UUID id, TurmaRequestDTO data) {
        Turma turma = turmaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Turma não encontrada com id: " + id));

        turma.setTurno(data.turno());
        turma.setVagas(data.vagas());

        Turma turmaAtualizada = turmaRepository.save(turma);

        return toResponseDTO(turmaAtualizada);
    }


    @Transactional(readOnly = true)
    public List<TurmaResponseDTO> getTurmasByAluno(UUID alunoId) {
        List<Turma> turmasAluno = turmaRepository.findTurmasByAluno(alunoId);
        return turmasAluno.stream().map(this::toResponseDTO).toList();
    }

    private Turma findTurmaById(UUID id) {
        return turmaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Turma não encontrada com id: " + id));
    }

    private TurmaResponseDTO toResponseDTO(Turma turma) {
        int quantidadeAlunos = matriculaRepository.countByTurmaId(turma.getId());
        return new TurmaResponseDTO(
                turma.getId(),
                turma.getCodigo(),
                turma.getTurno(),
                turma.getVagas(),
                quantidadeAlunos
        );
    }

    private MatriculaResponseDTO toMatriculaResponseDTO(Matricula matricula) {
        return new MatriculaResponseDTO(matricula.getId(), matricula.getAluno().getId(), matricula.getTurma().getId(), matricula.getDataMatricula(), matricula.getStatus());
    }

}
