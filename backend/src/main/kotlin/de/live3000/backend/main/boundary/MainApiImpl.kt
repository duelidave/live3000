package de.live3000.backend.main.boundary

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController

@RestController
class MainApiImpl {

    @GetMapping("/")
    @CrossOrigin(origins = ["*"])
    @ResponseBody
    fun index() : ResponseEntity<List<String>> {
        return ResponseEntity.ok(listOf("42", "1337"))
    }
}