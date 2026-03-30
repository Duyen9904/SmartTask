CREATE TABLE task_assignments (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id     UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_task_assignments_task_user UNIQUE (task_id, user_id)
);

CREATE INDEX idx_task_assignments_user_id ON task_assignments(user_id);
