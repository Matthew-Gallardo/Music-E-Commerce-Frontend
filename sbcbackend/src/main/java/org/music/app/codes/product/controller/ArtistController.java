package org.music.app.codes.product.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.music.app.codes.product.model.data.Artist;
import org.music.app.codes.product.model.forms.ArtistForm;
import org.music.app.codes.product.repository.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/artist")
public class ArtistController {
    private static final Logger LOGGER = LogManager.getLogger(ArtistController.class);

    @Autowired
    private ArtistRepository repository;

    @PostMapping("/create")
    public boolean createArtist(@RequestBody ArtistForm artistForm) {
        LOGGER.info("Entering createArtist with artistForm: {}", artistForm);
        try {
            Artist artist = new Artist();
            artist.setArtistName(artistForm.getArtistName());
            artist.setArtistNumber(artistForm.getArtistNumber());
            artist.setArtistEmail(artistForm.getArtistEmail());
            artist.setArtistLocation(artistForm.getArtistLocation());
            boolean result = repository.addArtist(artist);
            LOGGER.info("Artist created successfully: {}", artist);
            return result;
        } catch (Exception e) {
            LOGGER.error("Error creating artist", e);
            return false;
        }
    }

    @PutMapping("/update/{id}")
    public boolean updateArtist(@PathVariable Integer id, @RequestBody ArtistForm artistForm) {
        LOGGER.info("Entering updateArtist with id: {} and artistForm: {}", id, artistForm);
        try {
            Artist artist = repository.findArtistById(id);
            if (artist != null) {
                artist.setArtistName(artistForm.getArtistName());
                artist.setArtistNumber(artistForm.getArtistNumber());
                artist.setArtistEmail(artistForm.getArtistEmail());
                artist.setArtistLocation(artistForm.getArtistLocation());
                boolean result = repository.updateArtist(artist);
                LOGGER.info("Artist updated successfully: {}", artist);
                return result;
            } else {
                LOGGER.warn("Artist not found with ID: {}", id);
                return false;
            }
        } catch (Exception e) {
            LOGGER.error("Error updating artist", e);
            return false;
        }
    }

    @DeleteMapping("/delete/{id}")
    public boolean deleteArtist(@PathVariable Integer id) {
        LOGGER.info("Entering deleteArtist with id: {}", id);
        try {
            boolean result = repository.deleteArtist(id);
            LOGGER.info("Artist deleted successfully with id: {}", id);
            return result;
        } catch (Exception e) {
            LOGGER.error("Error deleting artist", e);
            return false;
        }
    }

    @GetMapping("/all")
    public List<Artist> getAllArtists() {
        LOGGER.info("Entering getAllArtists");
        try {
            List<Artist> artists = repository.findAllArtists();
            LOGGER.info("Retrieved all artists successfully");
            return artists;
        } catch (Exception e) {
            LOGGER.error("Error getting all artists", e);
            return null;
        }
    }

    @GetMapping("/{id}")
    public Artist getArtistById(@PathVariable Integer id) {
        LOGGER.info("Entering getArtistById with id: {}", id);
        try {
            Artist artist = repository.findArtistById(id);
            LOGGER.info("Retrieved artist successfully with id: {}", id);
            return artist;
        } catch (Exception e) {
            LOGGER.error("Error getting artist by ID", e);
            return null;
        }
    }
}