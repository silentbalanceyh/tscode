package org.tscode.util;

import static org.tscode.util.Log.jvmError;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.tscode.cv.FilePath;

import net.sf.oval.constraint.NotBlank;
import net.sf.oval.constraint.NotEmpty;
import net.sf.oval.constraint.NotNull;
import net.sf.oval.guard.Guarded;

/**
 * 
 * @author Lang
 *
 */
@Guarded
public final class ConfigLoader {
	// ~ Static Fields =======================================
	/** **/
	private static final Logger LOGGER = LoggerFactory.getLogger(ConfigLoader.class);
	/** **/
	private static final ConcurrentMap<String, Properties> FILE_CACHE = new ConcurrentHashMap<>();
	/** **/
	private static final Properties PROP;
	// ~ Instance Fields =====================================
	// ~ Static Block ========================================
	static {
		/** Initialize PROP **/
		PROP = readProp(FilePath.PATH_ROOT);
	}

	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	private ConfigLoader(){}
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	/**
	 * Read sub configuration and cached each file
	 * 
	 * @param fileKey
	 * @return
	 */
	public static Properties get(@NotNull @NotBlank @NotEmpty final String fileKey) {
		Properties prop = null;
		if (FILE_CACHE.containsKey(fileKey)) {
			prop = FILE_CACHE.get(fileKey);
		} else {
			prop = readProp(PROP.getProperty(fileKey));
			if (null != prop) {
				FILE_CACHE.put(fileKey, prop);
			}
		}
		return prop;
	}
	// ~ Private Methods =====================================
	/**
	 * @param file
	 * @return
	 */
	private static Properties readProp(@NotNull @NotBlank @NotEmpty final String file) {
		final Properties prop = new Properties();
		try {
			final InputStream in = IOKit.getFile(file);
			if (null != in) {
				prop.load(in);
			}
		} catch (final IOException ex) {
			jvmError(LOGGER, ex);
		}
		return prop;
	}
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
