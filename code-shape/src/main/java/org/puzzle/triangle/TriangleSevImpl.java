package org.puzzle.triangle;

import org.puzzle.TriangleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.tscode.exp.AbstractException;
import org.tscode.shape.Calculator;
import org.tscode.shape.Planum;
import org.tscode.shape.Shape;
import org.tscode.shape.core.Response;
import org.tscode.shape.impl.TrianglePlanum;
import org.tscode.util.Instance;
import org.tscode.util.Log;

import io.vertx.core.json.JsonObject;
import net.sf.oval.constraint.Size;
import net.sf.oval.guard.Guarded;

/**
 * simple wrapper into service, this class could provide standard Response to up
 * level.
 * @author Lang
 *
 */
@Guarded
public class TriangleSevImpl implements TriangleService {
	// ~ Static Fields =======================================
	/** **/
	private static Logger LOGGER = LoggerFactory.getLogger(TriangleSevImpl.class);
	// ~ Instance Fields =====================================
	/** Singleton is the best, Build Calculator **/
	private transient final Calculator<Integer, Integer> calculator = Instance.singleton(CatCalculator.class);
	/** Singleton is the best, Build Planum **/
	private transient final Planum planum = Instance.singleton(TrianglePlanum.class);

	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	/**
	 * 
	 */
	@Override
	public Response calculate(@Size(min = 3, max = 3) final int... inputes) {
		try {
			final Shape<Integer, Integer> shape = planum.create(inputes);
			/** Connect Calculator **/
			shape.connect(calculator);
			final JsonObject data = shape.getData();
			return Response.success(data);
		} catch (AbstractException ex) {
			Log.appError(LOGGER, ex);
			return Response.failure(ex);
		}
	}
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
