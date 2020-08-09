package Solution;

import java.util.Scanner;

public class Driver {
	public static void main (String args [])
	{
		//test cases provided by GitHub
		new Encryption ("have a nice day");
		new Encryption ("feed the dog    ");
		new Encryption ("chillout");
		
		System.out.println("Above are the listed test cases from GitHub\n\n\nEnter a String to encrpyt it\n");
		
		String input = new String();
		Scanner console = new Scanner(System.in);
		input = console.nextLine();
		new Encryption (input);
	}
}
