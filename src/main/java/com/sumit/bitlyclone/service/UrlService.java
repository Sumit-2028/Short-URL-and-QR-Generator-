// src/main/java/com/sumit/bitlyclone/service/UrlService.java

package com.sumit.bitlyclone.service;

import com.google.zxing.*;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.sumit.bitlyclone.dto.*;
import com.sumit.bitlyclone.model.*;
import com.sumit.bitlyclone.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.ByteArrayOutputStream;
import java.util.*;
import java.util.stream.Collectors;
import java.util.Base64;

@Service
public class UrlService {

    @Autowired
    private UrlRepository urlRepository;
    @Autowired
    private UserRepository userRepository;

    @Value("${app.base-url}")
    private String baseUrl;

    public UrlResponse shortenUrl(String originalUrl, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Generate unique 6-character short code
        String shortCode = generateShortCode();

        Url url = Url.builder()
                .originalUrl(originalUrl)
                .shortCode(shortCode)
                .user(user)
                .build();

        urlRepository.save(url);

        // Generate QR code for the short URL
        String shortUrl = baseUrl + "/r/" + shortCode;
        String qrCode = generateQrCode(shortUrl);

        return mapToResponse(url, shortUrl, qrCode);
    }

    // Called when someone visits /r/abc123 — increments click and returns original
    // URL
    @Transactional // ensures the increment + fetch happen in one DB transaction
    public String redirect(String shortCode) {
        Url url = urlRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new RuntimeException("Short URL not found"));

        urlRepository.incrementClickCount(shortCode);
        return url.getOriginalUrl();
    }

    public List<UrlResponse> getUserUrls(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return urlRepository.findByUser(user).stream()
                .map(url -> mapToResponse(
                        url,
                        baseUrl + "/r/" + url.getShortCode(),
                        generateQrCode(baseUrl + "/r/" + url.getShortCode())))
                .collect(Collectors.toList());
    }

    public void deleteUserUrl(Long urlId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Url url = urlRepository.findByIdAndUser(urlId, user)
                .orElseThrow(() -> new RuntimeException("URL not found"));

        urlRepository.delete(url);
    }

    // Generates a random 6-character alphanumeric code like "aB3xZ9"
    private String generateShortCode() {
        String chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new Random();
        String code;
        // Keep generating until we get a unique one
        do {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < 6; i++) {
                sb.append(chars.charAt(random.nextInt(chars.length())));
            }
            code = sb.toString();
        } while (urlRepository.findByShortCode(code).isPresent());
        return code;
    }

    // Uses ZXing to generate a QR code and returns it as a base64 string
    // React can display it directly as: <img
    // src={`data:image/png;base64,${qrCode}`} />
    private String generateQrCode(String text) {
        try {
            QRCodeWriter qrWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrWriter.encode(text, BarcodeFormat.QR_CODE, 250, 250);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);
            return Base64.getEncoder().encodeToString(outputStream.toByteArray());
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate QR code");
        }
    }

    private UrlResponse mapToResponse(Url url, String shortUrl, String qrCode) {
        return new UrlResponse(
                url.getId(),
                url.getOriginalUrl(),
                url.getShortCode(),
                shortUrl,
                qrCode,
                url.getClickCount(),
                url.getCreatedAt());
    }
}
