CREATE TABLE template_subtasks (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id     UUID NOT NULL REFERENCES task_templates(id) ON DELETE CASCADE,
    title           VARCHAR(255) NOT NULL,
    display_order   INT NOT NULL DEFAULT 0
);

CREATE INDEX idx_template_subtasks_template_id ON template_subtasks(template_id);
