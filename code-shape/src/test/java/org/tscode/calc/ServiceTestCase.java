package org.tscode.calc;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

import java.util.List;

import org.junit.Test;
import org.puzzle.TriangleService;
import org.puzzle.triangle.Category;
import org.puzzle.triangle.TriangleSevImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.tscode.shape.core.Response;
import org.tscode.util.Executor;
import org.tscode.util.Log;

import net.sf.oval.constraint.NotBlank;
import net.sf.oval.constraint.NotEmpty;
import net.sf.oval.constraint.NotNull;

/**
 * 
 * @author Lang
 * 
 */
public class ServiceTestCase {
	// ~ Static Fields =======================================
	/** **/
	private static Logger LOGGER = LoggerFactory.getLogger(ServiceTestCase.class);
	// ~ Instance Fields =====================================
	/** Singleton is the best **/
	private transient TriangleService service = new TriangleSevImpl();

	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	/** **/
	@Test
	public void testEquilateral() {
		/** **/
		this.executeTest(Category.EQUILATERAL, "test/triangle/success-equilateral.json");
	}
	/** **/
	@Test
	public void testScalene() {
		/** **/
		this.executeTest(Category.SCALENE, "test/triangle/success-scalene.json");
	}
	/** **/
	@Test
	public void testIsosceles() {
		/** **/
		this.executeTest(Category.ISOSCELES, "test/triangle/success-isosceles.json");
	}
	// ~ Methods =============================================
	// ~ Private Methods =====================================

	private void executeTest(final Category expected, final String file) {
		/** **/
		final List<int[]> sidesList = Executor.readData(file);
		/** **/
		final int length = sidesList.size();
		for (int idx = 0; idx < length; idx++) {
			final int[] side = sidesList.get(idx);
			final Response response = service.calculate(side);
			/** No Error **/
			assertNull("Failure Postion " + idx, response.getError());
			final Category actual = this.fromStr(Category.class, response.getData().getString("category"));
			assertEquals("Failure Postion " + idx, expected, actual);
			Log.info(LOGGER, response.getData().encode());
		}
	}

	private <T extends Enum<T>> T fromStr(@NotNull final Class<T> clazz,
			@NotNull @NotBlank @NotEmpty final String inputStr) {
		T retEnum = null;
		try {
			retEnum = Enum.valueOf(clazz, inputStr);
		} catch (IllegalArgumentException ex) {
			Log.jvmError(LOGGER, ex);
		}
		return retEnum;
	}
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
