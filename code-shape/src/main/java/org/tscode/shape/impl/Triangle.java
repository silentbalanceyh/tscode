package org.tscode.shape.impl;

import java.util.List;
import java.util.Set;

import org.tscode.shape.Calculator;
import org.tscode.shape.Shape;
import org.tscode.shape.core.Line;
import org.tscode.shape.core.Point;

import io.vertx.core.json.JsonObject;
import net.sf.oval.constraint.NotNull;
import net.sf.oval.constraint.Size;
import net.sf.oval.guard.Guarded;

/**
 * Build Triangle<JsonObject,Integer>
 * 
 * @author Lang
 *
 */
@Guarded
public class Triangle<P, L> implements Shape<P, L> {
	// ~ Static Fields =======================================
	// ~ Instance Fields =====================================
	/** **/
	private final Set<Line<L>> lines;
	/** **/
	private final List<Point<P>> points;
	/** **/
	private final JsonObject data = new JsonObject();

	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	/**
	 * This constructor could only be used in current package.
	 **/
	Triangle(@NotNull @Size(min = 3, max = 3) final Set<Line<L>> lines,
			@Size(min = 3, max = 3) final List<Point<P>> points) {
		this.lines = lines;
		this.points = points;
	}

	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	/** **/
	@Override
	public List<Point<P>> getPoints() {
		return this.points;
	}

	/** **/
	@Override
	public Set<Line<L>> getLines() {
		return this.lines;
	}

	/** **/
	@Override
	public JsonObject getData() {
		return this.data;
	}

	/** **/
	@Override
	public void connect(@NotNull final Calculator<P, L> calculator) {
		this.data.clear();
		this.data.mergeIn(calculator.calc(this.points, this.lines));
	}
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
