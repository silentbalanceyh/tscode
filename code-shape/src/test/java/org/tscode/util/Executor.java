package org.tscode.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.puzzle.triangle.CatCalculator;
import org.tscode.exp.AbstractException;
import org.tscode.shape.Calculator;
import org.tscode.shape.Planum;
import org.tscode.shape.Shape;
import org.tscode.shape.impl.TrianglePlanum;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;

/**
 * Read data
 * 
 * @author Lang
 *
 */
public class Executor {
	// ~ Static Fields =======================================
	/** Singleton is the best, Build Calculator **/
	private static final Calculator<Integer, Integer> CALCULATOR = Instance.singleton(CatCalculator.class);
	/** Singleton is the best, Build Planum **/
	private static final Planum PLANUM = Instance.singleton(TrianglePlanum.class);

	// ~ Instance Fields =====================================
	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	/**
	 * 
	 * @param file
	 * @throws AbstractException
	 */
	public static JsonObject executeTest(final String file) throws AbstractException{
		/** 1.Read data **/
		final List<int[]> sidesList = readData(file);
		/** 2.Iterator each input **/
		final Random random = new Random();
		final int selected = random.nextInt(sidesList.size());
		/** 3.Get sides **/
		final int[] sides = sidesList.get(selected);
		/** 4.Test **/
		return calculate(sides);
	}
	/**
	 * Batch
	 * @param file
	 * @return
	 */
	public static boolean collectError(final String file){
		/** 1.Read data **/
		final List<int[]> sidesList = Executor.readData(file);
		/** 2.Build Error Array **/
		final List<AbstractException> exps = new ArrayList<>();
		for(final int[] side: sidesList){
			try{
				calculate(side);
			}catch(AbstractException ex){
				exps.add(ex);
			}
		}
		return exps.size() == sidesList.size();
	}
	/**
	 * 
	 */
	public static List<int[]> readData(final String file) {
		/** Read Data **/
		final JsonArray data = IOKit.getJArray(file);
		/** **/
		final List<int[]> dataArr = new ArrayList<>();
		final int size = data.size();
		for (int idx = 0; idx < size; idx++) {
			try {
				/** **/
				final JsonArray item = data.getJsonArray(idx);
				final int inputes = item.size();
				final int[] sides = new int[inputes];
				/** **/
				for (int jdx = 0; jdx < inputes; jdx++) {
					final int side = item.getInteger(jdx);
					sides[jdx] = side;
				}
				dataArr.add(sides);
			} catch (ClassCastException ex) {
				// Skip Test Data
				continue;
			}
		}
		return dataArr;
	}

	/**
	 * 
	 * @param sides
	 * @return
	 */
	public static JsonObject calculate(final int[] sides) throws AbstractException {
		/** Get Shape **/
		final Shape<Integer, Integer> shape = PLANUM.create(sides);
		/** Connect Calculator **/
		shape.connect(CALCULATOR);
		/** **/
		return shape.getData();
	}
	// ~ Constructors ========================================
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
