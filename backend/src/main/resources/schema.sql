CREATE EXTENSION IF NOT EXISTS "pgcrypto";


CREATE TABLE IF NOT EXISTS turmas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
    );

INSERT INTO turmas (nome)
SELECT 'Matutino' WHERE NOT EXISTS (SELECT 1 FROM turmas WHERE nome = 'Matutino');
INSERT INTO turmas (nome)
SELECT 'Vespertino' WHERE NOT EXISTS (SELECT 1 FROM turmas WHERE nome = 'Vespertino');
INSERT INTO turmas (nome)
SELECT 'Noturno' WHERE NOT EXISTS (SELECT 1 FROM turmas WHERE nome = 'Noturno');


CREATE TABLE IF NOT EXISTS enderecos (
                                         id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    rua VARCHAR(255) NOT NULL,
    numero INT NOT NULL,
    bairro VARCHAR(255) NOT NULL,
    cidade VARCHAR(255) NOT NULL
    );

CREATE TABLE IF NOT EXISTS alunos (
                                      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    matricula VARCHAR(255),
    nascimento DATE NOT NULL,
    telefone VARCHAR(255) NOT NULL,
    sexo VARCHAR(255),
    inscricao DATE, -- Nome alterado para corresponder à entidade
    mae VARCHAR(255) NOT NULL,
    pai VARCHAR(255),
    endereco_id UUID NOT NULL,
    turma_id UUID, -- Adicionado para suportar o relacionamento com Turma
    CONSTRAINT fk_endereco
    FOREIGN KEY (endereco_id)
    REFERENCES enderecos(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_turma
    FOREIGN KEY (turma_id)
    REFERENCES turmas(id)
    ON DELETE SET NULL
    );

