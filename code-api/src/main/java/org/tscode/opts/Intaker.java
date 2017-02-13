package org.tscode.opts;

import org.tscode.exp.AbstractException;

/**
 * Configuration Reader
 * @author Lang
 *
 * @param <T>
 */
public interface Intaker<T> {
	/**
	 * Read data by implemented classes
	 * @return
	 * @throws AbstractException
	 */
	T ingest() throws AbstractException;
}
