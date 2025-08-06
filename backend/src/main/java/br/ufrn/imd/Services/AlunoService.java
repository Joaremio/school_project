package br.ufrn.imd.Services;

import br.ufrn.imd.Entitys.Aluno;
import br.ufrn.imd.Entitys.Endereco;
import br.ufrn.imd.Entitys.Turma;
import br.ufrn.imd.Repositories.AlunoRepository;
import br.ufrn.imd.Repositories.EnderecoRepository;
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
    private EnderecoRepository enderecoRepository;


    public Aluno createAluno(AlunoRequestDTO data) {

            Aluno aluno = new Aluno();

            aluno.setNome(data.nome());
            aluno.setTelefone(data.telefone());
            aluno.setNomeMae(data.nomeMae());
            aluno.setNomePai(data.nomePai());
            aluno.setSexo(data.sexo());
            aluno.setDataNascimento(data.dataNascimento());
            aluno.setEndereco(criarEndereco(data));
            aluno.setDataMatricula(LocalDate.now());
            aluno.setMatricula(gerarMatricula(LocalDate.now()));

            alunoRepository.save(aluno);

            return aluno;
    }

    public Endereco criarEndereco(AlunoRequestDTO data) {
            Endereco endereco = new Endereco();
            endereco.setRua(data.rua());
            endereco.setNumero(data.numero());
            endereco.setBairro(data.bairro());
            endereco.setCidade(data.cidade());

            enderecoRepository.save(endereco);

            return endereco;
    }

    public List<Aluno> getAlunos() {
        return alunoRepository.findAll();
    }

    public Aluno getAluno(UUID id) {
        return alunoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Aluno não encontrado com id: " + id));
    }

    public void deleteAluno(UUID id) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Aluno não encontrado com o ID: " + id));

        alunoRepository.delete(aluno);
    }


    public Aluno updateAluno(UUID id, AlunoRequestDTO data) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Aluno não encontrado com id: " + id));

        aluno.setNome(data.nome());
        aluno.setTelefone(data.telefone());
        aluno.setNomeMae(data.nomeMae());
        aluno.setNomePai(data.nomePai());
        aluno.setSexo(data.sexo());
        aluno.setDataNascimento(data.dataNascimento());

        Endereco endereco = aluno.getEndereco();
        endereco.setRua(data.rua());
        endereco.setNumero(data.numero());
        endereco.setBairro(data.bairro());
        endereco.setCidade(data.cidade());

        enderecoRepository.save(endereco);
        alunoRepository.save(aluno);

        return aluno;
    }


    public String gerarMatricula(LocalDate date) {
        String ano = date == null ? String.valueOf(LocalDate.now().getYear()) : String.valueOf(date.getYear());
        String idCurto = String.format("%06d", new Random().nextInt(10000));
        return ano + idCurto;
    }
}

