package com.dev.smarttask.common.application.port.out;

import com.dev.smarttask.common.domain.model.PresignedUrlResult;

/**
 * Output port for cloud storage operations.
 */
public interface StoragePort {

    PresignedUrlResult generateUploadUrl(String objectName, String contentType);

    PresignedUrlResult generateDownloadUrl(String objectName);

    void deleteObject(String objectName);
}
