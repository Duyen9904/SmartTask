CREATE TABLE rooms (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_number VARCHAR(20),
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    deadline    DATE,
    priority    VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
    status      VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_by  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    deleted_at  TIMESTAMP,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_rooms_created_by ON rooms(created_by);
CREATE INDEX idx_rooms_status ON rooms(status);
CREATE INDEX idx_rooms_deleted_at ON rooms(deleted_at) WHERE deleted_at IS NULL;
