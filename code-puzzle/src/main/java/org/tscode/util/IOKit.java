package org.tscode.util;

import static org.tscode.util.Logger.jvmError;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.net.URL;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.oval.constraint.NotBlank;
import net.sf.oval.constraint.NotEmpty;
import net.sf.oval.constraint.NotNull;
import net.sf.oval.guard.Guarded;

/**
 * Resource scanner
 * 
 * @author Lang
 * @see
 */
@Guarded
public final class IOKit {
	// ~ Static Fields =======================================
	/** **/
	private static final Logger LOGGER = LoggerFactory.getLogger(IOKit.class);

	// ~ Instance Fields =====================================
	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	/**
	 * 
	 * @param fileName
	 * @return
	 */
	public static InputStream getFile(@NotNull @NotEmpty @NotBlank final String fileName) {
		return getFile(fileName, null);
	}

	/**
	 * 
	 * @param fileName
	 * @return
	 */
	public static URL getURL(@NotNull @NotEmpty @NotBlank final String fileName) {
		URL retURL = null;
		final ClassLoader loader = Thread.currentThread().getContextClassLoader();
		if (null != loader) {
			retURL = loader.getResource(fileName);
		}
		if (null == retURL) {
			retURL = IOKit.class.getResource(fileName);
		}
		return retURL;
	}

	/**
	 * 
	 * @param fileName
	 * @param clazz
	 * @return
	 */
	public static InputStream getFile(@NotNull @NotEmpty @NotBlank final String fileName, final Class<?> clazz) {
		InputStream retStream = null;
		if (null == clazz) {
			// Read input stream from: final File file = new File()
			retStream = readStream(new File(fileName));
			// Read input stream from: Thread ClassLoader
			retStream = null == retStream ? readStream(fileName) : retStream;
			// Once failure, read input stream from current classpath
			retStream = null == retStream ? readStream(fileName, IOKit.class) : retStream;
		} else {
			// Read input stream from: input clazz -> classpath
			retStream = readStream(fileName, clazz);
			// Without class
			retStream = null == retStream ? getFile(fileName, null) : retStream;
		}
		return retStream;
	}
	// ~ Constructors ========================================
	private IOKit() {}
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Get/Set =============================================
	// ~ Methods =============================================
	// ~ Private Methods =====================================

	private static InputStream readStream(final String fileName, final Class<?> clazz) { // NOPMD
		return clazz.getResourceAsStream(fileName);
	}

	private static InputStream readStream(final String fileName) { // NOPMD
		final ClassLoader loader = Thread.currentThread().getContextClassLoader();
		return loader.getResourceAsStream(fileName);
	}

	private static InputStream readStream(final File file) {
		InputStream retStream = null;
		if (null != file && file.exists() && file.isFile()) {
			try {
				retStream = new FileInputStream(file);
			} catch (final FileNotFoundException ex) {
				jvmError(LOGGER, ex);
			}
		}
		return retStream;
	}
	// ~ hashCode,equals,toString ============================
}