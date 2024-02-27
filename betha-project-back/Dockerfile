FROM maven:3.8.5-openjdk-17 as Build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim
COPY --from=Build /target/backend-0.0.1-SNAPSHOT.jar betha.jar
EXPOSE 8080
ENTRYPOINT [ "java","-jar","betha.jar" ]

