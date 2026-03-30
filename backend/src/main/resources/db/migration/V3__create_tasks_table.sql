CREATE TABLE tasks (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    priority        VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
    status          VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    category        VARCHAR(20) NOT NULL DEFAULT 'PERSONAL',
    scheduled_date  DATE,
    scheduled_time  TIME,
    due_date        DATE,
    estimated_hours DECIMAL(5,2),
    source_template_id UUID,
    display_order   INT NOT NULL DEFAULT 0,
    deleted_at      TIMESTAMP,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_scheduled_date ON tasks(scheduled_date);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_deleted_at ON tasks(deleted_at) WHERE deleted_at IS NULL;
