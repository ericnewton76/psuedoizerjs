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

# Thanks

A thanks to Scott Hanselman for the original code in C# that I've used for several projects written in .NET  I figured we could expand its use into the Javascript world.
