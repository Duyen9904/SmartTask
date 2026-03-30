package com.dev.smarttask.common.adapter.out.persistence.id;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.generator.BeforeExecutionGenerator;
import org.hibernate.generator.EventType;
import org.hibernate.generator.EventTypeSets;

import java.security.SecureRandom;
import java.util.EnumSet;
import java.util.UUID;

/**
 * Hibernate {@link BeforeExecutionGenerator} that produces UUIDv7 (time-ordered).
 * <p>
 * Registered via the {@link UUIDv7} annotation and {@code @IdGeneratorType}.
 * <p>
 * Layout (RFC 9562):
 * <pre>
 *   0                   1                   2                   3
 *   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  |                         unix_ts_ms (48 bits)                  |
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  |          unix_ts_ms           | ver=7 |     rand_a (12 bits)  |
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  |var=10|              rand_b (62 bits)                          |
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  |                          rand_b                               |
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * </pre>
 */
public class UUIDv7Generator implements BeforeExecutionGenerator {

    private static final SecureRandom RANDOM = new SecureRandom();

    @Override
    public Object generate(SharedSessionContractImplementor session, Object owner, Object currentValue, EventType eventType) {
        return generateUUIDv7();
    }

    @Override
    public EnumSet<EventType> getEventTypes() {
        return EventTypeSets.INSERT_ONLY;
    }

    public static UUID generateUUIDv7() {
        long timestamp = System.currentTimeMillis();

        // random bytes for rand_a (12 bits) and rand_b (62 bits)
        long randomBits1 = RANDOM.nextLong();
        long randomBits2 = RANDOM.nextLong();

        // msb: 48-bit timestamp | 4-bit version (0111) | 12-bit rand_a
        long msb = (timestamp << 16) & 0xFFFFFFFFFFFF0000L; // 48 bits of timestamp
        msb |= 0x7000L;                                      // version 7
        msb |= (randomBits1 & 0x0FFFL);                      // 12 bits rand_a

        // lsb: 2-bit variant (10) | 62-bit rand_b
        long lsb = (0b10L << 62) | (randomBits2 & 0x3FFFFFFFFFFFFFFFL);

        return new UUID(msb, lsb);
    }
}
