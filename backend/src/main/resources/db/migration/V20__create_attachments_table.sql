CREATE TABLE attachments (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type         VARCHAR(30) NOT NULL,
    entity_id           UUID NOT NULL,
    url                 VARCHAR(500) NOT NULL,
    mime_type           VARCHAR(100),
    size_bytes          INT,
    uploaded_by_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at          TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_attachments_entity ON attachments(entity_type, entity_id);
CREATE INDEX idx_attachments_uploaded_by ON attachments(uploaded_by_user_id);
