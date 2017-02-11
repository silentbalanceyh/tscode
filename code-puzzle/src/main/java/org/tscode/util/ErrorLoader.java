package org.tscode.util;

import java.text.MessageFormat;
import java.util.Properties;

import org.tscode.cv.FilePath;

import net.sf.oval.constraint.Max;
import net.sf.oval.constraint.NotNull;
import net.sf.oval.guard.Guarded;

/**
 * 
 * @author Lang
 *
 */
@Guarded
public final class ErrorLoader {
	// ~ Static Fields =======================================
	/** **/
	private static ErrorLoader INSTANCE;
	// ~ Instance Fields =====================================
	/** **/
	private final Properties ERR_LIST = ConfigLoader.get(FilePath.CFG_ERROR);

	// ~ Static Block ========================================
	/** **/
	public static ErrorLoader getInstance() {
		if (null == INSTANCE) {
			INSTANCE = new ErrorLoader();
		}
		return INSTANCE;
	}

	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	private ErrorLoader() {
	}

	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	/**
	 * 
	 * @param clazz
	 * @param errCode
	 * @param args
	 * @return
	 */
	public String getError(@NotNull final Class<?> clazz, @Max(-10000) final int errCode, final Object... args) {

		final String key = 'E' + String.valueOf(Math.abs(errCode));

		final StringBuilder errMsg = new StringBuilder(32);
		errMsg.append('[').append(key).append(']');
		if (null != clazz) {
			errMsg.append(" Class -> ").append(clazz.getName()).append(" |");
		}
		errMsg.append(' ');

		final String pattern = ERR_LIST.getProperty(key);
		final String message = MessageFormat.format(pattern, args);
		errMsg.append(message);

		return errMsg.toString();
	}
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
