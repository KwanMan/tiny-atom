webpackJsonp([0xe83be0038625],{509:function(n,s){n.exports={data:{markdownRemark:{html:'<ul>\n<li>\n<p>rerender via deferred timeout</p>\n</li>\n<li>\n<p>never mutate the state directly</p>\n</li>\n<li>\n<p>keep actions close to the store, not close to the views</p>\n</li>\n</ul>\n<p>Your application state is a tree of data. Your UI is a separate tree of views. They don’t always map 1-1. Keep your UIs dumb, project state into the UI. Keep your logic for manipulating data, or transitioning state separate from the UI.</p>\n<p>It is, however, possible to import actions from components or modules of the application. One could imagine doing something like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">const</span> actions <span class="token operator">=</span> <span class="token punctuation">{</span>\n    dashboard<span class="token punctuation">:</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'./modules/dashboards/actions\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    feed<span class="token punctuation">:</span> dashboard<span class="token punctuation">:</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'./modules/feed/actions\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    settings<span class="token punctuation">:</span> dashboard<span class="token punctuation">:</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'./modules/settings/actions\'</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// somewere in modules/feed/post.js</span>\n\n<span class="token function">split</span><span class="token punctuation">(</span><span class="token string">\'feed/addComment\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> text<span class="token punctuation">:</span> hello <span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token comment">// in modules/feed/actions.js</span>\n\nmodule<span class="token punctuation">.</span>exports<span class="token punctuation">.</span>addComment <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">get</span><span class="token punctuation">,</span> split<span class="token punctuation">,</span> payload<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> postId <span class="token operator">=</span> <span class="token keyword">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>feed<span class="token punctuation">.</span>currentPostId\n  <span class="token function">split</span><span class="token punctuation">(</span><span class="token punctuation">{</span> display<span class="token punctuation">:</span> <span class="token punctuation">{</span> spinner<span class="token punctuation">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token keyword">const</span> comment <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`/posts/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>postId<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/comments`</span></span><span class="token punctuation">,</span> payload<span class="token punctuation">)</span>\n  <span class="token function">split</span><span class="token punctuation">(</span><span class="token punctuation">{</span> display<span class="token punctuation">:</span> <span class="token punctuation">{</span> spinner<span class="token punctuation">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token function">split</span><span class="token punctuation">(</span><span class="token punctuation">{</span> entities<span class="token punctuation">:</span> <span class="token punctuation">{</span> comments<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>comment<span class="token punctuation">.</span>id<span class="token punctuation">]</span><span class="token punctuation">:</span> comment <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token keyword">const</span> comments <span class="token operator">=</span> _<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">\'entities\'</span><span class="token punctuation">,</span> <span class="token string">\'posts\'</span><span class="token punctuation">,</span> postId<span class="token punctuation">,</span> <span class="token string">\'comments\'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>\n  <span class="token function">split</span><span class="token punctuation">(</span><span class="token punctuation">{</span> entities<span class="token punctuation">:</span> <span class="token punctuation">{</span> posts<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>postId<span class="token punctuation">]</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> comments<span class="token punctuation">:</span> comments<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token punctuation">[</span>comment<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<ul>\n<li>custom merging strategies, in particular deepMerge, deepAssign</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>const {assign, keys, each} = require(\'slapdash\')\n\nmodule.exports = function deepMerge (prev, next) {\n  const merged = assign({}, prev, next)\n  each(keys(next), key => {\n    if (prev && next && next[key] !== prev[key] && isObject(next[key]) && isObject(prev[key])) {\n      merged[key] = deepMerge(prev[key], next[key])\n    }\n  })\n  return merged\n}\n\nfunction isObject (obj) {\n  return typeof obj === \'object\' && Object.prototype.toString.call(obj) === \'[object Object]\'\n}</code></pre>\n      </div>\n<ul>\n<li>\n<p>don’t be afraid to experiment</p>\n</li>\n<li>\n<p><a href="https://zaphod.surge.sh/">zaphod</a> for immutably updating data structures</p>\n</li>\n</ul>',excerpt:"rerender via deferred timeout never mutate the state directly keep actions close to the store, not close to the views Your application state…",timeToRead:1,frontmatter:{title:"Best practises"},parent:{__typename:"File",relativePath:"best-practises.md"}}},pathContext:{slug:"/best-practises/"}}}});
//# sourceMappingURL=path---best-practises-bc3e412fa0e526e033d2.js.map