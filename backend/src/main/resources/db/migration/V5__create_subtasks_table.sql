CREATE TABLE subtasks (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_task_id  UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    title           VARCHAR(255) NOT NULL,
    is_completed    BOOLEAN NOT NULL DEFAULT false,
    display_order   INT NOT NULL DEFAULT 0,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_subtasks_parent_task_id ON subtasks(parent_task_id);
