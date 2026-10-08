package com.vastra.util;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

class GeneratePasswordHashTest {

    @Test
    void printHashes() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        System.out.println("ADMIN_HASH=" + encoder.encode("Admin123!"));
        System.out.println("CUST_HASH=" + encoder.encode("Password123!"));
    }
}
