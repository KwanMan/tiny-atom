webpackJsonp([0x846f7709830f],{508:function(n,s){n.exports={data:{markdownRemark:{html:'<p>This guide demonstrates the typical usage of <code>tiny-atom</code> when creating interactive web apps. With <strong>Tiny Atom</strong> we keep all of the application data and some of the application state in the <code>atom</code>. We then project this state by rendering it with some view library, such as <code>react</code>. And we update the state by sending actions using the <code>atom.split</code> function. To summarise:</p>\n<ol>\n<li>Store data and state in an <code>atom</code>.</li>\n<li>Render the state into DOM.</li>\n<li>Update the state with actions.</li>\n</ol>\n<h2 id="basic-app"><a href="#basic-app" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Basic app</h2>\n<p>First, we create our <code>atom</code> that stores a count and can be updated with two actions.</p>\n<p><strong>atom.js</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">const</span> createAtom <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'tiny-atom\'</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> render <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'./render\'</span><span class="token punctuation">)</span>\n\n<span class="token keyword">const</span> atom <span class="token operator">=</span> <span class="token function">createAtom</span><span class="token punctuation">(</span><span class="token punctuation">{</span> count<span class="token punctuation">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> evolve<span class="token punctuation">,</span> render<span class="token punctuation">)</span>\n\n<span class="token keyword">const</span> actions <span class="token operator">=</span> <span class="token punctuation">{</span>\n  increment<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token keyword">get</span><span class="token punctuation">,</span> split<span class="token punctuation">,</span> x<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">split</span><span class="token punctuation">(</span><span class="token punctuation">{</span> count<span class="token punctuation">:</span> <span class="token keyword">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>count <span class="token operator">+</span> x <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  decrement<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token keyword">get</span><span class="token punctuation">,</span> split<span class="token punctuation">,</span> x<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">split</span><span class="token punctuation">(</span><span class="token punctuation">{</span> count<span class="token punctuation">:</span> <span class="token keyword">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>count <span class="token operator">-</span> x <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function">evolve</span> <span class="token punctuation">(</span><span class="token keyword">get</span><span class="token punctuation">,</span> split<span class="token punctuation">,</span> action<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  actions<span class="token punctuation">[</span>action<span class="token punctuation">.</span>type<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token keyword">get</span><span class="token punctuation">,</span> split<span class="token punctuation">,</span> action<span class="token punctuation">.</span>payload<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> atom\n</code></pre>\n      </div>\n<p>Next, let’s create the render function. This demonstrates how we react to <code>atom</code> changes in order to continuosly project the latest state into DOM. It also demonstrates how we can pass <code>atom</code> as context to the entire application tree using the <code>ProvideAtom</code> component.</p>\n<p><strong>render.js</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">const</span> React <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'react\'</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> ReactDOM <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'react-dom\'</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> <span class="token punctuation">{</span> ProvideAtom <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'tiny-atom/react\'</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> App <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'./App\'</span><span class="token punctuation">)</span>\n\nmodule<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">render</span> <span class="token punctuation">(</span>atom<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">(</span>\n    <span class="token operator">&lt;</span>ProvideAtom atom<span class="token operator">=</span><span class="token punctuation">{</span>atom<span class="token punctuation">}</span><span class="token operator">></span>\n      <span class="token operator">&lt;</span>App <span class="token operator">/</span><span class="token operator">></span>\n    <span class="token operator">&lt;</span><span class="token operator">/</span>ProvideAtom<span class="token operator">></span>\n  <span class="token punctuation">)</span><span class="token punctuation">,</span> document<span class="token punctuation">.</span>body<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>We then create our App component. This demonstrates how to use <code>ConnectAtom</code> to extract the relevant bits of state and actions for any given component.</p>\n<p><strong>App.js</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">const</span> React <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'react\'</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> <span class="token punctuation">{</span> ConnectAtom <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'tiny-atom/react\'</span><span class="token punctuation">)</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">mapAtom</span> <span class="token operator">=</span> <span class="token punctuation">(</span>state<span class="token punctuation">,</span> split<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n  count<span class="token punctuation">:</span> state<span class="token punctuation">.</span>count<span class="token punctuation">,</span>\n  inc<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">split</span><span class="token punctuation">(</span><span class="token string">\'increment\'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  dec<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">split</span><span class="token punctuation">(</span><span class="token string">\'decrement\'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">App</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n  <span class="token operator">&lt;</span>ConnectAtom map<span class="token operator">=</span><span class="token punctuation">{</span>mapAtom<span class="token punctuation">}</span> render<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">{</span> count<span class="token punctuation">,</span> inc<span class="token punctuation">,</span> dec <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n    <span class="token operator">&lt;</span>div<span class="token operator">></span>\n      <span class="token operator">&lt;</span>h1<span class="token operator">></span>count<span class="token punctuation">:</span> <span class="token punctuation">{</span>count<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>\n      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>inc<span class="token punctuation">}</span><span class="token operator">></span>Increment<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>\n      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>dec<span class="token punctuation">}</span><span class="token operator">></span>Decrement<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>\n    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n  <span class="token punctuation">)</span><span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n<span class="token punctuation">)</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> App\n</code></pre>\n      </div>\n<p>And finally assemble all the pieces together.</p>\n<p><strong>index.js</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">const</span> atom <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'./atom\'</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> render <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'./render\'</span><span class="token punctuation">)</span>\n<span class="token function">render</span><span class="token punctuation">(</span>atom<span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>This is the initial render of the app. When a user clicks one of the Increment or Decrement buttons, the state will be updated and <code>render</code> will be called to rerender the app.</p>\n<p>There are many ways to bootstrap and structure an application. This flexibility can be useful. If you prefer an opinionated prepackaged way to create an app, check out <a href="https://github.com/KidkArolis/nebula" target="_blank" rel="nofollow noopener noreferrer">nebula</a> - an application framework to puts together (p)react, tiny-atom and space-router libraries.</p>',excerpt:"This guide demonstrates the typical usage of  tiny-atom  when creating interactive web apps. With  Tiny Atom  we keep all of the application…",timeToRead:2,frontmatter:{title:"Basics"},parent:{__typename:"File",relativePath:"basics.md"}}},pathContext:{slug:"/basics/"}}}});
//# sourceMappingURL=path---basics-0bceace882b31628f14e.js.map