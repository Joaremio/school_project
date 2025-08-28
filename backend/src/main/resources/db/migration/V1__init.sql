CREATE TABLE public.adms (
                             id varchar(255) NOT NULL,
                             email varchar(255),
                             name varchar(255),
                             password varchar(255),
                             CONSTRAINT adms_pkey PRIMARY KEY (id)
);


INSERT INTO public.adms (id, email, name, password) VALUES
                                                        ('ffc3dbc7-5830-423d-86c6-8cbd66f5870f', 'admin@teste.com', 'Admin Master', '$2a$10$CtcGHVGe97Po1tJIsqwRCuHHC3KAGdG7G92dqEndxppmDwRGsBj1C'),
                                                        ('461b7ce5-6e9b-428a-b1da-0a923d8b97e2', 'joaremiorevoredo@gmail.com', 'Joaremio Marinho Revoredo Neto', '$2a$10$3W5J6taY89UfYQ1NhnJHiemjHRgGTTuMXBsmdGJYiRjD777OyNv6W');


CREATE TABLE public.endereco (
                                 id uuid NOT NULL,
                                 bairro varchar(255),
                                 cidade varchar(255),
                                 numero varchar(255),
                                 rua varchar(255),
                                 CONSTRAINT endereco_pkey PRIMARY KEY (id)
);


INSERT INTO public.endereco (id, bairro, cidade, numero, rua) VALUES
                                                                  ('d3d22db7-d4dd-4b99-86f2-16b457350008', NULL, NULL, NULL, NULL),
                                                                  ('7fc6018e-6749-44d6-b771-42cc3a34e61f', NULL, NULL, NULL, NULL),
                                                                  ('491667b6-c459-4be6-8e32-42d80b5b1032', 'Centro', 'Taipu', '150', 'Rua Prefeito Luiz Gomes da Costa'),
                                                                  ('5e57fa06-b8df-46bb-a486-a17e327059df', 'Centro', 'Taipu', '150', 'Rua Prefeito Luiz Gomes da Costa'),
                                                                  ('99855d4e-2b88-48cd-9034-cecc34db6eab', 'Centro', 'Natal', '450', 'Rua das Laranjeiras'),
                                                                  ('2973e33f-7170-4902-823e-f201d72a2427', '150', 'Taipu', '150', 'Rua Prefeito Luiz Gomes da Costa'),
                                                                  ('bcc94d44-528e-4df9-98a2-d3293399dc78', 'Centro', 'Taipu', '150', 'Rua Prefeito Luiz Gomes da Costa'),
                                                                  ('d8739fcd-21a9-4790-abbd-ba7cd867ef2d', 'Centro', 'Taipu', '150', 'Rua Prefeito Luiz Gomes da Costa');


CREATE TABLE public.aluno (
                              id uuid NOT NULL,
                              nome varchar(255) NOT NULL,
                              nome_mae varchar(255) NOT NULL,
                              nome_pai varchar(255),
                              matricula varchar(255),
                              data_matricula date NOT NULL,
                              data_nascimento date NOT NULL,
                              sexo varchar(255) NOT NULL,
                              telefone varchar(255) NOT NULL,
                              endereco_id uuid NOT NULL,
                              ativo boolean DEFAULT true NOT NULL,
                              CONSTRAINT aluno_pkey PRIMARY KEY (id),
                              CONSTRAINT aluno_matricula_key UNIQUE (matricula),
                              CONSTRAINT aluno_endereco_id_key UNIQUE (endereco_id),
                              CONSTRAINT fk_aluno_endereco FOREIGN KEY (endereco_id) REFERENCES public.endereco(id)
);

INSERT INTO public.aluno (ativo, data_matricula, data_nascimento, endereco_id, id, matricula, nome, nome_mae, nome_pai, sexo, telefone) VALUES
                                                                                                                                            (true, '2025-08-17', '2002-05-11', '2973e33f-7170-4902-823e-f201d72a2427', 'b8b1b58a-3da6-43e9-8dca-5b3423fe6429', '2025008841', 'Joaremio Marinho Revoredo Neto', 'Shirlei Januária dos Santos', 'Joaquitan da Silva Revoredo Filho', 'M', '84991164038'),
                                                                                                                                            (true, '2025-08-25', '2004-02-28', 'bcc94d44-528e-4df9-98a2-d3293399dc78', '05b434a3-103a-4424-a8d5-48906195993d', '2025008081', 'Joaquitan Filho', 'Shirlei Januária dos Santos', 'Joaquitan da Silva', 'F', '84991164038'),
                                                                                                                                            (true, '2025-08-25', '1980-04-30', 'd8739fcd-21a9-4790-abbd-ba7cd867ef2d', 'e79d4a71-cee3-482a-a18a-c3feb8609c95', '2025002871', 'Shirlei Januária dos Santos', 'Maria Januaria', 'Joaremio Marinho Revoredo', 'F', '84991164038');


CREATE TABLE public.turma (
                              id uuid NOT NULL,
                              codigo varchar(255),
                              turno varchar(255) CHECK (turno IN ('MATUTINO','VESPERTINO','NOTURNO')),
                              vagas integer NOT NULL,
                              CONSTRAINT turma_pkey PRIMARY KEY (id)
);


INSERT INTO public.turma (vagas, id, codigo, turno) VALUES
                                                        (60, '15d4d068-385c-482c-987c-7ae7c1766783', 'NOT7523', 'NOTURNO'),
                                                        (37, '25702d7c-ebf0-44e1-8544-339bd6c0394b', 'MAT8532', 'MATUTINO'),
                                                        (48, '21a62a32-4e4e-4354-9ff9-56c7b1aad0be', 'VES4507', 'VESPERTINO');


CREATE TABLE public.aluno_turma (
                                    aluno_id uuid NOT NULL,
                                    turma_id uuid NOT NULL,
                                    CONSTRAINT aluno_turma_pkey PRIMARY KEY (aluno_id, turma_id),
                                    CONSTRAINT fk_aluno FOREIGN KEY (aluno_id) REFERENCES public.aluno(id),
                                    CONSTRAINT fk_turma FOREIGN KEY (turma_id) REFERENCES public.turma(id)
);


INSERT INTO public.aluno_turma (aluno_id, turma_id) VALUES
                                                        ('b8b1b58a-3da6-43e9-8dca-5b3423fe6429', '25702d7c-ebf0-44e1-8544-339bd6c0394b'),
                                                        ('05b434a3-103a-4424-a8d5-48906195993d', '25702d7c-ebf0-44e1-8544-339bd6c0394b'),
                                                        ('b8b1b58a-3da6-43e9-8dca-5b3423fe6429', '21a62a32-4e4e-4354-9ff9-56c7b1aad0be'),
                                                        ('e79d4a71-cee3-482a-a18a-c3feb8609c95', '21a62a32-4e4e-4354-9ff9-56c7b1aad0be');

CREATE TABLE public.matricula (
                                  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                                  data_matricula date,
                                  matricula_codigo varchar(255),
                                  aluno_id uuid NOT NULL,
                                  turma_id uuid NOT NULL,
                                  CONSTRAINT uq_matricula UNIQUE (aluno_id, turma_id),
                                  CONSTRAINT fk_matricula_aluno FOREIGN KEY (aluno_id) REFERENCES public.aluno(id),
                                  CONSTRAINT fk_matricula_turma FOREIGN KEY (turma_id) REFERENCES public.turma(id)
);
