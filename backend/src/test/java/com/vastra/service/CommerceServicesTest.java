package com.vastra.service;

import com.vastra.auth.entity.User;
import com.vastra.auth.repository.UserRepository;
import com.vastra.catalog.entity.Product;
import com.vastra.catalog.repository.ProductRepository;
import com.vastra.customer.dto.CustomerAddressDto;
import com.vastra.customer.dto.UserProfileDto;
import com.vastra.customer.entity.CustomerAddress;
import com.vastra.customer.repository.CustomerAddressRepository;
import com.vastra.customer.service.CustomerService;
import com.vastra.order.entity.Order;
import com.vastra.order.repository.OrderRepository;
import com.vastra.returnorder.dto.CreateReturnRequestDto;
import com.vastra.returnorder.dto.ReturnResponseDto;
import com.vastra.returnorder.entity.ReturnRequest;
import com.vastra.returnorder.repository.ReturnRequestRepository;
import com.vastra.returnorder.service.ReturnService;
import com.vastra.wishlist.dto.WishlistToggleResponseDto;
import com.vastra.wishlist.entity.Wishlist;
import com.vastra.wishlist.repository.WishlistRepository;
import com.vastra.wishlist.service.WishlistService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CommerceServicesTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private CustomerAddressRepository addressRepository;

    @InjectMocks
    private CustomerService customerService;

    @Mock
    private WishlistRepository wishlistRepository;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private WishlistService wishlistService;

    @Mock
    private ReturnRequestRepository returnRequestRepository;

    @Mock
    private OrderRepository orderRepository;

    @InjectMocks
    private ReturnService returnService;

    @Test
    void testCustomerProfileAndAddress() {
        User user = User.builder()
                .id("usr-01")
                .email("test@vastra.in")
                .fullName("Aarav Sharma")
                .role("ROLE_CUSTOMER")
                .build();

        when(userRepository.findById("usr-01")).thenReturn(Optional.of(user));

        UserProfileDto profile = customerService.getProfile("usr-01");
        assertEquals("test@vastra.in", profile.getEmail());
        assertEquals("Aarav Sharma", profile.getFullName());

        CustomerAddressDto addressDto = CustomerAddressDto.builder()
                .fullName("Aarav Sharma")
                .phone("+91 98765 43210")
                .street("Indiranagar 12th Main")
                .city("Bengaluru")
                .state("Karnataka")
                .pincode("560038")
                .isDefault(true)
                .build();

        when(addressRepository.save(any(CustomerAddress.class))).thenAnswer(invocation -> invocation.getArgument(0));

        CustomerAddressDto saved = customerService.addAddress("usr-01", addressDto);
        assertNotNull(saved);
        assertEquals("Bengaluru", saved.getCity());
    }

    @Test
    void testWishlistToggle() {
        User user = User.builder().id("usr-01").build();
        Product product = Product.builder().id("vst-001").slug("shadow-print-oversized-tee").build();

        when(userRepository.findById("usr-01")).thenReturn(Optional.of(user));
        when(productRepository.findById("vst-001")).thenReturn(Optional.of(product));
        when(wishlistRepository.findByUserIdAndProductId("usr-01", "vst-001")).thenReturn(Optional.empty());

        Wishlist savedWishlist = Wishlist.builder().id("wsh-1").user(user).product(product).build();
        when(wishlistRepository.save(any(Wishlist.class))).thenReturn(savedWishlist);
        when(wishlistRepository.findByUserId("usr-01")).thenReturn(List.of(savedWishlist));

        WishlistToggleResponseDto res = wishlistService.toggleWishlist("usr-01", "vst-001");
        assertTrue(res.isSaved());
        assertEquals(List.of("vst-001"), res.getWishlistProductIds());
    }

    @Test
    void testReturnRequestCreation() {
        Order order = Order.builder()
                .id("ord-01")
                .orderNumber("ORD-99001")
                .status("DELIVERED")
                .total(BigDecimal.valueOf(1799))
                .build();

        when(orderRepository.findByOrderNumber("ORD-99001")).thenReturn(Optional.of(order));
        when(returnRequestRepository.save(any(ReturnRequest.class))).thenAnswer(invocation -> invocation.getArgument(0));

        CreateReturnRequestDto req = CreateReturnRequestDto.builder()
                .actionType("EXCHANGE")
                .reason("Size too large")
                .replacementSize("M")
                .build();

        ReturnResponseDto result = returnService.createReturn("ORD-99001", req);
        assertNotNull(result);
        assertEquals("ORD-99001", result.getOrderNumber());
        assertEquals("EXCHANGE", result.getActionType());
        assertEquals("REQUESTED", result.getStatus());
    }
}
