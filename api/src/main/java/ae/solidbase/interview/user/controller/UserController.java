package ae.solidbase.interview.user.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import ae.solidbase.interview.user.UserModelAssembler;
import ae.solidbase.interview.user.Exceptions.UserNotFoundException;
import ae.solidbase.interview.user.model.User;
import ae.solidbase.interview.user.repository.UserRepository;

@CrossOrigin
@RestController
public class UserController {

    private final UserRepository repository;
    private UserModelAssembler assembler;

    public UserController(UserRepository repository, UserModelAssembler assembler) {
        this.repository = repository;
        this.assembler = assembler;
    }

    @GetMapping("/users")
    public CollectionModel<EntityModel<User>> all() {

        List<EntityModel<User>> users = repository.findAll().stream()
                // .map(user -> EntityModel.of(user,

                // linkTo(methodOn(UserController.class).oneUser(user.getId())).withSelfRel(),
                // linkTo(methodOn(UserController.class).all()).withRel("users")))
                .map(assembler::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(users, linkTo(methodOn(UserController.class).all()).withSelfRel());

    }

    @PostMapping("/users")
    ResponseEntity<?> newUser(@RequestBody User newUser) {

        EntityModel<User> entityModel = assembler.toModel(repository.save(newUser));
        return ResponseEntity.created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(entityModel);

        // return repository.save(newUser);
    }

    @GetMapping("/user/{id}")
    public EntityModel<User> oneUser(@PathVariable Long id) {

        User user = repository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        // return EntityModel.of(user,
        // linkTo(methodOn(UserController.class).oneUser(id)).withSelfRel(),
        // linkTo(methodOn(UserController.class).all()).withRel("users"));
        return assembler.toModel(user);
    }

    @PutMapping("/user/{id}")
    ResponseEntity<?> editUser(@RequestBody User newUser, @PathVariable Long id) {

        User updatedUser = repository.findById(id)
                .map(user -> {
                    user.setName(newUser.getName());
                    user.setSurname(newUser.getSurname());
                    user.setEmail(newUser.getEmail());
                    user.setBirthDate(newUser.getBirthDate());
                    user.setIdentity(newUser.getIdentity());
                    user.setPassportNumber(newUser.getPassportNumber());
                    user.setPhone(newUser.getPhone());
                    // TODO ndryshim passwordi ideal
                    user.setPassword(newUser.getPassword());
                    return repository.save(user);

                }).orElseGet(() -> {
                    newUser.setId(id);
                    return repository.save(newUser);
                });

        EntityModel<User> entityModel = assembler.toModel(updatedUser);
        return ResponseEntity.created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(entityModel);

    }

    @DeleteMapping("/user/{id}")
    ResponseEntity<?> deleteUser(@PathVariable Long id) {
        repository.deleteById(id);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/users")
    ResponseEntity<?> deleteMultipleUsers(@RequestBody List<Long> arrayId) {

        repository.deleteAllById(arrayId);
        return ResponseEntity.noContent().build();
    }

}
