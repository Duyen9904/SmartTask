CREATE TABLE task_templates (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title           VARCHAR(255) NOT NULL,
    usage_count     INT NOT NULL DEFAULT 0,
    download_count  INT NOT NULL DEFAULT 0,
    created_by      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_public       BOOLEAN NOT NULL DEFAULT false,
    category        VARCHAR(20) NOT NULL DEFAULT 'PERSONAL',
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_task_templates_created_by ON task_templates(created_by);
CREATE INDEX idx_task_templates_is_public ON task_templates(is_public) WHERE is_public = true;
