package br.ufrn.imd.Controller;

import br.ufrn.imd.DTO.MatriculaRequestDTO;
import br.ufrn.imd.DTO.MatriculaResponseDTO;
import br.ufrn.imd.DTO.TurmaRequestDTO;
import br.ufrn.imd.DTO.TurmaResponseDTO;
import br.ufrn.imd.Services.TurmaService;
import br.ufrn.imd.exceptions.ApiErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RequestMapping("/turmas")
@RestController
@Tag(name = "Turmas", description = "Endpoints para Gerenciamento de Turmas e Matrículas")
public class TurmaController {

    private final TurmaService turmaService;

    public TurmaController(TurmaService turmaService) {
        this.turmaService = turmaService;
    }

    @PostMapping
    @Operation(summary = "Criar uma nova turma", description = "Adiciona uma nova turma ao sistema.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Turma criada com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    public ResponseEntity<TurmaResponseDTO> criarTurma(@RequestBody TurmaRequestDTO turma) {
        TurmaResponseDTO novaTurma = turmaService.createTurma(turma);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaTurma);
    }

    @GetMapping
    @Operation(summary = "Listar todas as turmas", description = "Retorna uma lista com todas as turmas cadastradas.")
    @ApiResponse(responseCode = "200", description = "Lista de turmas retornada com sucesso")
    public ResponseEntity<List<TurmaResponseDTO>> getTurmas() {
        return ResponseEntity.ok(turmaService.getTurmas());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar uma turma por ID", description = "Retorna os dados de uma turma específica através do seu UUID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Turma encontrada com sucesso"),
            @ApiResponse(responseCode = "404", description = "Turma não encontrada",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    public ResponseEntity<TurmaResponseDTO> getTurmaById(@PathVariable UUID id) {
        return ResponseEntity.ok(turmaService.getTurma(id));
    }

    @GetMapping("/aluno/{alunoId}")
    @Operation(summary = "Buscar turmas de um aluno", description = "Retorna todas as turmas em que um aluno específico está matriculado.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca concluída com sucesso (pode retornar uma lista vazia)"),
            @ApiResponse(responseCode = "404", description = "Aluno não encontrado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    public ResponseEntity<List<TurmaResponseDTO>> getTurmasByAluno(@PathVariable UUID alunoId) {
        List<TurmaResponseDTO> turmas = turmaService.getTurmasByAluno(alunoId);
        return ResponseEntity.ok(turmas);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir uma turma", description = "Remove o registro de uma turma do sistema. A operação falhará se a turma ainda possuir alunos matriculados.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Turma excluída com sucesso"),
            @ApiResponse(responseCode = "404", description = "Turma não encontrada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiErrorResponse.class))),
            @ApiResponse(responseCode = "409", description = "Conflito: A turma ainda possui alunos matriculados", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    public ResponseEntity<Void> deleteTurma(@PathVariable UUID id) {
        turmaService.deleteTurma(id);
        return ResponseEntity.noContent().build();
    }

    // --- Endpoints de Gerenciamento de Matrícula ---

    @PostMapping("/matricular")
    @Operation(summary = "Matricular aluno em uma turma", description = "Cria um novo registro de matrícula, vinculando um aluno a uma turma.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Matrícula realizada com sucesso"),
            @ApiResponse(responseCode = "400", description = "Não há vagas disponíveis", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "Aluno ou Turma não encontrados", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiErrorResponse.class))),
            @ApiResponse(responseCode = "409", description = "Conflito: Aluno já matriculado nesta turma", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    public ResponseEntity<MatriculaResponseDTO> matricularAluno(@RequestBody MatriculaRequestDTO data) {
        MatriculaResponseDTO novaMatricula = turmaService.matricularAluno(data);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaMatricula);
    }


    @DeleteMapping("/matricula/aluno/{alunoId}/turma/{turmaId}")
    @Operation(summary = "Cancelar matrícula de um aluno", description = "Remove o vínculo de matrícula entre um aluno e uma turma.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Matrícula cancelada com sucesso"),
            @ApiResponse(responseCode = "404", description = "Matrícula não encontrada para o aluno e turma informados", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    public ResponseEntity<Void> cancelarMatricula(@PathVariable UUID alunoId, @PathVariable UUID turmaId) {
        turmaService.cancelarMatricula(alunoId, turmaId);
        return ResponseEntity.noContent().build();
    }
}