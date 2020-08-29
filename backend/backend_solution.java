//time : O(n^2) where n is the length of the string argument
//space : O(n) due to strings being immutable and having to append new characters to build up the string.
import java.lang.Math;
import java.util.Arrays;
public class EncryptionDriver {
    public static void main(String[] args){
        try {
            System.out.println("Original message:'if man was meant to stay on the ground god would have given us roots'" +
                    " Encrypted message:" + encrypt("if man was meant to stay on the ground god would have given us roots"));
            System.out.println("Original message:'haveaniceday'" +
                    " Encrypted message:" + encrypt("haveaniceday"));
            System.out.println("Original message: 'feedthedog' Encrypted message: " + encrypt("feedthedog"));
            System.out.println("Original message: 'chillout' Encrypted message: " + encrypt("chillout"));
        }
        catch (Exception e) {
            e.printStackTrace();
        }

    }
    public static String encrypt(String text) throws Exception {
        String whiteSpaceRemoved = text.replaceAll(" ","");
        //determine size of the grid that will be made following the constraints floor(sqrt) <= row <= col <= ceil(sqrt)
        int nonWhiteSpacelen = whiteSpaceRemoved.length();
        double sqrt = Math.sqrt(nonWhiteSpacelen);
        int rows = (int) Math.floor(sqrt);
        int cols = (int) Math.floor(sqrt);

        while (rows * cols < nonWhiteSpacelen){
            int increasedRowArea = (rows+1) * cols;
            int increasedColArea = rows * (cols+1);
            if (increasedRowArea <= increasedColArea && rows+1 <= cols) {
                rows++;
            }
            else if (cols == Math.ceil(sqrt)){
                rows++;
            }
            else{
                cols++;
            }
        }
        if (cols > Math.ceil(sqrt) || rows > cols) {
            throw new Exception("Message cannot be encrypted.");
        }

        //populate the string array with substrings that are the length of each row
        String[] grid = new String[rows];
        Arrays.fill(grid,"");
        int whiteSpaceRemovedIdx = 0;
        for (int gridIdx = 0; gridIdx < grid.length; gridIdx++) {
            if ((whiteSpaceRemovedIdx + cols) < whiteSpaceRemoved.length()) {
                grid[gridIdx] = whiteSpaceRemoved.substring(whiteSpaceRemovedIdx, whiteSpaceRemovedIdx + cols);
            }
            else {
                grid[gridIdx] = whiteSpaceRemoved.substring(whiteSpaceRemovedIdx);
            }
            whiteSpaceRemovedIdx += cols;
        }

        //generate the encrypted word with spaces
        String encrypted = "";
        int wordIdx = 0;
        while (wordIdx < grid[0].length()){
            for (int i = 0; i < grid.length; i++) {
                if (wordIdx >= grid[i].length()){
                    break;
                }
                encrypted += grid[i].charAt(wordIdx);
            }
            encrypted+= ' ';
            wordIdx++;
        }

        return encrypted.substring(0,encrypted.length()-1);
    }

}