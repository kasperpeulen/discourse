Discourse.Dialect.inlineBetween({
  start: '\\(',
  stop: '\\)',
  rawContents: true,
  emitter: function(contents) { return '$'+contents+'$';  }
});

Discourse.Dialect.inlineBetween({
  start: '$',
  stop: '$',
  rawContents: true,
  emitter: function(contents) { return '$'+contents+'$';  }
});

Discourse.Dialect.replaceBlock({
  start: /(\\\[)([\s\S]*)/,
  stop: '\\]',
  rawContents: true,
  emitter: function(contents) { return '\\['+contents+'\\]';  }
});

Discourse.Dialect.replaceBlock({
  start: /(\$\$)([\s\S]*)/,
  stop: '$$',
  rawContents: true,
  emitter: function(contents) { return '$$'+contents+'$$';  }
});

function addEnvironment (name){
Discourse.Dialect.replaceBlock({
  start: new RegExp('([\\x5C]begin{'+name+'})([\\s\\S]*)'),
  stop: '\\end{'+name+'}',
  rawContents: true,
  emitter: function(contents) { return '\\begin{'+name+'}'+ contents +'\\end{'+name+'}';  }
});
}

function addEnvironmentStar (name){
Discourse.Dialect.replaceBlock({
  start: new RegExp('([\\x5C]begin{'+name+'\\*})([\\s\\S]*)'),
  stop: '\\end{'+name+'*}',
  rawContents: true,
  emitter: function(contents) { return '\\begin{'+name+'*}'+ contents +'\\end{'+name+'*}';  }
});
}

addEnvironmentStar('align');
addEnvironmentStar('alignat');
addEnvironmentStar('eqnarray');
addEnvironmentStar('equation');
addEnvironmentStar('gather');
addEnvironmentStar('multline');
addEnvironment('align');
addEnvironment('alignat');
addEnvironment('aligned');
addEnvironment('alignedat');
addEnvironment('array');
addEnvironment('Bmatrix');
addEnvironment('bmatrix');
addEnvironment('cases');
addEnvironment('CD');
addEnvironment('eqnarray');
addEnvironment('equation');
addEnvironment('gather');
addEnvironment('gathered');
addEnvironment('matrix');
addEnvironment('multline');
addEnvironment('pmatrix');
addEnvironment('smallmatrix');
addEnvironment('split');
addEnvironment('subarray');
addEnvironment('Vmatrix');
addEnvironment('vmatrix');