package br.ufrn.imd.DTO;

import java.time.LocalDate;

public record BookRequestDTO(String author, LocalDate launchDate, Double price, String title) {
}
