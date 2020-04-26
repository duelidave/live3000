package de.live3000.backend.auth.boundary

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import de.live3000.backend.auth.entity.User
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class AuthApiImpl : AuthApi {

    @PostMapping("/performLogin")
    @CrossOrigin(origins = ["*"])
    fun login(@RequestBody user : User): ResponseEntity<User> {
        println("got user $user")
        return ResponseEntity.ok(user)
    }
}