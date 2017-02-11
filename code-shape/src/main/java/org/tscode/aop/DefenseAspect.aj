package org.tscode.aop;

import net.sf.oval.guard.GuardAspect;

/**
 * Enable OVal in AOP Layer
 * @author Lang
 * @see
 */
public aspect DefenseAspect extends GuardAspect {
    public DefenseAspect() {
        super();
        /**
         * Should this feature enabled in DEV only or DEV/PROD both ?
         * This feature could enhanced code quality to implement Defensive Programming.
         */
    }
}
