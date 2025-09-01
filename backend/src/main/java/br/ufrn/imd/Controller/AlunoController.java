package br.ufrn.imd.Controller;

import br.ufrn.imd.DTO.AlunoRequestDTO;
import br.ufrn.imd.DTO.AlunoResponseDTO;
import br.ufrn.imd.Services.AlunoService;
import br.ufrn.imd.exceptions.ApiErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/alunos")
@Tag(name = "Alunos", description = "Endpoints para Gerenciamento de Alunos")
public class AlunoController {

    private final AlunoService alunoService;

    public AlunoController(AlunoService alunoService) {
        this.alunoService = alunoService;
    }

    @PostMapping
    @Operation(summary = "Criar um novo aluno", description = "Cria o registro de um novo aluno no sistema.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Aluno criado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    public ResponseEntity<AlunoResponseDTO> createAluno(@Valid @RequestBody AlunoRequestDTO data) {
        AlunoResponseDTO novoAluno = alunoService.createAluno(data);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoAluno);
    }

    @GetMapping
    @Operation(summary = "Listar todos os alunos", description = "Retorna uma lista com todos os alunos cadastrados.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de alunos retornada com sucesso")
    })
    public ResponseEntity<List<AlunoResponseDTO>> getAlunos() {
        return ResponseEntity.ok(alunoService.getAlunos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar aluno por ID", description = "Retorna os dados de um aluno específico através do seu UUID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Aluno encontrado"),
            @ApiResponse(responseCode = "404", description = "Aluno não encontrado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    public ResponseEntity<AlunoResponseDTO> getAlunoById(@PathVariable UUID id) {
        return ResponseEntity.ok(alunoService.getAlunoById(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um aluno", description = "Atualiza os dados de um aluno existente a partir do seu UUID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Aluno atualizado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Aluno não encontrado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    public ResponseEntity<AlunoResponseDTO> updateAluno(@PathVariable UUID id, @Valid @RequestBody AlunoRequestDTO data) {
        AlunoResponseDTO alunoAtualizado = alunoService.updateAluno(id, data);
        return ResponseEntity.ok(alunoAtualizado);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir um aluno", description = "Remove o registro de um aluno do sistema a partir do seu UUID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Aluno excluído com sucesso"),
            @ApiResponse(responseCode = "404", description = "Aluno não encontrado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    public ResponseEntity<Void> deleteAluno(@PathVariable UUID id) {
        alunoService.deleteAluno(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/nao-matriculados/turma/{turmaId}")
    @Operation(summary = "Listar alunos não matriculados", description = "Retorna uma lista de alunos que não estão matriculados em uma turma específica.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de alunos retornada com sucesso"),
            @ApiResponse(responseCode = "404", description = "Turma não encontrada",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    public ResponseEntity<List<AlunoResponseDTO>> getAlunosNaoMatriculados(@PathVariable UUID turmaId) {
        List<AlunoResponseDTO> alunosDisponiveis = alunoService.findAlunosNaoMatriculadosNaTurma(turmaId);
        return ResponseEntity.ok(alunosDisponiveis);
    }

    @GetMapping("/turma/{turmaId}")
    @Operation(summary = "Listar alunos por turma", description = "Retorna uma lista de alunos matriculados em uma turma específica.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de alunos retornada com sucesso"),
            @ApiResponse(responseCode = "404", description = "Turma não encontrada",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    public ResponseEntity<List<AlunoResponseDTO>> getAlunosByTurmaId(@PathVariable UUID turmaId) {
        List<AlunoResponseDTO> alunos = alunoService.getAlunosByTurmaId(turmaId);
        return ResponseEntity.ok(alunos);
    }
}