package com.backend.ecommerce.productCategoryRepositoryTest;

import com.backend.ecommerce.entity.ProductCategory;
import com.backend.ecommerce.repository.ProductCategoryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ProductCategoryRepositoryTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;


    private List<String> categoryToString (List<ProductCategory> list) {
        List<String> categoryNames = new ArrayList<>();
        for(ProductCategory pc : list) {
            categoryNames.add(pc.getCategory_name());
        }
        return categoryNames;
    }

    @Test
    public void getAllCategoriesTest () {

        assertThat(categoryToString(productCategoryRepository.findAll()))
                .contains("Books","Coffee Mugs","Mouse Pads","Luggage Tags");
    }


    /*
      More test cases TODO
     */
}
