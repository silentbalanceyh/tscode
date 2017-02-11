package org.puzzle.triangle;

/**
 * 
 * @author Lang
 *
 */
public enum Category {
	EQUILATERAL, ISOSCELES, SCALENE;
	// ~ Static Methods ======================================
	/**
	 * 
	 * @param name
	 * @return
	 */
	public static Category toCat(final String name) {
		Category category = null;
		switch (name) {
		case "Equilateral":
			category = Category.EQUILATERAL;
			break;
		case "Isosceles":
			category = Category.ISOSCELES;
			break;
		case "Scalene":
		default:
			category = Category.SCALENE;
			break;
		}
		return category;
	}

	/**
	 * 
	 * @param equalSides
	 * @return
	 */
	public static Category get(final int equalSides) {
		Category category = null;
		switch (equalSides) {
		case 1:
			category = Category.EQUILATERAL;
			break;
		case 2:
			category = Category.ISOSCELES;
			break;
		case 3:
		default:
			category = Category.SCALENE;
			break;
		}
		return category;
	}
}
