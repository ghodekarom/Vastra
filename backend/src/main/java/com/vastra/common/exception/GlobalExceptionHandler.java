package com.vastra.common.exception;

import com.vastra.common.response.ApiError;
import com.vastra.common.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiResponse<ApiError>> handleApiException(ApiException ex) {
        ApiError error = ApiError.of(ex.getCode(), ex.getMessage(), ex.getDetails());
        ApiResponse<ApiError> response = ApiResponse.<ApiError>builder()
                .success(false)
                .data(error)
                .message(ex.getMessage())
                .build();
        return ResponseEntity.status(ex.getStatus()).body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<ApiError>> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, Object> fieldErrors = new HashMap<>();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            fieldErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        ApiError error = ApiError.of("VALIDATION_FAILED", "Invalid request parameters", fieldErrors);
        ApiResponse<ApiError> response = ApiResponse.<ApiError>builder()
                .success(false)
                .data(error)
                .message("Validation failed")
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponse<ApiError>> handleBadCredentials(BadCredentialsException ex) {
        ApiError error = ApiError.of("INVALID_CREDENTIALS", "Invalid email or password");
        ApiResponse<ApiError> response = ApiResponse.<ApiError>builder()
                .success(false)
                .data(error)
                .message("Invalid email or password")
                .build();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<ApiError>> handleAccessDenied(AccessDeniedException ex) {
        ApiError error = ApiError.of("ACCESS_DENIED", "You do not have permission to access this resource");
        ApiResponse<ApiError> response = ApiResponse.<ApiError>builder()
                .success(false)
                .data(error)
                .message("Forbidden")
                .build();
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<ApiError>> handleGenericException(Exception ex) {
        ApiError error = ApiError.of("INTERNAL_SERVER_ERROR", ex.getMessage() != null ? ex.getMessage() : "An unexpected error occurred");
        ApiResponse<ApiError> response = ApiResponse.<ApiError>builder()
                .success(false)
                .data(error)
                .message("An unexpected error occurred")
                .build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
