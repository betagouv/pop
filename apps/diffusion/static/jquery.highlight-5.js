/*

highlight v5

Highlights arbitrary terms.

<http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html>

MIT license.

Johann Burkard
<http://johannburkard.de>
<mailto:jb@eaio.com>

*/

jQuery.fn.highlight = function(pat) {
 function innerHighlight(node, pat) {
  var skip = 0;
  var whole = true;
  if (node.nodeType == 3) {
   var pos = node.data.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(pat.normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
   pos -= (node.data.substr(0, pos).toUpperCase().length - node.data.substr(0, pos).length);
   if (pos >= 0) {
    var totalLength = node.data.length;
    var spannode = document.createElement('span');
    spannode.className = 'highlight';
    var middlebit = node.splitText(pos);
    var endbit = middlebit.splitText(pat.length);
    var middleclone = middlebit.cloneNode(true);
    spannode.appendChild(middleclone);
    
    const regex = /[a-zA-Z]/g;
    if(pos != 0){
        //test caractère avant
        if( node.data.charAt(node.data.length-1).match(regex) !== null ){
            whole = node.data.charAt(node.data.length-1).match(regex).size <= 0;
        }
    }
    if(pos + pat.length != totalLength){
        //test caractère après
        if( endbit.data.charAt(0).match(regex) !== null ){
            whole = endbit.data.charAt(0).match(regex).size <= 0;
        }
    }


    if(whole){
        middlebit.parentNode.replaceChild(spannode, middlebit);
    }
    skip = 1;
   }
  }
  else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
   for (var i = 0; i < node.childNodes.length; ++i) {
    i += innerHighlight(node.childNodes[i], pat);
   }
  }
  return skip;
 }
 return this.length && pat && pat.length ? this.each(function() {
  innerHighlight(this, pat.toUpperCase());
 }) : this;
};

jQuery.fn.removeHighlight = function() {
 return this.find("span.highlight").each(function() {
  this.parentNode.firstChild.nodeName;
  with (this.parentNode) {
   replaceChild(this.firstChild, this);
   normalize();
  }
 }).end();
};
