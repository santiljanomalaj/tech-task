package ae.solidbase.interview.user.repository;

import ae.solidbase.interview.user.model.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;


public interface UserRepository extends JpaRepository<User, Long> {


    @Modifying
    @Query("delete from User u where u.id in ?1")
    void deleteByIdIn(List<Long> ids);
}
