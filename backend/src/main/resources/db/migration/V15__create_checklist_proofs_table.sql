CREATE TABLE checklist_proofs (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    checklist_item_id   UUID NOT NULL REFERENCES checklist_items(id) ON DELETE CASCADE,
    uploaded_by_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    file_url            VARCHAR(500) NOT NULL,
    mime_type           VARCHAR(100),
    caption             VARCHAR(500),
    uploaded_at         TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_checklist_proofs_item_id ON checklist_proofs(checklist_item_id);
