package ae.solidbase.interview.user;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import ae.solidbase.interview.user.controller.UserController;
import ae.solidbase.interview.user.model.User;

@Component
public class UserModelAssembler implements RepresentationModelAssembler<User, EntityModel<User>> {

    @Override
    public EntityModel<User> toModel(User entity) {

        return EntityModel.of(entity,
                linkTo(methodOn(UserController.class).oneUser(entity.getId())).withSelfRel(),
                linkTo(methodOn(UserController.class).all()).withRel("users"));

    }

}
