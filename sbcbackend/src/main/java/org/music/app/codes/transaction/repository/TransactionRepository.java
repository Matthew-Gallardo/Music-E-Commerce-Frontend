package org.music.app.codes.transaction.repository;

import org.music.app.codes.transaction.model.data.Transaction;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.music.app.codes.account.model.data.Users;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import java.util.List;

@Repository
public class TransactionRepository {
    private static final Logger LOGGER = LogManager.getLogger(TransactionRepository.class);

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public Transaction save(Transaction transaction) {
        LOGGER.info("Entering save with transaction: {}", transaction);
        try {
            if (transaction.getTransactionId() == null) {
                entityManager.persist(transaction);
                LOGGER.info("Transaction persisted successfully: {}", transaction);
                return transaction;
            } else {
                Transaction mergedTransaction = entityManager.merge(transaction);
                LOGGER.info("Transaction merged successfully: {}", mergedTransaction);
                return mergedTransaction;
            }
        } catch (Exception e) {
            LOGGER.error("Error saving transaction: {}", transaction, e);
            throw e;
        }
    }

    public Transaction findById(Integer id) {
        LOGGER.info("Entering findById with id: {}", id);
        try {
            Transaction transaction = entityManager.find(Transaction.class, id);
            if (transaction != null) {
                LOGGER.info("Transaction found: {}", transaction);
            } else {
                LOGGER.warn("Transaction not found with id: {}", id);
            }
            return transaction;
        } catch (Exception e) {
            LOGGER.error("Error finding transaction with id: {}", id, e);
            throw e;
        }
    }

    public List<Transaction> findAll() {
        LOGGER.info("Entering findAll");
        try {
            List<Transaction> transactions = entityManager.createQuery("SELECT t FROM Transaction t", Transaction.class).getResultList();
            LOGGER.info("Retrieved all transactions successfully");
            return transactions;
        } catch (Exception e) {
            LOGGER.error("Error finding all transactions", e);
            throw e;
        }
    }

    @Transactional
    public Transaction update(Integer id, Transaction transaction) {
        LOGGER.info("Entering update with id: {} and transaction: {}", id, transaction);
        try {
            Transaction existingTransaction = findById(id);
            if (existingTransaction != null) {
                existingTransaction.setTransactionTotalAmount(transaction.getTransactionTotalAmount());
                existingTransaction.setTransactionStatus(transaction.getTransactionStatus());
                existingTransaction.setTransactionDate(transaction.getTransactionDate());
                Transaction updatedTransaction = entityManager.merge(existingTransaction);
                LOGGER.info("Transaction updated successfully: {}", updatedTransaction);
                return updatedTransaction;
            } else {
                LOGGER.warn("Transaction not found with id: {}", id);
                return null;
            }
        } catch (Exception e) {
            LOGGER.error("Error updating transaction with id: {}", id, e);
            throw e;
        }
    }

    @Transactional
    public void delete(Integer id) {
        LOGGER.info("Entering delete with id: {}", id);
        try {
            Transaction transaction = findById(id);
            if (transaction != null) {
                entityManager.remove(transaction);
                LOGGER.info("Transaction deleted successfully with id: {}", id);
            } else {
                LOGGER.warn("Transaction not found with id: {}", id);
            }
        } catch (Exception e) {
            LOGGER.error("Error deleting transaction with id: {}", id, e);
            throw e;
        }
    }

    public Users findUserById(Integer userId) {
        LOGGER.info("Entering findUserById with userId: {}", userId);
        try {
            Users user = entityManager.find(Users.class, userId);
            if (user != null) {
                LOGGER.info("User found: {}", user);
            } else {
                LOGGER.warn("User not found with userId: {}", userId);
            }
            return user;
        } catch (Exception e) {
            LOGGER.error("Error finding user with userId: {}", userId, e);
            throw e;
        }
    }
}