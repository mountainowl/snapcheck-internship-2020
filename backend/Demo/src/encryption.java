import java.util.Scanner;

public class encryption {

	public static void main(String[] args) {
		// input string
		Scanner scan = new Scanner(System.in);
		String s = scan.nextLine();

		// removing spaces from string
		s = s.replaceAll(" ", "");

		// calculate row and column needed
		int row, col;
		int l = s.length();
		int test = (int) Math.sqrt(l);

		if (test * test == l) {
			row = test;
			col = test;
		} else {
			row = test;
			col = test + 1;
			if (row * col < l) {
				row = row + 1;
			}
		}

		//output result
		for (int i = 0; i < col; i++) {
			int j = i;

			do {
				System.out.print(s.charAt(j));
				j += col;
			} while (j < l);

			System.out.print(" ");
		}

	}

}
