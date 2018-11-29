#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var program = require('commander');
var fakeInternational = require('.');

program
  .arguments("<orig> [dest]")
  .action(function(orig, dest) {
    program.orig = orig;
    program.dest = dest;
  })

program.parse(process.argv);

//program.file = program.file || "C:\\projects\\arbor\\arbor web apps\\sharingmemories\\develop\\SharingMemoriesAdmin_FED\\coffee\\resources.en.json";

if(program.orig==undefined || program.orig == "") {

} else {

  var strings = {};
  strings.orig = JSON.parse(fs.readFileSync(program.orig, { encoding:'utf8' }));

  if(program.dest) {
    if(fs.existsSync(program.dest)) {
      strings.dest = JSON.parse(fs.readFileSync(program.dest, { encoding: 'utf8' }));
    } else {
      console.warn('File %s doesnt exist', program.dest);
    }
  } else {
    strings.dest = {};
  }

  var keys = Object.keys(strings.orig);
  for(var i=0; i < keys.length; i++) {
    
    var currentKey = keys[i];
    var currentVal = strings.orig[currentKey] || "";
    
    if((strings.dest[currentKey] || "") == "") {
      strings.dest[currentKey] = fakeInternational(currentVal);
    }
  }

  if(program.dest) {
    if(fs.existsSync(program.dest)) {
      console.log('Creating backup of %s', program.dest);
      fs.renameSync(program.dest, program.dest+'.bak');
    }

    fs.writeFileSync(program.dest, JSON.stringify(strings.dest,null,2));
  } else {
    process.stdout.write(JSON.stringify(strings.dest,null,2))
  }
}

if(program.dest !== undefined) {
  console.log('Done');
}