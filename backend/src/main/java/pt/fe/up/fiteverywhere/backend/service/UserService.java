package pt.fe.up.fiteverywhere.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.fe.up.fiteverywhere.backend.entity.User;
import pt.fe.up.fiteverywhere.backend.repository.UserRepository;

import java.util.Optional;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> findUserByEmail(String email) {
        return userRepository.findById(email);
    }

    public User loginUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            return user;
        }
        return null;
    }

    public void deleteUser(String email) {
        userRepository.deleteById(email);
    }

}
