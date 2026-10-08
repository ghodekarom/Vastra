package com.vastra.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.Map;

@Getter
public class ApiException extends RuntimeException {

    private final String code;
    private final HttpStatus status;
    private final Map<String, Object> details;

    public ApiException(String code, String message, HttpStatus status) {
        super(message);
        this.code = code;
        this.status = status;
        this.details = null;
    }

    public ApiException(String code, String message, HttpStatus status, Map<String, Object> details) {
        super(message);
        this.code = code;
        this.status = status;
        this.details = details;
    }

    public static ApiException notFound(String message) {
        return new ApiException("RESOURCE_NOT_FOUND", message, HttpStatus.NOT_FOUND);
    }

    public static ApiException badRequest(String message) {
        return new ApiException("BAD_REQUEST", message, HttpStatus.BAD_REQUEST);
    }

    public static ApiException unauthorized(String message) {
        return new ApiException("UNAUTHORIZED", message, HttpStatus.UNAUTHORIZED);
    }

    public static ApiException forbidden(String message) {
        return new ApiException("FORBIDDEN", message, HttpStatus.FORBIDDEN);
    }

    public static ApiException conflict(String message) {
        return new ApiException("CONFLICT", message, HttpStatus.CONFLICT);
    }
}
