CREATE TABLE cd_key (
    id BIGSERIAL PRIMARY KEY,
    cd_key_value VARCHAR(255) NOT NULL UNIQUE,
    user_id BIGINT,
    is_used BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_cd_key_value ON cd_key(cd_key_value);