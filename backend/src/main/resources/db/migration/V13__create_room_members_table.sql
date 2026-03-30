CREATE TABLE room_members (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id     UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role        VARCHAR(20) NOT NULL DEFAULT 'MEMBER',
    joined_at   TIMESTAMP NOT NULL DEFAULT NOW(),
    last_seen_at TIMESTAMP,
    CONSTRAINT uq_room_members_room_user UNIQUE (room_id, user_id)
);

CREATE INDEX idx_room_members_user_id ON room_members(user_id);
