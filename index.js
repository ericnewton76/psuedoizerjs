/**
 * simulates a C# StringBuilder.  
 * Somehow not needed here since a += string concat seems to be an optimized operation 
 * ...as opposed to C# always generating intermediate immutable strings.
 */
class StringBuilder {
  constructor(len) {
    this._buffer = "";
  }

  Append(str) {
    this._buffer += str;
    return this;
  }

  ToString() {
    return this._buffer;
  }
}


/**
 * reads input and runs psuedoizer algorithm on it.
 * can be string or object.
 * @param {object|string} object an object or string to psuedoize
 * @param {object} outputObj an object with existing translations.  will only add new ones or update values with empty string ("").
 * @returns {object|string} returns an object or string
 */
convert = function(input, outputObj) {
  if(typeof(input) === "string") {
    return _psuedoizeString(input);
  }

  var keys = Object.keys(input);
  var output = Array.isArray(input) ? [] : Object.assign({}, outputObj);

  for(var i=0; i < keys.length; i++) {

    var currentKey = keys[i];
    var currentVal = input[currentKey] || "";

    if(!output[currentKey] || output[currentKey] == "") {
      output[currentKey] = convert(currentVal);
    }
  }

  return output;
}

/**
 * Calculates the average expanded length necessary for internationalization.
 * The rules, according to "Developing International Software" is:
 * - when len < 10 characters,  it should grow by 400%
 * - when len >= 10 characters, it should grow by 30%.
 * @param {string} inputString 
 * @returns {number} calculated expansion of psuedo internalized string
 */
function getExpandedLength(inputString) {
  if(typeof(inputString) === "string") {
    var OrigLen = inputString.length;
    var PseudoLen = 0;
    if (OrigLen < 10)
    {
      PseudoLen = Math.round((OrigLen * 4) + OrigLen);
    }
    else
    {
      PseudoLen = Math.round((OrigLen * 1.2));
    }

    return PseudoLen;
  }
}

/**
 * Takes the given string and converts it into psuedo international characters.
 * Credit to Scott Hanselman for original code/concept here.
 * @param {string} the source string to convert
 */
function _psuedoizeString(inputString) {

    //check if the input string is a http or https link... if it is, do not localize
    if(/http[s]:\/\//.test(inputString))
    {
        return inputString;
    }

    //get the expanded length
    var PseudoLen = getExpandedLength(inputString);
    var OrigLen = inputString.length;

    var sb = new StringBuilder(PseudoLen);

    // The pseudo string will always start with a "[" and end
    // with a "]" so you can tell if strings are not built
    // correctly in the UI.
    sb.Append("[");

    var waitingForEndBrace = false;
    var waitingForGreaterThan = false;
    for (var i=0; i < OrigLen; i++)
    {
        var currChar = inputString[i];

        switch (currChar) {
            case '{':
                waitingForEndBrace = true;
                break;
            case '}':
                waitingForEndBrace = false;
                break;
            case '<':
                waitingForGreaterThan = true;
                break;
            case '>':
                waitingForGreaterThan = false;
                break;
        }
        if (waitingForEndBrace || waitingForGreaterThan)
        {
            sb.Append(currChar);
            continue;
        }
        switch (currChar)
        {
            case 'A':
                sb.Append('Å');
                break;
            case 'B':
                sb.Append('ß');
                break;
            case 'C':
                sb.Append('C');
                break;
            case 'D':
                sb.Append('Đ');
                break;
            case 'E':
                sb.Append('Ē');
                break;
            case 'F':
                sb.Append('F');
                break;
            case 'G':
                sb.Append('Ğ');
                break;
            case 'H':
                sb.Append('Ħ');
                break;
            case 'I':
                sb.Append('Ĩ');
                break;
            case 'J':
                sb.Append('Ĵ');
                break;
            case 'K':
                sb.Append('Ķ');
                break;
            case 'L':
                sb.Append('Ŀ');
                break;
            case 'M':
                sb.Append('M');
                break;
            case 'N':
                sb.Append('Ń');
                break;
            case 'O':
                sb.Append('Ø');
                break;
            case 'P':
                sb.Append('P');
                break;
            case 'Q':
                sb.Append('Q');
                break;
            case 'R':
                sb.Append('Ŗ');
                break;
            case 'S':
                sb.Append('Ŝ');
                break;
            case 'T':
                sb.Append('Ŧ');
                break;
            case 'U':
                sb.Append('Ů');
                break;
            case 'V':
                sb.Append('V');
                break;
            case 'W':
                sb.Append('Ŵ');
                break;
            case 'X':
                sb.Append('X');
                break;
            case 'Y':
                sb.Append('Ÿ');
                break;
            case 'Z':
                sb.Append('Ż');
                break;


            case 'a':
                sb.Append('ä');
                break;
            case 'b':
                sb.Append('þ');
                break;
            case 'c':
                sb.Append('č');
                break;
            case 'd':
                sb.Append('đ');
                break;
            case 'e':
                sb.Append('ę');
                break;
            case 'f':
                sb.Append('ƒ');
                break;
            case 'g':
                sb.Append('ģ');
                break;
            case 'h':
                sb.Append('ĥ');
                break;
            case 'i':
                sb.Append('į');
                break;
            case 'j':
                sb.Append('ĵ');
                break;
            case 'k':
                sb.Append('ĸ');
                break;
            case 'l':
                sb.Append('ľ');
                break;
            case 'm':
                sb.Append('m');
                break;
            case 'n':
                sb.Append('ŉ');
                break;
            case 'o':
                sb.Append('ő');
                break;
            case 'p':
                sb.Append('p');
                break;
            case 'q':
                sb.Append('q');
                break;
            case 'r':
                sb.Append('ř');
                break;
            case 's':
                sb.Append('ş');
                break;
            case 't':
                sb.Append('ŧ');
                break;
            case 'u':
                sb.Append('ū');
                break;
            case 'v':
                sb.Append('v');
                break;
            case 'w':
                sb.Append('ŵ');
                break;
            case 'x':
                sb.Append('χ');
                break;
            case 'y':
                sb.Append('y');
                break;
            case 'z':
                sb.Append('ž');
                break;
            default:
                sb.Append(currChar);
                break;
        }
    }

    // Poke on extra text to fill out the string.
    const PadStr = " !!!";
    var PadCount = (PseudoLen - OrigLen - 2) / PadStr.length;
    if (PadCount < 2)
    {
        PadCount = 2;
    }

    for (var x = 0; x < PadCount; x++)
    {
        sb.Append(PadStr);
    }

    // Pop on the trailing "]"
    sb.Append("]");

    return (sb.ToString());
}

module.exports = {
  convert: convert,
  getExpandedLength: getExpandedLength
}