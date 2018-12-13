#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var program = require('commander');
var psuedoizer = require('.');
var status = require('./lib/cli-status');

program
  .name("psuedoizer")
  .option("--verbose", "Verbose output")
  .description("With no FILE, or when FILE is -, read standard input.")
  .arguments("[FILE]")
  .action(function(FILE) {
    program.FILE = FILE;
    if(!program.FILE || program.FILE === "-") program.stdin = true;
  })

program.parse(process.argv);

//program.file = program.file || "C:\\projects\\arbor\\arbor web apps\\sharingmemories\\develop\\SharingMemoriesAdmin_FED\\coffee\\resources.en.json";

//if writing to stdout, be quiet, no "extra" info
status.setOptions(program);

(function main() {
  var strings = {};

  if(!program.stdin) {
    strings.orig = JSON.parse(fs.readFileSync(program.FILE, { encoding:'utf8' }));

  } else {
    strings.orig = JSON.parse(fs.readFileSync(0, { encoding:"utf8"}));

  }

  if(program.dest) {
    if(fs.existsSync(program.dest)) {
      strings.dest = JSON.parse(fs.readFileSync(program.dest, { encoding: 'utf8' }));
    }
  }

  strings.dest = psuedoizer.convert(strings.orig, strings.dest);

  if(program.dest) {
    if(fs.existsSync(program.dest)) {
      status.log('Creating backup of %s', program.dest);
      fs.copyFileSync(program.dest, program.dest+'.bak');
    }

    status.log('Writing to \'%s\'...', program.dest);
    fs.writeFileSync(program.dest, JSON.stringify(strings.dest,null,2));
  } else {
    process.stdout.write(JSON.stringify(strings.dest,null,2))
  }


  status.log('Done');
})();