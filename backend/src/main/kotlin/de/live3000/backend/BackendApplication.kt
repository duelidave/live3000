package de.live3000.backend

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import javax.sql.DataSource

@SpringBootApplication
class BackendApplication() {

    @EnableWebSecurity
    class BackendSecurity : WebSecurityConfigurerAdapter() {
        @Autowired
        private val dataSource: DataSource? = null

        override fun configure(http: HttpSecurity) {
            http.authorizeRequests()
                    .antMatchers("/performLogin")
                        .permitAll()
                    .anyRequest().authenticated()
                    .and()
                    .formLogin()
                    .usernameParameter("email")
                    .passwordParameter("password")
                    .loginPage("http://localhost:8080/#Login")
                    .loginProcessingUrl("performLogin")
                    .defaultSuccessUrl("http://localhost:8080/#")
                    .permitAll()
                    .and()
                    .logout().permitAll()
                    .and()
                    .csrf().disable()

            http.exceptionHandling().accessDeniedPage("/403");
        }

        @Autowired
        fun configureGlobal(auth: AuthenticationManagerBuilder): Unit {
            auth.jdbcAuthentication()
                    .dataSource(dataSource)
                    .usersByUsernameQuery("select email,password,enabled from users where email=?")
                    .authoritiesByUsernameQuery("select email,authority from authorities where email=?")
        }
    }
}

fun main(args: Array<String>) {
    runApplication<BackendApplication>(*args)
}