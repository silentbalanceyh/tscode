package org.tscode.util;

import java.text.MessageFormat;

import org.tscode.cv.Constants;
import org.tscode.cv.MsgLog;
import org.tscode.exp.AbstractException;

import net.sf.oval.constraint.NotBlank;
import net.sf.oval.constraint.NotEmpty;
import net.sf.oval.constraint.NotNull;
import net.sf.oval.guard.Guarded;

/**
 * Utility Class: Logger centor for debug/errors
 * 
 * @author Lang
 *
 */
@Guarded
public final class Log {
	// ~ Static Fields =======================================
	// ~ Instance Fields =====================================
	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	/**
	 * JVM Exception
	 * 
	 * @param logger
	 * @param exp
	 */
	public static void jvmError(@NotNull final org.slf4j.Logger logger, @NotNull final Throwable exp) {
		error(logger, MsgLog.E_JVM, exp, exp.getClass().getName(), exp.getMessage());
	}

	/**
	 * APP Exception
	 * 
	 * @param logger
	 * @param exp
	 */
	public static void appError(@NotNull final org.slf4j.Logger logger, @NotNull final Throwable exp) {
		error(logger, MsgLog.E_APP, exp, exp.getClass().getName(), exp.getMessage());
	}
	/**
	 * Info
	 * @param logger
	 * @param key
	 * @param args
	 */
	public static void info(@NotNull final org.slf4j.Logger logger, @NotNull final String key, final Object... args) {
		if (logger.isInfoEnabled()) {
			logger.info(format(key, args));
		}
	}

	/**
	 * Debug
	 * @param logger
	 * @param key
	 * @param args
	 */
	public static void debug(@NotNull final org.slf4j.Logger logger, @NotNull final String key, final Object... args) {
		if (logger.isDebugEnabled()) {
			logger.debug(format(key, args));
		}
	}

	/**
	 * Warn
	 * @param logger
	 * @param key
	 * @param args
	 */
	public static void warn(@NotNull final org.slf4j.Logger logger, @NotNull final String key, final Object... args) {
		if (logger.isWarnEnabled()) {
			logger.warn(format(key, args));
		}
	}

	// ~ Constructors ========================================
	/** Private constructor to prevent create instance **/
	private Log() {
	}
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	/**
	 * Shared method
	 * 
	 * @param logger
	 * @param key
	 * @param exp
	 * @param args
	 */
	private static void error(@NotNull final org.slf4j.Logger logger, @NotNull @NotBlank @NotEmpty final String key,
			final Throwable exp, final Object... args) {
		if (logger.isErrorEnabled()) {
			final String message = format(key, args);
			if (null == exp) {
				logger.error(message);
			} else {
				// Distinguish from JVM error and Defined error
				if (exp instanceof AbstractException) {
					final AbstractException error = (AbstractException) exp;
					logger.error("[ *** ERROR" + error.getErrorCode() + " *** ] " + message);
				} else {
					logger.error("[ *** JVM ERROR *** ]: " + message);
				}
			}
		}
	}
	private static String format(final String pattern, final Object... args) {
		// Default without any arguments input
		String message = pattern;
		if (Constants.ZERO < args.length) {
			try {
				message = MessageFormat.format(pattern, args);
			} catch (final Exception ex) {
				message = pattern;
			}
		}
		return message;
	}
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
