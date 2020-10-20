import java.util.ArrayList;
import java.util.List;

public class Encryption {
    private String input;
    private String encryptedString;

    public Encryption(String input) {
        this.input = input;
        this.encrypt();
    }

    public String getEncryptedString() {
        return encryptedString;
    }

    /**
     * Encrypts the input string and sets encryptedString as the encrypted string.
     */
    private void encrypt() {
        String nonSpacedInput = input.replaceAll("\\s+", "");
        int length = nonSpacedInput.length();

        // calculate the minimum number of rows and columns
        double sqrt = Math.sqrt(length);
        int col = (int)Math.floor(sqrt);
        int row = (int)Math.ceil(sqrt);
        if(row * col < length) {
            col++;
        }

        // fill the grid in vertical order
        char[][] grid = new char[row][col];
        for(int index = 0; index < length; index++) {
            int rowIndex = index % row;
            int colIndex = index / row;
            grid[rowIndex][colIndex] = nonSpacedInput.charAt(index);
        }

        // read the grid in horizontal order
        List<String> words = new ArrayList<>();
        for(int rowIndex = 0; rowIndex < row; rowIndex++) {
            StringBuilder word = new StringBuilder();
            for(int colIndex = 0; colIndex < col; colIndex++) {
                if(grid[rowIndex][colIndex] != '\u0000') {
                    word.append(grid[rowIndex][colIndex]);
                }
            }
            words.add(word.toString());
        }
        encryptedString = String.join(" ", words);
    }
}

