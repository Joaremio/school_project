# Estágio 1: Build da aplicação com Maven
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /app

# Copiar Maven Wrapper e dar permissão de execução
COPY mvnw .
RUN chmod +x mvnw

COPY .mvn .mvn
COPY pom.xml .

# Baixar dependências offline
RUN ./mvnw dependency:go-offline

# Copiar código-fonte
COPY src ./src

# Build do projeto
RUN ./mvnw clean package -DskipTests

# Estágio 2: Imagem final, otimizada para execução
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copiar JAR gerado
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
