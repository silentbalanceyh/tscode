package org.tscode.util;

import static org.tscode.util.Log.jvmError;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URL;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.tscode.cv.Constants;
import org.tscode.cv.Symbol;

import io.vertx.core.json.DecodeException;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
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
     * @return
     */
    public static JsonArray getJArray(@NotNull @NotEmpty @NotBlank final String fileName){
    	JsonArray ret = new JsonArray();
    	try{
    		ret = new JsonArray(IOKit.getContent(fileName));
    	}catch(DecodeException ex){
    		jvmError(LOGGER, ex);
    	}
    	return ret;
    }
    /**
     * 
     * @return
     */
    public static JsonObject getJObject(@NotNull @NotEmpty @NotBlank final String fileName){
    	JsonObject ret = new JsonObject();
    	try{
    		final String content = IOKit.getContent(fileName);
    		if(null != content){
    			ret = new JsonObject(content);
    		}
    	}catch(DecodeException ex){
    		jvmError(LOGGER, ex);
    	}
    	return ret;
    }
	/**
	 *
	 * @param fileName
	 * @return
	 */
	public static String getContent(@NotNull @NotEmpty @NotBlank final String fileName) {
		final InputStream inStream = getFile(fileName);
		final StringBuilder builder = new StringBuilder(Constants.DFT_BUF_SIZE);
		BufferedReader reader;
		String content = null;
		try {
			if (null != inStream) {
				reader = new BufferedReader(new InputStreamReader(inStream, Constants.DFT_ENCODING));
				String line = null;
				while (null != (line = reader.readLine())) { 
					builder.append(line).append(Symbol.NEW_LINE);
				}
				content = builder.toString();
				reader.close();
			}
		} catch (UnsupportedEncodingException ex) {
			jvmError(LOGGER, ex);
		} catch (IOException ex) {
			jvmError(LOGGER, ex);
		} finally {
			try {
				if (null != inStream) {
					inStream.close();
				}
			} catch (IOException ex) {
				jvmError(LOGGER, ex);
			}
		}
		return content;
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
	private IOKit() {
	}
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