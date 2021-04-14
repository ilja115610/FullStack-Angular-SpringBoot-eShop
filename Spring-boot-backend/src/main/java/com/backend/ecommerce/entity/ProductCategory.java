package com.backend.ecommerce.entity;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "product_category")
public class ProductCategory {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "category_name")
    private String category_name;


    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    private Set<Product> products;


    public ProductCategory() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory_name() {
        return category_name;
    }

    public void setCategory_name(String category_name) {
        this.category_name = category_name;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }
}
