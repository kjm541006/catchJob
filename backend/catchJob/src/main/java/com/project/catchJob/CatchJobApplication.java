package com.project.catchJob;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module; // 이 부분을 추가하세요.

@SpringBootApplication
public class CatchJobApplication {

	public static void main(String[] args) {
		SpringApplication.run(CatchJobApplication.class, args);
	}
	
	@Bean
	public ObjectMapper objectMapper() {
	    ObjectMapper objectMapper = new ObjectMapper();
	    Hibernate5Module hibernate5Module = new Hibernate5Module(); // 수정된 대문자 'H'
	    hibernate5Module.configure(Hibernate5Module.Feature.FORCE_LAZY_LOADING, true);
	    objectMapper.registerModule(hibernate5Module);

	    return objectMapper;
	}
}
