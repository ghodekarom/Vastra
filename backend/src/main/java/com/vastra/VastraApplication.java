package com.vastra;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class VastraApplication {

    public static void main(String[] args) {
        SpringApplication.run(VastraApplication.class, args);
    }
}
