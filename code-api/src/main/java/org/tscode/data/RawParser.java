package org.tscode.data;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.tscode.util.Log;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import net.sf.oval.constraint.MinSize;
import net.sf.oval.constraint.NotNull;
import net.sf.oval.guard.Guarded;

/**
 * 
 * @author Lang
 *
 */
@Guarded
public final class RawParser {
	// ~ Static Fields =======================================
	/** **/
	private static final Logger LOGGER = LoggerFactory.getLogger(RawParser.class);

	// ~ Instance Fields =====================================
	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	/** **/
	public static List<String> getFields(final JsonArray columnNode) {
		final List<String> fields = new ArrayList<>();
		if (null != columnNode) {
			try {
				columnNode.forEach(item -> {
					if (null != item && JsonObject.class == item.getClass()) {
						final JsonObject column = (JsonObject) item;
						final String field = column.getString("fieldName");
						if (null != field) {
							fields.add(column.getString("fieldName"));
						}
					}
				});
			} catch (ClassCastException ex) {
				Log.jvmError(LOGGER, ex);
			}
		}
		return fields;
	}

	/**
	 * 
	 * @param fields
	 * @param data
	 * @return
	 */
	public static List<RowEntity> getData(@MinSize(1) final List<String> fields, @NotNull final JsonArray data) {
		final List<RowEntity> entities = new ArrayList<>();
		data.forEach(item -> {
			if (null != item && JsonArray.class == item.getClass()) {
				final JsonArray dataItem = (JsonArray) item;
				int length = fields.size();
				final JsonObject dataObj = new JsonObject();
				for (int idx = 0; idx < length; idx++) {
					final String field = fields.get(idx);
					final Object value = dataItem.getValue(idx);
					dataObj.put(field, value);
				}
				entities.add(new RowEntity(dataObj));
			}
		});
		return entities;
	}

	// ~ Constructors ========================================
	private RawParser() {
	}
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
