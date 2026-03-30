CREATE TABLE huddles (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id         UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    title           VARCHAR(255) NOT NULL,
    scheduled_at    TIMESTAMP NOT NULL,
    created_by      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_huddles_room_id ON huddles(room_id);
