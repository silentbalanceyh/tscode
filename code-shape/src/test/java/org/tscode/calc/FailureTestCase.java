package org.tscode.calc;

import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.tscode.shape.exp.InputExceedException;
import org.tscode.shape.exp.SideNonPositiveException;
import org.tscode.shape.exp.TriangleInvalidException;
import org.tscode.util.Executor;

/**
 * 
 * @author Lang
 *
 */
public class FailureTestCase {
	// ~ Static Fields =======================================
	// ~ Instance Fields =====================================
	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	// Error - 10001, Could not be triggered from Service
	/**
	 * Random Select one input to test
	 * 
	 * @throws Exception
	 */
	@Test(expected = InputExceedException.class)
	public void testE10001Random() throws Exception {
		Executor.executeTest("test/triangle/error10001.json");
	}

	/**
	 * Random Select one input to test
	 * 
	 * @throws Exception
	 */
	@Test
	public void testE10001Batch() throws Exception {
		final boolean ret = Executor.collectError("test/triangle/error10001.json");
		/** 3.Assert, Exception Size should be equal to inputes **/
		assertTrue(ret);
	}

	// Error - 10002
	/**
	 * Random Select one input to test
	 * 
	 * @throws Exception
	 */
	@Test(expected = SideNonPositiveException.class)
	public void testE10002Random() throws Exception {
		Executor.executeTest("test/triangle/error10002.json");
	}

	/**
	 * Random Select one input to test
	 * 
	 * @throws Exception
	 */
	@Test
	public void testE10002Batch() throws Exception {
		final boolean ret = Executor.collectError("test/triangle/error10002.json");
		/** 3.Assert, Exception Size should be equal to inputes **/
		assertTrue(ret);
	}

	// Error - 10003
	/**
	 * Random Select one input to test
	 * 
	 * @throws Exception
	 */
	@Test(expected = TriangleInvalidException.class)
	public void testE10003Random() throws Exception {
		Executor.executeTest("test/triangle/error10003.json");
	}

	/**
	 * Random Select one input to test
	 * 
	 * @throws Exception
	 */
	@Test
	public void testE10003Batch() throws Exception {
		final boolean ret = Executor.collectError("test/triangle/error10003.json");
		/** 3.Assert, Exception Size should be equal to inputes **/
		assertTrue(ret);
	}
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
