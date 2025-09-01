package br.ufrn.imd.Entitys;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "books")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false, length = 180)
    String author;

    @Column(name = "launch_date", nullable = false)
    LocalDate launchDate;

    @Column(nullable = false)
    Double price;

    @Column(nullable = false, length = 250)
    String title;
}
