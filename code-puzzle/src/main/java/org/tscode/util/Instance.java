package org.tscode.util;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.tscode.cv.Constants;

import net.sf.oval.constraint.Min;
import net.sf.oval.constraint.NotBlank;
import net.sf.oval.constraint.NotEmpty;
import net.sf.oval.constraint.NotNull;
import net.sf.oval.guard.Guarded;

/**
 * Provide reflection library to manage all Object references
 * <p>
 * 1.Create new instance instead of "new <ClassName>()"
 * </p>
 * <p>
 * 2.Create singleton instance and managed in "Object Pool"
 * </p>
 * 
 * @author Lang
 *
 */
@Guarded
@SuppressWarnings("unchecked")
public class Instance {
	// ~ Static Fields =======================================
	/** **/
	private static final Logger LOGGER = LoggerFactory.getLogger(Instance.class);
	/** Sington Object Reference **/
	private static final ConcurrentMap<String, Object> SINGTON_REF_POOL = new ConcurrentHashMap<>();

	// ~ Instance Fields =====================================
	// ~ Static Block ========================================

	/**
	 * Get common generic type T ( index = 1 )
	 * 
	 * @param clazz
	 * @return
	 */
	public static Class<?> genericT(final Class<?> clazz) {
		return genericT(clazz, Constants.ZERO);
	}

	/**
	 * Get generic type T of Class<T> based on index
	 * 
	 * @param clazz
	 * @param idx
	 * @return
	 */
	public static Class<?> genericT(@NotNull final Class<?> clazz, @Min(1) final int idx) {
		Class<?> ret = null;
		final Type type = clazz.getGenericSuperclass();
		if (type instanceof ParameterizedType) {
			final Type[] params = ((ParameterizedType) type).getActualTypeArguments();
			if (idx < params.length) {
				ret = (Class<?>) params[idx];
			}
		}
		return ret;
	}

	/**
	 * Parse class based on name
	 * 
	 * @param name
	 * @return
	 */
	public static Class<?> clazz(@NotNull @NotEmpty @NotBlank final String name) {
		Class<?> ret = null;
		try {
			ret = Class.forName(name);
		} catch (ClassNotFoundException ex) {
			Log.jvmError(LOGGER, ex);
		}
		return ret;
	}

	/**
	 * Singleton by Class
	 * 
	 * @param clazz
	 * @param params
	 */
	public static <T> T singleton(@NotNull final Class<?> clazz, final Object... params) {
		final String key = clazz.getName();
		return reference(SINGTON_REF_POOL, key, clazz, params);
	}

	/**
	 * Singleton by Name
	 * 
	 * @param name
	 * @param params
	 */
	public static <T> T singleton(@NotNull @NotEmpty @NotBlank final String name, final Object... params) {
		final Class<?> clazz = clazz(name);
		return null == clazz ? null : reference(SINGTON_REF_POOL, name, clazz, params);
	}
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	// ~ Private Methods =====================================

	private static <T> T reference(final ConcurrentMap<String, Object> poolRef, final String key, final Class<?> clazz,
			final Object... params) {
		Object ret = poolRef.get(key);
		if (null == ret) {
			ret = construct(clazz, params);
			if (null != ret) {
				poolRef.putIfAbsent(key, ret);
			}
		}
		return ret == null ? null : (T) ret;
	}

	private static <T> T construct(final Class<?> clazz, final Object... params) {
		T ret = null;
		final Constructor<?>[] constructors = clazz.getDeclaredConstructors();
		for (final Constructor<?> constructor : constructors) {
			// Parameter length does not match, skip
			if (params.length != constructor.getParameterTypes().length) {
				continue;
			}
			ret = construct(constructor, params);
			// Build Successful
			if (null != ret) {
				break;
			}
		}
		return ret;
	}

	/**
	 * Create instance
	 * 
	 * @param constructor
	 * @param params
	 * @return
	 */
	private static <T> T construct(final Constructor<?> constructor, final Object... params) {
		if (!constructor.isAccessible()) {
			/** TODO: Access private constructor, Enabled? **/
			constructor.setAccessible(true);
		}
		T ret = null;
		try {
			ret = (T) (constructor.newInstance(params));
		} catch (InvocationTargetException ex) {
			Log.jvmError(LOGGER, ex);
		} catch (IllegalArgumentException ex) {
			Log.jvmError(LOGGER, ex);
		} catch (InstantiationException | IllegalAccessException ex) {
			Log.jvmError(LOGGER, ex);
		}
		return ret;
	}
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
