package com.dev.smarttask.common.adapter.out.storage;

import com.dev.smarttask.common.application.port.out.StoragePort;
import com.dev.smarttask.common.domain.model.PresignedUrlResult;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.HttpMethod;
import com.google.cloud.storage.Storage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.URL;
import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
public class GcpStorageAdapter implements StoragePort {

    private final Storage storage;
    private final String bucketName;
    private static final long UPLOAD_URL_EXPIRATION_MINUTES = 15;
    private static final long DOWNLOAD_URL_EXPIRATION_MINUTES = 60;

    public GcpStorageAdapter(Storage storage,
                              @Value("${app.gcp.storage.bucket}") String bucketName) {
        this.storage = storage;
        this.bucketName = bucketName;
    }

    @Override
    public PresignedUrlResult generateUploadUrl(String objectName, String contentType) {
        BlobInfo blobInfo = BlobInfo.newBuilder(BlobId.of(bucketName, objectName))
                .setContentType(contentType)
                .build();

        URL url = storage.signUrl(
                blobInfo,
                UPLOAD_URL_EXPIRATION_MINUTES,
                TimeUnit.MINUTES,
                Storage.SignUrlOption.httpMethod(HttpMethod.PUT),
                Storage.SignUrlOption.withContentType()
        );

        log.info("Generated upload URL for object: {}", objectName);

        return PresignedUrlResult.builder()
                .url(url.toString())
                .objectName(objectName)
                .expiresAt(LocalDateTime.now().plusMinutes(UPLOAD_URL_EXPIRATION_MINUTES))
                .build();
    }

    @Override
    public PresignedUrlResult generateDownloadUrl(String objectName) {
        BlobInfo blobInfo = BlobInfo.newBuilder(BlobId.of(bucketName, objectName)).build();

        URL url = storage.signUrl(
                blobInfo,
                DOWNLOAD_URL_EXPIRATION_MINUTES,
                TimeUnit.MINUTES,
                Storage.SignUrlOption.httpMethod(HttpMethod.GET)
        );

        log.info("Generated download URL for object: {}", objectName);

        return PresignedUrlResult.builder()
                .url(url.toString())
                .objectName(objectName)
                .expiresAt(LocalDateTime.now().plusMinutes(DOWNLOAD_URL_EXPIRATION_MINUTES))
                .build();
    }

    @Override
    public void deleteObject(String objectName) {
        boolean deleted = storage.delete(BlobId.of(bucketName, objectName));
        if (deleted) {
            log.info("Deleted object from storage: {}", objectName);
        } else {
            log.warn("Object not found in storage: {}", objectName);
        }
    }
}
