package com.fatma.university.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Source extends Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @ManyToOne
    private Department department;

    @OneToMany(mappedBy = "source",cascade = CascadeType.ALL)
    private List<Video> videos;

    @OneToMany(mappedBy = "source",cascade = CascadeType.ALL)
    private List<Post> posts;

    @OneToMany(mappedBy = "source",cascade = CascadeType.ALL)
    private List<Article> articles;
}