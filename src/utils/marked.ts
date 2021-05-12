import marked from "marked";
import hljs from "highlight.js";

hljs.COMMENT("/\\*", "\\*/", {
  contains: [{ className: "doc", begin: "@\\w+" }]
});
hljs.configure({});

const rendererMD = new marked.Renderer();

marked.setOptions({
  renderer: rendererMD,
  headerIds: false,
  gfm: true,
  // tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
});

export default marked;
