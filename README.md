# psuedoizerjs
Psuedoizer for working with angular-translate json files.

This library helps in the translation process by creating fake/psuedo-internationalized text from a (usually English) source translation file.

Includes a CLI for directly translating files from a shell, output is written to stdout mostly.
```
$ psuedoizer test.en.json
{
  "KEY_A": "[Väľūę 1 !!! !!! !!! !!! !!! !!! !!!]",
  "KEY_B": "[Väľūę 2 !!! !!! !!! !!! !!! !!! !!!]",
  "TEXT_1": "[Ŧęşŧ Åpp Ŧįŧľę !!! !!!]",
  "TEXT_2": "[Ŧĥę qūįčĸ þřőŵŉ ƒőχ ĵūmpęđ ővęř ŧĥę ľäžy čőŵ !!! !!!]"
}
```
