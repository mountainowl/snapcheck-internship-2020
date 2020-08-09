package Solution;

public class Encryption {
	private int row, col;
	
	public Encryption (String str)
	{
		System.out.println ("\n\n----------   INPUT   ----------\n" + str );
		//regular expression to find and replace all spaces with an empty string
		String noSpaces = str.replaceAll("\\s+", "");
		
		//prints string with spaces removed, for confirmation
		//System.out.println(noSpaces);
		
		//use floor/ceiling functions and type casting to find dimensions
		row = (int)Math.floor(Math.sqrt(noSpaces.length()));
		col = (int)Math.ceil(Math.sqrt(noSpaces.length()));
		System.out.println ("\nROWS: " + row + " COLS: " + col);
		//System.exit(101);
		//assert that the matrix dimensions were calculated correctly
		int check = row * col;
		
		//add another row if the calculation was short
		if (check < noSpaces.length())
			row++;
		
		//initialize a 2D character array with the appropriate dimensions
		char [] [] charMatrix = new char [row][col];
		
		int coli = 0, rowi = 0;
		
		//loops to insert the noSpaces string into the character matrix
		for (int i = 0; i < noSpaces.length(); i++)
		{
			//grab the character we are inserting
			char character = noSpaces.charAt(i);
			if (coli >= col)
			{
				rowi++;
				coli = 0;
			}	
			//System.out.println ("ROW: " + rowi + " COL: " + coli + " IS: " + character);
			charMatrix [rowi][coli] = character;
			coli++;
		}
		String result = encryptMatrix (charMatrix);
		
		System.out.println ("\n\n----------   RESULT   ----------\n " +result + "\n\n");
	}
	public String encryptMatrix (char [] [] charMatrix)
	{
		String result = "";
		
		//this is the most resource intesive looping instance in the entire program
		//Therefore, the solution is O(col * row), and since col and row are either the same or off by one,
		//we can simplify to O(n^2)
		for (int i = 0; i < col; i++)
		{
			String temp = "";
			
			//add each column to the temp variable
			for (int j = 0; j < row; j++)
				temp = temp + charMatrix[j][i];
			//append a space
			temp += " ";
			//add to overall result
			result = result + temp;
		}
		return result;
	}
}
