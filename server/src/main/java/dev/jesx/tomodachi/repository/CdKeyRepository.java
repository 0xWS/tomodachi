package dev.jesx.tomodachi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.jesx.tomodachi.model.CdKey;

public interface CdKeyRepository extends JpaRepository<CdKey, Long> {
    Optional<CdKey> findByCdKey(String cdkey);
}
