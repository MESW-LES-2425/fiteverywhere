package pt.fe.up.fiteverywhere.backend.entity.user.children;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import pt.fe.up.fiteverywhere.backend.entity.Gym;
import pt.fe.up.fiteverywhere.backend.entity.PTService;
import pt.fe.up.fiteverywhere.backend.entity.Purchase;
import pt.fe.up.fiteverywhere.backend.entity.User;
import pt.fe.up.fiteverywhere.backend.entity.WorkoutSuggestion;

@Getter
@Setter
@Entity
public class Client extends User {

    @Column
    private Integer workoutsPerWeek;

    @Column
    private String preferredTime;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonIgnoreProperties("client")
    private Set<Purchase> purchases = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "client_gym",
        joinColumns = @JoinColumn(name = "client_email"),
        inverseJoinColumns = @JoinColumn(name = "gym_id")
    )
    private Set<Gym> favourites = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "client_ptservice",
            joinColumns = @JoinColumn(name = "client_email", referencedColumnName = "email"),
            inverseJoinColumns = @JoinColumn(name = "ptservice_id", referencedColumnName = "id")
    )
    @JsonIgnoreProperties("clients")
    private Set<PTService> ptServices = new HashSet<>();

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<WorkoutSuggestion> workoutSuggestions = new HashSet<>();

    public Client(String username, String email) {
        super(username, email);
        setRole("client");
    }

    public Client() {
        super();
        setRole("client");
    }
}
