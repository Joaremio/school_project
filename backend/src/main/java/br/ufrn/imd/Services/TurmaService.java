package br.ufrn.imd.Services;

import java.util.List;
import java.util.Random;
import java.util.UUID;

import br.ufrn.imd.DTO.TurmaRequestDTO;
import br.ufrn.imd.Entitys.Aluno;
import br.ufrn.imd.Entitys.Turma;
import br.ufrn.imd.Repositories.AlunoRepository;
import br.ufrn.imd.Repositories.TurmaRepository;
import br.ufrn.imd.exceptions.AlunoJaMatriculadoException;
import br.ufrn.imd.exceptions.AlunoNaoMatriculadoException;
import br.ufrn.imd.exceptions.ResourceNotFoundException;
import br.ufrn.imd.exceptions.TurmaEsgotadaException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
public class TurmaService {

    @Autowired
    private TurmaRepository turmaRepository;

    private AlunoService alunoService;

    public TurmaService(@Lazy AlunoService alunoService) {
        this.alunoService = alunoService;
    }


    public Turma createTurma(TurmaRequestDTO data) {
        Turma turma = new Turma();
        turma.setTurno(data.turno());
        turma.setVagas(data.vagas());

        String codigo = data.turno().name().substring(0, 3).toUpperCase() + String.format("%04d", new Random().nextInt(10000));

        turma.setCodigo(codigo);

        turmaRepository.save(turma);
        return turma;
    }

    public List<Turma> getTurmas(){
        return turmaRepository.findAll();
    }

    public Turma getTurma(UUID id) {
        return turmaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Turma não encontrada"));
    }

    public void deleteTurma(UUID id) {
        Turma turma = getTurma(id);

        turmaRepository.deleteById(id);
    }

    public Turma updateTurma(UUID id, TurmaRequestDTO data) {
        Turma turma = getTurma(id);

        turma.setTurno(data.turno());
        turma.setVagas(data.vagas());

        turmaRepository.save(turma);

        return turma;
    }

    public Turma addAluno(UUID alunoId, UUID turmaId){
        Turma turma = getTurma(turmaId);
        Aluno aluno = alunoService.getAluno(alunoId);

        if (turma.getAlunos().contains(aluno)) {
            throw new AlunoJaMatriculadoException("Aluno já está matriculado nesta turma.");
        }

        if (turma.getVagas() <= 0) {
            throw new TurmaEsgotadaException("Turma esgotada");
        }

        turma.getAlunos().add(aluno);
        turma.setVagas(turma.getVagas() - 1);


        turmaRepository.save(turma);

        return turma;
    }

    public void RemoveAluno(UUID alunoId, UUID turmaId){
        Turma turma = getTurma(turmaId);
        Aluno aluno = alunoService.getAluno(alunoId);
        if (turma.getAlunos().contains(aluno)) {
            turma.getAlunos().remove(aluno);
            turma.setVagas(turma.getVagas() + 1);
        }else{
            throw new AlunoNaoMatriculadoException("Aluno não está matriculado na turma");
        }
    }

    public List<Turma> getTurmasByAluno(UUID alunoId){
        List<Turma> turmasAluno = turmaRepository.findTurmasByAluno(alunoId);
        return turmasAluno;
    }




}
