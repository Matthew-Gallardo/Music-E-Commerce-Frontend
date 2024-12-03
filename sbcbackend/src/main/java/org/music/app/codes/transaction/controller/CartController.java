package org.music.app.codes.transaction.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.music.app.codes.transaction.model.data.Cart;
import org.music.app.codes.transaction.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carts")
public class CartController {
    private static final Logger LOGGER = LogManager.getLogger(CartController.class);

    @Autowired
    private CartService cartService;

    @PostMapping
    public ResponseEntity<Cart> createCart(@RequestBody Cart cart) {
        LOGGER.info("Entering createCart with cart: {}", cart);
        Cart createdCart = cartService.createCart(cart);
        LOGGER.info("Cart created successfully: {}", createdCart);
        return ResponseEntity.ok(createdCart);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCartById(@PathVariable Integer id) {
        LOGGER.info("Entering getCartById with id: {}", id);
        Cart cart = cartService.getCartById(id);
        if (cart != null) {
            LOGGER.info("Cart found: {}", cart);
            return ResponseEntity.ok(cart);
        } else {
            LOGGER.warn("Cart not found with id: {}", id);
            return ResponseEntity.status(404).body(null);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Cart> getCartByUserId(@PathVariable Integer userId) {
        LOGGER.info("Entering getCartByUserId with userId: {}", userId);
        Cart cart = cartService.getCartByUserId(userId);
        if (cart != null) {
            LOGGER.info("Cart found for userId: {}", userId);
            return ResponseEntity.ok(cart);
        } else {
            LOGGER.warn("Cart not found for userId: {}", userId);
            return ResponseEntity.status(404).body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<Cart>> getAllCarts() {
        LOGGER.info("Entering getAllCarts");
        List<Cart> carts = cartService.getAllCarts();
        if (carts != null) {
            LOGGER.info("Retrieved all carts successfully");
            return ResponseEntity.ok(carts);
        } else {
            LOGGER.error("Error getting all carts");
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cart> updateCart(@PathVariable Integer id, @RequestBody Cart cart) {
        LOGGER.info("Entering updateCart with id: {} and cart: {}", id, cart);
        Cart updatedCart = cartService.updateCart(id, cart);
        if (updatedCart != null) {
            LOGGER.info("Cart updated successfully: {}", updatedCart);
            return ResponseEntity.ok(updatedCart);
        } else {
            LOGGER.error("Error updating cart with id: {}", id);
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCart(@PathVariable Integer id) {
        LOGGER.info("Entering deleteCart with id: {}", id);
        cartService.deleteCart(id);
        LOGGER.info("Cart deleted successfully with id: {}", id);
        return ResponseEntity.noContent().build();
    }
}