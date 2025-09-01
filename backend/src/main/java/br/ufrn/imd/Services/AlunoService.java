package br.ufrn.imd.Services;

import br.ufrn.imd.DTO.AlunoRequestDTO;
import br.ufrn.imd.DTO.AlunoResponseDTO;
import br.ufrn.imd.DTO.EnderecoResponseDTO;
import br.ufrn.imd.DTO.TurmaResponseDTO;
import br.ufrn.imd.Entitys.Aluno;
import br.ufrn.imd.Entitys.Endereco;
import br.ufrn.imd.Repositories.AlunoRepository;
import br.ufrn.imd.Repositories.EnderecoRepository;
import br.ufrn.imd.Repositories.MatriculaRepository;
import br.ufrn.imd.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class AlunoService {

    private final TurmaService turmaService;
    private AlunoRepository alunoRepository;
    private EnderecoRepository enderecoRepository;
    private MatriculaRepository matriculaRepository;

    public AlunoService(AlunoRepository alunoRepository, EnderecoRepository enderecoRepository, TurmaService turmaService, MatriculaRepository matriculaRepository) {
        this.alunoRepository = alunoRepository;
        this.enderecoRepository = enderecoRepository;
        this.turmaService = turmaService;
        this.matriculaRepository = matriculaRepository;
    }

    @Transactional
    public AlunoResponseDTO createAluno(AlunoRequestDTO data) {

        Endereco endereco = new Endereco();
        endereco.setRua(data.rua());
        endereco.setNumero(data.numero());
        endereco.setBairro(data.bairro());
        endereco.setCidade(data.cidade());
        Endereco enderecoSalvo = enderecoRepository.save(endereco);

        Aluno aluno = new Aluno();

        aluno.setNome(data.nome());
        aluno.setTelefone(data.telefone());
        aluno.setNomeMae(data.nomeMae());
        aluno.setNomePai(data.nomePai());
        aluno.setSexo(data.sexo());
        aluno.setDataNascimento(data.dataNascimento());
        aluno.setEndereco(enderecoSalvo);
        aluno.setMatricula(gerarMatricula());

        Aluno alunoSalvo = alunoRepository.save(aluno);
        return toResponseDTO(alunoSalvo);
    }

    @Transactional(readOnly = true)
    public List<AlunoResponseDTO> getAlunos() {
        return alunoRepository.findAll().stream().map(this::toResponseDTO).toList();
    }

    @Transactional(readOnly = true)
    public AlunoResponseDTO getAlunoById(UUID id) {
        Aluno aluno = findAlunoById(id);
        return toResponseDTO(aluno);
    }

    protected Aluno findAlunoById(UUID id) {
        return alunoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado com id: " + id));
    }

    @Transactional
    public void deleteAluno(UUID id) {
        Aluno aluno = findAlunoById(id);
        alunoRepository.delete(aluno);
    }

    @Transactional
    public AlunoResponseDTO updateAluno(UUID id, AlunoRequestDTO data) {
        Aluno aluno = findAlunoById(id);

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

        Aluno alunoSalvo = alunoRepository.save(aluno);

        return toResponseDTO(alunoSalvo);
    }

    private String gerarMatricula() {
        String ano = String.valueOf(LocalDate.now().getYear());
        return ano + "-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
    }

    @Transactional(readOnly = true)
    public List<AlunoResponseDTO> findAlunosNaoMatriculadosNaTurma(UUID turmaId) {
        List<Aluno> alunos = alunoRepository.findAlunosNaoMatriculadosNaTurma(turmaId);
        return alunos.stream().map(this::toResponseDTO).toList();
    }

    @Transactional(readOnly = true)
    public List<AlunoResponseDTO> getAlunosByTurmaId(UUID turmaId) {
        TurmaResponseDTO turma = turmaService.getTurma(turmaId);
        List<Aluno> alunos = matriculaRepository.findAlunosByTurmaId(turma.id());
        return alunos.stream().map(this::toResponseDTO).toList();
    }

    private EnderecoResponseDTO toEnderecoResponseDTO(Endereco endereco) {
        if (endereco == null) {
            return null;
        }
        return new EnderecoResponseDTO(
                endereco.getRua(),
                endereco.getNumero(),
                endereco.getBairro(),
                endereco.getCidade()
        );
    }

    private AlunoResponseDTO toResponseDTO(Aluno aluno) {

        EnderecoResponseDTO enderecoDTO = toEnderecoResponseDTO(aluno.getEndereco());

        return new AlunoResponseDTO(
                aluno.getId(),
                aluno.getNome(),
                aluno.getTelefone(),
                aluno.getMatricula(),
                aluno.getNomeMae(),
                aluno.getNomePai(),
                aluno.getSexo(),
                aluno.getDataNascimento(),
                enderecoDTO
        );
    }
}

