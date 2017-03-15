## Better FlashCard Racer

This has been adopted from the [swagger examples](https://github.com/swagger-api/swagger-samples/tree/master/java/inflector-springboot-jersey)

## API Test with Postman
This project using automatic testing for the API, can download postman at https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en and see postmant testing at https://github.com/flanaras/better-flashcard-racer/blob/room/backend/shared%20files/Real%20Flashcard%20Endpoint.postman_collection.json\

## Building and running

The project uses [Gradle](https://gradle.org/) for its build system and you can build the project by running:

	./gradlew build
	./gradlew bootRun
	
or

    ./gradlew clean build bootRun
    
To run the test cases:

    ./gradlew test
    
In case of a failed test case append '-i' for more information.
	
Currently it wont run from the generated .jar due to some linking problems.

## Default APIs

The swagger definition will be available at the following URI:

[http://localhost:8080/api/v1/swagger.json](http://localhost:8080/api/v1/swagger.json)

The Spring Boot Actuator endpoints are avilable here:

[http://localhost:8080/info](http://localhost:8080/info)

[http://localhost:8080/env](http://localhost:8080/env)
