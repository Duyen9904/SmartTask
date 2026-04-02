package com.dev.smarttask.common.application.port.in;

import com.dev.smarttask.common.application.port.in.command.ConfirmUploadCommand;
import com.dev.smarttask.common.application.port.in.command.RequestUploadCommand;
import com.dev.smarttask.common.domain.model.Attachment;
import com.dev.smarttask.common.domain.model.PresignedUrlResult;

public interface UploadAttachmentUseCase {

    PresignedUrlResult requestUploadUrl(RequestUploadCommand command);

    Attachment confirmUpload(ConfirmUploadCommand command);
}
