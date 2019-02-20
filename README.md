# hypernova-vue

[Vue.js](https://github.com/vuejs/vue) bindings for [Hypernova](https://github.com/airbnb/hypernova).

On the server, wraps the component in a function to render it to a HTML string given its props.

On the client, calling this function with your component scans the DOM for any server-side rendered instances of it. It then resumes those components using the server-specified props.

## Install

```sh
npm install hypernova-vue
```

## Usage

Here's how to use it in your module:

```js
import { renderVue, Vue } from 'hypernova-vue'

const Header = Vue.extend({
  props: ['title'],
  render: function(createElement) {
    return createElement('h1', this.title)
  }
})

export default renderVue('Header', Header)
```