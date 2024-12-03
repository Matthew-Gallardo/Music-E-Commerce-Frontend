package org.music.app.codes.account.repository;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.music.app.codes.account.model.data.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

@Repository
public class LoginRepository {
    public static final Logger LOGGER = LogManager.getLogger(LoginRepository.class);

    @Autowired
    private EntityManager entityManager;

    public Login findByLoginUsername(String username) {
        LOGGER.info("Entering findByLoginUsername with username: {}", username);
        try {
            String jpql = "SELECT l FROM Login l WHERE l.loginUsername = :username";
            TypedQuery<Login> query = entityManager.createQuery(jpql, Login.class);
            query.setParameter("username", username);
            Login result = query.getSingleResult();
            LOGGER.info("Exiting findByLoginUsername with result: {}", result);
            return result;
        } catch (NoResultException e) {
            LOGGER.warn("No result found for username: {}", username);
            return null;
        } catch (Exception e) {
            LOGGER.error("Error occurred in findByLoginUsername for username: {}", username, e);
            throw e;
        }
    }

    @Transactional
    public void save(Login login) {
        LOGGER.info("Entering save with login: {}", login);
        try {
            entityManager.persist(login);
            LOGGER.info("Successfully saved login: {}", login);
        } catch (Exception e) {
            LOGGER.error("Error occurred while saving login: {}", login, e);
            throw e;
        }
    }
}