package org.tscode.config;

/**
 * Basic options transfer
 * 
 * @author Lang
 *
 */
public interface Inceptor {
	/**
	 * Get Long
	 * 
	 * @param key
	 * @return
	 */
	long getLong(String key);

	/**
	 * Get Int
	 * 
	 * @param key
	 * @return
	 */
	int getInt(String key);

	/**
	 * Get Boolean
	 * 
	 * @param key
	 * @return
	 */
	boolean getBoolean(String key);

	/**
	 * Get String
	 * 
	 * @param key
	 * @return
	 */
	String getString(String key);

	/**
	 * Get String[]
	 * 
	 * @param key
	 * @return
	 */
	String[] getArray(String key);

	/**
	 * Get Class<?>
	 * 
	 * @param key
	 * @return
	 */
	Class<?> getClass(String key);
	/**
	 * Static method to create ConfigInceptor
	 * @param key
	 * @return
	 */
	static Inceptor get(final String key){
		return new ConfigInceptor(key);
	}
}
