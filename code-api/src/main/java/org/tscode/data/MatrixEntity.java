package org.tscode.data;

import java.util.ArrayList;
import java.util.List;

import org.tscode.vtc.Searcher;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import net.sf.oval.constraint.NotNull;
import net.sf.oval.guard.Guarded;

/**
 * Parse raw data
 * 
 * @author Lang
 *
 */
@Guarded
public class MatrixEntity {
	// ~ Static Fields =======================================
	// ~ Instance Fields =====================================
	/**
	 * Field -> Index
	 */
	private transient List<String> fields = new ArrayList<>();
	/**
	 * Data
	 */
	private transient List<RowEntity> data = new ArrayList<>();

	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	/** **/
	public MatrixEntity(@NotNull final JsonObject raw) {
		/** 1.Fill fields **/
		this.fields = RawParser.getFields(Searcher.lookup(raw, "meta", "view", "columns"));
		/** 2.Fill Data **/
		this.data = RawParser.getData(this.fields, Searcher.lookup(raw, "data"));
	}

	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	/** **/
	public JsonArray queryAll() {
		final JsonArray dataArr = new JsonArray();
		final int limit = 50 < data.size() ? 50 : data.size();
		for (int idx = 0; idx < limit; idx++) {
			dataArr.add(this.data.get(idx).getData());
		}
		/**
		 * this.data.forEach(item -> { dataArr.add(item.getData()); if(limit ==
		 * dataArr.size()){ return; } });
		 **/
		return dataArr;
	}
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
