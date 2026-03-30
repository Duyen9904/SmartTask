CREATE TABLE huddle_participants (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    huddle_id   UUID NOT NULL REFERENCES huddles(id) ON DELETE CASCADE,
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    joined_at   TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_huddle_participants UNIQUE (huddle_id, user_id)
);
