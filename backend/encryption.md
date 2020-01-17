# Encryption

An English text needs to be encrypted using the following encryption scheme.
First, the spaces are removed from the text. Let  be the length of this text.
Then, characters are written into a grid, whose rows and columns have the following constraints:

![GitHub Logo](encryption.png)

For example, the sentence

_s_ = if man was meant to stay on the ground god would have given us roots, 
after removing spaces is 54 characters long. SQRT(54) is between 7 and 8,
so it is written in the form of a grid with 7 rows and 8 columns.

```
ifmanwas  
meanttos          
tayonthe  
groundgo  
dwouldha  
vegivenu  
sroots
```

  - Ensure that rows x columns >= L
  - If multiple grids satisfy the above conditions, choose the one with the minimum area, i.e. 

The encoded message is obtained by displaying the characters in a column, inserting a space, and then displaying the next column and inserting a space, and so on. For example, the encoded message for the above rectangle is:

```
imtgdvs fearwer mayoogo anouuio ntnnlvt wttddes aohghn sseoau
```

## Function Description

Complete the encryption function in the editor below. It should return a single string composed as described.

encryption has the following parameter(s):

```
s: a string to encrypt
Input Format

One line of text, the string 
```

## Constraints

1 <= _s_ <= 81

_s_ is comprised only of characters in the range ascii[a-z].

## Output Format

Print the encoded message on one line as described.

### Sample Input

```
haveaniceday
```

#### Sample Output 0

```
hae and via ecy
```

#### Explanation 0

L = 12, SQRT(12) is between 3 and 4.
Rewritten with 3 rows and 4 columns:

```
have
anic
eday
```

### Sample Input 1

```
feedthedog    
```

#### Sample Output 1

```
fto ehg ee dd
```

#### Explanation 1

L = 10, SQRT(10) is between 3 and 4.
Rewritten with 3 rows and 4 columns:

```
feed
thed
og
```


### Sample Input 2

```
chillout
```

#### Sample Output 2

```
clu hlt io
```

Explanation 2

L = 8, SQRT(8) is between 2 and 3.
Rewritten with 3 columns and 3 rows (2*3 = 6 < 8 so we have to use 3x3)

```
chi
llo
ut
```
