CREATE TABLE user_preferences (
    user_id             UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    theme               VARCHAR(10) NOT NULL DEFAULT 'LIGHT',
    timezone            VARCHAR(50),
    notification_prefs  JSONB,
    updated_at          TIMESTAMP NOT NULL DEFAULT NOW()
);
