CREATE TABLE user_follows (
    id BIGSERIAL PRIMARY KEY,
    follower_id BIGINT NOT NULL,
    followee_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (follower_id) REFERENCES users (id),
    FOREIGN KEY (followee_id) REFERENCES users (id),
    UNIQUE (follower_id, followee_id)
);

CREATE INDEX idx_follower_followee ON user_follows (follower_id, followee_id);

ALTER TABLE users
ADD COLUMN follower_count INT DEFAULT 0,
ADD COLUMN following_count INT DEFAULT 0;

CREATE OR REPLACE FUNCTION update_follow_counts()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE users SET follower_count = follower_count + 1 WHERE id = NEW.followee_id;
        UPDATE users SET following_count = following_count + 1 WHERE id = NEW.follower_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE users SET follower_count = follower_count - 1 WHERE id = OLD.followee_id;
        UPDATE users SET following_count = following_count - 1 WHERE id = OLD.follower_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_user_follow_change
AFTER INSERT OR DELETE ON user_follows
FOR EACH ROW EXECUTE FUNCTION update_follow_counts();