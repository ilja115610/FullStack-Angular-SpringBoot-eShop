package com.backend.ecommerce.productRepositoryTest;

import static org.assertj.core.api.Assertions.*;
import org.junit.jupiter.api.Assertions.*;
import com.backend.ecommerce.entity.Product;
import com.backend.ecommerce.repository.ProductRepository;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.ArrayList;
import java.util.List;


@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ProductRepositoryTest {


    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private TestEntityManager testEntityManager;


    private List<String> pageToProductName (Page<Product> page) {

        List<String> list = new ArrayList<>();

        page.map(Product::getName).forEach(list::add);

        return list;

    }


    @Test
    public void getAllProductsTest () {

        Page<Product> products = productRepository.findAll(PageRequest.of(0,25));
        assertThat(products.getNumberOfElements()).isEqualTo(25L);

    }

    @Test
    public void pageContentRandomTest () {

        Page<Product> products = productRepository.findAll(PageRequest.of(0,26));
        assertThat(pageToProductName(products)).contains("Crash Course in Python"
                , "Become a Guru in JavaScript", "Exploring Vue.js");

    }




}
