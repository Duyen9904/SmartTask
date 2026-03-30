CREATE TABLE mood_entries (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    mood        SMALLINT NOT NULL CHECK (mood BETWEEN 1 AND 5),
    note        VARCHAR(500),
    logged_at   TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_mood_entries_user_id ON mood_entries(user_id);
CREATE INDEX idx_mood_entries_logged_at ON mood_entries(logged_at);
