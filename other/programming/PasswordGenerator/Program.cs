//Words generated for part of password
string[] items = new string[10] { "begin", "cover", "wrong", "bread", "siege", "peace", "floor", "minor", "sheet", "grass" };
string[] moreItems = new string[10] { "paint", "state", "great", "ridge", "feast", "laser", "chalk", "angle", "story", "sweet" };

//Numbers and Special characters generated for part of password 
string endNumbers = "0123456789";
string specialChars = "?,;:'-()*&^%£#@!][><_/=+";

//Minimum and maximum values for the password generated
int min = 8;
int max = 20;

//Random object instantiated to access its library I.E random.Next method
Random random = new Random();

//Initialising the variables for each part of the generated password, password being one word, morePassword being another word and numberPassword being the numbers
string password = "";
string morePassword = "";
string numberPassword = "";

//Adding a value to password and morePassword variables to give it a word
password += items[random.Next(items.Length)];
morePassword += moreItems[random.Next(moreItems.Length)];

//while loop that ensures the length of the password is within the set min and max parameters
while (password.Length < min && morePassword.Length < min && numberPassword.Length < min)
{
    if (password.Length >= max && morePassword.Length >= max && numberPassword.Length >= max) { return; }

    //gate is to check to ensure you don't go over above password length

    password += specialChars[random.Next(23)]; //adding special character
    morePassword += specialChars[random.Next(23)];
    numberPassword += endNumbers[random.Next(10)];
}

//Generates the output of the random generated password
Console.WriteLine($"Generated Password {password}{morePassword}{numberPassword}");