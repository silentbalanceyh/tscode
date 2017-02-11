package org.tscode.shape;

import org.tscode.exp.AbstractException;

/**
 * Abstract Shape, provide build and basic checking method
 * 
 * @author Lang
 *
 */
public interface Builder<T> {
	/**
	 * Every shape must implement build method
	 **/
	T getData();

	/**
	 * Get error in building shape
	 **/
	AbstractException getError();
}
