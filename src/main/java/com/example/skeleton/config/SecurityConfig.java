package com.example.skeleton.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;

@Configuration
@EnableRedisHttpSession(maxInactiveIntervalInSeconds = 6*60*60)
public class SecurityConfig extends WebSecurityConfigurerAdapter{
    @Value("${spring.redis.host}")
    private String redisAddress;

    @Value("${spring.redis.port}")
    private int redisPort;
    
    @Value("${app.environment}")
    private String myEnvironment;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    
    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http
            .authorizeRequests()
            .anyRequest().permitAll()
            .and()
            .formLogin()
            .loginPage("/login")
            .and()
            .csrf()
                    .csrfTokenRepository(getCookieCsrfTokenRepository());
    }
    
    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        LettuceConnectionFactory lettuceConnectionFactory = new LettuceConnectionFactory(redisAddress,redisPort);
        return lettuceConnectionFactory;
    }

    // Test OK
    @Bean
    public RedisTemplate<String, String> redisTemplate() {
        RedisTemplate<String, String> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new StringRedisSerializer());

        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashValueSerializer(new StringRedisSerializer());
        
        return redisTemplate;
    }

    @Bean
    public CookieSerializer cookieSerializer(){
        DefaultCookieSerializer serializer = new DefaultCookieSerializer();
        serializer.setCookieName("STUSEID");
        serializer.setCookiePath("/");
        serializer.setDomainNamePattern("^.+?\\.(\\w+\\.[a-z]+)$");
        return serializer;
    }

    @Bean
    public CrossDomainCookieCsrfTokenRepository getCookieCsrfTokenRepository(){
        CrossDomainCookieCsrfTokenRepository cookieTokenConfig = new CrossDomainCookieCsrfTokenRepository();
        cookieTokenConfig.setCookieName("XSRF-TOKEN");
        cookieTokenConfig.setCookiePath("/");
        cookieTokenConfig.setDomainPattern("^.+?\\.(\\w+\\.[a-z]+)$");
        return cookieTokenConfig;
    }
}
