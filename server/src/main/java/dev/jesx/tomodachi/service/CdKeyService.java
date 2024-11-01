package dev.jesx.tomodachi.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.jesx.tomodachi.model.CdKey;
import dev.jesx.tomodachi.model.User;
import dev.jesx.tomodachi.repository.CdKeyRepository;

@Service
public class CdKeyService {
    @Autowired
    private CdKeyRepository cdKeyRepository;

    public Boolean isValidKey(String key) {
        Optional<CdKey> cdKeyOpt = cdKeyRepository.findByCdKey(key);
        return cdKeyOpt.isPresent() && !cdKeyOpt.get().getUsed();
    }

    public Boolean useKey(String key, User user) {
        Optional<CdKey> cdKeyOpt = cdKeyRepository.findByCdKey(key);
        if (cdKeyOpt.isPresent() && !cdKeyOpt.get().getUsed()) {
            CdKey cdKey = cdKeyOpt.get();
            cdKey.setUsed(true);
            cdKey.setUser(user);
            cdKeyRepository.save(cdKey);
            return true;
        }
        return false;
    }
}
