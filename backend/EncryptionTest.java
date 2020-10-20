import static org.junit.jupiter.api.Assertions.*;

class EncryptionTest {

    @org.junit.jupiter.api.Test
    void getEncryptedString() {
        String testInput1 = "if man was meant to stay on the ground god would have given us roots";
        String testInput2 = "have a      nice day";
        String testInput3 = "feed the    dog";
        String testInput4 = "chill     out";

        String testOutput1 = "imtgdvs fearwer mayoogo anouuio ntnnlvt wttddes aohghn sseoau";
        String testOutput2 = "hae and via ecy";
        String testOutput3 = "fto ehg ee dd";
        String testOutput4 = "clu hlt io";

        String[] testOutputs = {testOutput1, testOutput2, testOutput3, testOutput4};

        String actualOutput1 = new Encryption(testInput1).getEncryptedString();
        String actualOutput2 = new Encryption(testInput2).getEncryptedString();
        String actualOutput3 = new Encryption(testInput3).getEncryptedString();
        String actualOutput4 = new Encryption(testInput4).getEncryptedString();

        String[] actualOutputs = {actualOutput1, actualOutput2, actualOutput3, actualOutput4};

        assertArrayEquals(testOutputs, actualOutputs);
    }
}