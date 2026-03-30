CREATE TABLE group_members (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id    UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role        VARCHAR(20) NOT NULL DEFAULT 'MEMBER',
    joined_at   TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_group_members_group_user UNIQUE (group_id, user_id)
);

CREATE INDEX idx_group_members_user_id ON group_members(user_id);
