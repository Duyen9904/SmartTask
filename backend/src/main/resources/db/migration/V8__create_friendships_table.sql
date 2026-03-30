CREATE TABLE friendships (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id_a       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    user_id_b       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status          VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    initiated_by    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_friendships_pair UNIQUE (user_id_a, user_id_b),
    CONSTRAINT chk_friendships_order CHECK (user_id_a < user_id_b)
);

CREATE INDEX idx_friendships_user_a ON friendships(user_id_a);
CREATE INDEX idx_friendships_user_b ON friendships(user_id_b);
