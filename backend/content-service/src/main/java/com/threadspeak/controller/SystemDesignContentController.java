package com.threadspeak.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;

@Controller
public class SystemDesignContentController {

    private static final String BASE_PATH = "D:/ThreadSpeak/SystemDesign";

    @GetMapping("/system-design/**")
    @ResponseBody
    public ResponseEntity<Resource> serveSystemDesignFile(HttpServletRequest request) {
        try {
            String fullUri = request.getRequestURI();
            String prefix = "/system-design/";
            int index = fullUri.indexOf(prefix);
            if (index == -1) {
                return ResponseEntity.notFound().build();
            }
            String relativePath = fullUri.substring(index + prefix.length());
            String decodedPath = URLDecoder.decode(relativePath, StandardCharsets.UTF_8);

            // Normalize path
            Path filePath = Paths.get(BASE_PATH, decodedPath).normalize();
            File file = filePath.toFile();

            if (!file.exists() || !file.isFile()) {
                Path altPath = Paths.get("../SystemDesign", decodedPath).normalize();
                if (altPath.toFile().exists() && altPath.toFile().isFile()) {
                    file = altPath.toFile();
                } else {
                    Path rootPath = Paths.get("SystemDesign", decodedPath).normalize();
                    if (rootPath.toFile().exists() && rootPath.toFile().isFile()) {
                        file = rootPath.toFile();
                    } else {
                        return ResponseEntity.notFound().build();
                    }
                }
            }

            Resource resource = new FileSystemResource(file);
            String contentType = "text/html; charset=UTF-8";
            String lowerName = file.getName().toLowerCase();
            if (lowerName.endsWith(".css")) {
                contentType = "text/css; charset=UTF-8";
            } else if (lowerName.endsWith(".js")) {
                contentType = "application/javascript; charset=UTF-8";
            } else if (lowerName.endsWith(".png")) {
                contentType = MediaType.IMAGE_PNG_VALUE;
            } else if (lowerName.endsWith(".jpg") || lowerName.endsWith(".jpeg")) {
                contentType = MediaType.IMAGE_JPEG_VALUE;
            } else if (lowerName.endsWith(".svg")) {
                contentType = "image/svg+xml";
            } else if (lowerName.endsWith(".pdf")) {
                contentType = MediaType.APPLICATION_PDF_VALUE;
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, contentType)
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
