package org.tscode.vtc;

import java.util.Arrays;

import org.tscode.cv.Constants;

import io.vertx.core.json.JsonObject;
import net.sf.oval.constraint.NotNull;
import net.sf.oval.guard.Guarded;

/**
 * 
 * @author Lang
 *
 */
@Guarded
public final class Searcher {
	// ~ Static Fields =======================================
	// ~ Instance Fields =====================================
	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	/**
	 * Lookup Json Tree
	 * 
	 * @param data
	 * @param pathes
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static <T> T lookup(@NotNull final JsonObject data, @NotNull final String... pathes) {
		T reference = null;
		/** 1.Current **/
		JsonObject current = data;
		if (Constants.ZERO < pathes.length) {
			/** 2.Extract Level Key **/
			final String field = pathes[Constants.ZERO];
			if (current.containsKey(field)) {
				/** 3.Current Value **/
				final Object curValue = current.getValue(field);
				if (null != curValue) {
					if (Constants.ONE == pathes.length) {
						reference = (T) curValue;
					} else {
						if (JsonObject.class == curValue.getClass()) {
							/** Shift Pathes **/
							final String[] newPathes = Arrays.copyOfRange(pathes, Constants.ONE, pathes.length);
							reference = lookup((JsonObject) curValue, newPathes);
						}
					}
				}
			}
		}
		return reference;
	}
	// ~ Constructors ========================================
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
