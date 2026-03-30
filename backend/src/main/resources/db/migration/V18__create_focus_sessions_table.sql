CREATE TABLE focus_sessions (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    task_id             UUID REFERENCES tasks(id) ON DELETE SET NULL,
    duration_minutes    INT NOT NULL,
    ambient_sound       VARCHAR(20) NOT NULL DEFAULT 'NONE',
    started_at          TIMESTAMP NOT NULL,
    ended_at            TIMESTAMP,
    completed           BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX idx_focus_sessions_user_id ON focus_sessions(user_id);
CREATE INDEX idx_focus_sessions_started_at ON focus_sessions(started_at);
