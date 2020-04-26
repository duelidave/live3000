package de.live3000.backend

import com.zaxxer.hikari.HikariDataSource
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import javax.sql.DataSource


@Configuration
class DBConfiguration {
    @Value("\${spring.datasource.driver-class-name}")
    lateinit var driver: String

    @Value("\\\${spring.datasource.url}")
    lateinit var url: String

    @Value("\\\${spring.datasource.username}")
    lateinit var user: String

    @Value("\\\${spring.datasource.password}")
    lateinit var pw: String


    @Primary
    @Bean("datasource")
    fun datasource(): DataSource {
        val dataSource = HikariDataSource()
        dataSource.driverClassName = driver.toString()
        dataSource.jdbcUrl = url
        dataSource.username = user
        dataSource.password = pw

        return dataSource
    }
}