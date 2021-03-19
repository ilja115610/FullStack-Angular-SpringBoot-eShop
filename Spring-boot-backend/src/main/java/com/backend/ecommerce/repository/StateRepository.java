package com.backend.ecommerce.repository;

import com.backend.ecommerce.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
@CrossOrigin("http://localhost:4200")
public interface StateRepository extends JpaRepository<State, Integer> {

    List<State> findByCountryCode (@RequestParam String code);

}
