ALTER TABLE posts ADD COLUMN parent_post_id BIGINT DEFAULT NULL;

ALTER TABLE posts ADD CONSTRAINT fk_posts_parent_post FOREIGN KEY (parent_post_id) REFERENCES posts(id);

-- Add index if needed
CREATE INDEX idx_posts_parent_post ON posts(parent_post_id);
