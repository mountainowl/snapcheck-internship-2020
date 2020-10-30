/* Name; Sai Swetha Chiguruvada
 * This program is used to encrypt the sentence entered by the user
 */
package solution;

import java.util.Scanner;

public class Snapecrypt {
    private String encrypt(String sentence) {
        String result = "";
        int len = sentence.length();
        int row = (int) Math.sqrt(len); //Finding the number of rows and columns of the matrix which should be constructed
        int column = (int) Math.sqrt(len) + 1;
        if ((row * column) < len) {
            row++;
        }
        char[][] matrix = new char[row][column]; //Declare the matrix
        int strcount = 0;
        for (int row_count = 0; row_count < row; row_count++) { //Loop to iterate through the rows
            for (int col_count = 0; col_count < column; col_count++) { //Loop to iterate through the column
                if (strcount < len) {
                    matrix[row_count][col_count] = sentence.charAt(strcount); //assigning each character of the string to the matrix's position 
                    //System.out.print(matrix[row_count][col_count]); //To print the matrix
                    strcount++;
                } else {
                    break;
                }
            }
            //System.out.println();
            if (strcount >= len)
                break;
        }
        for (int i = 0; i < column; i++) { //Constructing the encrypted sentence from the matrix
            for (int j = 0; j < row; j++) {
                result = result + matrix[j][i];
            }
            result = result + " ";
        }
        return result;
    }


    public static void main(String args[]) {
        @SuppressWarnings("resource")
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the sentence to be encrypted: ");
        String sentence = sc.next();
        Snapecrypt check = new Snapecrypt();
        System.out.println("After encryption: " + check.encrypt(sentence));

    }



}
