package br.ufrn.imd.Services;

import br.ufrn.imd.Entitys.Aluno;
import br.ufrn.imd.Entitys.Endereco;
import br.ufrn.imd.Entitys.Turma;
import br.ufrn.imd.Repositories.AlunoRepository;
import br.ufrn.imd.Repositories.TurmaRepository;
import br.ufrn.imd.DTO.AlunoRequestDTO;
import br.ufrn.imd.DTO.EnderecoRequestDTO;
import br.ufrn.imd.Services.TurmaService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;


    @Autowired
    private TurmaService turmaService;

        public Aluno createAluno(AlunoRequestDTO data) {

            EnderecoRequestDTO enderecoDTO = data.endereco();
            Aluno aluno = new Aluno();

            aluno.setNome(data.nome());
            aluno.setNascimento(data.nascimento());
            aluno.setMatricula(data.matricula());
            aluno.setTelefone(data.telefone());
            aluno.setSexo(data.sexo());
            aluno.setMae(data.mae());
            aluno.setPai(data.pai());

            // Configuração do endereço
            Endereco endereco = new Endereco();
            endereco.setBairro(enderecoDTO.bairro());
            endereco.setCidade(enderecoDTO.cidade());
            endereco.setRua(enderecoDTO.rua());
            endereco.setNumero(enderecoDTO.numero());
            aluno.setEndereco(endereco);

            aluno.setInscricao(data.inscricao());

            // Gerar a matrícula
            String matricula = gerarMatricula(data.inscricao());
            aluno.setMatricula(matricula);

            Turma turma = turmaService.adicionarAlunoATurma(data.turmaId());

            aluno.setTurma(turma);

            // Salvar o aluno primeiro
            alunoRepository.save(aluno);

            return aluno;
        }


        public Optional<Aluno> getAluno(UUID id) {
        return alunoRepository.findById(id);
    }

    public List<Aluno> getAlunos() {
        return alunoRepository.findAll();
    }

    public void deleteAluno(UUID id) {
        alunoRepository.findById(id).ifPresentOrElse(
                aluno -> alunoRepository.deleteById(id),
                () -> { throw new EntityNotFoundException("Aluno não encontrado com o ID: " + id); }
        );
    }

    public Aluno updateAluno(UUID id, AlunoRequestDTO data) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Aluno não encontrado"));

        aluno.setNome(data.nome());
        aluno.setNascimento(data.nascimento());
        aluno.setMatricula(data.matricula());
        aluno.setTelefone(data.telefone());
        aluno.setSexo(data.sexo());
        aluno.setMae(data.mae());
        aluno.setPai(data.pai());

        Endereco endereco = aluno.getEndereco();
        EnderecoRequestDTO enderecoDTO = data.endereco();
        endereco.setRua(enderecoDTO.rua());
        endereco.setNumero(enderecoDTO.numero());
        endereco.setBairro(enderecoDTO.bairro());
        endereco.setCidade(enderecoDTO.cidade());

        aluno.setEndereco(endereco);

        if (data.turmaId() != null) {
            Turma turma = turmaService.buscarTurma(data.turmaId());
            aluno.setTurma(turma);
        }

        alunoRepository.save(aluno);
        return aluno;
    }

    public String gerarMatricula(LocalDate date) {
        String ano = date == null ? String.valueOf(LocalDate.now().getYear()) : String.valueOf(date.getYear());
        String idCurto = String.format("%06d", new Random().nextInt(10000));
        return ano + idCurto;
    }
}


