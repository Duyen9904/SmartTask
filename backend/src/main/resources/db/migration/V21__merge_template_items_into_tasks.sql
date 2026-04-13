DROP TABLE IF EXISTS template_subtasks;
ALTER TABLE tasks ADD COLUMN parent_template_id UUID REFERENCES task_templates(id) ON DELETE CASCADE;
CREATE INDEX idx_tasks_parent_template_id ON tasks(parent_template_id);