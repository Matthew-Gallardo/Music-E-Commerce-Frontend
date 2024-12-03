package org.music.app.codes.product.controller;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.music.app.codes.product.model.data.Track;
import org.music.app.codes.product.model.data.Artist;
import org.music.app.codes.product.model.data.Album;
import org.music.app.codes.product.model.forms.TrackForm;
import org.music.app.codes.product.repository.TrackRepository;
import org.music.app.codes.product.repository.ArtistRepository;
import org.music.app.codes.product.repository.AlbumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/track")
public class TrackController {
    private static final Logger LOGGER = LogManager.getLogger(TrackController.class);

    @Autowired
    private TrackRepository trackRepository;

    @Autowired
    private ArtistRepository artistRepository;

    @Autowired
    private AlbumRepository albumRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addTrack(@RequestBody TrackForm trackForm) {
        LOGGER.info("Entering addTrack with trackForm: {}", trackForm);
        Track track = convertToTrack(trackForm);
        if (trackRepository.addTrack(track)) {
            LOGGER.info("Track added successfully: {}", track);
            return ResponseEntity.ok("Track added successfully");
        } else {
            LOGGER.error("Error adding track: {}", track);
            return ResponseEntity.status(500).body("Error adding track");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Track> findTrackById(@PathVariable Integer id) {
        LOGGER.info("Entering findTrackById with id: {}", id);
        Track track = trackRepository.findTrackById(id);
        if (track != null) {
            LOGGER.info("Track found: {}", track);
            return ResponseEntity.ok(track);
        } else {
            LOGGER.warn("Track not found with id: {}", id);
            return ResponseEntity.status(404).body(null);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateTrack(@PathVariable Integer id, @RequestBody TrackForm trackForm) {
        LOGGER.info("Entering updateTrack with id: {} and trackForm: {}", id, trackForm);
        Track track = convertToTrack(trackForm);
        track.setTrackId(id); // Set the trackId for the update operation
        if (trackRepository.updateTrack(track)) {
            LOGGER.info("Track updated successfully: {}", track);
            return ResponseEntity.ok("Track updated successfully");
        } else {
            LOGGER.error("Error updating track: {}", track);
            return ResponseEntity.status(500).body("Error updating track");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTrack(@PathVariable Integer id) {
        LOGGER.info("Entering deleteTrack with id: {}", id);
        if (trackRepository.deleteTrack(id)) {
            LOGGER.info("Track deleted successfully with id: {}", id);
            return ResponseEntity.ok("Track deleted successfully");
        } else {
            LOGGER.error("Error deleting track with id: {}", id);
            return ResponseEntity.status(500).body("Error deleting track");
        }
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Track>> getAllTracks() {
        LOGGER.info("Entering getAllTracks");
        List<Track> tracks = trackRepository.getAllTracks();
        if (tracks != null) {
            LOGGER.info("Retrieved all tracks successfully");
            return ResponseEntity.ok(tracks);
        } else {
            LOGGER.error("Error getting all tracks");
            return ResponseEntity.status(500).body(null);
        }
    }

    private Track convertToTrack(TrackForm trackForm) {
        LOGGER.info("Converting TrackForm to Track: {}", trackForm);
        Track track = new Track();
        track.setTrackName(trackForm.getTrackName());
        track.setTrackMusic(trackForm.getTrackMusic());

        Artist artist = artistRepository.findArtistById(trackForm.getArtistId());
        Album album = albumRepository.findAlbumById(trackForm.getAlbumId());

        if (artist != null) {
            track.setArtist(artist);
        } else {
            LOGGER.warn("Artist with ID: {} not found", trackForm.getArtistId());
        }

        if (album != null) {
            track.setAlbum(album);
        } else {
            LOGGER.warn("Album with ID: {} not found", trackForm.getAlbumId());
        }

        return track;
    }
}