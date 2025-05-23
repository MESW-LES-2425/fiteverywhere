package pt.fe.up.fiteverywhere.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import pt.fe.up.fiteverywhere.backend.entity.user.children.Client;
import pt.fe.up.fiteverywhere.backend.entity.user.children.GymManager;
import pt.fe.up.fiteverywhere.backend.entity.user.children.PersonalTrainer;

@Setter
@Getter
@Entity
@EntityScan(basePackageClasses = {Client.class, GymManager.class, PersonalTrainer.class})
public abstract class User {

    @Id
    @Column(nullable = false, unique = true)  // Ensure email is unique and not null
    private String email;

    @Column(nullable = false)  // En§sure username is unique and not null
    private String username;

    @Column(nullable = true)
    private String password;

    @Column
    private String role;

    public User(String username, String email) {
        this.username = username;
        this.email = email;
    }

    public User() {

    }
}