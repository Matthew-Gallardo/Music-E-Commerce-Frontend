package org.music.app.codes.transaction.repository;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.music.app.codes.transaction.model.data.Cart;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import java.util.List;

@Repository
public class CartRepository {
    private static final Logger LOGGER = LogManager.getLogger(CartRepository.class);

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public Cart save(Cart cart) {
        LOGGER.info("Entering save with cart: {}", cart);
        try {
            if (cart.getCartId() == null) {
                entityManager.persist(cart);
                LOGGER.info("Cart persisted successfully: {}", cart);
                return cart;
            } else {
                Cart mergedCart = entityManager.merge(cart);
                LOGGER.info("Cart merged successfully: {}", mergedCart);
                return mergedCart;
            }
        } catch (Exception e) {
            LOGGER.error("Error saving cart: {}", cart, e);
            throw e;
        }
    }

    public Cart findById(Integer id) {
        LOGGER.info("Entering findById with id: {}", id);
        try {
            Cart cart = entityManager.find(Cart.class, id);
            if (cart != null) {
                LOGGER.info("Cart found: {}", cart);
            } else {
                LOGGER.warn("Cart not found with id: {}", id);
            }
            return cart;
        } catch (Exception e) {
            LOGGER.error("Error finding cart with id: {}", id, e);
            throw e;
        }
    }

    public Cart findByUserId(Integer userId) {
        LOGGER.info("Entering findByUserId with userId: {}", userId);
        try {
            Cart cart = entityManager.createQuery("SELECT c FROM Cart c WHERE c.users.userId = :userId", Cart.class)
                                     .setParameter("userId", userId)
                                     .getSingleResult();
            LOGGER.info("Cart found for userId: {}", userId);
            return cart;
        } catch (NoResultException e) {
            LOGGER.warn("No cart found for userId: {}", userId);
            return null;
        } catch (Exception e) {
            LOGGER.error("Error finding cart for userId: {}", userId, e);
            throw e;
        }
    }

    public List<Cart> findAll() {
        LOGGER.info("Entering findAll");
        try {
            List<Cart> carts = entityManager.createQuery("SELECT c FROM Cart c", Cart.class).getResultList();
            LOGGER.info("Retrieved all carts successfully");
            return carts;
        } catch (Exception e) {
            LOGGER.error("Error finding all carts", e);
            throw e;
        }
    }

    @Transactional
    public Cart update(Integer id, Cart cart) {
        LOGGER.info("Entering update with id: {} and cart: {}", id, cart);
        try {
            Cart existingCart = findById(id);
            if (existingCart != null) {
                existingCart.setCreatedAt(cart.getCreatedAt());
                existingCart.setUsers(cart.getUsers());
                Cart updatedCart = entityManager.merge(existingCart);
                LOGGER.info("Cart updated successfully: {}", updatedCart);
                return updatedCart;
            } else {
                LOGGER.warn("Cart not found with id: {}", id);
                return null;
            }
        } catch (Exception e) {
            LOGGER.error("Error updating cart with id: {}", id, e);
            throw e;
        }
    }

    @Transactional
    public void delete(Integer id) {
        LOGGER.info("Entering delete with id: {}", id);
        try {
            Cart cart = findById(id);
            if (cart != null) {
                entityManager.remove(cart);
                LOGGER.info("Cart deleted successfully with id: {}", id);
            } else {
                LOGGER.warn("Cart not found with id: {}", id);
            }
        } catch (Exception e) {
            LOGGER.error("Error deleting cart with id: {}", id, e);
            throw e;
        }
    }
}