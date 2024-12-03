package org.music.app.codes.transaction.repository;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.music.app.codes.transaction.model.data.CartItems;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
public class CartItemsRepository {
    private static final Logger LOGGER = LogManager.getLogger(CartItemsRepository.class);

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public CartItems save(CartItems cartItem) {
        LOGGER.info("Entering save with cartItem: {}", cartItem);
        try {
            if (cartItem.getCartItemId() == null) {
                entityManager.persist(cartItem);
                LOGGER.info("CartItem persisted successfully: {}", cartItem);
                return cartItem;
            } else {
                CartItems mergedCartItem = entityManager.merge(cartItem);
                LOGGER.info("CartItem merged successfully: {}", mergedCartItem);
                return mergedCartItem;
            }
        } catch (Exception e) {
            LOGGER.error("Error saving cartItem: {}", cartItem, e);
            throw e;
        }
    }

    public CartItems findById(Integer id) {
        LOGGER.info("Entering findById with id: {}", id);
        try {
            CartItems cartItem = entityManager.find(CartItems.class, id);
            if (cartItem != null) {
                LOGGER.info("CartItem found: {}", cartItem);
            } else {
                LOGGER.warn("CartItem not found with id: {}", id);
            }
            return cartItem;
        } catch (Exception e) {
            LOGGER.error("Error finding cartItem with id: {}", id, e);
            throw e;
        }
    }

    public List<CartItems> findAll() {
        LOGGER.info("Entering findAll");
        try {
            List<CartItems> cartItems = entityManager.createQuery("SELECT c FROM CartItems c", CartItems.class).getResultList();
            LOGGER.info("Retrieved all cartItems successfully");
            return cartItems;
        } catch (Exception e) {
            LOGGER.error("Error finding all cartItems", e);
            throw e;
        }
    }

    @Transactional
    public CartItems update(Integer id, CartItems cartItem) {
        LOGGER.info("Entering update with id: {} and cartItem: {}", id, cartItem);
        try {
            CartItems existingCartItem = findById(id);
            if (existingCartItem != null) {
                if (cartItem.getCartQuantity() != null) {
                    existingCartItem.setCartQuantity(cartItem.getCartQuantity());
                }
                if (cartItem.getCart() != null) {
                    existingCartItem.setCart(cartItem.getCart());
                }
                if (cartItem.getAlbum() != null) {
                    existingCartItem.setAlbum(cartItem.getAlbum());
                }
                CartItems updatedCartItem = entityManager.merge(existingCartItem);
                LOGGER.info("CartItem updated successfully: {}", updatedCartItem);
                return updatedCartItem;
            } else {
                LOGGER.warn("CartItem not found with id: {}", id);
                return null;
            }
        } catch (Exception e) {
            LOGGER.error("Error updating cartItem with id: {}", id, e);
            throw e;
        }
    }

    @Transactional
    public void delete(Integer id) {
        LOGGER.info("Entering delete with id: {}", id);
        try {
            int rowsAffected = entityManager.createQuery("DELETE FROM CartItems c WHERE c.cartItemId = :id")
                                            .setParameter("id", id)
                                            .executeUpdate();
            if (rowsAffected == 0) {
                LOGGER.warn("CartItem with id {} does not exist", id);
                throw new EntityNotFoundException("CartItem with id " + id + " does not exist.");
            } else {
                LOGGER.info("CartItem deleted successfully with id: {}", id);
            }
        } catch (Exception e) {
            LOGGER.error("Error deleting cartItem with id: {}", id, e);
            throw e;
        }
    }

    @Transactional
    public void deleteByUserId(Integer userId) {
        LOGGER.info("Entering deleteByUserId with userId: {}", userId);
        try {
            int rowsAffected = entityManager.createQuery("DELETE FROM CartItems c WHERE c.cart.users.userId = :userId")
                                            .setParameter("userId", userId)
                                            .executeUpdate();
            LOGGER.info("Deleted {} cartItems for userId: {}", rowsAffected, userId);
        } catch (Exception e) {
            LOGGER.error("Error deleting cartItems for userId: {}", userId, e);
            throw e;
        }
    }
}