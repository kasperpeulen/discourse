# name: MathJax support for Discourse
# version: 0.2
# authors: Sam Saffron, Kasper Peulen

register_asset('javascripts/tex_dialect.js', :server_side)
register_asset('correct.js', :server_side)
register_javascript <<JS 

    Discourse.addInitializer(function () {

      $LAB.script('http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML').wait(function() {

	  
        MathJax.Hub.Config({ 
          asciimath2jax: {delimiters: [['′','′'],['′′','′′']]}, 
          AsciiMath: {displaystyle: false} 
        }); 
        MathJax.Hub.Register.LoadHook("[MathJax]/extensions/asciimath2jax.js",function () { 
          var AM = MathJax.Extension.asciimath2jax, 
              CREATEPATTERNS = AM.createPatterns; 
          AM.createPatterns = function () { 
            var result = CREATEPATTERNS.call(this); 
            this.match['′′'].mode = ";mode=display"; 
            return result; 
          }; 
        }); 
        MathJax.Hub.Register.StartupHook("AsciiMath Jax Ready",function () { 
          var AM = MathJax.InputJax.AsciiMath; 
          AM.postfilterHooks.Add(function (data) { 
            if (data.script.type.match(/;mode=display/))   
{data.math.root.display = "block"} 
            return data; 
          }); 
        }); 
	  
MathJax.Hub.Config({ "HTML-CSS": { 
        preferredFont: "TeX", 
        availableFonts: ["STIX","TeX"], 
        linebreaks: { automatic:true }, 
        EqnChunk: (MathJax.Hub.Browser.isMobile ? 10 : 50) },
        tex2jax: { 
        inlineMath: [ ["$", "$"], ["\\\\(","\\\\)"] ], 
        displayMath: [ ["$$","$$"], ["\\\\[", "\\\\]"] ], 
        processEscapes: true},
        TeX: { 
        noUndefined: { attributes: { mathcolor: "red", mathbackground: "#FFEEEE", mathsize: "90%" } }, 
        Macros: { href: "{}" } },
        messageStyle: "none"
});

        var applyPreview = _.debounce(function(){
          MathJax.Hub.Queue(["Typeset",MathJax.Hub,"wmd-preview"]);
        }, 500);

        var applyBody = function(){
          MathJax.Hub.Queue(["Typeset",MathJax.Hub,"topic"]);
        };

        Discourse.PostView.prototype.on("postViewInserted", applyBody);
        Discourse.ComposerView.prototype.on("previewRefreshed", applyPreview);

      });

    });
JS