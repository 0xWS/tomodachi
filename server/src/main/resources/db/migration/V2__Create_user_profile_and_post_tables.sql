CREATE TABLE user_profiles (
    id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    display_name VARCHAR(255),
    description TEXT,
    birthday DATE,
    profile_picture BYTEA,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE SEQUENCE user_profiles_id_seq OWNED BY user_profiles.id;
ALTER TABLE user_profiles ALTER COLUMN id SET DEFAULT nextval('user_profiles_id_seq');

CREATE TABLE posts (
    id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    like_count INT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE SEQUENCE posts_id_seq OWNED BY posts.id;
ALTER TABLE posts ALTER COLUMN id SET DEFAULT nextval('posts_id_seq');

CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at);

ALTER TABLE users ADD COLUMN user_profile_id BIGINT UNIQUE;
ALTER TABLE users ADD CONSTRAINT fk_user_profile
FOREIGN KEY (user_profile_id) REFERENCES user_profiles(id);
