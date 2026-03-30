CREATE TABLE checklist_items (
    id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id              UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    title                VARCHAR(255) NOT NULL,
    assigned_to_user_id  UUID REFERENCES users(id) ON DELETE SET NULL,
    completed_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    status               VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    estimated_hours      DECIMAL(5,2),
    display_order        INT NOT NULL DEFAULT 0,
    completed_at         TIMESTAMP,
    created_at           TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_checklist_items_room_id ON checklist_items(room_id);
