package org.music.app.codes.transaction.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.music.app.codes.transaction.model.data.Transaction;
import org.music.app.codes.transaction.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    private static final Logger LOGGER = LogManager.getLogger(TransactionController.class);

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction, @RequestParam Integer userId) {
        LOGGER.info("Entering createTransaction with transaction: {} and userId: {}", transaction, userId);
        Transaction createdTransaction = transactionService.createTransaction(transaction, userId);
        LOGGER.info("Transaction created successfully: {}", createdTransaction);
        return ResponseEntity.ok(createdTransaction);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable Integer id) {
        LOGGER.info("Entering getTransactionById with id: {}", id);
        Transaction transaction = transactionService.getTransactionById(id);
        if (transaction != null) {
            LOGGER.info("Transaction found: {}", transaction);
            return ResponseEntity.ok(transaction);
        } else {
            LOGGER.warn("Transaction not found with id: {}", id);
            return ResponseEntity.status(404).body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        LOGGER.info("Entering getAllTransactions");
        List<Transaction> transactions = transactionService.getAllTransactions();
        if (transactions != null) {
            LOGGER.info("Retrieved all transactions successfully");
            return ResponseEntity.ok(transactions);
        } else {
            LOGGER.error("Error getting all transactions");
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable Integer id, @RequestBody Transaction transaction) {
        LOGGER.info("Entering updateTransaction with id: {} and transaction: {}", id, transaction);
        Transaction updatedTransaction = transactionService.updateTransaction(id, transaction);
        if (updatedTransaction != null) {
            LOGGER.info("Transaction updated successfully: {}", updatedTransaction);
            return ResponseEntity.ok(updatedTransaction);
        } else {
            LOGGER.error("Error updating transaction with id: {}", id);
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Integer id) {
        LOGGER.info("Entering deleteTransaction with id: {}", id);
        transactionService.deleteTransaction(id);
        LOGGER.info("Transaction deleted successfully with id: {}", id);
        return ResponseEntity.noContent().build();
    }
}