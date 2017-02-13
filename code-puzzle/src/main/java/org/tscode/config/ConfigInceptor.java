package org.tscode.config;

import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.tscode.cv.Constants;
import org.tscode.util.ConfigLoader;
import org.tscode.util.Instance;

import jodd.util.StringPool;
import jodd.util.StringUtil;
import net.sf.oval.constraint.NotBlank;
import net.sf.oval.constraint.NotEmpty;
import net.sf.oval.constraint.NotNull;
import net.sf.oval.guard.Guarded;

/**
 * Read options
 * 
 * @author Lang
 *
 */
@Guarded
public final class ConfigInceptor implements Inceptor {
	// ~ Static Fields =======================================
	/** **/
	private static final ConcurrentMap<String, Properties> CONFIGURATION = new ConcurrentHashMap<>();
	// ~ Instance Fields =====================================
	/** **/
	@NotNull
	private transient Properties prop;

	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	/** Construct by file **/
	ConfigInceptor(@NotNull @NotEmpty @NotBlank final String key) {
		this.prop = CONFIGURATION.get(key);
		if (null == this.prop) {
			this.prop = ConfigLoader.get(key);
			CONFIGURATION.put(key, this.prop);
		}
	}

	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	/** **/
	@Override
	public long getLong(@NotNull @NotEmpty @NotBlank final String key) {
		final String value = this.getString(key);
		long ret = Constants.INVALID;
		if (StringUtil.containsOnlyDigits(value)) {
			ret = Long.parseLong(value.trim());
		}
		return ret;
	}

	/** **/
	@Override
	public int getInt(@NotNull @NotEmpty @NotBlank final String key) {
		final String value = this.getString(key);
		int ret = Constants.INVALID;
		if (StringUtil.containsOnlyDigits(value)) {
			ret = Integer.parseInt(value.trim());
		}
		return ret;
	}

	/** **/
	@Override
	public boolean getBoolean(@NotNull @NotEmpty @NotBlank final String key) {
		final String value = this.getString(key);
		boolean ret = false;
		if (null != value) {
			ret = Boolean.parseBoolean(value.trim());
		}
		return ret;
	}

	/** **/
	@Override
	public String getString(@NotNull @NotEmpty @NotBlank final String key) {
		String ret = this.prop.getProperty(key);
		if (StringUtil.isBlank(ret) || StringUtil.isEmpty(ret)) {
			ret = null;
		} else if (StringPool.NULL.equals(ret.trim())) {
			ret = null;
		}
		return ret;
	}

	/** **/
	@Override
	public String[] getArray(@NotNull @NotEmpty @NotBlank final String key) {
		final String value = this.getString(key);
		String[] ret = new String[] {};
		if (null != value) {
			ret = StringUtil.split(value, StringPool.COMMA);
		}
		return ret;
	}

	/** **/
	@Override
	public Class<?> getClass(@NotNull @NotEmpty @NotBlank final String key) {
		final String value = this.getString(key);
		Class<?> ret = null;
		if (null != value) {
			ret = Instance.clazz(value);
		}
		return ret;
	}
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
